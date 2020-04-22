import React from "react";
import styled from "styled-components";
import { useAPI } from "react-api-hooks";
import Champions from "../components/Champions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const url =
  "http://ddragon.leagueoflegends.com/cdn/10.8.1/data/pl_PL/champion.json";

function Game() {
  const { data, error, isLoading } = useAPI(url);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>error</div>;
  const champions = data.data;
  return (
    champions && (
      <Container>
        <Champions champions={champions} />
      </Container>
    )
  );
}
export default Game;
