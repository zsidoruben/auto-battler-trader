import React, { FC } from 'react';

interface StartMenuProps {
  onStartClick: () => void;
}

export const StartMenu: FC<StartMenuProps> = ({ onStartClick }) => {
  return (
    <div>
      <button onClick={onStartClick}>Start Game</button>
    </div>
  );
};
