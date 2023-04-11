import { StatModifier } from './StatModifier';

class CharacterStat {
  public hasMin = false;
  public min = 0;
  public BaseValue: number;

  protected isDirty = true;
  protected lastBaseValue: number;

  private _value: number;
  public get Value(): number {
    if (this.isDirty || this.lastBaseValue !== this.BaseValue) {
      this.lastBaseValue = this.BaseValue;
      this._value = this.CalculateFinalValue();
      this.isDirty = false;
    }
    if (this.hasMin) {
      return this.min;
    }
    return this._value;
  }

  protected statModifiers: StatModifier[];

  constructor(baseValue: number) {
    this.statModifiers = [];
    this.BaseValue = baseValue;
    this._value = baseValue;
    this.lastBaseValue = baseValue;
  }

  public AddModifier(mod: StatModifier): void {
    this.isDirty = true;
    this.statModifiers.push(mod);
  }

  public RemoveModifier(mod: StatModifier): boolean {
    const index = this.statModifiers.indexOf(mod);
    if (index !== -1) {
      this.statModifiers.splice(index, 1);
      this.isDirty = true;
      return true;
    }
    return false;
  }

  public RemoveModifiersFromSource(source: object): void {
    for (let i = this.statModifiers.length - 1; i >= 0; i--) {
      if (this.statModifiers[i].source === source) {
        this.statModifiers.splice(i, 1);
        this.isDirty = true;
      }
    }
  }

  protected CompareModifierOrder(
    a: StatModifier,
    b: StatModifier,
  ): number {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  }

  protected CalculateFinalValue(): number {
    let finalValue = this.BaseValue;
    let sumPercentAdd = 0;

    this.statModifiers.sort(this.CompareModifierOrder);

    for (let i = 0; i < this.statModifiers.length; i++) {
      const mod = this.statModifiers[i];

      if (mod.type === 100 /* Flat */) {
        finalValue += mod.value;
      } else if (mod.type === 200 /* PercentAdd */) {
        sumPercentAdd += mod.value;

        if (
          i + 1 >= this.statModifiers.length ||
          this.statModifiers[i + 1].type !== 200 /* PercentAdd */
        ) {
          finalValue *= 1 + sumPercentAdd;
          sumPercentAdd = 0;
        }
      } else if (mod.type === 300 /* PercentMult */) {
        finalValue *= mod.value;
      }
    }

    // Workaround for floating-point calculation errors
    return Math.round(finalValue * 10000) / 10000;
  }
}
