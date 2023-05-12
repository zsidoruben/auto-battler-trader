import { Entity } from './Entity';

export class Ability {
  public id: number;
  public name: string;
  public types: CardType[];
  public description: string;
  public energyCost: number;
  public rarity: Rarity;

  public passive: Appliable | null;
  public active: Activatable | null;
  public trigger: Triggerable | null;
  public parent?: Entity;

  constructor(ability: Ability) {
    this.id = ability.id;
    this.name = ability.name;
    this.types = ability.types;
    this.description = ability.description;
    this.energyCost = ability.energyCost;
    this.rarity = ability.rarity;

    this.passive = ability.passive;
    this.active = ability.active;
    this.trigger = ability.trigger;
  }
}

export class Activatable {
  activationTime: number;
  nextActivationTime: number;
  energyCost: number;
  activated: (parent: Entity, target: Entity) => void;

  constructor(activationTime: number, energyCost: number, activated: (parent: Entity, target: Entity) => void) {
    this.nextActivationTime = 0;

    this.energyCost = energyCost;
    this.activationTime = activationTime;
    this.activated = activated;
  }
  activate(parent: Entity, target: Entity, time: number) {
    if (time > this.nextActivationTime && parent.energy >= this.energyCost) {
      this.activated(parent, target);
      parent.energy -= this.energyCost;
      this.nextActivationTime = time + this.activationTime;
    }
  }
}

export class Appliable {
  applied: (parent: Entity, target: Entity) => void;
  constructor(applied: (parent: Entity, target: Entity) => void) {
    this.applied = applied;
  }
}

export class Triggerable {
  eventName: string;
  register: (parent: Entity) => void;
  triggered: (parent: Entity) => void;

  constructor(eventName: string, register: (parent: Entity) => void, triggered: (parent: Entity) => void) {
    this.eventName = eventName;
    this.register = register;
    this.triggered = triggered;
  }
}
export enum Rarity {
  Common,
  Uncommon,
  Rare,
  Legendary,
  Mythic
}

export enum CardType {
  Passive,
  Active,
  Trigger,
  Growth
}
