import { FC, useState } from 'react';

import { BattleMode } from 'components/BattleMode/BattleMode';
import { allAbilities } from 'shared/Abilities';
import { EquippedProvider } from 'shared/EquippedContext';
import { Deckbuilding } from 'components/DeckBuilding/DeckBuilding';
import { StartMenu } from 'components/StartMenu/StartMenu';
import { Link, Route, Routes } from 'react-router-dom';

export const App: FC = () => {
  const [mode, setMode] = useState('DeckBuilding');
  return (
    <EquippedProvider>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
            <Link to="/battle">Battle</Link>
            <Link to="/deck">Deck</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<StartMenu onStartClick={() => setMode('battle')} />} />
        <Route path="/battle" element={<BattleMode />} />
        <Route path="/deck" element={<Deckbuilding unlockedAbilitiesList={allAbilities} />} />
      </Routes>
    </EquippedProvider>
  );
};
