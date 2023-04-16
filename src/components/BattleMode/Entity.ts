import { Ability } from './Ability';
import { Attribute } from './Attribute';
export class Entity {
  public name: string;
  public health: number;
  public maxHealth;
  public attackSpeed: number;
  public nextAttack: number;
  public damage: number;

  public abilities: Ability[] = [];
  public attributes: Attribute[] = [];
  public isDead: boolean = false;
  constructor(
    name: string,
    health: number,
    attackSpeed: number,
    damage: number,
  ) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.attackSpeed = attackSpeed;
    this.nextAttack = attackSpeed;
    this.damage = damage;
  }
  attack(target: Entity, time: number) {
    let finalDamage = this.damage;
    this.attributes.forEach((element: Attribute) => {
      if (element.name.toLowerCase().includes('damage')) {
        finalDamage += element.value;
      }
    });
    target.takeDamage(finalDamage);
    this.nextAttack = time + this.attackSpeed;
  }

  addAbility(ability: Ability) {
    this.abilities.push(ability);
    if (ability.applied) {
      ability.applied(this);
    }
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
  constructor(name: string, health: number, attack: number) {
    super(name, health, 10, 10);
  }
}
