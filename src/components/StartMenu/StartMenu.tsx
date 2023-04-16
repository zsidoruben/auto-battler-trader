import React, { FC } from 'react';
import styles from './styles.module.css';

interface StartMenuProps {
  onStartClick: () => void;
}

export const StartMenu: FC<StartMenuProps> = ({ onStartClick }) => {
  return (
    <div className={styles.main}>
      <button className={styles.startButton} onClick={onStartClick}>
        Start Game
      </button>
    </div>
  );
};
