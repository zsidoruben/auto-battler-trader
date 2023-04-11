import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import {
  findGcd,
  Ability,
  Rarity,
  Attack,
  AttackType,
  Attribute,
  Entity,
  Player,
} from './index';

//import { fireDamage } from './Abilities';

export const BattleMode = () => {
  const versatileOffense: Ability = new Ability(
    'Versatile Offense',
    5,
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

  const playerAttack: Attack = new Attack(AttackType.Random, 10, 10);
  const enemyAttack: Attack = new Attack(AttackType.Random, 15, 45);
  const player: Player = new Player('Rubenatya', 100, playerAttack);
  const enemy: Player = new Player('Kocsog', 100, enemyAttack);
  //player.addAbility(fireDamage);
  const gdc = findGcd([playerAttack.attackSpeed, enemyAttack.attackSpeed]);
  console.log('GDC: ' + gdc);
  player.addAttribute(new Attribute('Ice Damage', 0.5));
  player.addAttribute(new Attribute('Earth Damage', 0.5));
  player.addAttribute(new Attribute('Blood Damage', 0.5));
  player.addAttribute(new Attribute('Rot Damage', 0.5));
  player.addAttribute(new Attribute('Physical Damage', 1));

  player.addAbility(versatileOffense);
  console.log('Attribute Count: ' + player.attributes.length);
  let time: number = 0;
  while (player.isDead === false && enemy.isDead === false) {
    if (player.attack.nextAttack <= time) {
      player.attack.attack(enemy, time, player);
    }
    if (enemy.attack.nextAttack <= time) {
      enemy.attack.attack(player, time, enemy);
    }
    time += gdc;
  }

  return (
    <div className={styles.main}>
      <div className={styles.time}>
        <p>Rounds:</p>
      </div>
      <div>
        <p>Enemy: {enemy.name}</p>
        <p>Health: {enemy.health + ' / ' + enemy.maxHealth}</p>
      </div>
      <div>
        <p>Player: {player.name}</p>
        <p>Health: {player.health + ' / ' + player.maxHealth}</p>
        <p>Attributes:</p>
        {player.attributes.map((attribute, index) => (
          <div key={index}>
            {attribute.name}: {attribute.value}
          </div>
        ))}
        <p>Abilities:</p>
        {player.abilities.map((ability, index) => (
          <div key={index}>{ability.name}</div>
        ))}
      </div>
      <button>Simulate</button>
    </div>
  );
};
