import { FC, useState } from 'react';
import styles from './styles.module.css';
import { CardHolder, DeckBuilding, StartMenu } from '../../components';
import React from 'react';
import { BattleMode } from 'components/BattleMode/BattleMode';
import { allAbilities } from 'shared/Abilities';
//const gameManager: GameManager = new GameManager(10);

export const App: FC = () => {
  const [mode, setMode] = useState('DeckBuilding');
  return (
    <div className={styles.main}>
      {mode === 'start' && (
        <StartMenu onStartClick={() => setMode('battle')} />
      )}
      {mode === 'battle' && <BattleMode />}
      {mode === 'gameOver' && <>GameOver</>}
      {mode === 'DeckBuilding' && (
        <CardHolder unlockedAbilitiesList={allAbilities} />
      )}
    </div>
  );
};
