import { FC, useState, useContext } from 'react';
import { Ability } from 'components/BattleMode/Ability';
import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { EquippedContext, EquippedContextType } from 'shared/EquippedContext';
import { DroppableList } from 'components/DroppableList/DroppableList';
interface CardHolderProps {
  unlockedAbilitiesList: Ability[];
  equippedAbilities?: Ability[];
}

export const Deckbuilding: FC<CardHolderProps> = ({ unlockedAbilitiesList }) => {
  const { equippedAbilities, changeEquippedList } = useContext(EquippedContext) as EquippedContextType;
  const [unlockedList, setUnlockedList] = useState(
    unlockedAbilitiesList.filter(ability => !equippedAbilities.includes(ability))
  );
  function endDrag(result: DropResult): void {
    //if there is no destination return
    if (!result.destination) {
      return;
    }
    const destination: DraggableLocation = result.destination;
    const source: DraggableLocation = result.source;
    //if we are not moving it, return.
    if (source.droppableId === destination.droppableId && destination.index === source.index) {
      return;
    }

    const start = source.droppableId;
    const end = destination.droppableId;

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      if (start === 'unlocked') {
        const newList = unlockedList.filter((item, index) => index !== source.index);
        newList.splice(destination.index, 0, unlockedList[source.index]);
        setUnlockedList(unlockedList => [...newList]);
      } else if (start === 'equipped') {
        const newList = equippedAbilities.filter((item, index) => index !== source.index);
        newList.splice(destination.index, 0, equippedAbilities[source.index]);
        changeEquippedList([...newList]);
      }
    } else {
      if (start === 'unlocked' && end === 'equipped') {
        const newUnlockedList = unlockedList.filter((item, index) => index !== source.index);
        const newEquippedList = [...equippedAbilities];
        newEquippedList.splice(destination.index, 0, unlockedList[source.index]);
        setUnlockedList(unlockedList => [...newUnlockedList]);
        changeEquippedList([...newEquippedList]);
      } else if (start === 'equipped' && end === 'unlocked') {
        console.log('Visszafele huzas');
        const newEquippedList = equippedAbilities.filter((item, index) => index !== source.index);
        const newUnlockedList = [...unlockedList];
        newUnlockedList.splice(destination.index, 0, equippedAbilities[source.index]);
        setUnlockedList(unlockedList => [...newUnlockedList]);
        changeEquippedList([...newEquippedList]);
      }
    }
  }

  //const energyTotal = equippedList.reduce((total, current) => total + current.energyCost, 0);
  return (
    <>
      <h1>Deck Building Screen</h1>
      <h4>Your current Heart Deck:</h4>
      <DragDropContext onDragEnd={result => endDrag(result)}>
        <DroppableList abilitiesList={equippedAbilities} droppableID="equipped" />
        <h4>Collection:</h4>
        <DroppableList abilitiesList={unlockedList} droppableID="unlocked" />
      </DragDropContext>
    </>
  );
};
