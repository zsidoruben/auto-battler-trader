import { useState } from 'react';
import styles from './styles.module.css';
import { BattleMode, StartMenu } from '../../components';
import React from 'react';
//const gameManager: GameManager = new GameManager(10);

export const App = () => {
  const [mode, setMode] = useState('battle');
  return (
    <div className={styles.main}>
      {mode === 'start' && (
        <StartMenu onStartClick={() => setMode('battle')} />
      )}
      {mode === 'battle' && <BattleMode />}
      {mode === 'gameOver' && <>GameOver</>}
    </div>
  );
};
