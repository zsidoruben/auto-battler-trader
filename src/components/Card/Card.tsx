import { FC } from 'react';
import styles from './styles.module.css';
import { Ability, Rarity } from 'components/BattleMode/Ability';

interface CardProps {
  ability: Ability;
}

export const Card: FC<CardProps> = ({ ability }) => {
  let rarityName: string = '';
  let color: string = '';
  switch (ability.rarity) {
    case Rarity.Common:
      rarityName = 'Common';
      color = 'DarkSlateGrey';
      break;
    case Rarity.Uncommon:
      rarityName = 'Uncommon';
      color = 'DarkGreen';
      break;
    case Rarity.Rare:
      rarityName = 'Rare';
      color = 'DarkCyan';
      break;
    case Rarity.Legendary:
      rarityName = 'Legendary';
      color = 'DarkOrange';
      break;
    case Rarity.Mythic:
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
        <div className={styles.energycontainer}>
          <div className={styles.energytext}>{ability.energyCost}</div>
          <img
            src="http://localhost:3000/auto-battler-trader/img/Energy2.png"
            alt="EnergyCostImage"
            className={styles.energycost}
          />
        </div>
      </div>
    </div>
  );
};
