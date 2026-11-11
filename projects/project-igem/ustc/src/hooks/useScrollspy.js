import { useState, useEffect, useRef } from 'react';

export function useScrollspy(ids, options) {
  const [activeId, setActiveId] = useState('');
  const observer = useRef(null);

  // 第一个 useEffect：只负责创建和销毁 Observer 实例
  // 它只在 options 变化时运行
  useEffect(() => {
    // 关键修复：如果 options 不存在或无效，则不创建 Observer
    if (!options) {
      return;
    }

    // 在创建新的 Observer 前，先断开旧的
    if (observer.current) {
      observer.current.disconnect();
    }

    // 用有效的 options 创建新的 Observer 实例
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    // 当 options 变化导致此 effect 清理时，断开连接
    return () => observer.current?.disconnect();
  }, [options]); // 依赖项只有 options

  // 第二个 useEffect：只负责监视元素
  // 它在 ids 列表或 Observer 实例本身变化时运行
  useEffect(() => {
    // 如果还没有创建 Observer，或者没有要监视的 id，则不执行
    if (!observer.current || ids.length === 0) {
      return;
    }

    // 先断开所有旧的监视，再监视新的元素列表
    observer.current.disconnect();

    const elements = ids.map((id) => document.getElementById(id));
    elements.forEach((el) => {
      if (el) {
        observer.current.observe(el);
      }
    });

    // 当组件卸载或 ids 变化时，断开连接
    return () => observer.current?.disconnect();
  }, [ids, observer.current]); // 依赖于 ids 和 observer 实例

  return activeId;
}