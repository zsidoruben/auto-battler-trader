import { FC, useState } from 'react';
import { Ability } from 'components/BattleMode/Ability';
import {
  DragDropContext,
  DragUpdate,
  Draggable,
  DraggableLocation,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';

interface CardHolderProps {
  unlockedAbilitiesList: Ability[];
  equippedAbilities?: Ability[];
}

export const CardHolder: FC<CardHolderProps> = ({
  unlockedAbilitiesList,
  equippedAbilities = [],
}) => {
  const [equippedList, setEquippedList] =
    useState<Ability[]>(equippedAbilities);
  const [unlockedList, setUnlockedList] = useState(unlockedAbilitiesList);
  const grid = 30;
  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    //padding: grid * 2,
    width: 200,
    height: '300px',
    margin: `0 ${grid}px 0 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: boolean, itemsLength: number) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    width: '100%',
  });

  function endDrag(result: DropResult): void {
    //if there is no destination return
    if (!result.destination) {
      return;
    }
    const destination: DraggableLocation = result.destination;
    const source: DraggableLocation = result.source;
    //if we are not moving it, return.
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = source.droppableId;
    const end = destination.droppableId;

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      if (start === 'equipped') {
        const newList = equippedList.filter(
          (item, index) => index !== source.index,
        );
        newList.splice(destination.index, 0, equippedList[source.index]);
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
            style={getListStyle(
              snapshot.isDraggingOver,
              equippedList.length,
            )}
          >
            {equippedList.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                    )}
                  >
                    {item.description}
                    {/*<Card ability={item}></Card>*/}
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
            style={getListStyle(
              snapshot.isDraggingOver,
              unlockedList.length,
            )}
          >
            {unlockedList.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={(item.id + 100).toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                    )}
                  >
                    {item.description}
                    {/*<Card ability={item}></Card>*/}
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
