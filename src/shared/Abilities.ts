import { Ability, Activatable, Appliable, CardType, Rarity } from 'components/BattleMode/Ability';
import { Attribute } from 'components/BattleMode/Attribute';
import { Entity } from 'components/BattleMode/Entity';
import { debug } from 'console';

const createAttribute = (name: string, baseValue: number) => {
  return new Appliable((parent: Entity) => {
    parent.addAttribute(name, baseValue);
  });
};

const createTryHit = (damage: number) => {
  return (parent: Entity, target: Entity) => target.tryHit(damage);
};
const createTryHitWithAttribute = (multiplier: number, attributeName: string) => {
  return (parent: Entity, target: Entity) => target.tryHit(parent.getAttribute(attributeName) * multiplier);
};
const kickActive = new Activatable(1, 10, createTryHitWithAttribute(0.5, 'Physical'));

const frontKick = new Ability({
  id: 1,
  name: 'Front Kick',
  types: [CardType.Active, CardType.Passive],
  description: 'Deal physical damage every 2 seconds.',
  energyCost: 2,
  rarity: Rarity.Common,
  passive: createAttribute('Physical', 10),
  active: kickActive,
  trigger: null
});

const telepathyActive = new Activatable(2, 17, createTryHitWithAttribute(2, 'Mental'));

interface ActiveProps {
  activationTime: number;
  energyCost: number;
  activated: (parent: Entity, target: Entity) => void;
}

//const createActive = (multiplier: number) => {

const telepathy = new Ability({
  id: 2,
  name: 'Telepathy',
  types: [CardType.Active, CardType.Passive],
  description: 'Deal Mental damage 10 times every 2 seconds.',
  energyCost: 2,
  rarity: Rarity.Rare,
  passive: createAttribute('Mental', 17),
  active: telepathyActive,
  trigger: null
});

export const allAbilities = [frontKick, telepathy];

function mostCommon(arr: string[]) {
  return arr.sort((a, b) => arr.filter(v => v === a).length - arr.filter(v => v === b).length).pop();
}
console.log(mostCommon(['asdasd', 'b', 'c', 'd', 'e', 'f', 'g', 'asdasd']));
