'use client';

import styles from './FieldCard.module.scss';
import Magnet from '../../common/Animation/Magnet';

const CombinedIcon = () => {
  return (
    <div className={styles.wrapper}>
      <Magnet wrapperClassName={styles.magnet} innerClassName={styles.inner} a={0.9} magnetStrength={10} padding='50vw'>
        <img className={styles.svgBase} src="https://static.igem.wiki/teams/5924/assets/images/food.webp" alt="Food"></img>
        <img className={styles.svgTop} src="https://static.igem.wiki/teams/5924/assets/images/medical.webp" alt="Medical"></img>
      </Magnet>
        <div className={styles.hoverTop}></div>
        <div className={styles.hoverBottom}></div>
    </div>
  );
};

export default CombinedIcon;
