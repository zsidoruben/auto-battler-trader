import { Card } from 'components/Card/Card';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { Ability, Attribute, Entity, Rarity } from 'components';
import {
  DragDropContext,
  DropResult,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';

interface CardHolderProps {
  cards: Ability[];
}

export const CardHolder = ({ cards }: CardHolderProps) => {
  const [abilityList, setAbilityList] = useState(cards);
  const reorder = (
    list: Ability[],
    startIndex: number,
    endIndex: number,
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

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

  const endDrag = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      abilityList,
      result.source.index,
      result.destination.index,
    );
    setAbilityList(items);
  };
  return (
    <DragDropContext onDragEnd={endDrag}>
      <Droppable direction="horizontal" droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(
              snapshot.isDraggingOver,
              abilityList.length,
            )}
            {...provided.droppableProps}
          >
            {abilityList.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    className={styles.main}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                    )}
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
