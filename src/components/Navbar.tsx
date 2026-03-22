'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-pink-500">
          雪梨壁纸
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-pink-500 transition-colors">首页</Link>
          <Link href="/categories" className="text-gray-700 hover:text-pink-500 transition-colors">分类</Link>
          <Link href="/gallery" className="text-gray-700 hover:text-pink-500 transition-colors">图片广场</Link>
          <Link href="/ai-generate" className="text-gray-700 hover:text-pink-500 transition-colors">AI生成</Link>
          <Link href="/upload" className="text-gray-700 hover:text-pink-500 transition-colors">上传壁纸</Link>
          <Link href="/recharge" className="text-gray-700 hover:text-pink-500 transition-colors">充值中心</Link>
          <Link href="/auth" className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors">
            登录/注册
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/" className="text-gray-700 hover:text-pink-500 transition-colors py-2">首页</Link>
            <Link href="/categories" className="text-gray-700 hover:text-pink-500 transition-colors py-2">分类</Link>
            <Link href="/gallery" className="text-gray-700 hover:text-pink-500 transition-colors py-2">图片广场</Link>
            <Link href="/ai-generate" className="text-gray-700 hover:text-pink-500 transition-colors py-2">AI生成</Link>
            <Link href="/upload" className="text-gray-700 hover:text-pink-500 transition-colors py-2">上传壁纸</Link>
            <Link href="/recharge" className="text-gray-700 hover:text-pink-500 transition-colors py-2">充值中心</Link>
            <Link href="/auth" className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors text-center">
              登录/注册
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
