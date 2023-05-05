import { FC, useContext, useEffect, useState } from 'react';
import { Entity } from './Entity';
import { findGcd } from './GDC';
import { Attribute } from './Attribute';
import { EquippedContext, EquippedContextType } from 'shared/EquippedContext';
import { Card } from 'components/Card/Card';
import styled from 'styled-components';
import { ProgressBar } from 'components/ProgressBar/ProgressBar';
import { fail } from 'assert';

const CardContainer = styled.div`
  display: flex;
  padding: 30px;
  width: 90%;
  height: 300px;
  border: 1px solid #ccc;
  background: white;
`;
export const BattleMode: FC = () => {
  const { equippedAbilities, changeEquippedList } = useContext(EquippedContext) as EquippedContextType;
  const [time, setTime] = useState<number>(0);
  const [playSpeed, setPlaySpeed] = useState<number>(1);
  const [player, SetPlayer] = useState<Entity>(new Entity('Rubenatya', 100, 2, 2));
  const [enemy, SetEnemy] = useState<Entity>(new Entity('Enemy', 100, 1.2, 3));
  const [battleOngoing, setBattleOngoing] = useState<boolean>(false);
  const [winner, setWinner] = useState<Entity | null>(null);

  useEffect(() => {
    equippedAbilities.forEach(ability => {
      player.addAbility(ability);
    });
  }, [equippedAbilities]);
  useEffect(() => {
    if (!battleOngoing) {
      return;
    }
    setTimeout(() => {
      setTime(prevTime => prevTime + 0.01);
    }, 10 * playSpeed);
  }, [time, battleOngoing]);

  useEffect(() => {
    if (player.isDead === false && enemy.isDead === false) {
      player.activeAbilities.forEach(ability => {
        if (ability.active?.nextActivationTime) {
          ability.active?.activate(player, enemy, time);
        }
      });

      enemy.activeAbilities.forEach(ability => {
        if (ability.active?.nextActivationTime) {
          ability.active?.activate(player, enemy, time);
        }
      });
    } else {
      setBattleOngoing(false);
      if (player.isDead == false && enemy.isDead === true) {
        setWinner(() => player);
      } else if (player.isDead === true && enemy.isDead === false) {
        setWinner(() => enemy);
      }
    }
  }, [time]);

  const gameStart = () => {
    //TODO: reset all entities abilities, attributes, statuses and resources

    //TODO: apply abilities
    setBattleOngoing(true);
  };

  return (
    <>
      <h1>Battle Screen</h1>
      <h3>{time.toFixed()}</h3>
      <div>
        <span>
          <ProgressBar maxHp={player.maxHealth} hp={player.health} />
        </span>
        <span style={{ float: 'right' }}>
          <ProgressBar maxHp={enemy.maxHealth} hp={enemy.health} />
        </span>
        <span>
          <img
            height="200px"
            style={{ transform: 'scaleX(-1)' }}
            src="https://cdn.dribbble.com/users/3312991/screenshots/6152604/warrior-idle.gif"
            alt=""
          />
        </span>
        <span>
          <img
            height="200px"
            style={{ float: 'right' }}
            src="https://cdn.dribbble.com/users/3312991/screenshots/6152604/warrior-idle.gif"
            alt=""
          />
        </span>
      </div>
      <h4>Your current Heart Deck:</h4>
      <CardContainer>
        {equippedAbilities.map(ability => {
          return <Card ability={ability} />;
        })}
      </CardContainer>
      <button onClick={() => gameStart()}>Start Battle</button>
      <button onClick={() => setPlaySpeed(() => 0.5)}>x2</button>
      <button onClick={() => setPlaySpeed(() => 0.2)}>x5</button>
      <button onClick={() => setPlaySpeed(() => 0.1)}>x10</button>
      <button onClick={() => setPlaySpeed(() => 0.001)}>x1000</button>
    </>
  );
};
