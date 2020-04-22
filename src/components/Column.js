import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import texture from "../assets/texture.png";

import Champion from "./Champion";

const Container = styled.div`
  border: 1px solid gold;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("${texture}");
  background-repeat:repeat;
  opacity:0.9;

  background-position: center;
  border-radius:5px
`;
const Title = styled.h3`
  padding: 8px;
  margin-top: 0;
  color: white;
  width: 100%;
  color: ${(props) => (props.active ? "gold" : "white")};
`;

const ChampionsList = styled.div`
  transition: background-color 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 80vw;
`;

const Column = ({ column, champions, players }) => {
  return (
    <Container>
      {column.id === "column-1" && (
        <Title active={players.player1}>{column.title}</Title>
      )}
      <Droppable
        droppableId={column.id}
        type={
          column.id === "column-1" || column.id === "column-2"
            ? "player1"
            : "player2"
        }
        direction="horizontal"
      >
        {(provided, snapshot) => (
          <ChampionsList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {champions.map((champion, index) => (
              <Champion
                key={champion.id}
                champion={champion}
                index={index}
                players={players}
                column={column}
              />
            ))}
            {provided.placeholder}
          </ChampionsList>
        )}
      </Droppable>
      {column.id === "column-4" && (
        <Title active={players.player2}>{column.title}</Title>
      )}
    </Container>
  );
};

export default Column;
