import { NextRequest, NextResponse } from 'next/server';

// 模拟AI生成API响应
export async function POST(request: NextRequest) {
  try {
    const { prompt, style, aspectRatio, resolution } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: '请提供提示词' }, { status: 400 });
    }

    console.log('模拟AI生成，提示词:', prompt);

    // 模拟生成延迟
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 生成一个基于提示词的图像URL
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodedPrompt}&image_size=portrait_4_3`;

    // 返回模拟的成功响应
    return NextResponse.json({
      status: 'success',
      imageUrl: imageUrl
    });
  } catch (error) {
    console.error('生成失败:', error);
    return NextResponse.json({ error: '生成失败，请重试' }, { status: 500 });
  }
}
