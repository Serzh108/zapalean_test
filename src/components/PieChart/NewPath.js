import React, { useState } from 'react';

const NewPath = ({ params }) => {
  const {
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
  } = params;
  const [selected, setSelected] = useState(null);

  const mouseHandler = e => {
    setSelected(Number(e.currentTarget.id));
  };
  const mouseHandler1 = e => {
    setSelected(null);
  };

  return (
    <>
      <path
        key={`path${id}`}
        style={{ fill: color }}
        d={newD}
        id={id}
        onMouseEnter={mouseHandler}
        onMouseLeave={mouseHandler1}
      ></path>
      <polyline
        key={`polyline${id}`}
        // points={`${CENTER_X},${CENTER_Y} ${yA},${xA} ${
        points={`${yL0},${xL0} ${yA},${xA} ${
          yA >= CENTER_X ? yA + 15 : yA - 15
        },${xA}`}
        style={{ fill: 'none', stroke: color }}
      />
      <text
        key={`text${id}`}
        x={yA >= CENTER_X ? yA + 20 : yA - (selected === id ? 72 : 56)}
        y={xA + 4}
        fill={color}
        style={{ fontSize: selected === id ? 18 : 12 }}
      >
        {name}
      </text>
    </>
  );
};

export default NewPath;
