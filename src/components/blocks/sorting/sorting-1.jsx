import React from "react";

import { Tester } from "../tester/tester";

const testData1 = [5, 3, 2, 1];
const testData2 = [1, 2, 3];
const testData3 = [1, 4, 6, 8, 7, 5, 3, 2, 9];
const testData4 = [1, 4, 7, 8, 7, 7, 3, 2, 9];

const bubbleSort = (arr) => {
  while (true) {
    let isArrChanged = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        isArrChanged = true;
      }
    }

    if (isArrChanged === false) {
      return arr;
    }
  }
};

const quickSort = (arr) => {
  /*
    Решение задачи быстрая сортировка:
    Дополнительно реализовать оптимизацию, в которой будет фиксироватсья минимальный элемент и его индекс, и максимальный элемент с его индексом, тем самым
    уменьшая массивы с каждой итерацией, ведь минимальные и максимальные элемнты можно сразу фиксировать в начале и конеце массивов.
    Например в шаге 3 минимальный - 1, максимальный 9 и массив уже надо будет пересматривать следующим образом:
    [1,           4, 6, 5, 3, 2,    7,     9,           8]
      фиксируем   >----left----<         >-right (отпадает)     (преобразуем и меняем местами 9 и 8)

      далее в [4, 6, 5, 3, 2,] минимальный будет 2, а максимальный 6

    1. Создаем новый массив с длиной изначального массива.

    2. Бертся массив: [1, 4, 6, 8, 7, 5, 3, 2, 9] и пока-что вместо поиска медианы просто берем середину (аналог рандома).
                         -------->   <------
    Длина массива - 9. Элемент из середины - 7 с индексом 4.

    3. Все элементы, которые БОЛЬШЕ 7 перемещаем в конец, все элементы МЕНЬШЕ или равные 7 перемещаем в начало. В конце цикла
    заполняем последнее пустое место и ФИКСИРУЕМ этот индекс.
    Получаем [1, 4, 6, 5, 3, 2, 7, 9, 8]
                      -------->   <------
    Элемент "7" будет с индексом 6 (!!!).

    4.Далее вызываем рекурсию для левой и правой части относительно уже НОВОГО массива [1, 4, 6, 5, 3, 2, 7, 9, 8].
    Эта рекурсия должна пробегаться по элементам с 0 по 5 индекс и с 7 по 8 индекс.
    [1, 4, 6, 5, 3, 2,    7,     9, 8]
    >----left-------<         >-right-<

    4.1
    Рекурсия левой части рассматривает
    [1, 4,     6,    5, 3, 2,] где получает midIndex = 3 со значением 6.

  */
  //  1. Массив с длиной изначального массива, фиксирующий результат рекурсий.
  let resultArr = Array(arr.length);

  const initSort = (left = 0, right = arr.length - 1, innerArr = arr) => {
    // Базовый случий рекурсии.
    if (left >= right) {
      return;
    }

    //  1. Массив с длиной изначального массива, фиксирующий новые результаты.
    let newArr = Array(innerArr.length);
    // Границы, между которых будет вызвана рекурсия.
    let innerLeft = left;
    let innerRight = right;
    // Новые границы для последующих рекурсий.
    // Правая граница левой части.
    let leftPartRightBorder;
    // Левая граница правой части.
    let rightPartLeftBorder;

    // Индекс элементы из середины выделенной границы.
    const midIndex = Math.floor((right + left) / 2);

    // Каждый раз вызывается цикл, который пробегает n количество раз по элементам.
    // Если несколько одинаковых элементов.
    let valueOfEqualElements = 0;
    for (let i = 0; i < arr.length; i++) {
      // Текущая итерация в пределах рассматриваемых левой и правой границы?
      // Если нет, то просто записываем значение в новый массив
      // Если да, то сравниваем с серединой.
      const isIterationInBorders = i >= left && i <= right;
      if (isIterationInBorders) {
        if (innerArr[midIndex] > innerArr[i]) {
          // Если элемент из середины больше или равен расматриваемого, то перемещаем влево нового массива.
          newArr[innerLeft] = innerArr[i];
          innerLeft++;
        } else if (innerArr[midIndex] < innerArr[i]) {
          // Если элемент из середины меньше расматриваемого, то перемещаем вправо нового массива.
          newArr[innerRight] = innerArr[i];
          innerRight--;
        } else if (innerArr[midIndex] === innerArr[i]) {
          valueOfEqualElements++;
        }
        if (i === right) {
          // Если достигли правой границы рассматриваемых элементов, то фиксируем сравниваемый элемент в новое место.
          newArr[innerLeft] = innerArr[midIndex];
          // А также фиксируем новый индекс рассматриваемого элемента.
          leftPartRightBorder = innerLeft;

          // Делаем смещение влево, если одинаковых элементов, равных сравниваемому больше 1.
          // Если одинаковых элеметов больше 1, то вызываем цикл заполнения внутри границы слева до права.
          while (valueOfEqualElements > 1) {
            innerLeft++;
            valueOfEqualElements--;
            newArr[innerLeft] = innerArr[midIndex];
          }
          rightPartLeftBorder = innerLeft;
        }
      } else {
        // Записываем значение в новый массив.
        newArr[i] = innerArr[i];
      }
    }
    // Фиксируем полученные значения в результат.
    resultArr = newArr;

    // Вызываем рекурсию для левой части.
    initSort(left, leftPartRightBorder - 1, resultArr);
    // Вызываем рекурсию для правой части.
    initSort(rightPartLeftBorder + 1, right, resultArr);
  };
  initSort();
  return resultArr;
};

const Sorting1 = () => {
  return (
    <div>
      <h1>Сортировка Пузырьком и Quick Sort</h1>
      <Tester result={quickSort(testData1).join(", ")} answer={"1, 2, 3, 5"} />
      <Tester result={quickSort(testData2).join(", ")} answer={"1, 2, 3"} />
      <Tester
        result={quickSort(testData3).join(", ")}
        answer={"1, 2, 3, 4, 5, 6, 7, 8, 9"}
      />
      <Tester
        result={quickSort(testData4).join(", ")}
        answer={"1, 2, 3, 4, 7, 7, 7, 8, 9"}
      />
    </div>
  );
};

export { Sorting1 };
