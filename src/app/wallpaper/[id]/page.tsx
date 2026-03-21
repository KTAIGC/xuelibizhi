'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function WallpaperDetailPage({ params }: { params: { id: string } }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // 假数据 - 壁纸详情
  const wallpaper = {
    id: parseInt(params.id),
    title: '山水风景',
    description: '美丽的山水风景壁纸，适合喜欢自然的你',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20mountain%20landscape%20with%20lake%20high%20resolution&image_size=portrait_4_3',
    thumbnailUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20mountain%20landscape%20with%20lake&image_size=portrait_4_3',
    category: '风景',
    tags: '风景,山水,自然,湖泊',
    viewCount: 1234,
    downloadCount: 567,
    aspectRatio: '9:16',
    resolution: '1080x1920',
    isAiGenerated: false,
    prompt: '',
  };

  // 假数据 - 相似推荐
  const similarWallpapers = [
    { id: 2, title: '治愈系森林', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=peaceful%20forest%20path%20sunlight%20filtering%20through%20trees&image_size=portrait_4_3' },
    { id: 3, title: '梦幻星空', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=starry%20night%20sky%20galaxy%20wallpaper&image_size=portrait_4_3' },
    { id: 4, title: '城市夜景', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=city%20night%20view%20skyline%20lights&image_size=portrait_4_3' },
    { id: 5, title: '花卉特写', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=close%20up%20of%20beautiful%20flowers%20colorful&image_size=portrait_4_3' },
  ];

  const handleDownload = () => {
    setIsDownloading(true);
    // 模拟下载过程
    setTimeout(() => {
      setIsDownloading(false);
      alert('下载完成！');
    }, 1500);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* 页面内容 */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 左侧图片预览 */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <img 
                  src={wallpaper.imageUrl} 
                  alt={wallpaper.title} 
                  className="w-full h-auto rounded-lg object-contain max-h-[600px]"
                />
              </div>
            </div>

            {/* 右侧信息 */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{wallpaper.title}</h1>
                
                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {wallpaper.tags.split(',').map((tag, index) => (
                    <span key={index} className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                {/* 分类 */}
                <div className="mb-4">
                  <span className="text-gray-600">分类：</span>
                  <Link href={`/categories/${wallpaper.category.toLowerCase()}`} className="text-pink-500 hover:text-pink-600 transition-colors">
                    {wallpaper.category}
                  </Link>
                </div>

                {/* 分辨率和比例 */}
                <div className="mb-4 text-gray-600">
                  <p>分辨率：{wallpaper.resolution}</p>
                  <p>比例：{wallpaper.aspectRatio}</p>
                </div>

                {/* 浏览和下载次数 */}
                <div className="mb-6 text-gray-600">
                  <p>浏览次数：{wallpaper.viewCount}</p>
                  <p>下载次数：{wallpaper.downloadCount}</p>
                </div>

                {/* AI生成提示词 */}
                {wallpaper.isAiGenerated && wallpaper.prompt && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">提示词</h3>
                    <p className="text-gray-600 text-sm">{wallpaper.prompt}</p>
                  </div>
                )}

                {/* 操作按钮 */}
                <div className="flex space-x-4 mb-6">
                  <button 
                    onClick={handleDownload}
                    className="flex-1 bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isDownloading}
                  >
                    {isDownloading ? '下载中...' : '下载壁纸'}
                  </button>
                  <button 
                    onClick={toggleFavorite}
                    className={`p-3 rounded-lg border ${isFavorite ? 'bg-pink-100 border-pink-500 text-pink-500' : 'bg-white border-gray-300 text-gray-600'} hover:bg-gray-50 transition-colors`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* 未登录用户提示 */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700 text-sm">
                  <p>未登录用户每天可免费下载3张壁纸，登录后可获得更多下载次数。</p>
                  <Link href="/auth" className="text-pink-500 hover:text-pink-600 transition-colors font-medium">
                    立即登录
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 相似推荐 */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-800 mb-6">相似推荐</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarWallpapers.map((item) => (
                <Link key={item.id} href={`/wallpaper/${item.id}`} className="group">
                  <div className="relative overflow-hidden rounded-lg aspect-[9/16] shadow-sm hover:shadow-md transition-shadow">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-medium p-4">{item.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
