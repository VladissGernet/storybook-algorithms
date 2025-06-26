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

  const binarySearch = (arr, value, left = 0, right = arr.length - 1) => {
    // Базовый случай.
    if (left > right) {
      // Если число не найдено, то вернуть false.
      return false;
    } else {
      // Иначе находим текущую середину и округляем.
      const mid = Math.floor((left + right) / 2);

      if (arr[mid] === value) {
        // Если число найдено, то возвращаем true.
        return true;
      } else if (arr[mid] < value) {
        left = mid + 1;
        // Если число из середины текущего расчета в массиве МЕНЬШЕ искомого value, то убираем левую часть.
      } else if (arr[mid] > value) {
        right = mid - 1;
        // Если число из середины текущего расчета в массиве БОЛЬШЕ искомого value, то убираем правую часть.
      }
    }

    return binarySearch(arr, value, left, right);
  };

  return (
    <div>
      <h1>Рекурсивный бинарный поиск</h1>
      <p>
        Чуть упростим задачу поиска. Теперь будем не возвращать индекс искомого
        элемента, а лишь говорить, присутствует элемент или нет (этакий
        оптимизированный includes на сортированном массиве).
      </p>
      <Tester result={binarySearch([], 3)} answer={false} />
      <Tester result={binarySearch([3], 3)} answer />
      <Tester result={binarySearch([1, 2, 3, 4, 5], 4)} answer />
      <Tester result={binarySearch([1, 2, 3, 5, 6], 4)} answer={false} />
    </div>
  );
};

export { DivideAndConquer3 };
