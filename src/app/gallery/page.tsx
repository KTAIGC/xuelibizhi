'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function GalleryPage() {
  const [activeStyle, setActiveStyle] = useState('all');

  // 假数据 - 图片广场内容
  const galleryItems = [
    {
      id: 1,
      title: '梦幻仙境',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=magical%20fantasy%20landscape%20with%20floating%20islands&image_size=portrait_4_3',
      prompt: '梦幻的幻想风景，有漂浮的岛屿，柔和的颜色，梦幻感',
      style: '梦幻',
    },
    {
      id: 2,
      title: '治愈系森林',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=peaceful%20forest%20path%20sunlight%20filtering%20through%20trees&image_size=portrait_4_3',
      prompt: '宁静的森林小径，阳光透过树叶洒下，治愈系',
      style: '治愈',
    },
    {
      id: 3,
      title: '极简几何',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20geometric%20pattern%20wallpaper&image_size=portrait_4_3',
      prompt: '极简几何图案，干净的设计，现代风格',
      style: '极简',
    },
    {
      id: 4,
      title: '动漫风格',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20wallpaper%20colorful&image_size=portrait_4_3',
      prompt: '动漫风格，色彩丰富，充满活力，有角色',
      style: '动漫',
    },
    {
      id: 5,
      title: '国风山水',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20landscape%20painting%20style&image_size=portrait_4_3',
      prompt: '中国传统山水画风格，有山有水',
      style: '国风',
    },
    {
      id: 6,
      title: '赛博朋克',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cyberpunk%20city%20neon%20lights%20futuristic&image_size=portrait_4_3',
      prompt: '赛博朋克城市，霓虹灯，未来感，黑暗风格',
      style: '赛博',
    },
    {
      id: 7,
      title: '科技感',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=futuristic%20technology%20wallpaper%20blue%20hues&image_size=portrait_4_3',
      prompt: '未来科技，蓝色调， sleek 设计',
      style: '科技感',
    },
    {
      id: 8,
      title: '复古胶片',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20film%20style%20photography%20warm%20tones&image_size=portrait_4_3',
      prompt: '复古胶片风格，暖色调，怀旧感',
      style: '复古胶片',
    },
  ];

  // 风格选项
  const styles = ['all', '治愈', '梦幻', '极简', '动漫', '国风', '赛博', '科技感', '复古胶片'];

  // 过滤后的图片
  const filteredItems = activeStyle === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.style === activeStyle);

  const handleUseInspiration = (prompt: string) => {
    // 跳转到AI生成页并传递提示词
    window.location.href = `/ai-generate?prompt=${encodeURIComponent(prompt)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* 页面标题 */}
      <section className="pt-24 pb-8 bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800">图片广场</h1>
          <p className="text-gray-600 mt-2">发现社区精选壁纸，获取灵感，生成属于你的独特壁纸</p>
        </div>
      </section>

      {/* 风格筛选 */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {styles.map((style) => (
              <button
                key={style}
                onClick={() => setActiveStyle(style)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeStyle === style ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {style === 'all' ? '全部' : style}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 图片网格 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-[9/16]">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-2">{item.title}</h3>
                  <div className="mb-4">
                    <span className="text-xs font-medium text-pink-500 bg-pink-50 px-2 py-1 rounded">
                      {item.style}
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs text-gray-600 truncate">参考提示词：{item.prompt}</p>
                  </div>
                  <button
                    onClick={() => handleUseInspiration(item.prompt)}
                    className="w-full bg-pink-100 text-pink-500 py-2 rounded-lg hover:bg-pink-200 transition-colors text-sm font-medium"
                  >
                    用这个灵感生成
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
