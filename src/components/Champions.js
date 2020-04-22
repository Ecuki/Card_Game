import React, { useState } from "react";
import _ from "lodash";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const getRandomChampions = (array, n) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};
const championsToObject = (arr, champions) => {
  let championsObj = {};
  arr.map((item) => (championsObj[item] = champions[item]));
  return championsObj;
};

function Champions({ champions }) {
  const championsList = _.keys(champions);
  const championsInHand = 5;
  const championsInGame = getRandomChampions(
    championsList,
    championsInHand * 2
  );

  const [gameData, setGameData] = useState({
    champions: championsToObject(championsInGame, champions),
    columns: {
      "column-1": {
        id: "column-1",
        title: "Player 1",
        championIds: championsInGame.slice(0, championsInHand),
      },
      "column-2": {
        id: "column-2",
        title: "P 1 T",
        championIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "P 2 T",
        championIds: [],
      },
      "column-4": {
        id: "column-4",
        title: "Player 2",
        championIds: championsInGame.slice(championsInHand),
      },
    },
    columnOrder: ["column-1", "column-2", "column-3", "column-4"],
    players: { player1: true, player2: false },
  });

  function onDragEnd(result) {
    document.body.style.color = "inherit";
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = gameData.columns[source.droppableId];
    const finish = gameData.columns[destination.droppableId];

    if (start === finish) {
      const newChamiponIds = Array.from(start.championIds);

      newChamiponIds.splice(source.index, 1);
      newChamiponIds.splice(destination.index, 0, draggableId);

      console.log(newChamiponIds);
      const newColumn = {
        ...start,
        championIds: newChamiponIds,
      };
      return setGameData({
        ...gameData,
        columns: { ...gameData.columns, [newColumn.id]: newColumn },
        players: {
          player1: !gameData.players.player1,
          player2: !gameData.players.player2,
        },
      });
    }

    const startChamiponIds = Array.from(start.championIds);
    startChamiponIds.splice(source.index, 1);

    const newStart = {
      ...start,
      championIds: startChamiponIds,
    };
    const finishChampionIds = Array.from(finish.championIds);
    finishChampionIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      championIds: finishChampionIds,
    };

    const newGameData = {
      ...gameData,
      columns: {
        ...gameData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
      players: {
        player1: !gameData.players.player1,
        player2: !gameData.players.player2,
      },
    };
    setGameData(newGameData);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {gameData.columnOrder.map((columnId) => {
        const column = gameData.columns[columnId];
        const playerChampions = column.championIds.map(
          (cardId) => gameData.champions[cardId]
        );
        return (
          <Column
            key={column.id}
            column={column}
            champions={playerChampions}
            players={gameData.players}
          />
        );
      })}
    </DragDropContext>
  );
}
export default Champions;
