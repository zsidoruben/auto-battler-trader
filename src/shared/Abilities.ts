import { Ability, Rarity } from 'components/BattleMode/Ability';
import { Attribute } from 'components/BattleMode/Attribute';
import { Entity } from 'components/BattleMode/Entity';

const fireResistance: Ability = new Ability(
  'Fire Resistance',
  1,
  'Gain 10 Fire Resistance.',
  2,
  Rarity.Common,
  (parent: Entity) => {
    parent.addAttribute(new Attribute('Fire Resistance', 10));
  }
);

const darkDamage: Ability = new Ability(
  'Dark Damage',
  2,
  'Gain 10 Dark Damage.',
  2,
  Rarity.Uncommon,
  (parent: Entity) => {
    parent.addAttribute(new Attribute('Dark Damage', 10));
  }
);
const versatileOffense: Ability = new Ability(
  'Versatile Offense',
  3,
  'Gain exponentional Fire Damage based on the number of different damage type attributes.',
  8,
  Rarity.Rare,
  (parent: Entity) => {
    const damageAttributeCount = parent.attributes.filter(a => a.name.toLowerCase().includes('damage')).length;
    console.log('Damage Attributes Count: ' + damageAttributeCount);
    parent.addAttribute(new Attribute('Fire Damage', Math.pow(damageAttributeCount, 2)));
  }
);

const darkKnight: Ability = new Ability(
  'Dark Knight',
  4,
  'At the start of the game summon a Dark Knight',
  5,
  Rarity.Legendary,
  (parent: Entity) => {}
);
const energySyphon: Ability = new Ability(
  'Energy Syphon',
  5,
  'Every 5 seconds, steal 5 energy from the opponent from their lowest energy source',
  3,
  Rarity.Mythic,
  (parent: Entity) => {}
);
const burningBlood: Ability = new Ability(
  'Burning Blood',
  6,
  'Your Blood burns. Gain 1 stack of burning every time you get hit.',
  1,
  Rarity.Common,
  (parent: Entity) => {}
);
const PhoenixBloodline: Ability = new Ability(
  'Phoenix Bloodline',
  7,
  'Once per battle when you would die, regenerate 30% hp.',
  10,
  Rarity.Mythic,
  (parent: Entity) => {}
);
export const allAbilities = [
  fireResistance,
  darkDamage,
  versatileOffense,
  darkKnight,
  energySyphon,
  burningBlood,
  PhoenixBloodline
];
