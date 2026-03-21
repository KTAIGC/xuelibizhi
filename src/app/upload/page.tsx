'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // 分类选项
  const categories = [
    '风景', '治愈', '极简', '插画', '动漫', '可爱', '少女感', '电影感', '科技感', '赛博',
    '梦幻', '花卉', '萌宠', '城市', '星空', '节日', '文字壁纸', '情侣', '正能量', '高级灰',
    '国风', '清新色系', '复古胶片', '潮流个性'
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !category || !image) {
      alert('请填写必填项');
      return;
    }

    setIsUploading(true);

    // 模拟上传过程
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      // 重置表单
      setTitle('');
      setDescription('');
      setCategory('');
      setTags('');
      setImage(null);
      setIsPublic(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* 页面标题 */}
      <section className="pt-24 pb-8 bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800">上传壁纸</h1>
          <p className="text-gray-600 mt-2">分享你的精彩壁纸，让更多人看到</p>
        </div>
      </section>

      {/* 上传表单 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* 登录提示 */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700">请先登录后再上传壁纸</p>
            </div>

            {uploadSuccess ? (
              <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                <h2 className="text-xl font-bold text-green-700 mb-2">上传成功！</h2>
                <p className="text-green-600">您的壁纸已提交审核，审核通过后将在网站上展示</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* 标题 */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">标题 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="请输入壁纸标题"
                    required
                  />
                </div>

                {/* 描述 */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">描述</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    rows={3}
                    placeholder="请输入壁纸描述"
                  />
                </div>

                {/* 分类 */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">分类 <span className="text-red-500">*</span></label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  >
                    <option value="">请选择分类</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* 标签 */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">标签</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="请输入标签，用逗号分隔"
                  />
                </div>

                {/* 图片上传 */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">壁纸图片 <span className="text-red-500">*</span></label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                  {image && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">已选择文件：{image.name}</p>
                    </div>
                  )}
                </div>

                {/* 公开到广场 */}
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-gray-700">公开到图片广场</span>
                  </label>
                </div>

                {/* 提交按钮 */}
                <button
                  type="submit"
                  className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isUploading}
                >
                  {isUploading ? '上传中...' : '上传壁纸'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
