/**
 * 测试 replace-static-assets.js 脚本功能
 * 只测试预览模式，不实际修改文件
 */

const fs = require('fs');
const path = require('path');
const {
  CONFIG,
  convertToIgemFormat,
  replaceFileContent,
  previewMode,
} = require('./replace-static-assets.js');

// 创建临时测试目录和文件
const testDir = path.join(__dirname, 'test-temp');
const testFiles = {
  'test.jsx': `
import React from 'react';
import './styles.css';

const Component = () => {
  return (
    <div>
      <img src="/assets/images/hero_image.webp" alt="Hero" />
      <img src="/assets/images/logo.svg" alt="Logo" />
      <link rel="stylesheet" href="/assets/css/main.css" />
      <link rel="preload" href="/assets/fonts/Montserrat_Bold.ttf" as="font" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <script src="/data/config.json"></script>
    </div>
  );
};

export default Component;
`,
  'test.css': `
@import url('/assets/css/reset.css');
@font-face {
  font-family: 'Montserrat';
  src: url('/assets/fonts/Montserrat_Regular.ttf');
}
body {
  background-image: url('/assets/images/background.webp');
}
`,
  'test.json': `
{
  "images": {
    "logo": "/assets/images/company_logo.webp",
    "icon": "/assets/images/favicon.svg"
  },
  "fonts": {
    "primary": "/assets/fonts/Roboto_Medium.ttf"
  },
  "data": {
    "config": "/data/settings.json"
  }
}
`,
};

/**
 * 设置测试环境
 */
function setupTestEnvironment() {
  // 创建测试目录
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }

  // 创建测试文件
  for (const [filename, content] of Object.entries(testFiles)) {
    const filePath = path.join(testDir, filename);
    fs.writeFileSync(filePath, content, 'utf8');
  }

  console.log('✅ 测试环境设置完成');
}

/**
 * 清理测试环境
 */
function cleanupTestEnvironment() {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
    console.log('🧹 测试环境清理完成');
  }
}

/**
 * 测试文件名转换功能
 */
function testConvertToIgemFormat() {
  console.log('\n🧪 测试文件名转换功能:');

  const testCases = [
    { input: 'Montserrat_Bold.ttf', expected: 'montserrat-bold.ttf' },
    { input: 'Roboto_Medium.ttf', expected: 'roboto-medium.ttf' },
    { input: 'hero_image.webp', expected: 'hero-image.webp' },
    { input: 'company_logo.webp', expected: 'company-logo.webp' },
    { input: 'already-lowercase.ttf', expected: 'already-lowercase.ttf' },
    { input: 'UPPERCASE_FILE.TTF', expected: 'uppercase-file.ttf' },
  ];

  testCases.forEach(({ input, expected }) => {
    const result = convertToIgemFormat(input);
    const status = result === expected ? '✅' : '❌';
    console.log(`   ${status} "${input}" -> "${result}" (期望: "${expected}")`);
  });
}

/**
 * 测试替换规则
 */
function testReplacementRules() {
  console.log('\n🧪 测试替换规则:');

  // 临时修改 CONFIG 的 srcDir 为测试目录
  const originalSrcDir = CONFIG.srcDir;
  CONFIG.srcDir = testDir;

  try {
    const files = fs.readdirSync(testDir);
    console.log(`   找到测试文件: ${files.join(', ')}`);

    for (const file of files) {
      const filePath = path.join(testDir, file);
      const content = fs.readFileSync(filePath, 'utf8');

      console.log(`\n   📄 测试文件: ${file}`);

      // 测试每个替换规则
      CONFIG.replacements.forEach((rule, index) => {
        const matches = content.match(rule.pattern);
        if (matches) {
          console.log(
            `     规则 ${index + 1} (${rule.description}): 找到 ${matches.length} 个匹配`
          );
          matches.slice(0, 2).forEach((match) => {
            console.log(`       - "${match}"`);
          });
        }
      });
    }
  } finally {
    // 恢复原始配置
    CONFIG.srcDir = originalSrcDir;
  }
}

/**
 * 测试预览模式
 */
function testPreviewMode() {
  console.log('\n🧪 测试预览模式:');

  // 临时修改 CONFIG 的 srcDir 为测试目录
  const originalSrcDir = CONFIG.srcDir;
  CONFIG.srcDir = testDir;

  try {
    console.log('   运行预览模式...');
    const previewResults = previewMode();

    console.log(`\n   预览结果: 找到 ${previewResults.length} 个需要修改的文件`);

    previewResults.forEach((result) => {
      const relativePath = path.relative(testDir, result.file);
      console.log(`   📝 ${relativePath}:`);
      result.changes.forEach((change) => {
        console.log(`      - ${change.rule}: ${change.matches} 处替换`);
        if (change.examples && change.examples.length > 0) {
          console.log(`        示例: ${change.examples.slice(0, 2).join(', ')}`);
        }
      });
    });
  } finally {
    // 恢复原始配置
    CONFIG.srcDir = originalSrcDir;
  }
}

/**
 * 测试特定替换场景
 */
function testSpecificScenarios() {
  console.log('\n🧪 测试特定替换场景:');

  const testScenarios = [
    {
      name: 'WebP 图片替换',
      content: 'src="/assets/images/test.webp"',
      shouldMatch: true,
    },
    {
      name: 'SVG 图片不替换',
      content: 'src="/assets/images/test.svg"',
      shouldMatch: false,
    },
    {
      name: '已替换的路径不重复替换',
      content: 'src="https://static.igem.wiki/teams/5924/assets/images/test.webp"',
      shouldMatch: false,
    },
    {
      name: 'Google Fonts 替换',
      content: 'href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap"',
      shouldMatch: true,
    },
    {
      name: 'FontAwesome CDN 替换',
      content:
        'href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"',
      shouldMatch: true,
    },
  ];

  testScenarios.forEach((scenario) => {
    const webpRule = CONFIG.replacements[0]; // WebP 图片规则
    const googleFontsRule = CONFIG.replacements[4]; // Google Fonts 规则
    const fontAwesomeRule = CONFIG.replacements[8]; // FontAwesome 规则

    let matched = false;
    let ruleName = '';

    if (scenario.content.includes('.webp')) {
      matched = webpRule.pattern.test(scenario.content);
      ruleName = webpRule.description;
    } else if (scenario.content.includes('fonts.googleapis.com')) {
      matched = googleFontsRule.pattern.test(scenario.content);
      ruleName = googleFontsRule.description;
    } else if (scenario.content.includes('font-awesome')) {
      matched = fontAwesomeRule.pattern.test(scenario.content);
      ruleName = fontAwesomeRule.description;
    }

    const status = matched === scenario.shouldMatch ? '✅' : '❌';
    console.log(
      `   ${status} ${scenario.name}: "${scenario.content}" (匹配: ${matched}, 期望: ${scenario.shouldMatch})`
    );
  });
}

/**
 * 主测试函数
 */
function runTests() {
  console.log('🚀 开始测试 replace-static-assets.js 脚本功能\n');

  try {
    // 设置测试环境
    setupTestEnvironment();

    // 运行各项测试
    testConvertToIgemFormat();
    testReplacementRules();
    testSpecificScenarios();
    testPreviewMode();

    console.log('\n🎉 所有测试完成!');
  } catch (error) {
    console.error('\n❌ 测试过程中出现错误:', error.message);
    console.error(error.stack);
  } finally {
    // 清理测试环境
    cleanupTestEnvironment();
  }
}

// 如果直接运行此测试文件
if (require.main === module) {
  runTests();
}

module.exports = {
  runTests,
  testConvertToIgemFormat,
  testReplacementRules,
  testSpecificScenarios,
  testPreviewMode,
  setupTestEnvironment,
  cleanupTestEnvironment,
};
