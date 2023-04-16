import { CardHolder } from 'components';
import { Ability } from 'components/BattleMode/Ability';
import { FC, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

interface DeckBuildingProps {
  unlockedAbilitiesList: Ability[];
  equippedAbilities?: Ability[];
}
export const DeckBuilding: FC<DeckBuildingProps> = ({
  unlockedAbilitiesList,
  equippedAbilities = [],
}) => {
  const [equippedList, setEquippedList] =
    useState<Ability[]>(equippedAbilities);
  const [unlockedList, setUnlockedList] = useState(unlockedAbilitiesList);

  const endDrag = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
  };

  /*const reorder = (
    list: Ability[],
    startIndex: number,
    endIndex: number,
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
*/
  return (
    <>
      <CardHolder
        equippedAbilities={equippedList}
        unlockedAbilitiesList={unlockedAbilitiesList}
      />
    </>
  );
};
