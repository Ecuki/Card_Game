import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { useSpring, animated } from "react-spring";
import life from "../assets/life.png";
import attack from "../assets/attack.png";
import def from "../assets/def.png";
import mana from "../assets/mana.png";
import { GiSwordBrandish } from "react-icons/gi";

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
`;

const Icon = styled.div`
background-image: url("${(props) => props.background}");
background-repeat:no-repeat;
background-attachment: fixed;
background-size: cover;
background-position: center;
width:20px;
height:20px;
margin:5px;
border:2px solid gold
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Number = styled.span`
  color: white;
  padding-right: 8px;
`;

const Mana = styled.span`
display: flex;
justify-content: center;
align-items:center;
background-image: url("${mana}");
background-repeat:no-repeat;
background-attachment: fixed;
background-size: cover;
background-position: center;
position:absolute;
color:white;
font-weight:900;
top:-10px;
right:-10px;
border-radius:50%;
width:25px;
height:25px;
`;
const Life = styled.span`
display: flex;
justify-content: center;
align-items:center;
background-image: url("${life}");
background-repeat:no-repeat;
background-attachment: fixed;
background-size: cover;
background-position: center;
position:absolute;
color:white;
font-weight:900;
top:-10px;
left:-10px;
border-radius:50%;
width:25px;
height:25px;
`;

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function Card({ champion }) {
  const url = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`;
  // console.log(champion);
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  return (
    <>
      <animated.div
        data-tip
        data-for={champion.id}
        className="card"
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{
          transform: props.xys.interpolate(trans),
          backgroundImage: `url("${url}")`,
          margin: "0 auto",
        }}
      >
        <StatContainer>
          <Stat>
            <Icon background={attack} />
            <Number>{Math.floor(champion.info.attack)}</Number>
          </Stat>
          <Stat>
            <Icon background={def} />
            <Number>{Math.floor(champion.info.defense)}</Number>
          </Stat>
          <Mana>{champion.info.magic}</Mana>
          <Life>{Math.floor(champion.stats.hp / 100)}</Life>
        </StatContainer>
      </animated.div>
      <ReactTooltip id={champion.id} border textColor="gold">
        <p>
          <strong>{champion.name}</strong>
        </p>
        <p>{champion.title}</p>
        <p style={{ width: 250, textAlign: "justify" }}>{champion.blurb}</p>
        <Stat>
          <span>Attack:</span>
          <Number>{Math.floor(champion.stats.attackdamage)}</Number>
          <GiSwordBrandish style={{ color: "gold" }} />
        </Stat>
        <Stat>
          <GiSwordBrandish style={{ color: "gold" }} />
          <Number>{Math.floor(champion.stats.attackdamage)}</Number>
        </Stat>
      </ReactTooltip>
    </>
  );
}
export default Card;
