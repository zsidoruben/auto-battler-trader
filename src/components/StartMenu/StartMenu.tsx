import React, { FC } from 'react';

interface StartMenuProps {
  onStartClick: () => void;
}

export const StartMenu: FC<StartMenuProps> = ({ onStartClick }) => {
  return (
    <div>
      <button onClick={onStartClick}>Start Game</button>
      <iframe frameBorder="0" src="https://itch.io/embed/2038471" width="552" height="167">
        <a href="https://zsruben.itch.io/project-discite">Project: Discite by zsruben</a>
      </iframe>
    </div>
  );
};
