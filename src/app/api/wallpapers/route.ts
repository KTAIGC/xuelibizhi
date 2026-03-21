import { NextRequest, NextResponse } from 'next/server';

// 模拟壁纸数据
const mockWallpapers = [
  {
    id: '1',
    title: '粉色樱花',
    description: '美丽的粉色樱花壁纸',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pink%20cherry%20blossoms%20wallpaper%20for%20mobile&image_size=portrait_16_9',
    thumbnailUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pink%20cherry%20blossoms%20wallpaper%20for%20mobile&image_size=portrait_16_9',
    resolution: '1080x1920',
    categoryId: '1',
    createdAt: new Date().toISOString(),
    category: {
      id: '1',
      name: '风景',
      slug: 'landscape',
    },
  },
  {
    id: '2',
    title: '蓝色海洋',
    description: '宁静的蓝色海洋壁纸',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20ocean%20wallpaper%20for%20mobile&image_size=portrait_16_9',
    thumbnailUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20ocean%20wallpaper%20for%20mobile&image_size=portrait_16_9',
    resolution: '1080x1920',
    categoryId: '1',
    createdAt: new Date().toISOString(),
    category: {
      id: '1',
      name: '风景',
      slug: 'landscape',
    },
  },
  {
    id: '3',
    title: '可爱猫咪',
    description: '可爱的猫咪壁纸',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cat%20wallpaper%20for%20mobile&image_size=portrait_16_9',
    thumbnailUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cat%20wallpaper%20for%20mobile&image_size=portrait_16_9',
    resolution: '1080x1920',
    categoryId: '2',
    createdAt: new Date().toISOString(),
    category: {
      id: '2',
      name: '动物',
      slug: 'animals',
    },
  },
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ wallpapers: mockWallpapers });
  } catch (error) {
    return NextResponse.json({ error: '获取壁纸列表失败' }, { status: 500 });
  }
}
