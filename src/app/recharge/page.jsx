'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { POINT_CONFIG } from '../lib/points/config.js';
import { handleRecharge, calculateAvailableCount } from '../lib/points/points.js';

// 模拟用户登录状态
const isLoggedIn = true; // 实际项目中应该从状态管理或localStorage获取
const isFirstRecharge = true; // 实际项目中应该从后端获取

const RechargePage = () => {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loginRedirect, setLoginRedirect] = useState(false);

  // 处理返回按钮点击
  const handleBackClick = () => {
    router.back();
  };

  // 处理充值档位点击
  const handleTierClick = (amount) => {
    if (!isLoggedIn) {
      setLoginRedirect(true);
      // 实际项目中应该跳转到登录页
      setTimeout(() => setLoginRedirect(false), 2000);
      return;
    }
    
    setSelectedAmount(amount);
    setShowPaymentModal(true);
  };

  // 处理支付确认
  const handlePaymentConfirm = () => {
    // 实际项目中应该调用支付API
    console.log('支付确认:', selectedAmount);
    setShowPaymentModal(false);
    // 支付成功后应该更新用户积分
  };

  // 计算充值后可生成的壁纸数量
  const calculateWallpaperCount = (points) => {
    return {
      flash: calculateAvailableCount(points, 'gemini-2.5-flash-image'),
      pro: calculateAvailableCount(points, 'gemini-3-pro-image-preview')
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button 
            className="mr-4 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={handleBackClick}
          >
            ← 返回
          </button>
          <h1 className="text-xl font-semibold text-gray-800">充值中心 - 雪梨壁纸</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* 积分规则模块 */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">积分规则</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-3">1:1000</div>
                <div className="text-lg font-medium text-gray-700 mb-2">积分兑换比例</div>
                <div className="text-sm text-gray-500">1元 = 1000积分</div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
              <div className="text-center">
                <div className="text-lg font-medium text-gray-700 mb-2">flash模型</div>
                <div className="text-3xl font-bold text-green-500 mb-3">10积分/张</div>
                <div className="text-sm text-gray-500">经济实惠，快速生成</div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
              <div className="text-center">
                <div className="text-lg font-medium text-gray-700 mb-2">pro模型</div>
                <div className="text-3xl font-bold text-purple-500 mb-3">400积分/张</div>
                <div className="text-sm text-gray-500">高清品质，细节丰富</div>
              </div>
            </div>
          </div>
        </section>

        {/* 首充福利模块 */}
        {isFirstRecharge && (
          <section className="mb-12">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-400 p-6 rounded-r-lg shadow-sm">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <div className="text-orange-500 font-bold text-lg mr-3">🎉 首充福利</div>
                </div>
                <div className="text-gray-700 pl-10">
                  • 10元首充额外赠送<span className="text-orange-500 font-bold">50%积分</span>！
                </div>
                <div className="text-gray-700 pl-10">
                  • 其他金额首充额外赠送<span className="text-orange-500 font-bold">10%积分</span>！
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 充值档位模块 */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">选择充值金额</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.keys(POINT_CONFIG.RECHARGE_TIERS).map((amount) => {
              const points = handleRecharge(parseInt(amount), isFirstRecharge);
              const counts = calculateWallpaperCount(points);
              return (
                <div
                  key={amount}
                  className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-100 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => handleTierClick(parseInt(amount))}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800 mb-2">¥{amount}</div>
                    <div className="text-sm text-gray-600 mb-4">
                      {isFirstRecharge ? (
                        <span className="text-green-500 font-medium">{points}积分</span>
                      ) : (
                        <span>{points}积分</span>
                      )}
                    </div>
                    {isFirstRecharge && (
                      <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-4">
                        首充赠{amount === 10 ? '50%' : '10%'}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      可生成 flash:{counts.flash}张 / pro:{counts.pro}张
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 底部说明 */}
        <section className="text-center mt-16">
          <p className="text-xs text-gray-500">
            如有疑问，请联系客服
          </p>
        </section>
      </main>

      {/* 登录提示弹窗 */}
      {loginRedirect && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-2">请先登录</h3>
            <p className="text-gray-600 mb-4">登录后才能进行充值操作</p>
            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => setLoginRedirect(false)}
            >
              我知道了
            </button>
          </div>
        </div>
      )}

      {/* 支付弹窗 */}
      {showPaymentModal && selectedAmount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">确认充值</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">充值金额</span>
                <span className="font-medium">¥{selectedAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">到账积分</span>
                <span className="font-medium">
                  {handleRecharge(selectedAmount, isFirstRecharge)}积分
                  {isFirstRecharge && <span className="text-xs text-green-500 ml-1">(含赠礼)</span>}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">可生成壁纸</span>
                <span className="font-medium">
                  flash:{calculateWallpaperCount(handleRecharge(selectedAmount, isFirstRecharge)).flash}张
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                onClick={() => setShowPaymentModal(false)}
              >
                取消
              </button>
              <button
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                onClick={handlePaymentConfirm}
              >
                确认支付
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RechargePage;
