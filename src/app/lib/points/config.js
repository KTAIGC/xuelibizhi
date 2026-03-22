// config.js - 积分配置常量
export const POINT_CONFIG = {
  RATE: 1000, // 1元 = 1000积分
  MODEL_COST: {
    'gemini-2.5-flash-image': 10, // 10积分/张
    'gemini-3-pro-image-preview': 400 // 400积分/张
  },
  RECHARGE_TIERS: {
    10: 10000,
    20: 22000,
    50: 58000,
    100: 120000
  },
  FIRST_RECHARGE_BONUS: 0.5, // 首充额外50%
  COST_PRICE: {
    'gemini-2.5-flash-image': 0.00576, // 成本元/张
    'gemini-3-pro-image-preview': 0.288
  },
  TARGET_PROFIT: [0.2, 0.3] // 目标利润区间
};
