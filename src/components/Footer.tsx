import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div>
            <h3 className="text-xl font-bold text-pink-500 mb-4">雪梨壁纸</h3>
            <p className="text-gray-600 text-sm">
              提供高质量的手机壁纸，让你的手机屏幕更加美丽
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-600 hover:text-pink-500 transition-colors">首页</Link></li>
              <li><Link href="/categories" className="text-gray-600 hover:text-pink-500 transition-colors">分类</Link></li>
              <li><Link href="/gallery" className="text-gray-600 hover:text-pink-500 transition-colors">图片广场</Link></li>
              <li><Link href="/ai-generate" className="text-gray-600 hover:text-pink-500 transition-colors">AI生成</Link></li>
              <li><Link href="/upload" className="text-gray-600 hover:text-pink-500 transition-colors">上传壁纸</Link></li>
            </ul>
          </div>

          {/* 会员服务 */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-4">会员服务</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/membership" className="text-gray-600 hover:text-pink-500 transition-colors">会员中心</Link></li>
              <li><Link href="/membership" className="text-gray-600 hover:text-pink-500 transition-colors">会员套餐</Link></li>
              <li><Link href="/membership" className="text-gray-600 hover:text-pink-500 transition-colors">充值记录</Link></li>
              <li><Link href="/membership" className="text-gray-600 hover:text-pink-500 transition-colors">下载记录</Link></li>
            </ul>
          </div>

          {/* 法律信息 */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-4">法律信息</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-600 hover:text-pink-500 transition-colors">关于我们</Link></li>
              <li><Link href="/privacy" className="text-gray-600 hover:text-pink-500 transition-colors">隐私政策</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-pink-500 transition-colors">用户协议</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-pink-500 transition-colors">联系方式</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-600 text-sm">
          <p>© 2026 雪梨壁纸. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
}
