import FEATURE_TOGGLE from './featureToggle';

const ROUTES = {
  home: '/',
  productCore: '/core/',
  productAdvanced: '/x/',
  productTemplates: '/templates/',
  productDesignKits: '/design-kits/',
  careers: '/careers/',
  pricing: '/pricing/',
  about: '/about/',
  handbook: 'https://mui-org.notion.site/Handbook-f086d47e10794d5e839aef9dc67f324b',
  materialIcons: '/components/material-icons/',
  freeTemplates: '/getting-started/templates/',
  components: '/getting-started/supported-components/',
  customization: '/customization/how-to-customize/',
  theming: '/customization/theming/',
  documentation: '/getting-started/usage/',
  communityHelp: '/getting-started/support/#community-help-free',
  blog: FEATURE_TOGGLE.enable_blog_index ? '/blog/' : 'https://medium.com/material-ui',
  showcase: '/discover-more/showcase',
  roadmap: 'https://github.com/mui-org/material-ui-x/projects/1',
  languages: '/discover-more/languages',
  vision: '/discover-more/vision/',
  support: '/getting-started/support/#professional-support-premium',
  goldSponsor: '/discover-more/backers/#gold/',
  store: 'https://mui.com/store/',
  dataGridDocs: '/components/data-grid/getting-started/',
  dataGridFeatures: '/components/data-grid/#features',
  dataGridFeaturesComparison: '/components/data-grid/getting-started/#feature-comparison',
  storePopular: 'https://mui.com/store/#populars',
  storeDesign: 'https://mui.com/store/#design',
  storeFigma: 'https://mui.com/store/items/figma-react/',
  storeSketch: 'https://mui.com/store/items/sketch-react/',
  storeXD: 'https://mui.com/store/items/adobe-xd-react/',
  storeTemplateMaterialApp: 'https://mui.com/store/items/material-app/',
  storeTemplateBarza: 'https://mui.com/store/items/bazar-pro-react-ecommerce-template/',
  storeTemplateMinimalFree: 'https://mui.com/store/items/minimal-dashboard-free/',
  storeTemplateMinimalDashboard: 'https://mui.com/store/items/minimal-dashboard/',
  storeTemplateBerry: 'https://mui.com/store/items/berry-react-material-admin/',
  storeTemplateWebbee: 'https://mui.com/store/items/webbee-landing-page/',
  storeTheFront: 'https://mui.com/store/items/the-front-landing-page/',
  storeFlexy: 'https://mui.com/store/items/flexy-react-admin-dashboard/',
};

export default ROUTES;
