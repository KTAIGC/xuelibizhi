import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* 品牌信息 - 手机端单独显示 */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold text-pink-500 mb-2">雪梨壁纸</h3>
          <p className="text-gray-600 text-sm mb-6">
            提供高质量的手机壁纸，让你的手机屏幕更加美丽
          </p>
        </div>

        {/* 链接部分 - 手机端两列布局，桌面端四列 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* 快速链接 */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 text-sm md:text-base">快速链接</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-pink-500 transition-colors text-sm py-1 inline-block">首页</Link></li>
              <li><Link href="/categories" className="text-gray-600 hover:text-pink-500 transition-colors text-sm py-1 inline-block">分类</Link></li>
              <li><Link href="/gallery" className="text-gray-600 hover:text-pink-500 transition-colors text-sm py-1 inline-block">图片广场</Link></li>
              <li><Link href="/ai-generate" className="text-gray-600 hover:text-pink-500 transition-colors text-sm py-1 inline-block">AI生成</Link></li>
              <li><Link href="/upload" className="text-gray-600 hover:text-pink-500 transition-colors text-sm py-1 inline-block">上传壁纸</Link></li>
            </ul>
          </div>

          {/* 充值服务 */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 text-sm md:text-base">充值服务</h4>
            <ul className="space-y-2">
              <li><Link href="/recharge" className="text-gray-600 hover:text-pink-500 transition-colors text-sm py-1 inline-block">充值中心</Link></li>
              <li><Link href="/recharge" className="text-gray-600 hover:text-pink-500 transition-colors text-sm py-1 inline-block">充值档位</Link></li>
              <li><Link href="/recharge" className="text-gray-600 hover:text-pink-500 transition-colors text-sm py-1 inline-block">积分规则</Link></li>
              <li><Link href="/recharge" className="text-gray-600 hover:text-pink-500 transition-colors text-sm py-1 inline-block">首充福利</Link></li>
            </ul>
          </div>

          {/* 法律信息 */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold text-gray-700 mb-3 text-sm md:text-base">法律信息</h4>
            <ul className="space-y-2 grid grid-cols-2 gap-4">
              <li><Link href="/about" className="text-gray-600 hover:text-pink-500 transition-colors text-sm py-1 inline-block">关于我们</Link></li>
              <li><Link href="/privacy" className="text-gray-600 hover:text-pink-500 transition-colors text-sm py-1 inline-block">隐私政策</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-pink-500 transition-colors text-sm py-1 inline-block">用户协议</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-pink-500 transition-colors text-sm py-1 inline-block">联系方式</Link></li>
            </ul>
          </div>

          {/* 空列 - 仅在桌面端显示 */}
          <div className="hidden md:block"></div>
        </div>

        <div className="border-t border-gray-200 mt-8 md:mt-12 pt-4 md:pt-6 text-center text-gray-600 text-xs md:text-sm">
          <p>© 2026 雪梨壁纸. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
}
