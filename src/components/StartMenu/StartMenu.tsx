import React from 'react';
import styles from './styles.module.css';

interface StartMenuProps {
  onStartClick: () => void;
}

export const StartMenu = ({ onStartClick }: StartMenuProps) => {
  return (
    <div className={styles.main}>
      <button className={styles.startButton} onClick={onStartClick}>
        Start Game
      </button>
    </div>
  );
};
