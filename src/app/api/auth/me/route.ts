import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    // 模拟用户数据
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: '测试用户',
      isMember: false,
      membershipLevel: 0,
      dailyDownloads: 0,
      dailyGenerations: 0,
    };

    return NextResponse.json({
      user: mockUser,
    });
  } catch (error) {
    return NextResponse.json({ error: '获取用户信息失败' }, { status: 500 });
  }
}
