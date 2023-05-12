import { Ability, CardType } from './Ability';
import { Attribute } from './Attribute';
export class Entity {
  public name: string;
  public health: number;
  public maxHealth;

  public energy: number;
  public maxEnergy: number;
  public attackSpeed: number;
  public nextAttack: number;
  public damage: number;

  public abilities: Ability[] = [];
  public passiveAbilities: Ability[] = [];
  public activeAbilities: Ability[] = [];
  public triggerAbilities: Ability[] = [];
  public growthAbilities: Ability[] = [];

  public attributes: Attribute[] = [];
  public isDead: boolean = false;

  public armor: number = 0;
  public healthRegen: number = 0;
  public energyRegen: number = 0;
  constructor(name: string, health: number, energy: number, attackSpeed: number, damage: number) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.energy = energy;
    this.maxEnergy = energy;
    this.attackSpeed = attackSpeed;
    this.nextAttack = attackSpeed;
    this.damage = damage;
  }
  regenerateHealth() {}
  regenerateEnergy() {}
  getAttribute(name: string): number {
    for (let i = 0; i < this.attributes.length; i++) {
      if (this.attributes[i].name === name) {
        return this.attributes[i].Value;
      }
    }
    return 0;
  }
  getAttributeCount(): number {
    return this.attributes.length;
  }
  applyAbilities() {}
  registerAbilities() {}
  addAbility(ability: Ability) {
    this.abilities.push(ability);
    if (ability.types.includes(CardType.Passive)) {
      this.passiveAbilities.push(ability);
    }
    if (ability.types.includes(CardType.Active)) {
      this.activeAbilities.push(ability);
    }
    if (ability.types.includes(CardType.Trigger)) {
      this.triggerAbilities.push(ability);
    }
    if (ability.types.includes(CardType.Growth)) {
      this.growthAbilities.push(ability);
    }
  }
  removeAbility(ability: Ability) {
    this.abilities.splice(this.abilities.indexOf(ability), 1);
    if (ability.types.includes(CardType.Passive)) {
      this.passiveAbilities.splice(this.passiveAbilities.indexOf(ability), 1);
    }
    if (ability.types.includes(CardType.Active)) {
      this.activeAbilities.splice(this.activeAbilities.indexOf(ability), 1);
    }
    if (ability.types.includes(CardType.Trigger)) {
      this.triggerAbilities.splice(this.triggerAbilities.indexOf(ability), 1);
    }
    if (ability.types.includes(CardType.Growth)) {
      this.growthAbilities.splice(this.growthAbilities.indexOf(ability), 1);
    }
  }
  tryHit(damage: number) {
    //TODO: apply dodge
    this.hit(damage);
  }
  hit(damage: number) {
    //TODO: apply armor
    const final = Math.max(0, damage - this.armor);
    this.takeDamage(final);
  }
  takeDamage(damage: number) {
    console.log(this.name + ' takes ' + damage + ' damage');
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
      this.die();
    }
  }
  die() {
    this.isDead = true;
    console.log(this.name + ' is dead');
  }

  addAttribute(name: string, value: number) {
    const attribute = this.attributes.find(a => a.name === name);
    if (attribute) {
      attribute.baseValue += value;
    } else {
      this.attributes.push(new Attribute(name, value));
    }
  }
}
