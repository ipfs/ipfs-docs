// .vuepress/config.js

const DEPLOY_DOMAIN = 'https://docs.ipfs.tech'
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
        nav: [
          { text: 'Get Started', link: '/install/' },
          { text: 'Concepts', link: '/concepts/' },
          { text: 'Guides', link: '/how-to/' },
          { text: 'Reference', link: '/reference/' },   
          { text: 'Project', link: '/project/' },
          { text: 'Case Studies', 
            items: [
              {text: 'Arbol', link : '/case-studies/arbol/'},
              {text: 'Audius', link : '/case-studies/audius'},
              {text: 'Fleek', link : '/case-studies/fleek'},
              {text: 'LikeCoin', link : '/case-studies/likecoin'},
              {text: 'Morpheus.Network', link : '/case-studies/morpheus'},
              {text: 'Snapshot',link : '/case-studies/snapshot'},              
            ]
          }                  
        ],

        sidebar: {
          '/install/':  [
            ['/concepts/what-is-ipfs','Basic Concepts'],
            {
              title: 'Install',
              sidebarDepth: 1,
              collapsable: false,
              children: [
                ['/install/command-line','IPFS Kubo for Go'],
                ['/install/run-ipfs-inside-docker', 'IPFS Kubo in Docker'],
                ['/install/js-ipfs','IPFS for JavaScript'],
                ['https://iroh.computer/docs/install/', "IPFS Iroh for Rust"],
                ['/install/ipfs-desktop', 'IPFS Desktop App'],
                ['/install/ipfs-companion', 'IPFS Companion Browser Extension'],
                ['/install/server-infrastructure', 'IPFS Cluster']
              ]
            },
          ],
          '/concepts/': [
            {
              title: 'Basic Concepts',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                  '/concepts/what-is-ipfs',
                  '/concepts/how-ipfs-works',
                  '/concepts/content-addressing',
                  '/concepts/hashing',
                  '/concepts/immutability',
                  '/concepts/persistence', 
                  '/concepts/privacy-and-encryption',
                  '/concepts/nodes'
              ]
            },
            {
              title: 'Subsystems and Components',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/concepts/bitswap',
                '/concepts/dht',
                '/concepts/dnslink',
                '/concepts/file-systems',
                '/concepts/ipfs-gateway',
                ['https://ipld.io/docs/intro/primer/', 'IPLD (InterPlanetaryLinkedData)' ],
                '/concepts/ipns',
                '/concepts/libp2p',
                '/concepts/merkle-dag'
              ]
            },
            '/concepts/ipfs-implementations', 
            '/concepts/comparisons',
            '/concepts/usage-ideas-examples',
            '/concepts/faq',
            '/concepts/glossary',
            '/concepts/further-reading/academic-papers'
          ],
          '/how-to/': [
            '/how-to/desktop-app',
            {
              title: 'IPFS Kubo Tutorials',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/how-to/command-line-quick-start',
                '/how-to/configure-node',
                '/how-to/modify-bootstrap-list',
                '/how-to/nat-configuration',
                '/how-to/default-profile',
                ['/how-to/ipfs-updater', 'Update Kubo using ipfs-update'],
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
              collapsable: true,
              children: [
                '/how-to/work-with-blocks',
                '/how-to/pin-files',
                '/how-to/work-with-pinning-services',
                '/how-to/take-snapshot',
                '/how-to/store-play-videos',
                '/how-to/host-git-repo',
                '/how-to/move-ipfs-installation/move-ipfs-installation'
              ]
            },
            {
              title: 'Work with peers',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/how-to/observe-peers',
                '/how-to/exchange-files-between-nodes',
                '/how-to/peering-with-content-providers'
              ]
            },
            {
              title: 'Websites on IPFS',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/how-to/websites-on-ipfs/single-page-website',
                '/how-to/websites-on-ipfs/multipage-website',
                '/how-to/websites-on-ipfs/link-a-domain',
                '/how-to/websites-on-ipfs/introducing-fleek',
                '/how-to/websites-on-ipfs/static-site-generators',
                '/how-to/websites-on-ipfs/redirects-and-custom-404s'
              ]
            },
            {
              title: 'IPFS in the browser',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/how-to/address-ipfs-on-web',
                '/how-to/create-simple-chat-app',
                '/how-to/browser-tools-frameworks'
              ]
            },
            {
              title: 'IPNS',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/how-to/publish-ipns'
              ]
            },
            {
              title: 'IPFS Companion',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/how-to/companion-node-types',
                '/how-to/dnslink-companion',
                '/how-to/companion-window-ipfs',
                '/how-to/companion-x-ipfs-path-header'
              ]
            },
            {
              title: 'IPFS & Blockchain Networks',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/how-to/mint-nfts-with-ipfs',
                '/how-to/best-practices-for-nft-data'
              ]
            }
          ],
          '/reference/': [
            '/reference/http/gateway',
            '/reference/js/api',
            '/reference/go/api',
            {
              title: 'Kubo CLI',
              sidebarDepth: 1,
              collapsable: true,
              path: '/reference/kubo/cli'
            },
            {
              title: 'Kubo RPC API',
              sidebarDepth: 1,
              collapsable: true,
              path: '/reference/kubo/rpc'
            },

          ],
          '/community/': [
            {
              title: 'Join the community',
              sidebarDepth: 0,
              collapsable: true,
              children: 'auto',
            },
            '/community/contribute/ways-to-contribute',
            '/project/history',
            '/project/repository-guide',
            '/project/related-projects',
            '/project/implementation-status',
            ['https://github.com/ipfs/roadmap', 'Roadmap'],
            ['https://github.com/ipfs/specs', 'Specifications'],
            ['https://github.com/ipfs/research', 'Research'],
            ['https://github.com/ipfs/team-mgmt', 'Team org planning'],
            [
              'https://github.com/ipfs/community/blob/master/code-of-conduct.md',
              'Code of conduct'
            ],
          ],
          '/project/' : [
                ['/community/',  'Join the community'],
                '/community/contribute/ways-to-contribute',
                '/project/history',
                '/project/repository-guide',
                '/project/related-projects',
                '/project/implementation-status',
                ['https://github.com/ipfs/roadmap', 'Roadmap'],
                ['https://github.com/ipfs/specs', 'Specifications'],
                ['https://github.com/ipfs/research', 'Research'],
                ['https://github.com/ipfs/team-mgmt', 'Team org planning'],
                [
                  'https://github.com/ipfs/community/blob/master/code-of-conduct.md',
                  'Code of conduct'
                ]
          ],
          '/case-studies/' : [
            {
              title: 'Case Studies',
              collapsable: false,
              children: [
                ['/case-studies/arbol', 'Arbol'],
                ['/case-studies/audius', 'Audius'],
                ['/case-studies/fleek', 'Fleek'],
                ['/case-studies/likecoin', 'LikeCoin'],
                ['/case-studies/morpheus', 'Morpheus.Network'],
                ['/case-studies/snapshot', 'Snapshot']
              ]
            }
          ],
          '/': [
            '/install/',
            '/concepts/',
            '/how-to/',
            '/reference/',
            '/project/',
            {
              title: 'Case Studies',
              collapsable: true,
              children: [
                ['/case-studies/arbol', 'Arbol'],
                ['/case-studies/audius', 'Audius'],
                ['/case-studies/fleek', 'Fleek'],
                ['/case-studies/likecoin', 'LikeCoin'],
                ['/case-studies/morpheus', 'Morpheus.Network'],
                ['/case-studies/snapshot', 'Snapshot']
              ]
            },
          ]
        }
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
    'vuepress-plugin-ipfs',
    'vuepress-plugin-mermaidjs',
    'tabs'
  ],
  extraWatchFiles: ['.vuepress/nav/en.js']
}
