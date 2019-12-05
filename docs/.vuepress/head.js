module.exports = [
  [
    'meta',
    {
      robots: 'noindex' // deny search indexing for now
    }
  ],
  [
    'meta',
    {
      property: 'og:type',
      content: 'website'
    }
  ],
  [
    'meta',
    {
      name: 'subject',
      content: 'IPFS (InterPlanetary File System) documentation'
    }
  ],
  [
    'meta',
    {
      name: 'keywords',
      content:
        'IPFS, InterPlanetary File System, dweb, dapp, documentation, docs, Protocol Labs'
    }
  ],
  [
    'meta',
    {
      property: 'og:site_name',
      content: 'IPFS Documentation'
    }
  ],
  [
    'meta',
    {
      name: 'twitter:site',
      content: '@IPFSbot'
    }
  ],
  [
    'meta',
    {
      property: 'og:image',
      content: 'https://docs-beta.ipfs.io/images/ipfs-logo.svg'
    }
  ],
  [
    'meta',
    {
      name: 'twitter:image',
      content: 'https://docs-beta.ipfs.io/images/ipfs-logo.svg'
    }
  ],
  [
    'meta',
    {
      itemprop: 'image',
      content: 'https://docs-beta.ipfs.io/images/ipfs-logo.svg'
    }
  ],
  [
    'meta',
    {
      property: 'og:image:alt',
      content: 'The IPFS Documentation website logo'
    }
  ],
  [
    'meta',
    {
      name: 'twitter:image:alt',
      content: 'The IPFS Documentation website logo'
    }
  ],
  [
    'meta',
    {
      property: 'og:image:height',
      content: '200'
    }
  ],
  [
    'meta',
    {
      property: 'og:image:width',
      content: '200'
    }
  ],
  [
    'link',
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png'
    }
  ],
  [
    'link',
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png'
    }
  ],
  [
    'link',
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png'
    }
  ],
  ['link', { rel: 'manifest', href: '/manifest.json' }],
  [
    'link',
    {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#3a0839'
    }
  ],
  ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
  ['meta', { name: 'msapplication-TileColor', content: '#3a0839' }],
  [
    'meta',
    {
      name: 'msapplication-config',
      content: '/browserconfig.xml'
    }
  ],
  ['meta', { name: 'theme-color', content: '#5bbad5' }]
]
