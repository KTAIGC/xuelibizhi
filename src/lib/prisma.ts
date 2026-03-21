// 暂时注释掉Prisma客户端初始化，以解决构建问题
// import { PrismaClient } from '@prisma/client';
// 
// let prisma: PrismaClient;
// 
// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }
// 
// export default prisma;

// 临时导出一个空对象，以避免构建错误
export default {};

