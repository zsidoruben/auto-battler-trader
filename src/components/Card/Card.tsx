import { FC } from 'react';
import { Ability, Rarity } from 'components/BattleMode/Ability';
import styled from 'styled-components';

const CardWrapper = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  background-color: ${props => props.color};
  border-radius: 15px;
  border: 4px solid black;

  width: 150px;
  height: 250px;
  margin: 10px;
  user-select: none;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const AbilityName = styled.h4`
  font-weight: bold;
  padding: 0 0 0 5px;
  margin: 0px;
  user-select: none;
`;
const RarityName = styled.p`
  font-weight: bold;
  padding: 0 0 0 0;
  user-select: none;
`;

const EnergyText = styled.div`
  font-weight: bold;
  font-size: 24px;
  padding: 5px 0px 0px 10px;
  -webkit-text-fill-color: darkcyan;
  user-select: none;
`;

const Description = styled.div`
  font-size: small;
  min-height: 90%;
  user-select: none;
`;

const Container = styled.div`
  text-align: center;
  padding: 0px 0px 0px 0px;
  position: relative;
`;

interface CardProps {
  ability: Ability;
  isDragging?: boolean;
  draggableStyle?: any;
}

export const Card: FC<CardProps> = ({ ability, isDragging = false, draggableStyle = null }) => {
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    //padding: grid * 2,
    width: '150px',
    height: '250px',
    margin: `0 30px 0 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'none',

    // styles we need to apply on draggables
    ...draggableStyle
  });
  let rarityName: string = '';
  let color: string = '';
  switch (ability.rarity) {
    case Rarity.Common:
      rarityName = 'Common';
      color = 'DarkGrey';
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
    <CardWrapper color="White" style={{ borderColor: color }}>
      <EnergyText>{ability.energyCost}</EnergyText>
      <Container>
        <AbilityName style={{ color: color }}>{ability.name}</AbilityName>
        <RarityName style={{ color: color }}>{rarityName}</RarityName>
        <Description>{ability.description}</Description>
      </Container>
    </CardWrapper>
  );
};
