import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  // 创建默认管理员用户
  const adminPassword = await hashPassword('admin123');
  await prisma.adminUser.upsert({
    where: { email: 'admin@xuelibizhi.com' },
    update: {},
    create: {
      email: 'admin@xuelibizhi.com',
      password: adminPassword,
      name: '管理员',
      role: 'admin',
    },
  });

  // 创建壁纸分类
  const categories = [
    { name: '风景', slug: 'landscape', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20landscape%20wallpaper%20mountains%20and%20lake&image_size=landscape_16_9' },
    { name: '治愈', slug: 'healing', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=healing%20nature%20scenery%20soft%20colors&image_size=landscape_16_9' },
    { name: '极简', slug: 'minimalist', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20wallpaper%20clean%20design&image_size=landscape_16_9' },
    { name: '插画', slug: 'illustration', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20illustration%20wallpaper%20artistic&image_size=landscape_16_9' },
    { name: '动漫', slug: 'anime', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20wallpaper%20colorful&image_size=landscape_16_9' },
    { name: '可爱', slug: 'cute', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20wallpaper%20pastel%20colors&image_size=landscape_16_9' },
    { name: '少女感', slug: 'girly', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=girly%20wallpaper%20pink%20pastel%20colors&image_size=landscape_16_9' },
    { name: '电影感', slug: 'cinematic', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cinematic%20movie%20style%20wallpaper&image_size=landscape_16_9' },
    { name: '科技感', slug: 'tech', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tech%20futuristic%20wallpaper%20blue%20hues&image_size=landscape_16_9' },
    { name: '赛博', slug: 'cyberpunk', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cyberpunk%20city%20neon%20lights&image_size=landscape_16_9' },
    { name: '梦幻', slug: 'dreamy', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dreamy%20fantasy%20wallpaper%20soft%20colors&image_size=landscape_16_9' },
    { name: '花卉', slug: 'flowers', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20flowers%20wallpaper%20colorful&image_size=landscape_16_9' },
    { name: '萌宠', slug: 'pets', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20pets%20wallpaper%20adorable&image_size=landscape_16_9' },
    { name: '城市', slug: 'city', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=city%20skyline%20wallpaper%20modern&image_size=landscape_16_9' },
    { name: '星空', slug: 'starry', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=starry%20night%20sky%20galaxy%20wallpaper&image_size=landscape_16_9' },
    { name: '节日', slug: 'holiday', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=holiday%20festive%20wallpaper%20celebration&image_size=landscape_16_9' },
    { name: '文字壁纸', slug: 'quotes', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=inspirational%20quotes%20wallpaper%20minimalist&image_size=landscape_16_9' },
    { name: '情侣', slug: 'couple', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=romantic%20couple%20wallpaper%20loving&image_size=landscape_16_9' },
    { name: '正能量', slug: 'positive', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=positive%20vibes%20wallpaper%20inspirational&image_size=landscape_16_9' },
    { name: '高级灰', slug: 'gray', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20gray%20wallpaper%20minimalist&image_size=landscape_16_9' },
    { name: '国风', slug: 'chinese', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20style%20wallpaper&image_size=landscape_16_9' },
    { name: '清新色系', slug: 'fresh', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20colorful%20wallpaper%20pastel&image_size=landscape_16_9' },
    { name: '复古胶片', slug: 'vintage', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20film%20style%20wallpaper%20warm%20tones&image_size=landscape_16_9' },
    { name: '潮流个性', slug: 'trendy', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=trendy%20modern%20wallpaper%20stylish&image_size=landscape_16_9' },
  ];

  for (const category of categories) {
    await prisma.wallpaperCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  // 创建会员套餐
  const plans = [
    {
      name: '月体验包',
      price: 9.9,
      originalPrice: 19.9,
      duration: 30,
      dailyDownloads: 10,
      dailyGenerations: 5,
      dailyRepairs: 5,
      isFeatured: false,
      isPopular: false,
      description: '适合初次体验会员服务的用户',
    },
    {
      name: '季度包',
      price: 39,
      originalPrice: 59,
      duration: 90,
      dailyDownloads: 20,
      dailyGenerations: 10,
      dailyRepairs: 10,
      isFeatured: true,
      isPopular: true,
      description: '性价比最高，适合长期使用',
    },
    {
      name: '半年包',
      price: 99,
      originalPrice: 159,
      duration: 180,
      dailyDownloads: 30,
      dailyGenerations: 15,
      dailyRepairs: 15,
      isFeatured: false,
      isPopular: false,
      description: '适合重度用户',
    },
    {
      name: '年度包',
      price: 199,
      originalPrice: 299,
      duration: 365,
      dailyDownloads: 50,
      dailyGenerations: 20,
      dailyRepairs: 20,
      isFeatured: false,
      isPopular: false,
      description: '最划算，适合长期创作者',
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { name: plan.name },
      update: {},
      create: plan,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
