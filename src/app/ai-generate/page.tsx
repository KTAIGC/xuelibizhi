'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';

export default function AiGeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('default');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [resolution, setResolution] = useState('high');
  const [model, setModel] = useState('gemini-2.5-flash-image');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generationStatus, setGenerationStatus] = useState<'idle' | 'generating' | 'success' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 从URL参数中获取提示词
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const promptParam = urlParams.get('prompt');
    if (promptParam) {
      setPrompt(promptParam);
    }
  }, []);

  // 风格模板选项
  const styleTemplates = [
    { value: 'default', label: '默认风格', prompt: '高清壁纸，精美细节，适合手机屏幕' },
    { value: 'anime', label: '动漫风格', prompt: '动漫风格，色彩鲜艳，角色可爱，二次元，精美细节' },
    { value: 'realistic', label: '写实风格', prompt: '写实风格，高清细节，逼真效果，自然光线' },
    { value: 'cartoon', label: '卡通风格', prompt: '卡通风格，扁平化设计，明亮色彩，可爱元素' },
    { value: 'chinese', label: '国风风格', prompt: '中国传统风格，水墨画，山水意境，古典美学' },
    { value: 'cyberpunk', label: '赛博朋克', prompt: '赛博朋克风格，霓虹灯，未来科技，黑暗氛围' },
    { value: 'minimalist', label: '极简风格', prompt: '极简风格，干净整洁，留白，简约设计' },
    { value: 'dreamy', label: '梦幻风格', prompt: '梦幻风格，柔和色彩，模糊效果，仙境般的氛围' },
  ];

  // 画面比例选项
  const aspectRatioOptions = [
    { value: '9:16', label: '手机竖屏 (9:16)' },
    { value: '16:9', label: '横屏 (16:9)' },
    { value: '1:1', label: '正方形 (1:1)' },
  ];

  // 清晰度选项
    const resolutionOptions = [
      { value: 'low', label: '标准清晰度' },
      { value: 'high', label: '高清' },
      { value: 'ultra', label: '超高清' },
    ];

    // 模型选项
    const modelOptions = [
      { value: 'gemini-2.5-flash-image', label: 'Gemini 2.5 Flash Image' },
      { value: 'gemini-3-pro-image-preview', label: 'Gemini 3 Pro Image Preview' },
      { value: 'midjourney', label: 'Midjourney' },
    ];

  // 常用提示词模板
  const promptTemplates = [
    '美丽的山水风景，有山有湖',
    '可爱的猫咪，周围有花朵',
    '未来城市，霓虹灯闪烁',
    '中国传统绘画风格',
    '极简几何图案',
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('请输入提示词');
      return;
    }

    setIsGenerating(true);
    setGenerationStatus('generating');
    setErrorMessage(null);
    setGeneratedImage(null);

    try {
      const response = await fetch('/api/ai-generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          style,
          aspectRatio,
          resolution,
          model,
        }),
      });

      const data = await response.json();

      if (data.status === 'success' && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setGenerationStatus('success');
        setIsGenerating(false);
      } else {
        throw new Error(data.error || '生成失败');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '生成失败，请重试');
      setGenerationStatus('failed');
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    // 模拟下载过程
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `ai-generated-${Date.now()}.jpg`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* 页面标题 */}
      <section className="pt-24 pb-8 bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800">AI生成壁纸</h1>
          <p className="text-gray-600 mt-2">输入提示词，让AI为你生成独特的壁纸</p>
        </div>
      </section>

      {/* 生成表单 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* 提示词输入 */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">提示词</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                rows={4}
                placeholder="请输入描述你想要的壁纸的提示词，例如：美丽的山水风景，有山有湖"
              />
              
              {/* 常用提示词模板 */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">常用提示词：</p>
                <div className="flex flex-wrap gap-2">
                  {promptTemplates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(template)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 风格选择 */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">风格模板</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {styleTemplates.map((template) => (
                  <button
                    key={template.value}
                    onClick={() => {
                      setStyle(template.value);
                      setPrompt(template.prompt);
                    }}
                    className={`py-3 rounded-lg border transition-colors ${style === template.value ? 'border-pink-500 bg-pink-50 text-pink-500' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    {template.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 画面比例、清晰度和模型选择 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">画面比例</label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  {aspectRatioOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">清晰度</label>
                <select
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  {resolutionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">模型选择</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  {modelOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 生成按钮 */}
            <button
              onClick={handleGenerate}
              className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isGenerating}
            >
              {isGenerating ? '生成中...' : '生成壁纸'}
            </button>
          </div>

          {/* 生成结果 */}
          {generationStatus === 'generating' && (
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">生成中</h2>
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500 mb-4"></div>
                <p className="text-gray-600">正在生成壁纸，请稍候...</p>
              </div>
            </div>
          )}

          {generationStatus === 'failed' && (
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">生成失败</h2>
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-red-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-.633-1.964-.633-2.732 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-red-600 mb-4">{errorMessage || '生成失败，请重试'}</p>
                <button
                  onClick={handleGenerate}
                  className="bg-pink-500 text-white py-2 px-6 rounded-lg hover:bg-pink-600 transition-colors font-medium"
                >
                  重新生成
                </button>
              </div>
            </div>
          )}

          {generationStatus === 'success' && generatedImage && (
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">生成结果</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <img
                    src={generatedImage}
                    alt="Generated wallpaper"
                    className="w-full h-auto rounded-lg object-contain"
                  />
                </div>
                <div className="md:w-1/2 flex flex-col justify-center">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">提示词</h3>
                  <p className="text-gray-600 mb-6">{prompt}</p>
                  <button
                    onClick={handleDownload}
                    className="bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors font-medium"
                  >
                    下载壁纸
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
