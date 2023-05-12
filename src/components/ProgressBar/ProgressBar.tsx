import { FC } from 'react';
import styled from 'styled-components';

const Hit = styled.div`
  background: rgba(223, 87, 87, 0.6);
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 5px;
  right: 5px;

  transition: width 0.5s linear;
`;

const Bar = styled.div`
  background: ${props => props.color};
  width: 100%;
  height: 10px;
  position: relative;

  transition: width 0.6s cubic-bezier(0.47, 1.64, 0.41, 0.8);
`;

const HealthBar = styled.div`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 300px;
  height: 20px;
  padding: 5px;
  background: #ddd;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  position: relative;
  font-size: 10px;
  color: white;
`;
interface ProgressBarProps {
  maxHp: number;
  hp: number;
  color: any;
}
export const ProgressBar: FC<ProgressBarProps> = ({ maxHp, hp, color }) => {
  const barWidth = (hp / maxHp) * 100;
  // setHitWidth((damage / hp) * 100);
  // setBarWidth((hpLeft / maxHp) * 100);
  return (
    <div>
      <HealthBar>
        <Bar color={color} style={{ width: `${barWidth}%` }}></Bar>
        <Hit style={{ width: `${0}%` }}></Hit>

        <div
          style={{
            position: 'absolute',
            top: '5px',
            left: 0,
            right: 0,
            textAlign: 'center'
          }}
        >
          {hp} / {maxHp}
        </div>
      </HealthBar>

      <br />
    </div>
  );
};
