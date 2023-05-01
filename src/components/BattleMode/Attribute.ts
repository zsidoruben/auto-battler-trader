import { StatModType, StatModifier } from './StatModifier';
export class Attribute {
  public name: string;
  public baseValue: number;
  public get Value() {
    return (
      this.baseValue +
      ((this.statModifier
        .filter(stat => stat.type === StatModType.Flat)
        .reduce((sum, current) => sum + current.value, 0) *
        this.statModifier
          .filter(stat => stat.type === StatModType.PercentAdd)
          .reduce((sum, current) => sum + current.value, 0)) /
        100) *
        this.statModifier
          .filter(stat => stat.type === StatModType.PercentMult)
          .reduce((sum, current) => sum + current.value, 0)
    );
  }

  public statModifier: StatModifier[];

  constructor(name: string, value: number, StatModifier: StatModifier[] = []) {
    this.name = name;
    this.baseValue = value;
    this.statModifier = StatModifier;
  }
  addStatModifier(statMod: StatModifier) {
    if (!statMod.type) {
      return;
    }
    if (statMod.type === StatModType.Flat) {
    }
  }
}
