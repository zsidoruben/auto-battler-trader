import { FC, useState } from 'react';
import { Ability } from 'components/BattleMode/Ability';
import { DragDropContext, DragUpdate, Draggable, DraggableLocation, DropResult, Droppable } from 'react-beautiful-dnd';
import { Card } from 'components/Card/Card';

interface CardHolderProps {
  unlockedAbilitiesList: Ability[];
  equippedAbilities?: Ability[];
}

export const DeckbuildingPage: FC<CardHolderProps> = ({ unlockedAbilitiesList, equippedAbilities = [] }) => {
  const [equippedList, setEquippedList] = useState<Ability[]>(equippedAbilities);
  const [unlockedList, setUnlockedList] = useState(unlockedAbilitiesList);
  const grid = 30;
  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    //padding: grid * 2,
    width: '150px',
    height: '250px',
    margin: `0 ${grid}px 0 0`,

    // change background colour if dragging
    //background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getListStyle = (isDraggingOver: boolean, itemsLength: number) => ({
    background: 'white',
    display: 'flex',
    padding: grid,
    width: '90%',
    height: '300px',
    border: '5px solid #001b39',
    'border-radius': '10px'
  });

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
        const newList = equippedList.filter((item, index) => index !== source.index);
        newList.splice(destination.index, 0, equippedList[source.index]);
        setEquippedList(equippedList => [...newList]);
      }
    } else {
      if (start === 'unlocked' && end === 'equipped') {
        const newUnlockedList = unlockedList.filter((item, index) => index !== source.index);
        const newEquippedList = [...equippedList];
        newEquippedList.splice(destination.index, 0, unlockedList[source.index]);
        setUnlockedList(unlockedList => [...newUnlockedList]);
        setEquippedList(equippedList => [...newEquippedList]);
      } else if (start === 'equipped' && end === 'unlocked') {
        console.log('Visszafele huzas');
        const newEquippedList = equippedList.filter((item, index) => index !== source.index);
        const newUnlockedList = [...unlockedList];
        newUnlockedList.splice(destination.index, 0, equippedList[source.index]);
        setUnlockedList(unlockedList => [...newUnlockedList]);
        setEquippedList(equippedList => [...newEquippedList]);
      }
    }
  }

  return (
    <DragDropContext onDragEnd={result => endDrag(result)}>
      <Droppable direction="horizontal" droppableId="equipped">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver, equippedList.length)}
          >
            {equippedList.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                  >
                    <Card ability={item}></Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable direction="horizontal" droppableId="unlocked">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver, unlockedList.length)}
          >
            {unlockedList.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                  >
                    <Card ability={item}></Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
