import React, { Component, FC } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Card } from 'components/Card/Card';
import { Ability } from 'components/BattleMode/Ability';
interface DroppableListProps {
  abilitiesList: Ability[];
  droppableID: string;
}
export const DroppableList: FC<DroppableListProps> = ({ abilitiesList, droppableID }) => {
  const grid = 30;

  const getListStyle = (isDraggingOver: boolean, itemsLength: number) => ({
    background: 'white',
    display: 'flex',
    padding: grid,
    width: '90%',
    height: '300px',
    border: '1px solid #ccc'
  });
  return (
    <Droppable direction="horizontal" droppableId={droppableID}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver, abilitiesList.length)}
        >
          {abilitiesList.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <Card
                    ability={item}
                    isDragging={snapshot.isDragging}
                    draggableStyle={provided.draggableProps.style}
                  ></Card>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
