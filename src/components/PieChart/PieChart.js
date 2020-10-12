import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import amountPercent from '../../helper/amountPercent';
import NewPath from './NewPath';
import styles from './PieChart.module.css';

const CENTER_X = 300;
const CENTER_Y = 300;
const RADIUS = 120;

const PieChart = () => {
  const { items } = useSelector(state => state.piechart);

  // ==========----- TEMP -----=============
  const amountArr = [
    { name: 'css', amount: '2', id: 0 },
    { name: 'html', amount: '3', id: 1 },
    { name: 'react', amount: '5', id: 2 },
    { name: 'redax', amount: '5', id: 3 },
    { name: 'node', amount: '10', id: 4 },
  ];
  // ==========----- /TEMP -----=============

  const coordX = (radius, angleR) =>
    Math.round(CENTER_X - radius * Math.cos(angleR));
  const coordY = (radius, angleR) =>
    Math.round(CENTER_X + radius * Math.sin(angleR));

  const percentArr = items[0].amount
    ? amountPercent(items)
    : amountPercent(amountArr);

  let prevX = CENTER_X;
  let prevY = CENTER_Y - RADIUS;
  let prevAmount = 0;

  const coord = (item, idx, iArr) => {
    const { name, amount, id, color } = item;
    const angle = Math.PI * 2 * amount;
    const x = coordX(RADIUS, angle);
    const y = coordY(RADIUS, angle);
    // const x = Math.round(CENTER_X - RADIUS * Math.cos(angle));
    // const y = Math.round(CENTER_Y + RADIUS * Math.sin(angle));
    // =================-----------===========
    const amountL =
      id === 0
        ? amount / 2
        : iArr[id - 1].amount + (iArr[id].amount - iArr[id - 1].amount) / 2;
    const angleL = Math.PI * 2 * amountL;
    const xA = coordX(RADIUS + 16, angleL);
    const yA = coordY(RADIUS + 16, angleL);
    // const xA = Math.round(CENTER_X - (RADIUS + 16) * Math.cos(angleL));
    // const yA = Math.round(CENTER_Y + (RADIUS + 16) * Math.sin(angleL));
    // =-=-=-=-=
    const xL0 = coordX(RADIUS, angleL);
    const yL0 = coordY(RADIUS, angleL);
    // const xL0 = Math.round(CENTER_X - (RADIUS) * Math.cos(angleL));
    // const yL0 = Math.round(CENTER_Y + (RADIUS) * Math.sin(angleL));
    // =-=-=-=-=
    // =================-----------===========
    const newD = `M${CENTER_X},${CENTER_Y} L${prevX},${prevY} A${RADIUS},${RADIUS} 1 ${
      amount - prevAmount > 0.5 ? 1 : 0
    },1 ${y},${x} z`;
    // ===============----===========
    prevX = y;
    prevY = x;
    prevAmount = amount;
    // ===============----===========
    const params = {
      id,
      newD,
      CENTER_X,
      CENTER_Y,
      xA,
      yA,
      xL0,
      yL0,
      name,
      color,
    };
    return <NewPath key={`path${id}`} params={params} />;
  };

  return (
    <>
      <div>
        <svg className={styles.pie}>
          <circle cx={CENTER_X} cy={CENTER_Y} r={RADIUS}></circle>
          {percentArr.map((item, idx, iArr) => coord(item, idx, iArr))}
        </svg>
      </div>

      <p className={styles.form_link}>
        <NavLink to="/">Перейти к форме</NavLink>
      </p>
    </>
  );
};

export default PieChart;
