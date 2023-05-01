import { Ability } from './Ability';

export enum StatModType {
  Flat = 1,
  PercentAdd = 2,
  PercentMult = 3
}

export class StatModifier {
  public value: number;
  public type: StatModType;
  public source: Ability;

  constructor(value: number, type: StatModType, source: any) {
    this.value = value;
    this.type = type;
    this.source = source;
  }
}
