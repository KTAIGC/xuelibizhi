import OSS from 'ali-oss';

// 创建OSS客户端
const client = new OSS({
  region: process.env.OSS_REGION || 'oss-cn-hangzhou',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID || '',
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || '',
  bucket: process.env.OSS_BUCKET_NAME || '',
});

/**
 * 上传图片到OSS
 * @param buffer 图片缓冲区
 * @param filename 文件名
 * @returns 上传后的URL
 */
export async function uploadImageToOSS(buffer: Buffer, filename: string): Promise<string> {
  try {
    // 生成唯一的文件名
    const uniqueFilename = `${Date.now()}-${filename}`;
    const objectName = `ai-generated/${uniqueFilename}`;

    // 上传文件
    const result = await client.put(objectName, buffer);
    
    // 返回可访问的URL
    return result.url;
  } catch (error) {
    console.error('OSS上传失败:', error);
    throw new Error('OSS上传失败');
  }
}

/**
 * 从Base64字符串创建缓冲区
 * @param base64String Base64字符串
 * @returns Buffer对象
 */
export function base64ToBuffer(base64String: string): Buffer {
  // 移除data:image/xxx;base64,前缀
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
  return Buffer.from(base64Data, 'base64');
}
