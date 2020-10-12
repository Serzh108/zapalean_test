import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import randomColor from '../../helper/randomColor';
import amountPercent from '../../helper/amountPercent';
import NewPath from './NewPath';
import styles from './PieChart.module.css';

const CENTER_X = 200;
const CENTER_Y = 200;
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
  // const amountPercent = arr => {
  //   let sum = arr.reduce((acc, el) => acc + Number(el.amount), 0);
  //   sum = sum === 0 ? 1 : sum;
  //   const arrPercent = [...arr];
  //   arr.reduce((acc, item, idx) => {
  //     acc =
  //       idx === 0 ? Number(item.amount) / sum : Number(item.amount) / sum + acc;
  //     arrPercent[idx] = { ...arrPercent[idx], amount: acc };
  //     return acc;
  //   }, 0);
  //   return arrPercent;
  // };
  items[0].amount
    ? console.log('!!!!!!!!!!!items + true')
    : console.log('!!!!!!!!!!!items - false');
  const percentArr = items[0].amount
    ? amountPercent(items)
    : amountPercent(amountArr);
  // const percentArr = amountPercent(amountArr);
  // const percentArr = amountPercent(items);
  // ==========----------=============

  let prevX = CENTER_X;
  let prevY = CENTER_Y - RADIUS;
  let prevAmount = 0;

  const coord = (item, idx, iArr) => {
    const { name, amount, id } = item;
    // console.log('amount = ', amount, ' iArr = ', iArr, ' id = ', id);
    const angle = Math.PI * 2 * amount;
    const x = Math.round(CENTER_X - RADIUS * Math.cos(angle));
    const y = Math.round(CENTER_Y + RADIUS * Math.sin(angle));
    // =================-----------===========
    const amountL =
      id === 0
        ? amount / 2
        : iArr[id - 1].amount + (iArr[id].amount - iArr[id - 1].amount) / 2;
    const angleL = Math.PI * 2 * amountL;
    const xA = Math.round(CENTER_X - (RADIUS + 20) * Math.cos(angleL));
    const yA = Math.round(CENTER_Y + (RADIUS + 20) * Math.sin(angleL));
    // =================-----------===========
    // const newD = `M115,115 L190,35 A110,110 1 0,1 ${y},${x} z`;
    const newD = `M${CENTER_X},${CENTER_Y} L${prevX},${prevY} A${RADIUS},${RADIUS} 1 ${
      amount - prevAmount > 0.5 ? 1 : 0
    },1 ${y},${x} z`;
    // ===============----===========
    prevX = y;
    prevY = x;
    prevAmount = amount;
    // ===============----===========

    // const currentColor = randomColor();
    // const newPath = (
    //   <>
    //     <path key={`path${id}`} style={{ fill: currentColor }} d={newD}></path>
    //     <polyline
    //       key={`polyline${id}`}
    //       points={`${CENTER_X},${CENTER_Y} ${yA},${xA} ${
    //         yA >= CENTER_X ? yA + 15 : yA - 15
    //       },${xA}`}
    //       style={{ fill: 'none', stroke: currentColor }}
    //     />
    //     <text
    //       key={`text${id}`}
    //       x={yA >= CENTER_X ? yA + 20 : yA - 56}
    //       y={xA + 4}
    //       fill={currentColor}
    //     >
    //       {name}
    //     </text>
    //   </>
    // );
    const params = { id, newD, CENTER_X, CENTER_Y, xA, yA, name };
    return <NewPath params={params} />;
    // return newPath;
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
