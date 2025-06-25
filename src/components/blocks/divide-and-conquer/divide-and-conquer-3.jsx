import React from "react";

import { Tester } from "../tester/tester";

const DivideAndConquer3 = () => {
  /*
    Чуть упростим задачу поиска. Теперь будем не возвращать индекс искомого элемента,
    а лишь говорить, присутствует элемент или нет (этакий оптимизированный includes
    на сортированном массиве).

    Примеры:
      binarySearch([], 3) // false
      binarySearch([3], 3) // true
      binarySearch([1, 2, 3, 4, 5], 4) // true
      binarySearch([1, 2, 3, 5, 6], 4) // false
  */

  const binarySearch = (arr, value) => {
    let left = 0;
    let right = arr.length - 1;

    console.log(arr);

    return 0;
  };

  return (
    <div>
      <h1>Рекурсивный бинарный поиск</h1>
      <p>
        Чуть упростим задачу поиска. Теперь будем не возвращать индекс искомого
        элемента, а лишь говорить, присутствует элемент или нет (этакий
        оптимизированный includes на сортированном массиве).
      </p>
      {/* <Tester result={binarySearch([], 3)} answer={false} /> */}
      {/* <Tester result={binarySearch([3], 3)} answer /> */}
      <Tester result={binarySearch([1, 2, 3, 4, 5], 4)} answer />
      {/* <Tester result={binarySearch([1, 2, 3, 5, 6], 4)} answer={false} /> */}
    </div>
  );
};

export { DivideAndConquer3 };
