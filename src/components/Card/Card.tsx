import React from 'react';
import styles from './styles.module.css';
import { Ability } from '../BattleMode';
import { Draggable } from 'react-beautiful-dnd';

interface CardProps {
  ability: Ability;
}

export const Card = ({ ability }: CardProps) => {
  let rarityName: string = '';
  let color: string = '';
  switch (ability.rarity) {
    case 0:
      rarityName = 'Common';
      color = 'DarkSlateGrey';
      break;
    case 1:
      rarityName = 'Unommon';
      color = 'DarkGreen';
      break;
    case 2:
      rarityName = 'Rare';
      color = 'DarkCyan';
      break;
    case 3:
      rarityName = 'Legendary';
      color = 'DarkOrange';
      break;
    case 4:
      rarityName = 'Mythic';
      color = 'DarkRed';
      break;
    default:
      break;
  }
  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <h4>
          <p style={{ color: color }}>{ability.name}</p>
        </h4>
        <p className={styles.rarity} style={{ color: color }}>
          {rarityName}
        </p>
        <p>{ability.description}</p>
        <img
          src="http://localhost:3000/auto-battler-trader/img/Energy2.png"
          className={styles.energycost}
        ></img>
        <div className={styles.energytext}>{ability.energyCost}</div>
      </div>
    </div>
  );
};
