// points.js - 积分核心逻辑
import { POINT_CONFIG } from './config.js';

/**
 * 处理充值
 * @param {number} amount - 充值金额
 * @param {boolean} isFirstRecharge - 是否为首充
 * @returns {number} - 充值后到账总积分
 */
export function handleRecharge(amount, isFirstRecharge) {
  const basePoints = POINT_CONFIG.RECHARGE_TIERS[amount];
  if (!basePoints) throw new Error('无效充值档位');
  
  let totalPoints = basePoints;
  
  if (isFirstRecharge && amount === 10) {
    // 10元首充赠送50%
    totalPoints += Math.floor(basePoints * 0.5);
  } else if (isFirstRecharge && amount > 10) {
    // 其他金额首充赠送10%
    totalPoints += Math.floor(basePoints * 0.1);
  }
  
  return totalPoints;
}

/**
 * 扣减积分（生成壁纸时调用）
 * @param {string} model - 模型名称
 * @param {number} currentPoints - 当前积分
 * @returns {number} - 扣减后的剩余积分
 * @throws {Error} - 当积分不足时抛出错误
 */
export function deductPoints(model, currentPoints) {
  const cost = POINT_CONFIG.MODEL_COST[model];
  if (!cost) throw new Error('无效模型');
  if (currentPoints < cost) throw new Error('积分不足，请充值');
  return currentPoints - cost;
}

/**
 * 计算利润率（验证定价是否合理）
 * @param {string} model - 模型名称
 * @returns {string} - 利润率，保留四位小数
 */
export function calculateProfit(model) {
  const cost = POINT_CONFIG.COST_PRICE[model];
  if (!cost) throw new Error('无效模型');
  
  const price = POINT_CONFIG.MODEL_COST[model] / 1000; // 积分转元
  const profit = (price - cost) / price;
  return profit.toFixed(4); // 返回百分比，如0.28表示28%
}

/**
 * 计算可生成壁纸数量
 * @param {number} points - 积分数量
 * @param {string} model - 模型名称
 * @returns {number} - 可生成壁纸数量
 */
export function calculateAvailableCount(points, model) {
  const cost = POINT_CONFIG.MODEL_COST[model];
  if (!cost) throw new Error('无效模型');
  return Math.floor(points / cost);
}
