import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'DoroPet',
  description: 'DoroPet 桌面宠物 · 使用文档',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', content: '#7c6cf0' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'DoroPet 使用文档' }],
    ['meta', { property: 'og:description', content: 'DoroPet 桌面宠物的安装、配置与玩法说明' }]
  ],

  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/', activeMatch: '/guide/' },
      { text: '功能', link: '/features/', activeMatch: '/features/' },
      { text: '常见问题', link: '/faq', activeMatch: '/faq' },
      { text: '官网', link: 'https://www.doropet.com' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始使用',
          items: [
            { text: '文档简介', link: '/guide/' },
            { text: '安装 DoroPet', link: '/guide/install' },
            { text: '第一次启动', link: '/guide/quickstart' }
          ]
        }
      ],
      '/features/': [
        {
          text: '功能说明',
          items: [
            { text: '功能总览', link: '/features/' },
            { text: '桌面宠物', link: '/features/pet' },
            { text: 'AI 对话', link: '/features/chat' },
            { text: '音乐与歌词', link: '/features/music' }
          ]
        }
      ]
    },

    search: {
      provider: 'local',
      options: {
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 }
          }
        },
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新于' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    footer: {
      message: 'DoroPet 使用文档',
      copyright: 'Copyright © 2026 DoroPet'
    }
  }
})
