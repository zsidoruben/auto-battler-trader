import React from 'react';
import styles from './styles.module.css';
import { Ability } from '../BattleMode';
import { element } from 'prop-types';

interface CardProps{
    ability: Ability;
}

export const Card = ({ability}: CardProps) => {

  return (
    <div className={styles.card}>
      <img className={styles.frame} src="images/ImageFrame.png" />
      <img className={styles.cardBackground} src="images/Card.png" />
      <img className={styles.banner} src="images/Banner.png" />
      <img className={styles.energy} src='images/Energy.png'></img>
    </div>
  );
};
