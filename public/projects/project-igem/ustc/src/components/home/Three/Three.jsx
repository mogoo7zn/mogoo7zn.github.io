import React, { useState, useRef, useEffect } from 'react';
import styles from './Three.module.scss';
import Grid from '../../common/Background/Grid';

const Three = () => {
  const [injected, setInjected] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [needlePosition, setNeedlePosition] = useState({ x: 0, y: 0 });
  const [barAnimation, setBarAnimation] = useState(false);
  const [pieAnimation, setPieAnimation] = useState(false);

  const needleRef = useRef(null);
  const mouseRef = useRef(null);
  const interactionAreaRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setFadeIn(true), 1500);
        }
      },
      { threshold: 0.2 }
    );
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  useEffect(() => {
    if (interactionAreaRef.current && needleRef.current) {
      const containerRect = interactionAreaRef.current.getBoundingClientRect();
      const needleRect = needleRef.current.getBoundingClientRect();
      const x = (containerRect.width - needleRect.width) / 2;
      const y = (containerRect.height - needleRect.height) / 2;
      setNeedlePosition({ x, y });
    }
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();

    if (!interactionAreaRef.current) return;
    const containerRect = interactionAreaRef.current.getBoundingClientRect();

    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    const offsetX = mouseX - needlePosition.x;
    const offsetY = mouseY - needlePosition.y;
    dragOffset.current = { x: offsetX, y: offsetY };

    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!dragging || !interactionAreaRef.current) return;

    const containerRect = interactionAreaRef.current.getBoundingClientRect();

    const x = e.clientX - containerRect.left - dragOffset.current.x;
    const y = e.clientY - containerRect.top - dragOffset.current.y;

    setNeedlePosition({ x, y });
  };

  const handleMouseUp = () => {
    if (!dragging) return;
    setDragging(false);

    if (needleRef.current && mouseRef.current) {
      const needleRect = needleRef.current.getBoundingClientRect();
      const mouseRect = mouseRef.current.getBoundingClientRect();

      const needleCenterX = needleRect.left + needleRect.width / 2;
      const needleCenterY = needleRect.top + needleRect.height / 2;

      if (
        needleCenterX > mouseRect.left &&
        needleCenterX < mouseRect.right &&
        needleCenterY > mouseRect.top &&
        needleCenterY < mouseRect.bottom
      ) {
        setInjected(true);

        setTimeout(() => setBarAnimation(true), 300);
        setTimeout(() => setPieAnimation(true), 600);
      }
    }
  };

  const handleReset = () => {
    setInjected(false);
    setBarAnimation(false);
    setPieAnimation(false);
    if (interactionAreaRef.current && needleRef.current) {
      const containerRect = interactionAreaRef.current.getBoundingClientRect();
      const needleRect = needleRef.current.getBoundingClientRect();
      const x = (containerRect.width - needleRect.width) / 2;
      const y = (containerRect.height - needleRect.height) / 2;
      setNeedlePosition({ x, y });
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (dragging) {
        setDragging(false);
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [dragging]);

  // 柱状图数据
  const barData = [
    { method: '', cost: 32, speed: 96, fullName: 'Mouse Bioassay (MBA)' },
    { method: '', cost: 2.5, speed: 6, fullName: 'ELISA' },
    { method: '', cost: 2, speed: 3, fullName: 'Fluorescence Endopeptidase Assay' },
    { method: '', cost: 0.3, speed: 0.2, fullName: 'Lateral Flow Assay (LFA)' },
  ];

  // 饼图数据
  const pieData = [
    { label: 'For Botulinum Toxin Testing', value: 224000, percentage: 56, color: '#4CAF50' },
    { label: 'For Other Regulatory Uses', value: 176000, percentage: 44, color: '#FF9800' },
  ];

  // 计算柱状图最大值用于比例缩放
  const maxValue = Math.max(
    Math.max(...barData.map((item) => item.cost)),
    Math.max(...barData.map((item) => item.speed))
  );

  return (
    <div className={styles.container}>
      <Grid />

      <div
        className={`${styles.content} ${fadeIn ? styles.fadeIn : ''}`}
        ref={contentRef}
        style={{ opacity: fadeIn ? 1 : 0, transition: 'opacity 0.5s' }}
      >
        <div
          ref={interactionAreaRef}
          className={styles.interactionArea}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className={`${styles.mouse} ${injected ? styles.injected : ''}`} ref={mouseRef}>
            <img src="https://static.igem.wiki/teams/5924/assets/images/mouse.webp" alt="mouse" />
          </div>

          <div
            className={`${styles.needle} ${dragging ? styles.dragging : ''}`}
            style={{
              transform: `translate(${needlePosition.x}px, ${needlePosition.y}px)`,
              cursor: dragging ? 'grabbing' : 'grab',
            }}
            ref={needleRef}
            onMouseDown={handleMouseDown}
          >
            <img
              src="https://static.igem.wiki/teams/5924/assets/images/syringe.webp"
              alt="syringe"
            />
          </div>

          {!injected && (
            <div className={styles.instruction}>
              <p>← Drag the needle onto the mouse</p>
            </div>
          )}

          {injected && (
            <button className={styles.resetButton} onClick={handleReset}>
              Reset
            </button>
          )}
        </div>

        <div className={`${styles.chartsContainer} ${injected ? styles.visible : ''}`}>
          {/* 柱状图 */}
          <div className={`${styles.barChart} ${barAnimation ? styles.animate : ''}`}>
            <svg width="100%" height="500" viewBox="0 0 1200 500">
              {/* 标题 */}
              <text
                x="600"
                y="40"
                textAnchor="middle"
                fill="#1b0301"
                fontWeight="bold"
                fontSize="32"
              >
                Comparison of Bioassay Methods
              </text>
              {/* Y轴 - 成本 */}
              <line x1="120" y1="80" x2="120" y2="450" stroke="#1b0301" strokeWidth="3" />
              <text
                x="60"
                y="265"
                transform="rotate(-90 60,265)"
                fill="#1b0301"
                fontWeight="bold"
                fontSize="22"
              >
                Cost (10£/h) & Speed
              </text>
              {/* Y轴刻度 */}
              {[0, 20, 40, 60, 80, 100].map((tick, index) => {
                const y = 450 - (tick / 100) * 370;
                return (
                  <g key={index}>
                    <line x1="110" y1={y} x2="120" y2={y} stroke="#1b0301" strokeWidth="2" />
                    <text x="100" y={y + 6} textAnchor="end" fill="#1b0301" fontSize="18">
                      {tick}
                    </text>
                  </g>
                );
              })}
              {/* X轴 */}
              <line x1="120" y1="450" x2="1100" y2="450" stroke="#1b0301" strokeWidth="3" />
              {/* 分组柱状图 */}
              {barData.map((item, index) => {
                const barWidth = 80;
                const groupWidth = 250;
                const groupX = 220 + index * groupWidth;
                const costHeight = (item.cost / maxValue) * 370;
                const speedHeight = (item.speed / maxValue) * 370;
                // 分割完整名称为单词数组
                const words = item.fullName.split(' ');
                return (
                  <g
                    key={index}
                    className={item.fullName === 'Mouse Bioassay (MBA)' ? styles.mbaHighlight : ''}
                  >
                    {/* 成本柱 - 橙色实心 */}
                    <rect
                      x={groupX - barWidth - 20}
                      y={450 - costHeight}
                      width={barWidth}
                      height={costHeight}
                      fill="#FF9800"
                      className={styles.bar}
                    />

                    {/* 速度柱 - 绿色斜线 */}
                    <rect
                      x={groupX + 20}
                      y={450 - speedHeight}
                      width={barWidth}
                      height={speedHeight}
                      fill="url(#diagonalHatch)"
                      className={styles.bar}
                    />

                    {/* 成本数值 */}
                    <text
                      x={groupX - barWidth - 20 + barWidth / 2}
                      y={440 - costHeight}
                      textAnchor="middle"
                      fill="#1b0301"
                      fontSize="20"
                    >
                      {item.cost}
                    </text>

                    {/* 速度数值 */}
                    <text
                      x={groupX + 20 + barWidth / 2}
                      y={440 - speedHeight}
                      textAnchor="middle"
                      fill="#1b0301"
                      fontSize="20"
                    >
                      {item.speed}
                    </text>

                    {/* 完整方法名称 - 每个单词一行 */}
                    {words.map((word, wordIndex) => (
                      <text
                        key={wordIndex}
                        x={groupX}
                        y={500 + wordIndex * 20}
                        textAnchor="middle"
                        fill="#1b0301"
                        fontSize="20"
                        fontWeight="bold"
                      >
                        {word}
                      </text>
                    ))}
                  </g>
                );
              })}
              {/* 图例 */}
              <g>
                <rect x="900" y="80" width="40" height="40" fill="#FF9800" />
                <text x="950" y="110" fill="#1b0301" fontSize="20">
                  Estimated cost (per test)
                </text>
                <rect x="900" y="140" width="40" height="40" fill="url(#diagonalHatch)" />
                <text x="950" y="170" fill="#1b0301" fontSize="20">
                  Speed of analysis
                </text>
              </g>
              {/* 斜线图案定义 */}
              <defs>
                <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="20" height="20">
                  <path d="M0,20 L20,0" stroke="#4CAF50" strokeWidth="4" />
                </pattern>
              </defs>
            </svg>
          </div>
          {/* 饼图 */}
          <div className={`${styles.pieChart} ${pieAnimation ? styles.animate : ''}`}>
            <svg width="100%" height="500" viewBox="0 0 700 500">
              {/* 标题 */}
              <text
                x="350"
                y="40"
                textAnchor="middle"
                fill="#1b0301"
                fontWeight="bold"
                fontSize="32"
              >
                Mouse Usage Distribution
              </text>
              {/* 饼图 */}
              <g transform="translate(220, 270)">
                {(() => {
                  let startAngle = 0;
                  return pieData.map((item, index) => {
                    const radius = 120;
                    const strokeWidth = 90;
                    const angle = (item.percentage / 100) * 360;
                    const endAngle = startAngle + angle;
                    // 计算圆弧路径
                    const largeArcFlag = angle > 180 ? 1 : 0;
                    const x1 = radius * Math.cos((Math.PI * startAngle) / 180);
                    const y1 = radius * Math.sin((Math.PI * startAngle) / 180);
                    const x2 = radius * Math.cos((Math.PI * endAngle) / 180);
                    const y2 = radius * Math.sin((Math.PI * endAngle) / 180);
                    const pathData = `
                      M ${x1} ${y1}
                      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
                    `;
                    const midAngle = startAngle + angle / 2;
                    startAngle += angle;
                    return (
                      <path
                        key={index}
                        d={pathData}
                        fill="none"
                        stroke={item.color}
                        strokeWidth={strokeWidth}
                        className={item.label.includes('Botulinum') ? styles.toxinHighlight : ''}
                      />
                    );
                  });
                })()}
                {/* 中心文字 */}
                <text textAnchor="middle" dy="5" fill="#1b0301" fontWeight="bold" fontSize="22">
                  Total: 400,000
                </text>
              </g>
              {/* 饼图图例和数值 */}
              <g transform="translate(420, 120)">
                {pieData.map((item, index) => (
                  <g key={index} transform={`translate(0, ${index * 60})`}>
                    <rect width="40" height="40" fill={item.color} />
                    <text x="50" y="20" fill="#1b0301" fontSize="20">
                      {item.label}
                    </text>
                    <text x="50" y="45" fill="#1b0301" fontSize="16">
                      {item.value.toLocaleString()} mice ({item.percentage}%)
                    </text>
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </div>

        <div className={`${styles.textContent} ${injected ? styles.visible : ''}`}>
          <p>
            Currently, the main-stream method is mouse lethality assay. Despite its high precision,
            the cost is too much, it costs 320 pound per test. What's more, this assay kills about
            600,000 mice per year, which doesn't seem very humanistic. Hereby, we exert ourselves to
            develop a novel method with both precision and availability that outshines the in-vivo
            bioassay and can make its way to benefit the public.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Three;
