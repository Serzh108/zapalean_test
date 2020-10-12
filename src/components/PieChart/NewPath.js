import React from 'react';
import randomColor from '../../helper/randomColor';

const NewPath = ({ params }) => {
  const { id, newD, CENTER_X, CENTER_Y, xA, yA, name } = params;
  const currentColor = randomColor();
  return (
    <>
      <path key={`path${id}`} style={{ fill: currentColor }} d={newD}></path>
      <polyline
        key={`polyline${id}`}
        points={`${CENTER_X},${CENTER_Y} ${yA},${xA} ${
          yA >= CENTER_X ? yA + 15 : yA - 15
        },${xA}`}
        style={{ fill: 'none', stroke: currentColor }}
      />
      <text
        key={`text${id}`}
        x={yA >= CENTER_X ? yA + 20 : yA - 56}
        y={xA + 4}
        fill={currentColor}
      >
        {name}
      </text>
    </>
  );
};

export default NewPath;
