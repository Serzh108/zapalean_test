import React from 'react';
import styles from './PieChart.module.css';

// const CENTER_X = 115;
// const CENTER_Y = 115;
const CENTER_X = 200;
const CENTER_Y = 200;
const RADIUS = 110;

const PieChart = () => {
  function randomColor() {
    const color = () => Math.floor(Math.random() * 255 + 1);
    return `rgb(${color()}, ${color()}, ${color()})`;
  }

  const fillA = randomColor();
  // ==========----------=============
  // const amountArr = [10, 44, 60, 36, 20, 40];
  const amountArr = [1, 2, 3, 4, 5, 10];
  // const amountArr = [25, 20, 30, 50, 90];

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

  let prevX = CENTER_X;
  let prevY = CENTER_Y - RADIUS;
  let prevProc = 0;

  const coord = (proc, idx, iArr) => {
    console.log(' ****** iArr = ', iArr, ' idx = ', idx);

    const angle = Math.PI * 2 * proc;
    const x = Math.round(CENTER_X - RADIUS * Math.cos(angle));
    const y = Math.round(CENTER_Y + RADIUS * Math.sin(angle));
    // =================-----------===========
    const procL =
      idx === 0 ? proc / 2 : iArr[idx - 1] + (iArr[idx] - iArr[idx - 1]) / 2;
    const angle1 = Math.PI * 2 * procL;
    const xA = Math.round(CENTER_X - (RADIUS + 20) * Math.cos(angle1));
    const yA = Math.round(CENTER_Y + (RADIUS + 20) * Math.sin(angle1));
    console.log('xA = ', xA, ' yA = ', yA);
    // =================-----------===========
    console.log(
      `coord: ${x},${y} angle = ${angle}, prevX: ${prevX}, prevY: ${prevY}`,
    );
    // const newD = `M115,115 L190,35 A110,110 1 0,1 ${y},${x} z`;
    const newD = `M${CENTER_X},${CENTER_Y} L${prevX},${prevY} A${RADIUS},${RADIUS} 1 ${
      proc - prevProc > 0.5 ? 1 : 0
    },1 ${y},${x} z`;
    console.log('newD: ', newD);
    // ===============----===========
    //  const polylineX = (x-prevY)/(y-prevX) * RADIUS;
    const polylineY = (x + prevY) / 2;
    const polylineX = (y + prevX) / 2;
    console.log('!!! (x + prevY)/2 = ', (x + prevY) / 2);
    console.log('polylineX = ', polylineX, 'polylineY = ', polylineY);
    // ===============----===========
    const k = (CENTER_Y - polylineY) / (polylineX - CENTER_X);
    let xX =
      CENTER_X + Math.sqrt(Math.pow(RADIUS + 15, 2) / (1 + Math.pow(k, 2)));
    let yY =
      CENTER_Y -
      Math.sqrt(
        (Math.pow(RADIUS + 15, 2) * Math.pow(k, 2)) / (1 + Math.pow(k, 2)),
      );
    if ((x + prevY) / 2 > CENTER_Y) {
      yY = yY + CENTER_Y;
    }
    if ((y + prevX) / 2 < CENTER_X) {
      xX = xX - CENTER_X - RADIUS;
      xX = -xX;
    }
    // ===============----===========
    prevX = y;
    prevY = x;
    prevProc = proc;
    console.log('prevX: ', prevX, ', prevY = ', prevY);
    // ===============----===========
    // points={`${CENTER_X},${CENTER_Y} ${polylineX},${polylineY} 335,67`}
    // points={`${CENTER_X},${CENTER_Y} ${xX},${yY} 335,67`}
    const currentColor = randomColor();
    const newPath = (
      <>
        <path key={idx} style={{ fill: currentColor }} d={newD}></path>
        <polyline
          points={`${CENTER_X},${CENTER_Y} ${yA},${xA} ${
            yA >= CENTER_X ? yA + 15 : yA - 15
          },${xA}`}
          // points={`${CENTER_X},${CENTER_Y} ${xX},${yY} ${xX + 15},${yY}`}
          // style={{ fill: 'none', stroke: "#000" }}
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
    // ===============----===========
    // return newD;
  };

  return (
    <>
      <div>
        <svg className={styles.pie}>
          <circle cx={CENTER_X} cy="115" r="110"></circle>
          <path
            style={{ fill: fillA }}
            d="M115,115 L190,35 A110,110 1 0,1 225,115 z"
          ></path>
          {/* <line x1="115" y1="115" x2="225" y2="67" style={{ stroke: '#f00' }} /> */}
          <polyline
            points={`${CENTER_X},${CENTER_Y} 225,67 235,67`}
            style={{ fill: 'none', stroke: fillA }}
          />
          <text x="218" y="65" fill={fillA}>
            text
          </text>
        </svg>

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
        <svg className={styles.pie1}>
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

      {/* {percentArr.map((item, idx) => (
        <div key={idx} style={{ backgroundColor: randomColor() }}>
          {item} # {idx === 0 ? '*' : idx} ::: {coord(item)};
        </div>
      ))} */}
    </>
  );
};

export default PieChart;
