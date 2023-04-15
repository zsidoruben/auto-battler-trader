import { Ability, Attribute, Entity, Rarity } from 'components';
/*export const versatileOffense: Ability = new Ability(
  'Versatile Offense',
  1,
  5,
  Rarity.Rare,
  (parent: Entity) => {
    const damageAttributeCount = parent.attributes.filter(a =>
      a.name.toLowerCase().includes('damage'),
    ).length;
    console.log('Damage Attributes Count: ' + damageAttributeCount);
    parent.addAttribute(
      new Attribute('Fire Damage', Math.pow(damageAttributeCount, 2)),
    );
  },
);
*/
