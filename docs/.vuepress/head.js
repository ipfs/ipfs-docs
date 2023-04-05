module.exports = [
  [
    'meta',
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
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
  ['meta', { name: 'theme-color', content: '#5bbad5' }],
  ['script', {
    defer: true,
    'data-domain': "docs.ipfs.tech", 
    src: "https://plausible.io/js/plausible.js"
  }, ``],
  ['script', {}, `
    (function(w,d,t,u,n,s,e){w['SwiftypeObject']=n;w[n]=w[n]||function(){
      (w[n].q=w[n].q||[]).push(arguments);};s=d.createElement(t);
      e=d.getElementsByTagName(t)[0];s.async=1;s.src=u;e.parentNode.insertBefore(s,e);
    })(window,document,'script','//s.swiftypecdn.com/install/v2/st.js','_st');
    _st('install','tNsS55iGE5jS9fhXZ2wn','2.0.0');
  `]
]
