// need to use commonjs export so that docs/packages/markdown can use
module.exports = {
  nav_products: true,
  enable_website_banner: false,
  enable_blog_index: process.env.NODE_ENV !== 'production' || process.env.PULL_REQUEST,
  // TODO: cleanup once migration is done
  enable_product_scope: false, // related to new structure change
  enable_redirects: false, // related to new structure change
  enable_mui_base_scope: false, // will be enabled after the migration
  enable_system_scope: false, // will be enabled after the migration
};
