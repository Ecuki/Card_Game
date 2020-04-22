import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Items from "./pages/Items";
import background from "./assets/Map.png";

const language = {
  pl: "pl_PL",
  en: "en_US",
};

const Container = styled.div`
background-image: url("${background}");
background-repeat:no-repeat;
background-attachment: fixed;
background-size: cover;
background-position: center;
height:100vh;
width:100vw;
overflow:hidden;
display:flex;
justify-content:center;

`;

const Nav = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  justify-content: left;
  align-items: start;
  padding: 8px;
  color: "gold";
`;

function App() {
  return (
    <Router>
      <Container className="App">
        <Nav>
          <List>
            <li>
              <Link to="/" className="nav-element">
                >Home
              </Link>
            </li>
            <li>
              <Link to="/game" className="nav-element">
                >Game
              </Link>
            </li>
            <li>
              <Link to="/items" className="nav-element">
                >Items
              </Link>
            </li>
          </List>
        </Nav>

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/items">
            <Items />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
