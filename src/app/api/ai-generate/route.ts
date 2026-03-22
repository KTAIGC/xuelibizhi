import { NextRequest, NextResponse } from 'next/server';

// wenwen-ai API配置
const WENWEN_API_KEY = 'sk-qv4RnPoNqN5aV8suyeDaLtEScG1juspHWMXgQXfvxHp5fzm1';
const WENWEN_API_BASE_URL = 'https://breakout.wenwen-ai.com/v1beta/models/';

// 支持的模型列表
const supportedModels = {
  'gemini-2.5-flash-image': 'gemini-2.5-flash-image:generateContent',
  'gemini-3-pro-image-preview': 'gemini-3-pro-image-preview:generateContent',
  'midjourney': 'mj/submit/imagine'
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

    // 确定使用的模型
    const selectedModel = model || 'gemini-2.5-flash-image';
    if (!supportedModels[selectedModel as keyof typeof supportedModels]) {
      return NextResponse.json({ error: '不支持的模型' }, { status: 400 });
    }

    const modelEndpoint = supportedModels[selectedModel as keyof typeof supportedModels];
    // 根据模型类型使用不同的API基础URL
    let WENWEN_API_URL;
    if (selectedModel === 'midjourney') {
      WENWEN_API_URL = `https://breakout.wenwen-ai.com/${modelEndpoint}`;
    } else {
      WENWEN_API_URL = `${WENWEN_API_BASE_URL}${modelEndpoint}`;
    }

    console.log('调用wenwen-ai API，提示词:', prompt);
    console.log('使用模型:', selectedModel);

    // 确定尺寸
    const size = aspectRatioToSize[aspectRatio as keyof typeof aspectRatioToSize] || aspectRatioToSize['1:1'];

    // 根据模型类型构建不同的请求体
    let requestBody;
    if (selectedModel === 'midjourney') {
      // Midjourney API请求格式
      requestBody = JSON.stringify({
        prompt: `高清壁纸，${prompt}，风格：${style}，尺寸：${size.width}x${size.height}`,
        size: `${size.width}x${size.height}`
      });
    } else {
      // Gemini API请求格式
      requestBody = JSON.stringify({
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
    }

    // 调用wenwen-ai API
    const response = await fetch(WENWEN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WENWEN_API_KEY}`
      },
      body: requestBody
    });

    console.log('API响应状态:', response.status);
    
    if (!response.ok) {
      let errorMessage = 'API调用失败';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error?.message || errorMessage;
      } catch (e) {
        console.error('解析错误响应失败:', e);
      }
      console.error('API错误:', errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const data = await response.json();
    console.log('API响应数据:', data);

    // 处理Gemini API响应
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      // 提取所有文本部分
      let description = prompt;
      for (const part of data.candidates[0].content.parts) {
        if (part.text) {
          description = part.text;
          break;
        }
      }
      
      console.log('Gemini生成的描述:', description);
      
      // 基于描述生成图像URL
      const imageUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(description)}&image_size=portrait_4_3`;
      
      return NextResponse.json({
        status: 'success',
        imageUrl: imageUrl
      });
    } else {
      throw new Error('API响应结构不符合预期');
    }
  } catch (error) {
    console.error('生成失败:', error);
    return NextResponse.json({ error: '生成失败，请重试' }, { status: 500 });
  }
}
