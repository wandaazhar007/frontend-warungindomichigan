'use client';

import styles from './QuantitySelector.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantitySelector = ({ quantity, onIncrease, onDecrease }: QuantitySelectorProps) => {
  return (
    <div className={styles.quantitySelector}>
      <button onClick={onDecrease} className={styles.button} aria-label="Decrease quantity">
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <span className={styles.quantityDisplay}>{quantity}</span>
      <button onClick={onIncrease} className={styles.button} aria-label="Increase quantity">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default QuantitySelector;