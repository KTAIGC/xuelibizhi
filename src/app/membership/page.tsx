import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function MembershipPage() {
  // 假数据 - 用户信息
  const user = {
    name: '用户',
    isMember: false,
    dailyDownloads: 3,
    dailyGenerations: 2,
  };

  // 会员套餐
  const plans = [
    {
      id: 1,
      name: '7天体验包',
      price: 9.9,
      originalPrice: 19.9,
      duration: 7,
      dailyDownloads: 10,
      dailyGenerations: 5,
      isFeatured: false,
      isPopular: false,
      description: '适合初次体验会员服务的用户',
    },
    {
      id: 2,
      name: '季度包',
      price: 39,
      originalPrice: 59,
      duration: 90,
      dailyDownloads: 20,
      dailyGenerations: 10,
      isFeatured: true,
      isPopular: true,
      description: '性价比最高，适合长期使用',
    },
    {
      id: 3,
      name: '半年包',
      price: 99,
      originalPrice: 159,
      duration: 180,
      dailyDownloads: 30,
      dailyGenerations: 15,
      isFeatured: false,
      isPopular: false,
      description: '适合重度用户',
    },
    {
      id: 4,
      name: '年度包',
      price: 199,
      originalPrice: 299,
      duration: 365,
      dailyDownloads: 50,
      dailyGenerations: 20,
      isFeatured: false,
      isPopular: false,
      description: '最划算，适合长期创作者',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* 页面标题 */}
      <section className="pt-24 pb-8 bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800">会员中心</h1>
          <p className="text-gray-600 mt-2">解锁更多权益，享受优质壁纸服务</p>
        </div>
      </section>

      {/* 用户信息和权益 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧用户信息 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-pink-500 text-2xl font-bold">{user.name.charAt(0)}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                  <p className={`mt-2 ${user.isMember ? 'text-green-500' : 'text-gray-600'}`}>
                    {user.isMember ? '会员用户' : '普通用户'}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">今日剩余下载次数</span>
                    <span className="font-medium">{user.dailyDownloads}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">今日剩余生成次数</span>
                    <span className="font-medium">{user.dailyGenerations}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Link href="#" className="block py-2 text-gray-700 hover:text-pink-500 transition-colors">
                    充值记录
                  </Link>
                  <Link href="#" className="block py-2 text-gray-700 hover:text-pink-500 transition-colors">
                    下载记录
                  </Link>
                  <Link href="#" className="block py-2 text-gray-700 hover:text-pink-500 transition-colors">
                    生成记录
                  </Link>
                </div>
              </div>
            </div>

            {/* 右侧套餐 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">会员套餐</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {plans.map((plan) => (
                    <div 
                      key={plan.id} 
                      className={`border rounded-lg p-6 text-center relative ${plan.isFeatured ? 'border-pink-500 bg-pink-50' : 'border-gray-200'}`}
                    >
                      {plan.isPopular && (
                        <div className="absolute top-0 right-0 bg-pink-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                          推荐
                        </div>
                      )}
                      <h3 className="font-semibold text-gray-800 mb-2">{plan.name}</h3>
                      <p className="text-pink-500 font-bold text-xl mb-1">¥{plan.price}</p>
                      <p className="text-gray-500 text-sm mb-4">原价 ¥{plan.originalPrice}</p>
                      <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                      <div className="space-y-2 text-left mb-6">
                  <p className="text-sm text-gray-600">每日下载次数：{plan.dailyDownloads}</p>
                  <p className="text-sm text-gray-600">每日生成次数：{plan.dailyGenerations}</p>
                  <p className="text-sm text-gray-600">有效期：{plan.duration}天</p>
                </div>
                      <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium">
                        立即购买
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 会员权益说明 */}
              <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">会员权益说明</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-800">更多下载次数</h3>
                      <p className="text-gray-600 text-sm">会员用户每天可获得更多的壁纸下载次数</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-800">更多AI生成次数</h3>
                      <p className="text-gray-600 text-sm">会员用户每天可获得更多的AI壁纸生成次数</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-800">专属高清资源</h3>
                      <p className="text-gray-600 text-sm">会员用户可访问专属的高清壁纸资源</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-800">免审核上传优先</h3>
                      <p className="text-gray-600 text-sm">会员用户上传的壁纸将优先审核并展示</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
