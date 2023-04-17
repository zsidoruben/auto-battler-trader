import { FC } from 'react';
import styles from './styles.module.css';
import { Ability, Rarity } from 'components/BattleMode/Ability';
import styled from 'styled-components';

interface CardProps {
  ability: Ability;
}
const STAbilityName = styled.h4`
  font-weight: bold;
  padding: 0 0 0 5px;
  margin: 0px;
`;
const STRarityName = styled.p`
  font-weight: bold;
  padding: 0 0 0 0;
`;

const STEnergyText = styled.div`
  font-weight: bold;
  font-size: 24px;
  padding: 5px 0px 0px 10px;
  -webkit-text-fill-color: darkcyan;
`;

const STDescription = styled.div`
  font-size: small;
  min-height: 90%;
`;

const STContainer = styled.div`
  text-align: center;
  padding: 0px 0px 0px 0px;
  position: relative;
`;

const STCardWrapper = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  background-color: white;
  border-radius: 15px;
  border: 4px solid black;

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
    <STCardWrapper style={{ borderColor: color }}>
      <STEnergyText>{ability.energyCost}</STEnergyText>
      <STContainer>
        <STAbilityName style={{ color: color }}>{ability.name}</STAbilityName>
        <STRarityName style={{ color: color }}>{rarityName}</STRarityName>
        <STDescription>{ability.description}</STDescription>
      </STContainer>
    </STCardWrapper>
  );
};
