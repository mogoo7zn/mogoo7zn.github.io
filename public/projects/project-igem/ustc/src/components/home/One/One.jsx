import React from 'react';
import styles from './One.module.scss';
import CatFace from './CatFace';
import FieldCard from './FieldCard';
import ScrollFloat from '../../common/Animation/ScrollFloat'
import ScrollReveal from '../../common/Animation/ScrollReveal';

const One = () => {
  return (
    <section id="one" className={styles.one}>
      <div className={styles.catFace}>
        <CatFace />
      </div>
      <div className={styles.text}>
        <ScrollFloat
          textClassName={styles.floatText}
          containerClassName={styles.floatContainer}
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.03}
        >
          Hey!
        </ScrollFloat>
        <ScrollReveal
          containerClassName={styles.revealContainer}
          textClassName={styles.revealText}
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          rotationEnd = "bottom bottom"
          wordAnimationEnd = "bottom bottom"
        >
          I’m Botulinum Neurotoxin Type A—BoNT/A for short. You may not know me, but I’m everywhere! From spoiled pickled food to beauty clinics, I make quite the impression.
        </ScrollReveal>
      </div>
      <div className={styles.fieldCard}>
        <FieldCard />
      </div>
    </section>
  );
};

export default One;