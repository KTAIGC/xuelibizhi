import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function CategoriesPage() {
  // 假数据 - 全部分类
  const categories = [
    { id: 1, name: '风景', slug: 'landscape', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20landscape%20wallpaper%20mountains%20and%20lake&image_size=landscape_16_9' },
    { id: 2, name: '治愈', slug: 'healing', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=healing%20nature%20scenery%20soft%20colors&image_size=landscape_16_9' },
    { id: 3, name: '极简', slug: 'minimalist', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20wallpaper%20clean%20design&image_size=landscape_16_9' },
    { id: 4, name: '插画', slug: 'illustration', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20illustration%20wallpaper%20artistic&image_size=landscape_16_9' },
    { id: 5, name: '动漫', slug: 'anime', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20wallpaper%20colorful&image_size=landscape_16_9' },
    { id: 6, name: '可爱', slug: 'cute', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20wallpaper%20pastel%20colors&image_size=landscape_16_9' },
    { id: 7, name: '少女感', slug: 'girly', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=girly%20wallpaper%20pink%20pastel%20colors&image_size=landscape_16_9' },
    { id: 8, name: '电影感', slug: 'cinematic', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cinematic%20movie%20style%20wallpaper&image_size=landscape_16_9' },
    { id: 9, name: '科技感', slug: 'tech', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tech%20futuristic%20wallpaper%20blue%20hues&image_size=landscape_16_9' },
    { id: 10, name: '赛博', slug: 'cyberpunk', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cyberpunk%20city%20neon%20lights&image_size=landscape_16_9' },
    { id: 11, name: '梦幻', slug: 'dreamy', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dreamy%20fantasy%20wallpaper%20soft%20colors&image_size=landscape_16_9' },
    { id: 12, name: '花卉', slug: 'flowers', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20flowers%20wallpaper%20colorful&image_size=landscape_16_9' },
    { id: 13, name: '萌宠', slug: 'pets', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20pets%20wallpaper%20adorable&image_size=landscape_16_9' },
    { id: 14, name: '城市', slug: 'city', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=city%20skyline%20wallpaper%20modern&image_size=landscape_16_9' },
    { id: 15, name: '星空', slug: 'starry', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=starry%20night%20sky%20galaxy%20wallpaper&image_size=landscape_16_9' },
    { id: 16, name: '节日', slug: 'holiday', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=holiday%20festive%20wallpaper%20celebration&image_size=landscape_16_9' },
    { id: 17, name: '文字壁纸', slug: 'quotes', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=inspirational%20quotes%20wallpaper%20minimalist&image_size=landscape_16_9' },
    { id: 18, name: '情侣', slug: 'couple', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=romantic%20couple%20wallpaper%20loving&image_size=landscape_16_9' },
    { id: 19, name: '正能量', slug: 'positive', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=positive%20vibes%20wallpaper%20inspirational&image_size=landscape_16_9' },
    { id: 20, name: '高级灰', slug: 'gray', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20gray%20wallpaper%20minimalist&image_size=landscape_16_9' },
    { id: 21, name: '国风', slug: 'chinese', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20style%20wallpaper&image_size=landscape_16_9' },
    { id: 22, name: '清新色系', slug: 'fresh', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20colorful%20wallpaper%20pastel&image_size=landscape_16_9' },
    { id: 23, name: '复古胶片', slug: 'vintage', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20film%20style%20wallpaper%20warm%20tones&image_size=landscape_16_9' },
    { id: 24, name: '潮流个性', slug: 'trendy', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=trendy%20modern%20wallpaper%20stylish&image_size=landscape_16_9' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* 页面标题 */}
      <section className="pt-24 pb-8 bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800">壁纸分类</h1>
          <p className="text-gray-600 mt-2">探索不同风格的壁纸，找到适合你的那一款</p>
        </div>
      </section>

      {/* 分类列表 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* 筛选和排序 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">排序：</span>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500">
                <option>默认排序</option>
                <option>热门优先</option>
                <option>最新上架</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">视图：</span>
              <button className="p-2 bg-pink-500 text-white rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button className="p-2 bg-gray-200 text-gray-700 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* 分类网格 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`} className="group">
                <div className="relative overflow-hidden rounded-lg aspect-video shadow-sm hover:shadow-md transition-shadow">
                  <img 
                    src={category.coverImage} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h3 className="text-white font-medium p-4">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
