/**
 * 使用 requestAnimationFrame 实现的平滑滚动函数
 * @param {number} targetPosition - 目标滚动的垂直位置 (px)
 * @param {number} duration - 动画的总时长 (毫秒)
 */
export function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animationLoop(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    
    // easeInOutQuad 缓动函数
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animationLoop);
    }
  }

  requestAnimationFrame(animationLoop);
}