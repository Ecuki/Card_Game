import React from "react";

import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import Card from "./Card";

const Container = styled.div`
  margin: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: flex;
  z-index: 998;
`;

export default function Champion({ champion, index, players, column }) {
  // console.log(players);
  // console.log(column);
  return (
    <Draggable
      draggableId={champion.id}
      index={index}
      isDragDisabled={
        (column.id === "column-1" && players.player1) ||
        (column.id === "column-4" && players.player2)
          ? false
          : true
      }
    >
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <Card champion={champion} />
        </Container>
      )}
    </Draggable>
  );
}
