import { FC, useState } from 'react';
import styles from './styles.module.css';
import { DeckbuildingPage, StartMenu } from '../../components';
import React from 'react';
import { BattleMode } from 'components/BattleMode/BattleMode';
import { allAbilities } from 'shared/Abilities';
import { EquippedProvider } from 'shared/EquippedContext';

export const App: FC = () => {
  const [mode, setMode] = useState('DeckBuilding');
  return (
    <EquippedProvider>
      <div className={styles.main}>
        {mode === 'start' && <StartMenu onStartClick={() => setMode('battle')} />}
        {mode === 'battle' && <BattleMode />}
        {mode === 'gameOver' && <>GameOver</>}
        {mode === 'DeckBuilding' && <DeckbuildingPage unlockedAbilitiesList={allAbilities} />}
      </div>
    </EquippedProvider>
  );
};
