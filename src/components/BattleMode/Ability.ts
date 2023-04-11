import { Entity } from './index';

export class Ability {
  public name: string;
  public energyCost: number;
  public rarity: Rarity;
  public applied: (parent: Entity) => void;
  constructor(
    name: string,
    energyCost: number,
    rarity: Rarity,
    applied: (parent: Entity) => void,
  ) {
    this.name = name;
    this.energyCost = energyCost;
    this.rarity = rarity;
    this.applied = applied;
  }
}
class ActiveAbility extends Ability {
  public activationSpeed: number;
  constructor(
    name: string,
    energyCost: number,
    rarity: Rarity,
    applied: (parent: Entity) => void,
    activateSpeed: number,
  ) {
    super(name, energyCost, rarity, applied);
    this.activationSpeed = activateSpeed;
  }
  activate() {}
}

export enum Rarity {
  Common,
  Uncommon,
  Rare,
  Legendary,
  Mythic,
}
