import styles from './SkeletonCard.module.scss';

const SkeletonCard = () => {
  return (
    <div className={styles.card}>
      <div className={`${styles.skeleton} ${styles.image}`}></div>
      <div className={styles.content}>
        <div className={`${styles.skeleton} ${styles.title}`}></div>
        <div className={`${styles.skeleton} ${styles.text}`}></div>
        <div className={`${styles.skeleton} ${styles.text} ${styles.short}`}></div>
      </div>
    </div>
  );
};

export default SkeletonCard;