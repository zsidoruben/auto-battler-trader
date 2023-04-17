import { FC } from 'react';
import styles from './styles.module.css';
import { Ability, Rarity } from 'components/BattleMode/Ability';
import styled from 'styled-components';

interface CardProps {
  ability: Ability;
}

const Description = styled.div`
  font-size: small;
`;

const CardWrapper = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  background-color: white;
  border-radius: 15px;

  width: 100%;
  height: 100%;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

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
    <CardWrapper>
      <div className={styles.energytext}>{ability.energyCost}</div>
      <div className={styles.container}>
        <h4>
          <p style={{ color: color }}>{ability.name}</p>
        </h4>
        <p className={styles.rarity} style={{ color: color }}>
          {rarityName}
        </p>
        <Description>{ability.description}</Description>
      </div>
    </CardWrapper>
  );
};
