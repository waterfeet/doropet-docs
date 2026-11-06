# DoroPet 使用文档站

基于 VitePress 1.6。纯静态，构建产物 1.3 MB。

## 本地开发

```bash
cd releasetogit/docs-site
npm install
node node_modules/vitepress/bin/vitepress.js dev docs
```

> 直接用 `npm run dev` 在本机沙箱里会报 `reading 'stdin'`，这是环境问题不是配置问题，用上面的 node 直调即可。

## 构建

```bash
node node_modules/vitepress/bin/vitepress.js build docs
```

产物在 `docs/.vitepress/dist`。

## 目录结构

```
docs-site/
├── vercel.json          构建命令与产物目录
└── docs/
    ├── .vitepress/
    │   └── config.mts   导航、侧边栏、搜索
    ├── index.md         首页
    ├── guide/           安装与上手
    ├── features/        功能说明
    └── faq.md           常见问题
```

新增页面时，记得在 `config.mts` 的 `sidebar` 里登记，否则只能靠搜索找到。

## 部署到 Vercel

仓库地址：https://github.com/waterfeet/doropet-docs

1. Vercel → Add New → Project，选 `doropet-docs` 仓库。
2. **Root Directory 保持默认**。仓库根就是站点根，不要再往下选一层。
3. Framework Preset 选 `VitePress`；列表里没有就选 `Other`。
4. 构建命令和产物目录已在 `vercel.json` 里声明，不要手填覆盖。
5. 部署完成后在 Settings → Domains 添加 `docs.doropet.com`，按提示加 CNAME。

## 关于 Gitee + Vercel（重要）

**Vercel 不支持直连 Gitee。** 官方 Git 集成只认 GitHub、GitLab、Bitbucket、Origin、Azure Pipelines。

要实现「push Gitee 自动部署」，只有两条路：

### 方案 A：Gitee 镜像到 GitHub（推荐）

Gitee 仓库 → 管理 → 仓库镜像 → 镜像到外部仓库，填 GitHub 地址和 PAT，勾选强制覆盖。
之后 Gitee 提交会同步到 GitHub，Vercel 连 GitHub 自动构建。

优点：不消耗 CI 额度，保留 Vercel 的预览部署、回滚、commit 溯源等完整能力。
代价：需要一个 GitHub 账号和一个 PAT。

### 方案 B：Gitee Go 流水线跑 Vercel CLI

在 Gitee Go 流水线里执行：

```bash
vercel pull --yes --environment=production
vercel build --prod
vercel deploy --prebuilt --prod
```

认证用环境变量 `VERCEL_TOKEN`（不要用 `--token` 参数，会暴露在进程列表里）。
Gitee Go 免费额度：单仓库 200 分钟（永久）+ 每月 1000 核分。

优点：不依赖 GitHub。
代价：每次部署跑一遍 CI，慢；需要把 token 存进 Gitee 环境变量。

## 一个必须澄清的认知

**代码放 Gitee 不会让国内访问变快。** Gitee 只是代码托管，用户最终访问的页面由 Vercel 的境外边缘节点分发。想提速只有两条路：备案走国内节点，或者换成香港服务器（不需要备案）。
