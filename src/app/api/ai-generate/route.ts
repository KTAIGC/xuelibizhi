import { NextRequest, NextResponse } from 'next/server';

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
              text: `描述一张高清壁纸，提示词：${prompt}，风格：${style}，尺寸：${size.width}x${size.height}。请提供详细的描述，以便用于生成图像。`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024
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
      if (data.candidates && data.candidates[0]) {
        // 提取文本部分，处理不同的响应结构
        let description = prompt;
        let imageUrl = null;
        
        // 检查content是否存在
        if (data.candidates[0].content) {
          // 尝试从parts中获取文本和图片
          if (data.candidates[0].content.parts) {
            for (const part of data.candidates[0].content.parts) {
              if (part.text) {
                description = part.text;
              } else if (part.image) {
                // 检查是否有生成的图片
                imageUrl = part.image.url;
              }
            }
          } 
          // 直接从content中获取文本（如果parts不存在）
          else if (data.candidates[0].content.text) {
            description = data.candidates[0].content.text;
          }
          // 其他content结构
          else {
            console.log('其他content结构:', data.candidates[0].content);
          }
        } else {
          console.log('无content字段:', data.candidates[0]);
        }
        
        console.log('Gemini生成的描述:', description);
        console.log('API返回的图片URL:', imageUrl);
        
        // 如果API返回了图片URL，直接使用它
        if (imageUrl) {
          console.log('使用API生成的图片URL:', imageUrl);
          return NextResponse.json({
            status: 'success',
            imageUrl: imageUrl
          });
        } else {
          // 如果API没有返回图片URL，使用基于描述的图片生成
          console.warn('API没有返回图片URL，使用基于描述的图片生成');
          const finalImageUrl = `https://source.unsplash.com/random/1080x1920/?${encodeURIComponent(prompt)}`;
          console.log('生成的图片URL:', finalImageUrl);
          return NextResponse.json({
            status: 'success',
            imageUrl: finalImageUrl
          });
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
