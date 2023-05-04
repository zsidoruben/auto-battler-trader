import { FC, useEffect } from 'react';
import { Ability, Rarity } from 'components/BattleMode/Ability';
import styled from 'styled-components';
import { Tilt } from 'components/Tilt/Tilt';

const CardWrapper = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
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
  -webkit-text-fill-color: ${props => props.color};
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
  /* 
  {
    reverse:           false,  // reverse the tilt direction
    max:               35,     // max tilt rotation (degrees)
    perspective:       1000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale:             1,      // 2 = 200%, 1.5 = 150%, etc..
    speed:             300,    // Speed of the enter/exit transition
    transition:        true,   // Set a transition on enter/exit.
    axis:              null,   // What axis should be disabled. Can be X or Y.
    reset:             true,   // If the tilt effect has to be reset on exit.
    easing:            "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    glare:             false,   // if it should have a "glare" effect
    "max-glare":       1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
    "glare-prerender": false   // false = VanillaTilt creates the glare elements for you, otherwise
                               // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
} */
  const tiltOptions = {
    scale: 1.2,
    speed: 1000,
    max: 20,
    reverse: true,
    glare: true,
    'max-glare': 0.3
  };
  const getItemStyle = (isDragging: boolean, draggableStyle: any): any => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    //padding: grid * 2,
    width: '150px',
    height: '250px',
    margin: `0 30px 0 0`,
    borderColor: color,
    // change background colour if dragging
    background: 'white',
    draggableStyle
    // styles we need to apply on draggables
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
    <Tilt optionsProp={tiltOptions}>
      <CardWrapper style={getItemStyle(isDragging, draggableStyle)}>
        <EnergyText>{ability.energyCost}</EnergyText>
        <Container>
          <AbilityName style={{ color: color }}>{ability.name}</AbilityName>
          <RarityName style={{ color: color }}>{rarityName}</RarityName>
          <Description color="black">{ability.description}</Description>
        </Container>
      </CardWrapper>
    </Tilt>
  );
};
