/**
 * 批量替换静态资源路径脚本
 * 将项目所有文件中的本地静态资源路径替换为 iGEM 服务器路径
 *
 * 替换规则：
 * 1. /assets/images/*.webp -> https://static.igem.wiki/teams/5924/assets/images/*.webp
 * 2. /assets/fonts/* -> https://static.igem.wiki/teams/5924/assets/fonts/*
 * 3. /assets/css/* -> https://static.igem.wiki/teams/5924/assets/css/*
 * 4. /data/* -> https://static.igem.wiki/teams/5924/data/*
 * 5. Google Fonts -> iGEM 字体资源
 * 6. Google Fonts preconnect -> iGEM 服务器
 *
 * 文件名转换规则：
 * - 所有字母转换为小写
 * - 下划线(_)替换为连字符(-)
 * - 例如：Montserrat_ExtraBold.ttf -> montserrat-extrabold.ttf
 *
 * 注意：只替换 webp 图片，不替换 svg 图片
 *
 * 使用方法：
 * node scripts/replace-static-assets.js
 *
 * 或者添加执行权限后直接运行：
 * chmod +x scripts/replace-static-assets.js
 * ./scripts/replace-static-assets.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 配置
const CONFIG = {
  // 源目录
  srcDir: path.join(__dirname, '..', 'src'),

  // iGEM 服务器基础 URL
  baseUrl: 'https://static.igem.wiki/teams/5924',

  // 替换规则
  replacements: [
    {
      // WebP 图片 (只替换 webp，不替换 svg，且不替换已经包含 https:// 的路径)
      pattern: /(?<!https:\/\/static\.igem\.wiki\/teams\/5924)\/assets\/images\/([^"]+\.webp)/g,
      replacement: '/assets/images/$1',
      description: 'WebP 图片路径',
    },
    {
      // 字体文件 (不替换已经包含 https:// 的路径)
      pattern: /(?<!https:\/\/static\.igem\.wiki\/teams\/5924)\/assets\/fonts\/([^"]+)/g,
      replacement: '/assets/fonts/$1',
      description: '字体文件路径',
    },
    {
      // CSS 文件 (不替换已经包含 https:// 的路径)
      pattern: /(?<!https:\/\/static\.igem\.wiki\/teams\/5924)\/assets\/css\/([^"]+)/g,
      replacement: '/assets/css/$1',
      description: 'CSS 文件路径',
    },
    {
      // 数据文件 (不替换已经包含 https:// 的路径)
      pattern: /(?<!https:\/\/static\.igem\.wiki\/teams\/5924)\/data\/([^"]+)/g,
      replacement: '/data/$1',
      description: '数据文件路径',
    },
    {
      // Google Fonts 替换为 iGEM 字体 (替换所有 Google Fonts 引用)
      pattern: /https:\/\/fonts\.googleapis\.com\/css2\?family=([^&]+)/g,
      replacement: '/assets/fonts/montserrat-thin.ttf',
      description: 'Google Fonts 替换为 iGEM 字体',
    },
    {
      // Google Fonts preload 替换
      pattern: /https:\/\/fonts\.googleapis\.com\/css2\?family=([^&]+)&display=swap/g,
      replacement: '/assets/fonts/montserrat-thin.ttf',
      description: 'Google Fonts preload 替换',
    },
    {
      // Google Fonts preconnect 替换
      pattern: /https:\/\/fonts\.googleapis\.com/g,
      replacement: 'https://static.igem.wiki',
      description: 'Google Fonts preconnect 替换',
      skipBaseUrl: true, // 标记这个规则不需要添加 baseUrl 前缀
    },
    {
      // Google Fonts gstatic preconnect 替换
      pattern: /https:\/\/fonts\.gstatic\.com/g,
      replacement: 'https://static.igem.wiki',
      description: 'Google Fonts gstatic preconnect 替换',
      skipBaseUrl: true, // 标记这个规则不需要添加 baseUrl 前缀
    },
    {
      // FontAwesome CDN 替换为 iGEM 服务器
      pattern:
        /https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/[^"]+\/css\/font-awesome\.min\.css/g,
      replacement: '/assets/css/font-awesome.min.css',
      description: 'FontAwesome CDN 替换为 iGEM 服务器',
    },
    {
      // 替换旧的 iGEM 服务器前缀为新的前缀
      pattern: /https:\/\/tools\.igem\.org\/uploads\/teams\/3892/g,
      replacement: 'https://static.igem.wiki/teams/5924',
      description: '更新 iGEM 服务器前缀',
      skipBaseUrl: true, // 标记这个规则不需要添加 baseUrl 前缀
    },
  ],

  // 文件扩展名过滤
  fileExtensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css', '.json'],

  // 排除的目录
  excludeDirs: ['node_modules', '.git', '.next', 'dist', 'build'],
};

/**
 * 检查文件是否应该被处理
 */
function shouldProcessFile(filePath) {
  const ext = path.extname(filePath);
  if (!CONFIG.fileExtensions.includes(ext)) {
    return false;
  }

  // 检查是否在排除目录中
  for (const excludeDir of CONFIG.excludeDirs) {
    if (filePath.includes(excludeDir)) {
      return false;
    }
  }

  return true;
}

/**
 * 转换文件名为 iGEM 服务器格式
 * 规则：所有字母转小写，下划线替换为连字符
 */
function convertToIgemFormat(filename) {
  if (typeof filename !== 'string') {
    return filename;
  }
  return filename.toLowerCase().replace(/_/g, '-');
}

/**
 * 替换文件内容
 */
function replaceFileContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;
    let hasChanges = false;
    const changes = [];

    // 应用所有替换规则
    for (const rule of CONFIG.replacements) {
      const matches = newContent.match(rule.pattern);
      if (matches) {
        const originalContent = newContent;

        // 使用自定义替换函数来处理文件名转换
        newContent = newContent.replace(rule.pattern, (match, ...groups) => {
          // 如果有捕获组，转换文件名格式
          if (groups.length > 0 && groups[0]) {
            const convertedFilename = convertToIgemFormat(groups[0]);
            const finalReplacement = rule.replacement.replace('$1', convertedFilename);
            // 检查是否需要跳过 baseUrl 前缀
            return rule.skipBaseUrl ? finalReplacement : `${CONFIG.baseUrl}${finalReplacement}`;
          }
          // 检查是否需要跳过 baseUrl 前缀
          return rule.skipBaseUrl ? rule.replacement : `${CONFIG.baseUrl}${rule.replacement}`;
        });

        if (originalContent !== newContent) {
          hasChanges = true;
          changes.push({
            rule: rule.description,
            matches: matches.length,
            examples: matches.slice(0, 3), // 只显示前3个例子
          });
        }
      }
    }

    // 如果有变化，写回文件
    if (hasChanges) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      return {
        file: filePath,
        changed: true,
        changes: changes,
      };
    }

    return {
      file: filePath,
      changed: false,
    };
  } catch (error) {
    console.error(`处理文件 ${filePath} 时出错:`, error.message);
    return {
      file: filePath,
      changed: false,
      error: error.message,
    };
  }
}

/**
 * 获取所有需要处理的文件
 */
function getAllFiles() {
  const files = [];

  // 使用 glob 递归查找所有文件
  const pattern = path.join(CONFIG.srcDir, '**', '*');
  const allFiles = glob.sync(pattern, { nodir: true });

  for (const file of allFiles) {
    if (shouldProcessFile(file)) {
      files.push(file);
    }
  }

  return files;
}

/**
 * 预览模式 - 只显示将要进行的替换，不实际修改文件
 */
function previewMode() {
  console.log('🔍 预览模式 - 显示将要进行的替换 (不会修改文件)\n');

  const files = getAllFiles();
  console.log(`📁 找到 ${files.length} 个文件需要检查\n`);

  const previewResults = [];
  let totalChanges = 0;
  let changedFiles = 0;

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      let hasChanges = false;
      const changes = [];

      // 检查所有替换规则
      for (const rule of CONFIG.replacements) {
        const matches = content.match(rule.pattern);
        if (matches) {
          hasChanges = true;
          // 显示转换后的文件名示例
          const convertedExamples = matches.slice(0, 3).map((match) => {
            // 重置正则表达式的 lastIndex
            rule.pattern.lastIndex = 0;
            const matchResult = rule.pattern.exec(match);
            if (matchResult && matchResult[1]) {
              const convertedFilename = convertToIgemFormat(matchResult[1]);
              const finalReplacement = rule.replacement.replace('$1', convertedFilename);
              const finalUrl = rule.skipBaseUrl
                ? finalReplacement
                : `${CONFIG.baseUrl}${finalReplacement}`;
              return `${match} → ${finalUrl}`;
            }
            const finalUrl = rule.skipBaseUrl
              ? rule.replacement
              : `${CONFIG.baseUrl}${rule.replacement}`;
            return `${match} → ${finalUrl}`;
          });

          changes.push({
            rule: rule.description,
            matches: matches.length,
            examples: convertedExamples,
          });
        }
      }

      if (hasChanges) {
        changedFiles++;
        totalChanges += changes.reduce((sum, change) => sum + change.matches, 0);

        console.log(`📝 ${path.relative(CONFIG.srcDir, file)}`);
        changes.forEach((change) => {
          console.log(`   - ${change.rule}: ${change.matches} 处替换`);
          if (change.examples.length > 0) {
            console.log(`     示例: ${change.examples.join(', ')}`);
          }
        });
        console.log('');

        previewResults.push({ file, changes });
      }
    } catch (error) {
      console.error(`❌ 读取文件 ${file} 时出错:`, error.message);
    }
  }

  console.log('📊 预览统计:');
  console.log(`   - 检查文件数: ${files.length}`);
  console.log(`   - 需要修改文件数: ${changedFiles}`);
  console.log(`   - 总替换次数: ${totalChanges}`);
  console.log(`   - 基础 URL: ${CONFIG.baseUrl}`);

  return previewResults;
}

/**
 * 主函数
 */
function main() {
  const args = process.argv.slice(2);
  const isPreview = args.includes('--preview') || args.includes('-p');

  if (isPreview) {
    const previewResults = previewMode();

    if (previewResults.length > 0) {
      console.log('\n💡 提示: 使用以下命令执行实际替换:');
      console.log('   node scripts/replace-static-assets.js --execute');
    } else {
      console.log('\n✨ 没有找到需要替换的内容!');
    }
    return;
  }

  const isExecute = args.includes('--execute') || args.includes('-e');

  if (!isExecute) {
    console.log('🚀 批量替换静态资源路径工具\n');
    console.log('使用方法:');
    console.log('  --preview, -p    预览模式 (只显示将要进行的替换)');
    console.log('  --execute, -e     执行模式 (实际修改文件)');
    console.log('');
    console.log('示例:');
    console.log('  node scripts/replace-static-assets.js --preview');
    console.log('  node scripts/replace-static-assets.js --execute');
    return;
  }

  console.log('🚀 开始批量替换静态资源路径...\n');

  // 获取所有需要处理的文件
  const files = getAllFiles();
  console.log(`📁 找到 ${files.length} 个文件需要处理\n`);

  // 处理文件
  const results = [];
  let totalChanges = 0;
  let changedFiles = 0;

  for (const file of files) {
    const result = replaceFileContent(file);
    results.push(result);

    if (result.changed) {
      changedFiles++;
      totalChanges += result.changes.reduce((sum, change) => sum + change.matches, 0);

      console.log(`✅ ${path.relative(CONFIG.srcDir, result.file)}`);
      result.changes.forEach((change) => {
        console.log(`   - ${change.rule}: ${change.matches} 处替换`);
        if (change.examples.length > 0) {
          console.log(`     示例: ${change.examples.join(', ')}`);
        }
      });
      console.log('');
    }
  }

  // 输出统计信息
  console.log('📊 替换完成统计:');
  console.log(`   - 处理文件数: ${files.length}`);
  console.log(`   - 修改文件数: ${changedFiles}`);
  console.log(`   - 总替换次数: ${totalChanges}`);
  console.log(`   - 基础 URL: ${CONFIG.baseUrl}`);

  // 显示错误信息
  const errors = results.filter((r) => r.error);
  if (errors.length > 0) {
    console.log('\n❌ 处理错误的文件:');
    errors.forEach((error) => {
      console.log(`   - ${error.file}: ${error.error}`);
    });
  }

  console.log('\n🎉 批量替换完成!');
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = {
  CONFIG,
  convertToIgemFormat,
  replaceFileContent,
  getAllFiles,
  previewMode,
  main,
};
