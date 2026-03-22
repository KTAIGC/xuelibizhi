import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: '请提供邮箱和密码' }, { status: 400 });
    }

    // 模拟用户数据
    const mockUser = {
      id: 1,
      email: email,
      name: '测试用户',
      isMember: false,
    };

    // 模拟登录成功
    const token = generateToken(mockUser.id);

    const response = NextResponse.json({
      message: '登录成功',
      user: mockUser,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: '登录失败' }, { status: 500 });
  }
}
