# 雪梨壁纸 - 手机壁纸网站

一个基于 Next.js 14 + TypeScript + Tailwind CSS 构建的手机壁纸网站，支持壁纸浏览、下载、AI 生成、灵感广场、用户上传和会员付费功能。

## 项目结构

```
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/             # API 路由
│   │   │   ├── auth/        # 认证相关 API
│   │   │   └── wallpapers/  # 壁纸相关 API
│   │   ├── admin/           # 后台管理
│   │   ├── ai-generate/     # AI 生成页面
│   │   ├── auth/            # 登录/注册页面
│   │   ├── categories/      # 分类页面
│   │   ├── gallery/         # 图片广场
│   │   ├── membership/      # 会员中心
│   │   ├── upload/          # 上传壁纸页面
│   │   ├── wallpaper/       # 壁纸详情页
│   │   └── page.tsx         # 首页
│   ├── components/          # 组件
│   │   ├── Navbar.tsx       # 导航栏
│   │   └── Footer.tsx       # 页脚
│   ├── lib/                 # 工具库
│   │   ├── auth.ts          # 认证相关
│   │   └── prisma.ts        # Prisma 客户端
│   └── utils/               # 工具函数
├── prisma/                  # Prisma 配置
│   └── schema.prisma        # 数据库模型
├── public/                  # 静态资源
├── .env.local               # 环境变量
├── package.json             # 项目配置
└── README.md                # 项目说明
```

## 技术栈

- **前端**：Next.js 14 + TypeScript + Tailwind CSS
- **后端**：Next.js API Routes
- **数据库**：MySQL
- **ORM**：Prisma
- **认证**：JWT + HttpOnly Cookie
- **存储**：阿里云 OSS
- **部署**：阿里云 Linux 服务器 + 宝塔面板 + PM2/Nginx

## 功能特性

### 前台用户端
- **首页**：Banner、推荐分类、热门壁纸、最新上传、AI 生成推荐
- **分类页**：丰富的分类列表，支持筛选和排序
- **壁纸详情页**：大图预览、下载、收藏、相似推荐
- **图片广场**：瀑布流展示社区精选图片，支持按风格筛选
- **AI 生成页**：输入提示词，选择风格模板，生成壁纸
- **上传页**：用户登录后可上传壁纸
- **会员中心**：显示用户权益、剩余次数、充值套餐
- **登录/注册**：邮箱注册登录

### 后台管理系统
- **仪表盘**：用户总数、今日新增用户、壁纸总数、下载次数等统计
- **壁纸管理**：新增/编辑/删除壁纸，分类管理，标签管理
- **图片广场管理**：精选作品管理，参考提示词管理
- **用户管理**：用户列表，会员状态，下载记录
- **订单管理**：套餐列表，订单记录，支付状态
- **系统设置**：网站名称，Logo，首页 Banner，套餐配置

### AI 能力
- **AI 文生图**：接入智谱图像生成 API
- **图片修复工具**：支持去小瑕疵、去轻微遮挡、老图增强、清晰度修复

### 免费次数与权限系统
- **游客**：每天免费下载 3 张壁纸，免费 AI 生成 2 张图片，免费图片修复 2 次
- **普通注册用户**：在游客权益基础上，再额外获得每天 2 张壁纸下载、1 张 AI 生成、1 次图片修复
- **会员用户**：根据套餐获得更多权益

## 会员套餐

- **月体验包**：¥9.9（原价 ¥19.9），适合初次体验
- **季度包**：¥39（原价 ¥59），性价比最高，适合长期使用
- **半年包**：¥99（原价 ¥159），适合重度用户
- **年度包**：¥199（原价 ¥299），最划算，适合长期创作者

## 环境变量

创建 `.env.local` 文件，配置以下环境变量：

```env
# Database
DATABASE_URL="mysql://root:password@localhost:3306/xuelibizhi"

# JWT
JWT_SECRET="your-secret-key-here"
JWT_EXPIRES_IN="7d"

# Aliyun OSS
OSS_ACCESS_KEY_ID="your-oss-access-key"
OSS_ACCESS_KEY_SECRET="your-oss-secret"
OSS_BUCKET_NAME="your-bucket-name"
OSS_REGION="oss-cn-hangzhou"

# ZhiPu AI
ZHIPU_API_KEY="your-zhipu-api-key"

# App
NEXT_PUBLIC_APP_NAME="雪梨壁纸"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 生成 Prisma 客户端

```bash
npx prisma generate
```

### 运行开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 部署

### 阿里云服务器 + 宝塔面板

1. **购买服务器**：阿里云 ECS 实例，选择 Linux 系统
2. **安装宝塔面板**：按照宝塔官网教程安装
3. **创建网站**：在宝塔面板中创建网站，设置域名和根目录
4. **上传代码**：将构建后的代码上传到网站根目录
5. **配置 Nginx**：设置反向代理，将请求转发到 PM2 运行的 Next.js 应用
6. **配置 PM2**：使用 PM2 管理 Next.js 应用的运行
7. **配置环境变量**：在服务器上创建 `.env.local` 文件，配置环境变量
8. **启动应用**：使用 PM2 启动 Next.js 应用

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /www/wwwroot/your-domain.com;
    index index.html index.htm;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### PM2 启动命令

```bash
pm install -g pm2
pm run build
pm start
pm stop
pm restart
```

## 后台登录

- **默认管理员账号**：admin@xuelibizhi.com
- **默认管理员密码**：admin123

## 注意事项

1. **数据库**：需要先创建 MySQL 数据库，然后运行 Prisma 迁移
2. **API Key**：需要替换为真实的阿里云 OSS 和智谱 AI API Key
3. **支付功能**：MVP 版本使用模拟支付，后续需要接入支付宝/微信支付
4. **图片存储**：需要配置阿里云 OSS 存储
5. **安全性**：生产环境需要配置 HTTPS，加强密码加密和 API 安全

## 后续优化

1. **数据库**：使用 Prisma 迁移创建数据库表
2. **图片处理**：添加图片压缩和裁剪功能
3. **搜索功能**：添加壁纸搜索功能
4. **评论系统**：添加壁纸评论功能
5. **社交分享**：添加社交分享功能
6. **多语言**：支持多语言切换
7. **响应式优化**：进一步优化移动端体验
8. **性能优化**：添加缓存，优化图片加载速度
9. **SEO 优化**：进一步优化 SEO 配置
10. **监控系统**：添加网站监控和日志系统
