import { NextRequest, NextResponse } from 'next/server';

// 智谱AI API配置
const ZHIPU_API_KEY = process.env.ZHIPU_API_KEY || '5d7d37c4272b4d07b8f0a2a7a042b4b8.xUpCo3WdlrGXfbng';
console.log('使用的API Key:', ZHIPU_API_KEY);
const ZHIPU_API_URL = 'https://open.bigmodel.cn/api/paas/v4/images/generations';

// 映射画面比例到尺寸
const aspectRatioToSize = {
  '9:16': '1088x1472',
  '16:9': '1472x1088',
  '1:1': '1280x1280'
};

export async function POST(request: NextRequest) {
  try {
    const { prompt, style, aspectRatio, resolution } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: '请提供提示词' }, { status: 400 });
    }

    // 检查API Key
    if (!ZHIPU_API_KEY) {
      return NextResponse.json({ error: 'API Key未配置' }, { status: 500 });
    }

    console.log('调用智谱AI API，提示词:', prompt);
    console.log('API Key长度:', ZHIPU_API_KEY.length);

    // 调用智谱AI API
    const response = await fetch(ZHIPU_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ZHIPU_API_KEY}`
      },
      body: JSON.stringify({
        model: 'glm-image',
        prompt: prompt,
        size: aspectRatioToSize[aspectRatio as keyof typeof aspectRatioToSize] || '1280×1280',
        quality: resolution === 'high' || resolution === 'ultra' ? 'hd' : 'standard',
        watermark_enabled: true
      })
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

    // 返回生成的图像URL
    return NextResponse.json({
      status: 'success',
      imageUrl: data.data[0].url
    });
  } catch (error) {
    console.error('生成失败:', error);
    return NextResponse.json({ error: '生成失败，请重试' }, { status: 500 });
  }
}
