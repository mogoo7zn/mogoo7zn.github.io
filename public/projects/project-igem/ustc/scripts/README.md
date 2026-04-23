# 静态资源路径替换脚本

## 概述

`replace-static-assets.js` 是一个用于批量替换项目中静态资源路径的脚本，将本地路径替换为 iGEM 服务器路径。

## 功能特性

- 🔍 **预览模式**: 先查看将要进行的替换，不实际修改文件
- 🚀 **批量处理**: 一次性处理所有符合条件的文件
- 📊 **详细统计**: 显示处理结果和统计信息
- 🛡️ **安全机制**: 只替换指定类型的资源，避免误操作
- 📝 **详细日志**: 显示每个文件的修改详情

## 替换规则

脚本会将以下路径替换为 iGEM 服务器路径：

1. **WebP 图片**: `/assets/images/*.webp` → `https://tools.igem.org/uploads/teams/3892/assets/images/*.webp`
2. **字体文件**: `/assets/fonts/*` → `https://tools.igem.org/uploads/teams/3892/assets/fonts/*`
3. **CSS 文件**: `/assets/css/*` → `https://tools.igem.org/uploads/teams/3892/assets/css/*`
4. **数据文件**: `/data/*` → `https://tools.igem.org/uploads/teams/3892/data/*`
5. **Google Fonts**: `https://fonts.googleapis.com/css2?family=*` → `https://tools.igem.org/uploads/teams/3892/assets/fonts/montserrat-thin.ttf`
6. **Google Fonts preconnect**: `https://fonts.googleapis.com` → `https://tools.igem.org`

**注意**: 只替换 WebP 图片，不替换 SVG 图片。所有外部字体依赖都会被替换为 iGEM 服务器上的字体资源。

## 文件名转换规则

脚本会自动将文件名转换为 iGEM 服务器格式：

- **字母转换**: 所有字母转换为小写
- **符号转换**: 下划线(\_)替换为连字符(-)

**转换示例**:

- `Montserrat_ExtraBold.ttf` → `montserrat-extrabold.ttf`
- `Simple_Image.webp` → `simple-image.webp`
- `Human_Practices.json` → `human-practices.json`

## 使用方法

### 1. 预览模式 (推荐先使用)

```bash
node scripts/replace-static-assets.js --preview
# 或者
node scripts/replace-static-assets.js -p
```

预览模式会显示所有将要进行的替换，但不会实际修改文件。

### 2. 执行模式

```bash
node scripts/replace-static-assets.js --execute
# 或者
node scripts/replace-static-assets.js -e
```

执行模式会实际修改文件。

### 3. 查看帮助

```bash
node scripts/replace-static-assets.js
```

## 处理文件类型

脚本会处理以下类型的文件：

- `.js` - JavaScript 文件
- `.jsx` - React JSX 文件
- `.ts` - TypeScript 文件
- `.tsx` - React TypeScript 文件
- `.scss` - Sass 样式文件
- `.css` - CSS 样式文件
- `.json` - JSON 配置文件

## 排除目录

脚本会自动排除以下目录：

- `node_modules`
- `.git`
- `.next`
- `dist`
- `build`

## 示例输出

### 预览模式输出

```text
🔍 预览模式 - 显示将要进行的替换 (不会修改文件)

📁 找到 45 个文件需要检查

📝 components/home/Four/Four.jsx
   - WebP 图片路径: 3 处替换
     示例: /assets/images/simple.webp, /assets/images/precise.webp, /assets/images/yeasty.webp

📝 components/home/Three/Three.jsx
   - WebP 图片路径: 2 处替换
     示例: /assets/images/mouse.webp, /assets/images/syringe.webp

📊 预览统计:
   - 检查文件数: 45
   - 需要修改文件数: 2
   - 总替换次数: 5
   - 基础 URL: https://tools.igem.org/uploads/teams/3892

💡 提示: 使用以下命令执行实际替换:
   node scripts/replace-static-assets.js --execute
```

### 执行模式输出

```text
🚀 开始批量替换静态资源路径...

📁 找到 45 个文件需要处理

✅ components/home/Four/Four.jsx
   - WebP 图片路径: 3 处替换
     示例: /assets/images/simple.webp, /assets/images/precise.webp, /assets/images/yeasty.webp

✅ components/home/Three/Three.jsx
   - WebP 图片路径: 2 处替换
     示例: /assets/images/mouse.webp, /assets/images/syringe.webp

📊 替换完成统计:
   - 处理文件数: 45
   - 修改文件数: 2
   - 总替换次数: 5
   - 基础 URL: https://tools.igem.org/uploads/teams/3892

🎉 批量替换完成!
```

## 注意事项

1. **备份**: 建议在执行前备份重要文件
2. **预览**: 建议先使用预览模式查看将要进行的替换
3. **测试**: 替换后请测试应用程序确保功能正常
4. **版本控制**: 建议在版本控制系统中提交更改

## 故障排除

如果遇到问题，请检查：

1. Node.js 版本是否支持 (建议 14+)
2. 文件权限是否正确
3. 路径是否正确
4. 是否有足够的磁盘空间

## 自定义配置

如需修改配置，可以编辑脚本中的 `CONFIG` 对象：

- `baseUrl`: iGEM 服务器基础 URL
- `fileExtensions`: 处理的文件扩展名
- `excludeDirs`: 排除的目录
- `replacements`: 替换规则
