# 全局页面加载器使用指南

## 概述

本项目已经集成了一个全局页面加载器，基于现有的Lottie动画组件。当用户在不同页面间导航时，加载器会自动显示，直到页面内容完全加载完成。

## 功能特性

- ✅ **自动触发**: 路由变化时自动显示加载器
- ✅ **智能检测**: 检测页面内容、图片和异步元素是否加载完成
- ✅ **流畅动画**: Intro → Loop → Outro 的完整动画序列
- ✅ **主题支持**: 支持明暗主题切换
- ✅ **性能优化**: 最小加载时间防止闪烁
- ✅ **全局管理**: 通过Context统一管理加载状态

## 组件结构

```
src/
├── context/
│   └── LoadingContext.jsx          # 加载状态管理Context
├── components/animations/Loader/
│   ├── GlobalLoader.jsx            # 全局加载器组件
│   ├── LoaderAnimation.jsx          # 原始加载器组件
│   └── LoaderAnimation.module.scss  # 样式文件
├── hooks/
│   └── usePageLoadDetection.js      # 页面加载检测Hook
└── pages/
    └── _app.jsx                     # 应用入口，集成全局加载器
```

## 使用方法

### 1. 自动使用（推荐）

加载器已经集成到 `_app.jsx` 中，无需额外配置。当用户导航到任何页面时，加载器会自动显示。

### 2. 手动控制

如果需要手动控制加载状态，可以在组件中使用 `useLoading` Hook：

```jsx
import { useLoading } from '../context/LoadingContext';

function MyComponent() {
  const { startLoading, finishLoading, isLoading } = useLoading();

  const handleAsyncOperation = async () => {
    startLoading();
    try {
      await someAsyncOperation();
    } finally {
      finishLoading();
    }
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <button onClick={handleAsyncOperation}>Start Operation</button>
    </div>
  );
}
```

### 3. 页面加载检测

`usePageLoadDetection` Hook 会自动检测以下内容是否加载完成：

- ✅ 主要页面内容 (`main` 元素)
- ✅ 所有图片 (`img` 元素)
- ✅ 异步加载的元素 (`[data-async]` 属性)

## 动画流程

1. **Intro阶段**: 显示进入动画
2. **Loop阶段**: 循环播放等待动画
3. **Outro阶段**: 播放退出动画
4. **隐藏**: 完全隐藏加载器

## 自定义配置

### 修改最小加载时间

在 `LoadingContext.jsx` 中修改：

```jsx
// 设置最小加载时间，避免加载器闪烁
loadingTimeoutRef.current = setTimeout(() => {
  setIsPageReady(true);
}, 300); // 修改这个时间（毫秒）
```

### 自定义加载检测

在 `usePageLoadDetection.js` 中添加自定义检测逻辑：

```jsx
const checkPageLoad = () => {
  // 添加你的自定义检测逻辑
  const customElement = document.querySelector('.my-custom-element');
  const isCustomReady = customElement && customElement.dataset.ready === 'true';

  if (hasContent && allImagesLoaded && asyncElementsReady && isCustomReady) {
    finishLoading();
  }
};
```

### 修改样式

在 `LoaderAnimation.module.scss` 中自定义样式：

```scss
.loaderOverlay {
  background-color: rgba(255, 255, 255, 0.95); // 背景色
  backdrop-filter: blur(4px); // 模糊效果
}

.loadingText {
  font-size: 16px; // 文字大小
  color: #333; // 文字颜色
}
```

## 调试

### 启用调试日志

加载器会在控制台输出详细的调试信息：

```
🚀 开始页面加载
📍 路由开始变化: /new-page
🎬 Intro 动画结束，切换到 Loop
📄 页面内容检测完成
✅ 页面加载完成
🔄 Loop 完成，页面已准备就绪，切换到 Outro
🎭 Outro 动画结束，隐藏加载器
```

### 常见问题

1. **加载器不显示**: 检查 `LoadingProvider` 是否正确包装在 `_app.jsx` 中
2. **加载器不消失**: 检查页面是否有未加载完成的图片或异步内容
3. **动画不流畅**: 检查Lottie动画文件是否正确加载

## 性能优化

- 使用 `dynamic import` 延迟加载非关键样式
- 设置最小加载时间防止闪烁
- 使用 `MutationObserver` 高效检测DOM变化
- 图片加载事件监听优化

## 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 更新日志

- **v1.0.0**: 初始版本，支持基本的页面加载检测
- **v1.1.0**: 添加主题支持和性能优化
- **v1.2.0**: 改进加载检测算法，支持异步内容
