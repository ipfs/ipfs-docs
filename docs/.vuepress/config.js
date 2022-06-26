// .vuepress/config.js

const DEPLOY_DOMAIN = 'https://docs.ipfs.io'
const SPEEDCURVE_ID = process.env.SPEEDCURVE_ID || ''
const pageSuffix = '/'

module.exports = {
  base: '/',
  head: require('./head'),
  locales: {
    '/': {
      lang: 'en-US',
      title: 'IPFS Docs',
      description: 'IPFS Documentation'
    }
  },
  markdown: {
    pageSuffix,
    extendMarkdown: md => {
      md.set({
        breaks: true
      })
      md.use(require('markdown-it-video'))
      md.use(require('markdown-it-footnote'))
      md.use(require('markdown-it-task-lists'))
      md.use(require('markdown-it-deflist')),
        md.use(require('markdown-it-imsize')),
        md.use(require('markdown-it-image-lazy-loading'))
    }
  },
  themeConfig: {
    algolia: {
      apiKey: 'e56fc7c611806522df45191e22ed15ac',
      indexName: 'ipfs-docs'
    },
    defaultImage: '/images/social-card.png',
    author: {
      name: 'IPFS Team',
      twitter: '@ipfsbot'
    },
    keywords:
      'IPFS, dweb, protocol, libp2p, ipld, multiformats, bitswap, decentralized web, InterPlanetary File System, dapp, documentation, docs, Protocol Labs',
    // edit links
    domain: DEPLOY_DOMAIN,
    docsRepo: 'ipfs/ipfs-docs',
    docsDir: 'docs',
    docsBranch: 'main',
    feedbackWidget: {
      docsRepoIssue: 'ipfs/ipfs-docs'
    },
    editLinks: false,
    // page nav
    nextLinks: false,
    prevLinks: false,
    // ui/ux
    logo: '/images/ipfs-logo.svg',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page',
        lastUpdated: 'Last Updated',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        },
        nav: require('./nav/en'),
        sidebar: [
          {
            title: 'Install',
            path: '/install/',
            children: [
              'install/ipfs-desktop',
              'install/ipfs-companion',
              'install/command-line',
              ['install/ipfs-updater', 'Updater'],
              'install/server-infrastructure',
              'install/recent-releases'
            ]
          },
          {
            title: 'Basics',
            path: '/basics/',
            children: [
                'basics/desktop-app',
                'basics/command-line'
            ]
          },
          {
            title: 'Concepts',
            path: '/concepts/',
            children: [
              {
                title: 'IPFS 101',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                    '/concepts/what-is-ipfs',
                    '/concepts/how-ipfs-works',
                    '/concepts/privacy-and-encryption',
                    '/concepts/nodes',
                    '/concepts/glossary',
                    '/concepts/usage-ideas-examples',
                    '/concepts/faq'
                ]
              },
              {
                title: 'Content-addressed data',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/concepts/content-addressing',
                  '/concepts/hashing',
                  '/concepts/immutability',
                  '/concepts/persistence'
                ]
              },
              {
                title: 'Peer-to-peer sharing',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/concepts/dht',
                  '/concepts/merkle-dag',
                  '/concepts/bitswap',
                  ['https://ipld.io/docs/intro/primer/', 'IPLD' ],
                  '/concepts/ipns',
                  '/concepts/libp2p',
                  '/concepts/file-systems',
                ]
              },
              {
                title: 'Integrating with the Web',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                    '/concepts/ipfs-gateway', 
                    '/concepts/dnslink'
                ]
              },
              {
                title: 'Case studies',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  ['/concepts/case-study-arbol', 'Arbol'],
                  ['/concepts/case-study-audius', 'Audius'],
                  ['/concepts/case-study-fleek', 'Fleek'],
                  ['/concepts/case-study-likecoin', 'LikeCoin'],
                  ['/concepts/case-study-morpheus', 'Morpheus.Network'],
                  ['/concepts/case-study-openbazaar', 'OpenBazaar']
                ]
              },
              {
                title: 'Further reading',
                sidebarDepth: 1,
                collapsable: false,
                children: ['/concepts/further-reading/academic-papers']
              }
            ]
          },
          {
            title: 'How-tos',
            path: '/how-to/',
            children: [
              {
                title: 'Quick start',
                sidebarDepth: 1,
                collapsable: false,
                children: ['/how-to/command-line-quick-start']
              },
              {
                title: 'Customize your install',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/how-to/configure-node',
                  '/how-to/modify-bootstrap-list',
                  '/how-to/nat-configuration',
                  '/how-to/default-profile',
                  '/how-to/run-ipfs-inside-docker',
                  [
                    'https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples/custom-ipfs-repo',
                    'Customize an IPFS repo'
                  ],
                  '/how-to/best-practices-for-ipfs-builders',
                  '/how-to/troubleshooting'
                ]
              },
              {
                title: 'Manage files',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/how-to/work-with-blocks',
                  '/how-to/pin-files',
                  '/how-to/work-with-pinning-services',
                  '/how-to/take-snapshot',
                  '/how-to/store-play-videos',
                  '/how-to/host-git-style-repo',
                  '/how-to/move-ipfs-installation/move-ipfs-installation'
                ]
              },
              {
                title: 'Work with peers',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/how-to/observe-peers',
                  '/how-to/exchange-files-between-nodes',
                  '/how-to/peering-with-content-providers'
                ]
              },
              {
                title: 'Websites on IPFS',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/how-to/websites-on-ipfs/single-page-website',
                  '/how-to/websites-on-ipfs/multipage-website',
                  '/how-to/websites-on-ipfs/link-a-domain',
                  '/how-to/websites-on-ipfs/introducing-fleek',
                  '/how-to/websites-on-ipfs/static-site-generators'
                ]
              },
              {
                title: 'IPFS in the browser',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  'how-to/address-ipfs-on-web',
                  'how-to/create-simple-chat-app',
                  '/how-to/browser-tools-frameworks'
                ]
              },
              {
                title: 'IPFS Companion',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  'how-to/companion-node-types',
                  'how-to/dnslink-companion',
                  'how-to/companion-window-ipfs',
                  '/how-to/companion-x-ipfs-path-header'
                ]
              },
              {
                title: 'IPFS & Blockchain Networks',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  'how-to/mint-nfts-with-ipfs',
                  'how-to/best-practices-for-nft-data'
                ]
              }
            ]
          },
          {
            title: 'API & CLI',
            path: '/reference/',
            children: [
              '/reference/http/gateway',
              '/reference/js/api',
              '/reference/go/api',
              '/reference/kubo/cli',
              '/reference/kubo/rpc'
            ]
          },
          {
            title: 'Community',
            path: '/community/',

            children: [
              {
                title: 'Join the community',
                sidebarDepth: 2,
                collapsable: false,
                children: [
                  [
                    'https://ipfs.us4.list-manage.com/subscribe?u=25473244c7d18b897f5a1ff6b&id=cad54b2230',
                    'IPFS newsletter'
                  ],
                  '/community/contribute/ways-to-contribute',
                  ['https://discuss.ipfs.io/', 'IPFS forums'],
                  '/community/chat',
                  ['https://proto.school/events', 'ProtoSchool workshops'],
                  ['https://www.meetup.com/members/249142444/', 'Meetups'],
                  '/community/social-media',
                  ['https://awesome.ipfs.io', 'Awesome IPFS'],
                  [
                    'https://www.youtube.com/channel/UCdjsUXJ3QawK4O5L1kqqsew',
                    'YouTube'
                  ]
                ]
              },
              {
                title: 'Write the docs',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/community/contribute/grammar-formatting-and-style',
                  '/community/contribute/writing-guide',
                  '/community/contribute/code-persona',
                  '/community/contribute/contribution-tutorial'
                ]
              }
            ]
          },
          {
            title: 'Project',
            path: '/project/',
            children: [
              'project/history',
              'project/repository-guide',
              ['https://github.com/ipfs/roadmap', 'Roadmap'],
              'project/implementation-status',
              ['https://github.com/ipfs/specs', 'Specifications'],
              ['https://github.com/ipfs/research', 'Research'],
              ['https://github.com/ipfs/team-mgmt', 'Team org planning'],
              '/project/related-projects',
              '/project/contribute',
              [
                'https://github.com/ipfs/community/blob/master/code-of-conduct.md',
                'Code of conduct'
              ]
            ]
          }
        ]
      }
    }
  },
  plugins: [
    [require('./plugins/vuepress-plugin-speedcurve'), { id: SPEEDCURVE_ID }],
    '@vuepress/plugin-back-to-top',
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-96910779-15'
      }
    ],
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: pageSuffix,
        indexSuffix: pageSuffix,
        notFoundPath: '/ipfs-404.html'
      }
    ],
    [
      'vuepress-plugin-seo',
      {
        siteTitle: ($page, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.description,
        author: ($page, $site) =>
          $page.frontmatter.author || $site.themeConfig.author,
        tags: $page => $page.frontmatter.tags,
        twitterCard: _ => 'summary_large_image',
        type: $page =>
          ['articles', 'posts', 'blog'].some(folder =>
            $page.regularPath.startsWith('/' + folder)
          )
            ? 'article'
            : 'website',
        url: ($page, $site, path) => ($site.themeConfig.domain || '') + path,
        image: ($page, $site) =>
          $page.frontmatter.image
            ? ($site.themeConfig.domain || '') + $page.frontmatter.image
            : ($site.themeConfig.domain || '') + $site.themeConfig.defaultImage,
        publishedAt: $page =>
          $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
        customMeta: (add, context) => {
          const { $site, image } = context
          add(
            'twitter:site',
            ($site.themeConfig.author && $site.themeConfig.author.twitter) || ''
          )
          add('image', image)
          add('keywords', $site.themeConfig.keywords)
        }
      }
    ],
    [
      'vuepress-plugin-canonical',
      {
        // add <link rel="canonical" header (https://tools.ietf.org/html/rfc6596)
        // to deduplicate SEO across all copies loaded from various public gateways
        baseURL: DEPLOY_DOMAIN
      }
    ],
    [
      'vuepress-plugin-sitemap',
      {
        hostname: DEPLOY_DOMAIN,
        exclude: ['/ipfs-404.html']
      }
    ],
    [
      'vuepress-plugin-robots',
      {
        host: DEPLOY_DOMAIN
      }
    ],
    [
      '@vuepress/html-redirect',
      {
        duration: 0
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'callout',
        defaultTitle: ''
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'right',
        defaultTitle: ''
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'left',
        defaultTitle: ''
      }
    ],
    'vuepress-plugin-chunkload-redirect',
    'vuepress-plugin-ipfs'
  ],
  extraWatchFiles: ['.vuepress/nav/en.js']
}
