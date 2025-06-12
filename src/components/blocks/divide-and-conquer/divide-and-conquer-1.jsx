import React from "react";

import { TesterDivideAndConquer1 } from "../tester/tester-divide-and-conquer-1";

/*
  Есть массив с элементами и другими массивами — вложенность может быть любой. Нужно устранить вложенность, сохранив очерёдность элементов.

  Примеры:
  flat([]) // []
  flat([[1, 5], 5, 10]) // [1, 5, 5, 10]
  flat([1, 2, [3, 4]]) // [1, 2, 3, 4]
  flat([1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
*/

const arr1 = [];
const arr2 = [[1, 5], 5, 10];
const arr3 = [1, 2, [3, 4]];
const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];

const flatArray = (arr) => {
  return [];
};

const DivideAndConquer1 = () => {
  return (
    <div>
      <h1>Уменьшение вложенности массива</h1>
      <p>
        Есть массив с элементами и другими массивами — вложенность может быть
        любой. Нужно устранить вложенность, сохранив очерёдность элементов.
      </p>
      <TesterDivideAndConquer1 result={flatArray(arr1)} answer={[]} />
      <TesterDivideAndConquer1
        result={flatArray(arr2)}
        answer={[1, 5, 5, 10]}
      />
      <TesterDivideAndConquer1 result={flatArray(arr3)} answer={[1, 2, 3, 4]} />
      <TesterDivideAndConquer1
        result={flatArray(arr4)}
        answer={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      />
    </div>
  );
};

export { DivideAndConquer1 };
