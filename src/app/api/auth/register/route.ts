import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: '请提供邮箱和密码' }, { status: 400 });
    }

    // 模拟注册成功
    return NextResponse.json({ message: '注册成功' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: '注册失败' }, { status: 500 });
  }
}
