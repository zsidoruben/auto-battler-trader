import { FC, useContext } from 'react';
import { Entity } from './Entity';
import { findGcd } from './GDC';
import { Attribute } from './Attribute';
import { EquippedContext, EquippedContextType } from 'shared/EquippedContext';
import { Card } from 'components/Card/Card';
import styled from 'styled-components';

export const BattleMode: FC = () => {
  const CardContainer = styled.div`
    display: flex;
    padding: 30px;
    width: 90%;
    height: 300px;
    border: 1px solid #ccc;
    background: white;
  `;
  //ability defined
  const { equippedAbilities, changeEquippedList } = useContext(EquippedContext) as EquippedContextType;
  //entities
  const player: Entity = new Entity('Rubenatya', 100, 10, 10);
  const enemy: Entity = new Entity('Kocsog', 100, 10, 10);
  const gdc = findGcd([player.attackSpeed, enemy.attackSpeed]);
  console.log('GDC: ' + gdc);
  //attributes
  player.addAttribute(new Attribute('Ice Damage', 50));
  player.addAttribute(new Attribute('Earth Damage', 0.5));
  player.addAttribute(new Attribute('Blood Damage', 0.5));
  player.addAttribute(new Attribute('Rot Damage', 0.5));
  player.addAttribute(new Attribute('Physical Damage', 1));
  //abilities

  //game:
  let time: number = 0;
  const simutate = () => {
    while (player.isDead === false && enemy.isDead === false) {
      if (player.nextAttack <= time) {
        player.attack(enemy, time);
      }
      if (enemy.nextAttack <= time && !enemy.isDead) {
        enemy.attack(player, time);
      }
      time += gdc;
    }
  };
  simutate();

  return (
    <>
      <h1>Battle Screen</h1>
      <div>
        <span>
          <img
            height="200px"
            style={{ transform: 'scaleX(-1)' }}
            src="https://cdn.dribbble.com/users/3312991/screenshots/6152604/warrior-idle.gif"
            alt=""
          />
        </span>
        <span>
          <img
            height="200px"
            style={{ float: 'right' }}
            src="https://cdn.dribbble.com/users/3312991/screenshots/6152604/warrior-idle.gif"
            alt=""
          />
        </span>
      </div>
      <h4>Your current Heart Deck:</h4>
      <CardContainer>
        {equippedAbilities.map(ability => {
          return <Card ability={ability} />;
        })}
      </CardContainer>
    </>
  );
};
