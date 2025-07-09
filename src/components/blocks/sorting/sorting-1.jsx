import React from "react";

import { Tester } from "../tester/tester";

const testData1 = [5, 3, 2, 1];
const testData2 = [1, 2, 3];
const testData3 = [1, 4, 6, 8, 7, 5, 3, 2, 9];
const testData4 = [1, 4, 7, 8, 7, 7, 3, 2, 9];
const testData5 = [9, 4, 7, 8, 1, 7, 3, 2, 2];
const testData6 = [9, 1, 0, 2, 3, 4, 6, 8, 7, 10, 5];

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

/*
  Мое решение quickSortMySolution неудачное, по причинам:
  Использование новых массивов: Вы на каждом шаге создаёте новый массив (newArr), а результат сохраняете в resultArr.
  В классических реализациях чаще сортируют массив "на месте" (in-place), что экономит память.

  Медиана как опорный элемент: Вы берёте элемент из середины как опорный (midIndex).
  Это допустимо, но может приводить к неэффективности на уже отсортированных или почти отсортированных данных.
  Обычно используют первый, последний или случайный элемент, либо медиану трёх для повышения устойчивости к худшим случаям.

  Сложная логика с одинаковыми элементами: Вы явно учитываете количество элементов, равных опорному,
  и распределяете их вручную. В большинстве реализаций достаточно просто определять "<", ">", "=" и корректно
  разбивать массив на части.
*/
const quickSortMySolution = (arr) => {
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

/*
  Поиск quickSelect медианы за линейное время в среднем.

  1.Выберем индекс списка. Способ выбора не важен, на практике вполне подходит и случайный.
  Элемент с этим индексом называется опорным элементом (pivot).

  2.Разделим список на две группы:

    * Элементы меньше или равные pivot, lesser_els

    * Элементы строго большие, чем pivot, great_els

  3.Мы знаем, что одна из этих групп содержит медиану. Предположим, что мы ищем k-тый элемент:

    * Если в lesser_els есть k или больше элементов, рекурсивно обходим список lesser_els
    в поисках k-того элемента.

    * Если в lesser_els меньше, чем k элементтов, рекурсивно обходим список greater_els.
    Вместо поиска k мы ищем k-len(lesser_els).
*/

// Перемещения элементов в массиве.
const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

//Медиана из трех
const medianOfThree = (arr, left, right) => {
  const mid = Math.floor((left + right) / 2);
  if (arr[left] > arr[mid]) {
    swap(arr, left, mid);
  }
  if (arr[left] > arr[right]) {
    swap(arr, left, right);
  }
  if (arr[mid] > arr[right]) {
    swap(arr, mid, right);
  }
  return arr[mid];
};

/*
  Quickselect подходит не только для быстрого поиска медианы. 
  Его основное назначение — это поиск k-го по величине 
  (или k-го наименьшего/наибольшего) элемента в неупорядоченном списке 
  (массиве).
*/
const quickSelect = (arr, k) => {
  // Медиана длины изначального массива - k.
  // Базовый случай рекурсии
  if (arr.length === 1) {
    console.log(arr[0], "result");
    return arr[0];
  }

  // Выбор опорного элемента
  const pivot = medianOfThree(arr, 0, arr.length - 1);

  // Разделение массива
  // Элементы меньше или равные pivot
  let lesserEls = [];
  // Элементы строго большие, чем pivot,
  let greaterEls = [];
  let equalEls = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      lesserEls.push(arr[i]);
    } else if (arr[i] > pivot) {
      greaterEls.push(arr[i]);
    } else {
      equalEls.push(arr[i]);
    }
  }

  if (k < lesserEls.length) {
    // Искомый элемент в lesserEls
    return quickSelect(lesserEls, k);
  } else if (k < lesserEls.length + equalEls.length) {
    return pivot;
  } else {
    // Искомый элемент в greaterEls
    return quickSelect(greaterEls, k - lesserEls.length - equalEls.length);
  }
};

// console.log(testData6, "array to find");

// quickSelect(testData6, Math.floor(testData6.length / 2));

// Решение из гайда.

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const quickSort = (arr) => {
  console.log(arr);
  return arr;
};

quickSort(testData1);
const Sorting1 = () => {
  return (
    <div>
      <h1>Сортировка Пузырьком, Quick Sort, Quick Select</h1>
      {/* <Tester result={quickSort(testData1).join(", ")} answer={"1, 2, 3, 5"} />
      <Tester result={quickSort(testData2).join(", ")} answer={"1, 2, 3"} />
      <Tester
        result={quickSort(testData3).join(", ")}
        answer={"1, 2, 3, 4, 5, 6, 7, 8, 9"}
      />
      <Tester
        result={quickSort(testData4).join(", ")}
        answer={"1, 2, 3, 4, 7, 7, 7, 8, 9"}
      /> */}
    </div>
  );
};

export { Sorting1 };
