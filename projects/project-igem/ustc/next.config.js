const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // 启用 React 严格模式
  poweredByHeader: false, // 移除 X-Powered-By 响应头（安全优化）
  compress: true,
  basePath: '/ustc',
  output: isProduction ? 'export' : undefined, // 静态导出模式（生成纯 HTML 文件）
  distDir: isProduction ? 'out' : '.next',
  assetPrefix: isProduction ? '/ustc' : '',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  transpilePackages: ['gsap'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  images: {
    domains: ['localhost'],
    unoptimized: isProduction, //XXX 静态导出时禁用图片优化
  },
  webpack: (config, { dev, isServer }) => {
    // 路径别名
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@static': path.resolve(__dirname, 'static'),
    };

    // md-loader
    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-react'], babelrc: false, configFile: false },
        },
        {
          loader: path.resolve(__dirname, 'src/loaders/md-loader/local-md-loader.js'),
          options: {
            cssPath: '../components/layout/ContentPageLayout/ContentPageLayout.module.scss',
          },
        },
      ],
    });
    config.resolve.extensions.push('.md');

    // if (!dev) {
    //   // 生产环境优化
    //   config.optimization.minimize = true;
    //   config.optimization.minimizer.push(
    //     new TerserPlugin({
    //       terserOptions: {
    //         compress: {
    //           // 移除console和debugger
    //           drop_console: true,
    //           drop_debugger: true,
    //           pure_funcs: ['console.info', 'console.debug', 'console.log'],
    //         },
    //         mangle: true, // 混淆变量名
    //         output: {
    //           comments: false, // 移除注释
    //         },
    //       },
    //       parallel: true, // 并行处理
    //       extractComments: false, // 不提取注释
    //     })
    //   );

    //   // 不在 Next.js 管道内手动复制/压缩静态资源，避免与内置逻辑冲突

    //   // 代码分割配置
    //   config.optimization.splitChunks = {
    //     chunks: 'all', // 对所有类型的chunk进行分割
    //     maxInitialRequests: Infinity,
    //     minSize: 20000, // 最小分割大小
    //     cacheGroups: {
    //       // 第三方库分割
    //       vendor: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name(module) {
    //           const match = module.context?.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
    //           const packageName = match ? match[1] : 'vendors';
    //           return `npm.${packageName.replace('@', '')}`;
    //         },
    //       },
    //       // 样式文件分割
    //       styles: {
    //         name: 'styles',
    //         test: /\.(css|scss)$/,
    //         chunks: 'all',
    //         enforce: true,
    //       },
    //     },
    //   };
    // }

    // 使用 Next 默认 publicPath

    return config;
  },

  experimental: {
    optimizeCss: false,
    scrollRestoration: true,
    nextScriptWorkers: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
