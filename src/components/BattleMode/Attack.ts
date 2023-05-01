import { Attribute } from './Attribute';
import { Entity } from './Entity';

export class Attack {
  public baseDamage: number;
  public attackSpeed: number;
  public attackType: AttackType;
  public nextAttack: number;
  constructor(attackType: AttackType, value: number, attackSpeed: number) {
    this.attackType = attackType;
    this.baseDamage = value;
    this.attackSpeed = attackSpeed;
    this.nextAttack = attackSpeed;
  }
  attack(target: Entity, time: number, parent: Entity) {
    let finalDamage = this.baseDamage;
    parent.attributes.forEach((element: Attribute) => {
      if (element.name.toLowerCase().includes('damage')) {
        finalDamage += element.baseValue;
      }
    });
    target.takeDamage(finalDamage);
    this.nextAttack = time + this.attackSpeed;
  }
}

export enum AttackType {
  Random,
  BiggertHP,
  EnemyPlayer,
  None
}
