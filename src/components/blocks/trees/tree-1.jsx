import React, { useRef, useEffect, useState } from "react";

const Tree1 = () => {
  const rootTree = useRef(null);
  const [resultBFS, setResultBFS] = useState("");

  // Поиск в ширину (breadth-first search, BFS).
  const traverseBreadthFirstSearch = (node) => {
    const result = [];
    const queue = [];
    queue.push(node);

    while (queue.length) {
      const currentNode = queue.shift();
      result.push(currentNode.localName);
      queue.push(...currentNode.children);
    }

    return (
      <>
        <h2>Резулютат поиска в ширину:</h2>
        <p>{result.join("   --->   ")}</p>
      </>
    );
  };

  useEffect(() => {
    if (rootTree.current) {
      setResultBFS(traverseBreadthFirstSearch(rootTree.current));
    }
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
      {resultBFS}
    </div>
  );
};

export { Tree1 };
