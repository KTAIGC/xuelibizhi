import { NextRequest, NextResponse } from 'next/server';
import { uploadImageToOSS, base64ToBuffer } from '@/lib/oss';

// wenwen-ai API配置
const WENWEN_API_KEY = process.env.WENWEN_API_KEY || 'sk-HmKdFirvdUaKuQe0QuUwpwNGiWj5Mfmg001WwT4xQykci0pO';
const WENWEN_API_BASE_URL = 'https://breakout.wenwen-ai.com/v1beta/models/';

// 支持的模型列表
const supportedModels = {
  'gemini-2.5-flash-image': 'gemini-2.5-flash-image:generateContent',
  'gemini-3-pro-image-preview': 'gemini-3-pro-image-preview:generateContent'
};

// 映射画面比例到尺寸
const aspectRatioToSize = {
  '9:16': { width: 1080, height: 1920 },
  '16:9': { width: 1920, height: 1080 },
  '1:1': { width: 1280, height: 1280 }
};

export async function POST(request: NextRequest) {
  try {
    const { prompt, style, aspectRatio, resolution, model } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: '请提供提示词' }, { status: 400 });
    }

    console.log('前端请求参数:', { prompt, style, aspectRatio, resolution, model });

    // 确定使用的模型
    const selectedModel = model || 'gemini-2.5-flash-image';
    if (!supportedModels[selectedModel as keyof typeof supportedModels]) {
      return NextResponse.json({ error: '不支持的模型' }, { status: 400 });
    }

    const modelEndpoint = supportedModels[selectedModel as keyof typeof supportedModels];
    // 构建API URL
    const WENWEN_API_URL = `${WENWEN_API_BASE_URL}${modelEndpoint}`;

    console.log('调用wenwen-ai API，提示词:', prompt);
    console.log('使用模型:', selectedModel);

    // 确定尺寸
    const size = aspectRatioToSize[aspectRatio as keyof typeof aspectRatioToSize] || aspectRatioToSize['1:1'];

    // 构建Gemini API请求体
    const requestBody = JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `生成一张高清壁纸，提示词：${prompt}，风格：${style}，尺寸：${size.width}x${size.height}。请直接生成图像，不要只返回描述。`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048
      }
    });

    console.log('API请求URL:', WENWEN_API_URL);
    
    // 调用wenwen-ai API
    let response;
    let data;
    let apiSuccess = false;
    
    try {
      response = await fetch(WENWEN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${WENWEN_API_KEY}`
        },
        body: requestBody
      });

      console.log('API响应状态:', response.status);
      
      if (response.ok) {
        data = await response.json();
        console.log('API响应数据:', data);
        apiSuccess = true;
      } else {
        let errorMessage = 'API调用失败';
        try {
          const errorData = await response.json();
          console.log('API错误响应:', errorData);
          errorMessage = errorData.error?.message || errorData.message || errorMessage;
        } catch (e) {
          console.error('解析错误响应失败:', e);
          // 尝试获取原始响应文本
          try {
            const errorText = await response.text();
            console.log('API错误响应文本:', errorText);
            errorMessage = errorText;
          } catch (e2) {
            console.error('获取错误响应文本失败:', e2);
          }
        }
        console.error('API错误:', errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: response.status });
      }
    } catch (error) {
      console.error('API调用异常:', error);
      return NextResponse.json({ error: 'API调用异常' }, { status: 500 });
    }

    // 处理Gemini API响应
    if (apiSuccess) {
      console.log('完整的API响应:', JSON.stringify(data, null, 2));
      
      if (data.candidates && data.candidates[0]) {
        // 提取文本部分，处理不同的响应结构
        let description = prompt;
        let imageUrl = null;
        
        console.log('检查API响应结构...');
        console.log('Content详细结构:', JSON.stringify(data.candidates[0].content, null, 2));
        
        // 检查content是否存在
        if (data.candidates[0].content) {
          // 尝试从parts中获取文本和图片
          if (data.candidates[0].content.parts) {
            console.log('Parts数量:', data.candidates[0].content.parts.length);
            for (let i = 0; i < data.candidates[0].content.parts.length; i++) {
              const part = data.candidates[0].content.parts[i];
              console.log('Part ' + i + '详细结构:', JSON.stringify(part, null, 2));
              if (part.text) {
                description = part.text;
                console.log('提取到文本:', description.substring(0, 100) + '...');
              } else if (part.inlineData && part.inlineData.data) {
                // 检查是否有生成的图片（Base64格式）
                console.log('API返回了图片数据:', part.inlineData.mimeType);
                // 这里就是图片，Base64
                const base64Data = part.inlineData.data;
                
                try {
                  // 将Base64数据转换为Buffer
                  const buffer = Buffer.from(base64Data, 'base64');
                  // 上传到OSS
                  const filename = `ai-generated-${Date.now()}.jpg`;
                  imageUrl = await uploadImageToOSS(buffer, filename);
                  console.log('图片已上传到OSS:', imageUrl);
                } catch (error) {
                  console.error('OSS上传失败:', error);
                  // 如果OSS上传失败，使用Data URL作为备用
                  imageUrl = `data:${part.inlineData.mimeType};base64,${base64Data}`;
                  console.log('使用Data URL作为备用:', imageUrl.substring(0, 100) + '...');
                }
              } else if (part.image) {
                // 检查是否有生成的图片
                imageUrl = part.image.url;
                console.log('API返回了图片URL:', imageUrl);
              } else if (part.images) {
                // 检查是否有images字段
                console.log('发现images字段:', part.images);
                if (part.images.length > 0) {
                  imageUrl = part.images[0].url;
                  console.log('API返回了图片URL:', imageUrl);
                }
              } else {
                console.log('其他类型的part:', Object.keys(part));
              }
            }
          } 
          // 直接从content中获取文本（如果parts不存在）
          else if (data.candidates[0].content.text) {
            description = data.candidates[0].content.text;
            console.log('直接从content提取文本:', description.substring(0, 100) + '...');
          }
          // 检查content中是否直接有image字段
          else if (data.candidates[0].content.image) {
            imageUrl = data.candidates[0].content.image.url;
            console.log('API返回了图片URL:', imageUrl);
          }
          // 检查content中是否直接有images字段
          else if (data.candidates[0].content.images) {
            console.log('发现images字段:', data.candidates[0].content.images);
            if (data.candidates[0].content.images.length > 0) {
              imageUrl = data.candidates[0].content.images[0].url;
              console.log('API返回了图片URL:', imageUrl);
            }
          }
        }
        
        // 如果API返回了图片URL，直接使用它
        if (imageUrl) {
          console.log('使用API生成的图片URL');
          return NextResponse.json({
            status: 'success',
            imageUrl: imageUrl
          });
        } else {
          // 如果API没有返回图片URL，返回错误
          console.error('API没有返回图片数据');
          return NextResponse.json({
            error: 'API未返回图片，请确保使用的是支持图片生成的模型',
            status: 'error'
          }, { status: 404 });
        }
      } else {
        throw new Error('API响应结构不符合预期');
      }
    }
  } catch (error) {
    console.error('生成失败:', error);
    return NextResponse.json({ error: '生成失败，请重试' }, { status: 500 });
  }
}
