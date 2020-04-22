import React from "react";
import { useAPI } from "react-api-hooks";
import styled from "styled-components";
import _ from "lodash";
const url = `http://ddragon.leagueoflegends.com/cdn/10.8.1/data/en_US/item.json`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function Items() {
  const { data, error, isLoading } = useAPI(url);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>error</div>;
  console.log(data);
  return (
    <Container>
      {_.keys(data.data).map((key) => (
        <>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/10.8.1/img/item/${data.data[key].image.full}`}
            style={{ width: "20px", height: "20px" }}
          />
          <span>{key}</span>
        </>
      ))}
    </Container>
  );
}

//3073 mana
//atak 1036
//def 1054
//life 1028
export default Items;
