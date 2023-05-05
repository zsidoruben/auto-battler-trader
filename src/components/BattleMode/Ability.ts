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

  constructor(
    id: number,
    name: string,
    type: CardType[],
    description: string,
    energyCost: number,
    rarity: Rarity,
    passive: Appliable | null,
    active: Activatable | null,
    triggerable: Triggerable | null
  ) {
    this.id = id;
    this.name = name;
    this.types = type;
    this.description = description;
    this.energyCost = energyCost;
    this.rarity = rarity;

    this.passive = passive;
    this.active = active;
    this.trigger = triggerable;
  }

  activate(target: Entity, time: number) {}
}

export class Activatable {
  activationTime: number;
  nextActivationTime: number;
  activated: (parent: Entity, target: Entity) => void;

  constructor(activationTime: number, activated: (parent: Entity, target: Entity) => void, instantAttack: boolean) {
    if (instantAttack) {
      this.nextActivationTime = 0;
    } else {
      this.nextActivationTime = activationTime;
    }
    this.activationTime = activationTime;
    this.activated = activated;
  }
  activate(parent: Entity, target: Entity, time: number) {
    if (time > this.nextActivationTime) {
      this.activated(parent, target);
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
