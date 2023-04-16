import { FC } from 'react';
import styles from './styles.module.css';
import { CardHolder } from 'components/CardHolder/CardHolder';
import { allAbilities } from 'shared/Abilities';
import { Entity } from './Entity';
import { findGcd } from './GDC';
import { Attribute } from './Attribute';

export const BattleMode: FC = () => {
  //ability defined

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
    <div className={styles.main}>
      <p>Remaining Energy: 10</p>
      <p style={{}}>Avaible Cards</p>
      <div>
        <p>Search</p>
        <input></input>
      </div>
    </div>
  );
};
