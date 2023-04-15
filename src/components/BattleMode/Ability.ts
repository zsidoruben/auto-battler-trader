import { Entity } from './index';

export class Ability {
  public name: string;
  public id: number;
  public description: string;
  public energyCost: number;
  public rarity: Rarity;
  public applied: (parent: Entity) => void;
  constructor(
    name: string,
    id: number,
    description: string,
    energyCost: number,
    rarity: Rarity,
    applied: (parent: Entity) => void,
  ) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.energyCost = energyCost;
    this.rarity = rarity;
    this.applied = applied;
  }
}
export class ActiveAbility extends Ability {
  public activationSpeed: number;
  constructor(
    name: string,
    id: number,
    description: string,
    energyCost: number,
    rarity: Rarity,
    applied: (parent: Entity) => void,
    activateSpeed: number,
  ) {
    super(name, id, description, energyCost, rarity, applied);
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
