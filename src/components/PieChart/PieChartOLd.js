import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './PieChart.module.css';

const CENTER_X = 200;
const CENTER_Y = 200;
const RADIUS = 120;

const PieChart = () => {
  const { items } = useSelector(state => state.piechart);
  console.log('items -> ', items);

  function randomColor() {
    const color = () => Math.floor(Math.random() * 255 + 1);
    return `rgb(${color()}, ${color()}, ${color()})`;
  }

  // ==========----------=============
  const amountArr = [1, 2, 3, 4, 5, 10];
  // const amountArr = [25, 20, 30, 50, 90];

  const amountPercent = arr => {
    const sum = arr.reduce((acc, el) => acc + el, 0);
    // const res = arr.map(item => item / sum);
    const arrPercent = [];
    arr.reduce((acc, item, idx, arrayIn) => {
      acc = idx === 0 ? item / sum : item / sum + acc;
      arrPercent.push(acc);
      return acc;
    }, 0);
    return arrPercent;
  };
  const percentArr = amountPercent(amountArr);
  // ==========----------=============

  let prevX = CENTER_X;
  let prevY = CENTER_Y - RADIUS;
  let prevProc = 0;

  const coord = (proc, idx, iArr) => {
    console.log(' * iArr = ', iArr, ' idx = ', idx);

    const angle = Math.PI * 2 * proc;
    const x = Math.round(CENTER_X - RADIUS * Math.cos(angle));
    const y = Math.round(CENTER_Y + RADIUS * Math.sin(angle));
    // =================-----------===========
    const procL =
      idx === 0 ? proc / 2 : iArr[idx - 1] + (iArr[idx] - iArr[idx - 1]) / 2;
    const angle1 = Math.PI * 2 * procL;
    const xA = Math.round(CENTER_X - (RADIUS + 20) * Math.cos(angle1));
    const yA = Math.round(CENTER_Y + (RADIUS + 20) * Math.sin(angle1));
    // =================-----------===========
    // const newD = `M115,115 L190,35 A110,110 1 0,1 ${y},${x} z`;
    const newD = `M${CENTER_X},${CENTER_Y} L${prevX},${prevY} A${RADIUS},${RADIUS} 1 ${
      proc - prevProc > 0.5 ? 1 : 0
    },1 ${y},${x} z`;
    // ===============----===========
    prevX = y;
    prevY = x;
    prevProc = proc;
    // ===============----===========

    const currentColor = randomColor();
    const newPath = (
      <>
        <path key={idx} style={{ fill: currentColor }} d={newD}></path>
        <polyline
          points={`${CENTER_X},${CENTER_Y} ${yA},${xA} ${
            yA >= CENTER_X ? yA + 15 : yA - 15
          },${xA}`}
          style={{ fill: 'none', stroke: currentColor }}
        />
        <text
          x={yA >= CENTER_X ? yA + 20 : yA - 40}
          y={xA + 4}
          fill={currentColor}
        >
          text
        </text>
      </>
    );
    return newPath;
  };

  return (
    <>
      <div>
        {/* <svg className={styles.pie}>
          <circle cx={CENTER_X} cy="115" r="110"></circle>
          <path
            style={{ fill: fillA }}
            d="M115,115 L190,35 A110,110 1 0,1 225,115 z"
          ></path>
           <polyline
            points={`${CENTER_X},${CENTER_Y} 225,67 235,67`}
            style={{ fill: 'none', stroke: fillA }}
          />
          <text x="218" y="65" fill={fillA}>
            text
          </text>
        </svg> */}

        {/* <svg className={styles.pie}>
          <circle cx={CENTER_X} cy={CENTER_Y} r={RADIUS}></circle>
          {percentArr.map((item, idx) => (
            <path
              key={idx}
              style={{ fill: randomColor() }}
              d={coord(item)}
            ></path>
          ))}
        </svg> */}

        {/* <svg className={styles.pie} style={{ fill: 'red' }}>
          <circle cx="115" cy="115" r="110"></circle>
          <path
            style={{ fill: randomColor() }}
            d="M115,115 L115,5 A110,110 1 0,1 115,225 A110,110 1 0,1 35,190 z"
          ></path>
        </svg> */}
      </div>

      <div>
        <svg className={styles.pie}>
          <circle cx={CENTER_X} cy={CENTER_Y} r={RADIUS}></circle>
          {percentArr.map(
            (item, idx, iArr) => coord(item, idx, iArr),
            // <path
            //   key={idx}
            //   style={{ fill: randomColor() }}
            //   d={coord(item)}
            // ></path>
          )}
        </svg>
      </div>

      <p className={styles.form_link}>
        <NavLink to="/">Перейти к форме</NavLink>
      </p>
    </>
  );
};

export default PieChart;
