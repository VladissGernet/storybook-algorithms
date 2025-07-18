import React, { useRef, useEffect } from "react";

const Tree1 = () => {
  const rootTree = useRef(null);

  const traverse = (node) => {
    const result = [];
  };

  useEffect(() => {
    console.log(rootTree.current);
  }, []);

  return (
    <div ref={rootTree}>
      <h1>Итоговая таблица</h1>
      <table>
        <thead>
          <tr>
            <th>Город</th>
            <th>Посещений</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>СПб</td>
            <td>199</td>
            <td>65.12</td>
          </tr>
          <tr>
            <td>Москва</td>
            <td>69</td>
            <td>21.3</td>
          </tr>
          <tr>
            <td>Самара</td>
            <td>5</td>
            <td>8</td>
          </tr>
          <tr>
            <td>Посещений за весь период</td>
            <td colSpan={2}>273</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export { Tree1 };
