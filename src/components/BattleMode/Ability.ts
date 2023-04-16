import { Entity } from './Entity';

export class Ability {
  public name: string;
  public id: number;
  public description: string;
  public energyCost: number;
  public rarity: Rarity;
  public applied?: (parent: Entity) => void;
  public parent?: Entity;
  constructor(
    name: string,
    id: number,
    description: string,
    energyCost: number,
    rarity: Rarity,
    applied?: (parent: Entity) => void,
    activated?: (parent: Entity) => void,
  ) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.energyCost = energyCost;
    this.rarity = rarity;
    this.applied = applied;
  }
}

export enum Rarity {
  Common,
  Uncommon,
  Rare,
  Legendary,
  Mythic,
}
