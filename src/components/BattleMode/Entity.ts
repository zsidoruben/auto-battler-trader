import { Ability, Attack, AttackType, Attribute } from './index';
export class Entity {
  public name: string;
  public health: number;
  public maxHealth;
  public attack: Attack;

  public abilities: Ability[] = [];
  public attributes: Attribute[] = [];
  public isDead: boolean = false;
  constructor(name: string, health: number, attack: Attack) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.attack = attack;
  }
  addAbility(ability: Ability) {
    this.abilities.push(ability);
    ability.applied(this);
  }
  takeDamage(damage: number) {
    console.log(this.name + ' takes ' + damage + ' damage');
    this.health -= damage;
    if (this.health <= 0) {
      this.die();
    }
  }
  die() {
    this.isDead = true;
    console.log(this.name + ' is dead');
  }

  addAttribute(attr: Attribute) {
    const attribute = this.attributes.find(a => a.name === attr.name);
    if (attribute) {
      attribute.value += attr.value;
    } else {
      this.attributes.push(attr);
    }
  }
}

export class Player extends Entity {
  constructor(name: string, health: number, attack: Attack) {
    super(name, health, attack);
  }
}
