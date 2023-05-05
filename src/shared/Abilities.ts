import { Ability, Activatable, Appliable, CardType, Rarity } from 'components/BattleMode/Ability';
import { Attribute } from 'components/BattleMode/Attribute';
import { Entity } from 'components/BattleMode/Entity';

/*const fireResistance: Ability = new Ability(
  1,
  'Fire Resistance',
  [CardType.Passive],
  'Gain 10 Fire Resistance.',
  2,
  Rarity.Common,
  (parent: Entity) => {
    parent.addAttribute(new Attribute('Fire Resistance', 10));
  }
);

const darkDamage: Ability = new Ability(
  2,
  'Dark Damage',
  [CardType.Passive],
  'Gain 10 Dark Damage.',
  2,
  Rarity.Uncommon,
  (parent: Entity) => {
    parent.addAttribute(new Attribute('Dark Damage', 10));
  }
);
const versatileOffense: Ability = new Ability(
  3,
  'Versatile Offense',
  [CardType.Passive],
  'Gain exponentional Fire Damage based on the number of different damage type attributes you have.',
  8,
  Rarity.Rare,
  (parent: Entity) => {
    const damageAttributeCount = parent.attributes.filter(a => a.name.toLowerCase().includes('damage')).length;
    console.log('Damage Attributes Count: ' + damageAttributeCount);
    parent.addAttribute(new Attribute('Fire Damage', Math.pow(damageAttributeCount, 2)));
  }
);

const darkKnight: Ability = new Ability(
  4,
  'Dark Knight',
  [CardType.Active],
  'At the start of the game summon a Dark Knight',
  5,
  Rarity.Legendary,
  (parent: Entity) => {}
);*/
const punchAttribute = new Appliable((parent: Entity) => {
  parent.addAttribute(new Attribute('Punch', 5));
});
const punchPassive: Ability = new Ability(
  1,
  'Punch',
  [CardType.Passive],
  'Gain 5 Punch damage.',
  2,
  Rarity.Common,
  punchAttribute,
  null,
  null
);
const punchActive: Activatable = new Activatable(
  1,
  (parent: Entity, target: Entity) => {
    target.takeDamage(10 + parent.getAttribute('Punch') + parent.getAttribute('Physical'));
  },
  false
);
const punch = new Ability(5, 'Punch', [CardType.Active], 'Punch', 4, Rarity.Common, null, punchActive, null);
export const allAbilities = [punch, punchPassive];
