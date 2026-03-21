import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  // 假数据 - 分类
  const categories = [
    { id: 1, name: '风景', slug: 'landscape', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20landscape%20wallpaper%20mountains%20and%20lake&image_size=landscape_16_9' },
    { id: 2, name: '治愈', slug: 'healing', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=healing%20nature%20scenery%20soft%20colors&image_size=landscape_16_9' },
    { id: 3, name: '极简', slug: 'minimalist', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20wallpaper%20clean%20design&image_size=landscape_16_9' },
    { id: 4, name: '插画', slug: 'illustration', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20illustration%20wallpaper%20artistic&image_size=landscape_16_9' },
    { id: 5, name: '动漫', slug: 'anime', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20wallpaper%20colorful&image_size=landscape_16_9' },
    { id: 6, name: '可爱', slug: 'cute', coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20wallpaper%20pastel%20colors&image_size=landscape_16_9' },
  ];

  // 假数据 - 热门壁纸
  const hotWallpapers = [
    { id: 1, title: '山水风景', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20mountain%20landscape%20with%20lake&image_size=portrait_4_3' },
    { id: 2, title: '治愈系森林', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=peaceful%20forest%20path%20sunlight%20filtering%20through%20trees&image_size=portrait_4_3' },
    { id: 3, title: '极简几何', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20geometric%20pattern%20wallpaper&image_size=portrait_4_3' },
    { id: 4, title: '梦幻星空', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=starry%20night%20sky%20galaxy%20wallpaper&image_size=portrait_4_3' },
  ];

  // 假数据 - 最新上传
  const latestWallpapers = [
    { id: 5, title: '城市夜景', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=city%20night%20view%20skyline%20lights&image_size=portrait_4_3' },
    { id: 6, title: '花卉特写', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=close%20up%20of%20beautiful%20flowers%20colorful&image_size=portrait_4_3' },
    { id: 7, title: '科技感', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=futuristic%20technology%20wallpaper%20blue%20hues&image_size=portrait_4_3' },
    { id: 8, title: '复古胶片', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20film%20style%20photography%20warm%20tones&image_size=portrait_4_3' },
  ];

  // 假数据 - AI生成推荐
  const aiGenerations = [
    { id: 1, title: '梦幻仙境', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=magical%20fantasy%20landscape%20with%20floating%20islands&image_size=portrait_4_3' },
    { id: 2, title: '赛博朋克', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cyberpunk%20city%20neon%20lights%20futuristic&image_size=portrait_4_3' },
    { id: 3, title: '国风山水', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20landscape%20painting%20style&image_size=portrait_4_3' },
    { id: 4, title: '未来科技', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=futuristic%20technology%20concept%20sleek%20design&image_size=portrait_4_3' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Banner */}
      <section className="pt-20 pb-12 bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                雪梨壁纸
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                发现最美的手机壁纸，让你的屏幕与众不同
              </p>
              <div className="flex space-x-4">
                <Link href="/categories" className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors font-medium">
                  浏览分类
                </Link>
                <Link href="/ai-generate" className="bg-white text-pink-500 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium border border-pink-500">
                  AI生成壁纸
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20wallpaper%20collection%20mobile%20phone%20backgrounds%20colorful&image_size=landscape_16_9" 
                alt="雪梨壁纸" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 推荐分类 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">推荐分类</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`} className="group">
                <div className="relative overflow-hidden rounded-lg aspect-video">
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
          <div className="mt-8 text-center">
            <Link href="/categories" className="text-pink-500 hover:text-pink-600 transition-colors font-medium">
              查看全部分类 →
            </Link>
          </div>
        </div>
      </section>

      {/* 热门壁纸 */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">热门壁纸</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hotWallpapers.map((wallpaper) => (
              <Link key={wallpaper.id} href={`/wallpaper/${wallpaper.id}`} className="group">
                <div className="relative overflow-hidden rounded-lg aspect-[9/16]">
                  <img 
                    src={wallpaper.imageUrl} 
                    alt={wallpaper.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-medium p-4">{wallpaper.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 最新上传 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">最新上传</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {latestWallpapers.map((wallpaper) => (
              <Link key={wallpaper.id} href={`/wallpaper/${wallpaper.id}`} className="group">
                <div className="relative overflow-hidden rounded-lg aspect-[9/16]">
                  <img 
                    src={wallpaper.imageUrl} 
                    alt={wallpaper.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-medium p-4">{wallpaper.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI生成推荐 */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">AI生成推荐</h2>
            <Link href="/ai-generate" className="text-pink-500 hover:text-pink-600 transition-colors font-medium">
              立即生成 →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {aiGenerations.map((generation) => (
              <Link key={generation.id} href={`/wallpaper/${generation.id}`} className="group">
                <div className="relative overflow-hidden rounded-lg aspect-[9/16]">
                  <img 
                    src={generation.imageUrl} 
                    alt={generation.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-medium p-4">{generation.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 图片广场入口 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">图片广场</h2>
              <p className="text-gray-600 mb-6">
                发现社区精选壁纸，获取灵感，生成属于你的独特壁纸
              </p>
              <Link href="/gallery" className="bg-white text-pink-500 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium">
                探索广场
              </Link>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=collage%20of%20beautiful%20wallpapers%20creative%20collection&image_size=landscape_4_3" 
                alt="图片广场" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 会员套餐入口 */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">会员特权</h2>
            <p className="text-gray-600 mb-8 text-center">
              解锁更多下载次数、AI生成次数和专属高清资源
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-800 mb-2">7天体验包</h3>
                <p className="text-pink-500 font-bold text-xl mb-2">¥9.9</p>
                <p className="text-gray-600 text-sm mb-4">原价 ¥19.9</p>
                <Link href="/membership" className="text-pink-500 hover:text-pink-600 transition-colors font-medium text-sm">
                  立即购买
                </Link>
              </div>
              <div className="border border-pink-500 rounded-lg p-6 text-center bg-pink-50 hover:shadow-md transition-shadow relative">
                <div className="absolute top-0 right-0 bg-pink-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                  推荐
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">季度包</h3>
                <p className="text-pink-500 font-bold text-xl mb-2">¥39</p>
                <p className="text-gray-600 text-sm mb-4">原价 ¥59</p>
                <Link href="/membership" className="text-pink-500 hover:text-pink-600 transition-colors font-medium text-sm">
                  立即购买
                </Link>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-800 mb-2">半年包</h3>
                <p className="text-pink-500 font-bold text-xl mb-2">¥99</p>
                <p className="text-gray-600 text-sm mb-4">原价 ¥159</p>
                <Link href="/membership" className="text-pink-500 hover:text-pink-600 transition-colors font-medium text-sm">
                  立即购买
                </Link>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-800 mb-2">年度包</h3>
                <p className="text-pink-500 font-bold text-xl mb-2">¥199</p>
                <p className="text-gray-600 text-sm mb-4">原价 ¥299</p>
                <Link href="/membership" className="text-pink-500 hover:text-pink-600 transition-colors font-medium text-sm">
                  立即购买
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
