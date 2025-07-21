import React from "react";

import { Tester } from "../tester/tester";

const testData0 = [0, 1, 0, 1];
const testData1 = [5, 3, 1, 4];
const testData2 = [1, 2, 3];
const testData3 = [1, 4, 6, 8, 7, 5, 3, 2, 9];
const testData4 = [1, 4, 7, 8, 7, 7, 3, 2, 9];
const testData5 = [9, 4, 7, 8, 1, 7, 3, 2, 2];
const testData6 = [9, 1, 0, 2, 3, 4, 6, 8, 7, 10, 5];

// Сортировка пузырьком моя версия более оптимальная.
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

const bubbleSortReversed = (arr) => {
  while (true) {
    let isArrChanged = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < arr[i + 1]) {
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
// Это не классическая версия!
const notClassicQuickSelect = (arr, k) => {
  // Медиана длины изначального массива - k.
  // Базовый случай рекурсии
  if (arr.length === 1) {
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
    if (arr[i] < pivot) {
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

// Классическая версия и оптимальная.
const swap1 = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const random1 = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const partition1 = (arr, left, right) => {
  const pivot = arr[random1(left, right)];
  while (left <= right) {
    while (arr[left] < pivot) {
      left++;
    }
    while (arr[right] > pivot) {
      right--;
    }
    if (left <= right) {
      swap1(arr, left, right);
      left++;
      right--;
    }
  }
  return left;
};

// k - значение велечины элемента в массиве. Например, k = 0; позволит найти самый большой элемент в массиве.
const quickSelect = (arr, k, left, right) => {
  left = left ?? 0;
  right = right ?? arr.length - 1;
  if (left === right) {
    return arr[left];
  }
  const pivotIndex = partition1(arr, left, right);

  if (k < pivotIndex) {
    return quickSelect(arr, k, left, pivotIndex - 1);
  } else {
    return quickSelect(arr, k, pivotIndex, right);
  }
};

const quickSelectIteration = (arr, k) => {
  const stack = [];

  stack.push(0, arr.length - 1);
  while (stack.length) {
    const end = stack.pop();
    const start = stack.pop();

    if (end === start) {
      return arr[end];
    }

    const pivotIndex = partition1(arr, start, end);
    if (k < pivotIndex) {
      stack.push(start, pivotIndex - 1);
    } else {
      stack.push(pivotIndex, end);
    }
  }
};

// console.log(testData1);
// quickSelectIteration(testData1, 1);
// console.log(testData1);
// console.log(quickSelect(testData1, 0), "result");
// console.log(testData6, "array to find");
// console.log(quickSelect(testData6, Math.floor(testData6.length / 2)));
// Решение из гайда.

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/*
  Так как в подразбиениях после рекурсивного вызова сортировки мы будем работать не с целым массивом
  а его частями, сразу сделаем дополнительные параметры для их определения
*/
const partition = (arr, left, right) => {
  const pivot = arr[random(left, right)];

  // Как и в бинпоиске, схождение с краев в центр, пока не просмотрим все элементы.
  while (left <= right) {
    // Пока слева встречаются только числа меньше поворотного...
    while (arr[left] < pivot) {
      // ... двигаем левый указатель вправо, ведь с этими числами ничего делать не надо.
      left++;
    }

    // Пока справа встречаются только числа больше поворотного...
    while (arr[right] > pivot) {
      // ... двигаем правывй указатель влево, ведь с этими числами ничего делать не надо.
      right--;
    }

    // А как только оба указателя показывают на элементы, которые должны быть в противоположных частях и мы все еще
    // сошлись к центру...
    if (left <= right) {
      // ... меняем их местами и не забываем двигать оба указателя, так как теперь оба числа на своём месте.
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  // Возвращаем место, где оказался элемент, равный нашей точке поворота.
  return left;
};

// Тут тоже нужно определить дополнительные параметры, как и в разбиении partition(), чтобы работать с подмассивами.
const quickSort = (arr, left, right) => {
  // Если мы работаем с целым массивом и нам не передали края сортироввки, определим их сами
  left = left ?? 0;
  right = right ?? arr.length - 1;

  // Разбиваем наш массив на подмассивы вокруг точки поворота
  const pivotIndex = partition(arr, left, right);

  // Если в левом подмассиве больше одного элемента, то сортируем его
  if (left < pivotIndex - 1) {
    quickSort(arr, left, pivotIndex - 1);
  }

  // то же и с правым
  if (pivotIndex < right) {
    quickSort(arr, pivotIndex, right);
  }

  return arr;
};
// console.log(testData1, "initial");
// console.log(quickSort(testData1));

/*
  Сортировка вставкой.
*/

const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      // Сдвеиг элементов вправо.
      arr[j + 1] = arr[j];
      j--;
    }
    // Вставка текущего элемента на найденное место.
    arr[j + 1] = current;
  }
  return arr;
};

const insertionSortReversed = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] < current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
};

/* 
  QuickSort без рекурсии.
*/

const quickSortIterative = (arr) => {
  // Вместо рекурсивных вызовов сортировки для подмассивов, их индексы складываются и извлекаются из стека вручную.
  const stack = [];
  stack.push(0, arr.length - 1);

  while (stack.length) {
    const end = stack.pop();
    const start = stack.pop();

    // Проверяется, что левая граница подмассива start стала больше или равна правой границе end.
    // Если это условие истинно, значит подмассив пуст или размером менее 2 элементов, сортировать его не нужно.
    if (start >= end) continue;

    const pivotIndex = partition(arr, start, end);

    stack.push(start, pivotIndex - 1);
    stack.push(pivotIndex, end);
  }

  return arr;
};

// Находит точное место в arr у элемента в отличие от Hoare, но делает больше swap.
const partitionLomuto = (arr, start, end) => {
  console.log("arr before", arr);

  const pivotIndex = random(start, end);
  console.log("pivotIndex", pivotIndex);

  swap(arr, pivotIndex, end);
  console.log("arr after", arr);

  /*
    pivot должно быть в конце перед началом разбиения — иначе после свапа в конце всё "ломается".
    После этого Lomuto partition гарантирует, что слева от возвращённого индекса — элементы меньше pivot, справа — больше или равны.
  */
  const pivot = arr[end]; // pivot гарантировано в end.
  console.log("pivot", pivot);

  let i = start;
  /*
    i — это граница отделения: все элементы, которые левее этого индекса, будут меньше pivot (к текущему моменту).
    Он показывает, где поставить следующий элемент, который меньше pivot.
  */
  for (let j = start; j < end; j++) {
    console.log("i", i, "j", j, "arr before", arr);

    console.log(
      "arr[j]",
      arr[j],
      "pivot",
      pivot,
      "arr[j] < pivot",
      arr[j] < pivot
    );

    if (arr[j] < pivot) {
      swap(arr, i, j);
      i++;
    }

    console.log("i", i, "j", j, "arr after", arr);
  }
  console.log("i", i, "arr after cycle", arr);

  swap(arr, i, end);
  console.log("i", i, "arr after swap", arr);
  return i;
};

// const resultIndex = partitionLomuto(testData1, 0, testData1.length - 1);
// console.log("resultIndex", resultIndex, "value", testData1[resultIndex]);
// console.log(testData1);

const Sorting1 = () => {
  return (
    <div>
      <h1>
        Сортировка Пузырьком, Quick Sort, Quick Select, Insertion sort
        (Сортировка вставкой).
      </h1>
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
