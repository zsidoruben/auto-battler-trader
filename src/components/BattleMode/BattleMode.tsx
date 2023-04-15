import { useEffect, useState } from 'react';
import { Ability, Rarity } from '../../components';
import styles from './styles.module.css';
import React from 'react';
import { findGcd, Attribute, Entity } from '../../components';

import { CardHolder } from 'components/CardHolder/CardHolder';
import {
  DragDropContext,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import { Card } from 'components/Card/Card';

export const BattleMode = () => {
  //ability defined
  const fireResistance: Ability = new Ability(
    'Fire Resistance',
    1,
    'Gain 10 Fire Resistance.',
    2,
    Rarity.Common,
    (parent: Entity) => {
      parent.addAttribute(new Attribute('Fire Resistance', 10));
    },
  );

  const darkDamage: Ability = new Ability(
    'Dark Damage',
    2,
    'Gain 10 Dark Damage.',
    2,
    Rarity.Uncommon,
    (parent: Entity) => {
      parent.addAttribute(new Attribute('Dark Damage', 10));
    },
  );
  const versatileOffense: Ability = new Ability(
    'Versatile Offense',
    3,
    'Gain exponentional Fire Damage based on the number of different damage type attributes.',
    8,
    Rarity.Rare,
    (parent: Entity) => {
      const damageAttributeCount = parent.attributes.filter(a =>
        a.name.toLowerCase().includes('damage'),
      ).length;
      console.log('Damage Attributes Count: ' + damageAttributeCount);
      parent.addAttribute(
        new Attribute('Fire Damage', Math.pow(damageAttributeCount, 2)),
      );
    },
  );

  const darkKnight: Ability = new Ability(
    'Dark Knight',
    4,
    'At the start of the game summon a Dark Knight',
    5,
    Rarity.Legendary,
    (parent: Entity) => {},
  );
  const energySyphon: Ability = new Ability(
    'Energy Syphon',
    5,
    'Every 5 seconds, steal 5 energy from the opponent from their lowest energy source',
    3,
    Rarity.Mythic,
    (parent: Entity) => {},
  );

  const al = [
    fireResistance,
    darkDamage,
    versatileOffense,
    darkKnight,
    energySyphon,
  ];
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

  const endDrag = (result: DropResult) => {};

  return (
    <div className={styles.main}>
      <p>Remaining Energy: 10</p>
      <CardHolder cards={al}></CardHolder>
      <p style={{}}>Avaible Cards</p>
      <div>
        <p>Search</p>
        <input></input>
      </div>

      <CardHolder cards={al}></CardHolder>
    </div>
  );
};
