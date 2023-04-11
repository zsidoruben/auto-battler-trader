export enum StatModType {
  Flat = 100,
  PercentAdd = 200,
  PercentMult = 300,
}

export class StatModifier {
  public value: number;
  public type: StatModType;
  public order: number;
  public source: any;

  constructor(
    value: number,
    type: StatModType,
    order: number,
    source: any,
  ) {
    this.value = value;
    this.type = type;
    this.order = order;
    this.source = source;
  }
}
