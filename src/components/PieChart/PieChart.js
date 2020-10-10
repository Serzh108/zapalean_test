import React from 'react';
import styles from './PieChart.module.css';

const CENTER_X = 115;
const CENTER_Y = 115;
const RADIUS = 110;

const PieChart = () => {
  function randomColor() {
    const color = () => Math.floor(Math.random() * 255 + 1);
    return `rgb(${color()}, ${color()}, ${color()})`;
  }

  const fillA = randomColor();
  // ==========----------=============
  // const amountArr = [10, 44, 60, 36, 20, 40];
  const amountArr = [1, 2, 3, 4, 5, 5];

  const amountPercent = arr => {
    const sum = arr.reduce((acc, el) => acc + el, 0);
    console.log('sum = ', sum);
    const res = arr.map(item => item / sum);
    const a = [];
    const res1 = arr.reduce((acc, item, idx, arrayIn) => {
      acc = idx === 0 ? item / sum : item / sum + acc;
      a.push(acc);
      return acc;
    }, 0);
    console.log(' res = ', res, ' res1 = ', a);
    return a;
  };
  const percentArr = amountPercent(amountArr);
  // ==========----------=============

  let prevX = 115;
  let prevY = 5;
  let prevProc = 0;

  const coord = proc => {
    // const CENTER_X = 115;
    // const CENTER_Y = 115;
    // let prevX = 115;
    // let prevY = 5;
    // const radius = 110;
    const angle = Math.PI * 2 * proc;
    const x = Math.round(CENTER_X - RADIUS * Math.cos(angle));
    const y = Math.round(CENTER_Y + RADIUS * Math.sin(angle));
    console.log(
      `coord: ${x},${y} angle = ${angle}, prevX: ${prevX}, prevY: ${prevY}`,
    );
    // const newD = `M115,115 L190,35 A110,110 1 0,1 ${y},${x} z`;
    const newD = `M${CENTER_X},${CENTER_Y} L${prevX},${prevY} A${RADIUS},${RADIUS} 1 ${
      proc - prevProc > 0.5 ? 1 : 0
    },1 ${y},${x} z`;
    console.log('newD: ', newD);
    prevX = y;
    prevY = x;
    prevProc = proc;
    console.log('prevX: ', prevX, ', prevY = ', prevY);
    return newD;
  };
  // const coord1 = coord(0.33);

  const xX = 115;

  return (
    <>
      <div>
        <svg className={styles.pie}>
          <circle cx={xX} cy="115" r="110"></circle>
          {/* <path d="M115,115 L115,5 A110,110 1 0,1 190,35 z"></path> */}
          <path
            style={{ fill: fillA }}
            d="M115,115 L190,35 A110,110 1 0,1 225,115 z"
          ></path>
        </svg>

        <svg className={styles.pie}>
          <circle cx={CENTER_X} cy={CENTER_Y} r={RADIUS}></circle>
          {/* <path d="M115,115 L115,5 A110,110 1 0,1 225,115 z"></path> */}
          {percentArr.map((item, idx) => (
            <path
              key={idx}
              style={{ fill: randomColor() }}
              d={coord(item)}
            ></path>
          ))}
        </svg>

        <svg className={styles.pie} style={{ fill: 'red' }}>
          <circle cx="115" cy="115" r="110"></circle>
          <path
            style={{ fill: randomColor() }}
            d="M115,115 L115,5 A110,110 1 0,1 115,225 A110,110 1 0,1 35,190 z"
          ></path>
        </svg>
      </div>

      {/* {percentArr.map((item, idx) => (
        <div key={idx} style={{ backgroundColor: randomColor() }}>
          {item} # {idx === 0 ? '*' : idx} ::: {coord(item)};
        </div>
      ))} */}
    </>
  );
};

export default PieChart;
