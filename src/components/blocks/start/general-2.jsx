import React from "react";

import { Tester } from "/src/components/blocks/tester/tester";
const General2 = () => {
  /*
    Задача: найти, сколько раз встречается самый частый элемент в объединении двух отсортированных
    по возрастанию массивов. Элементы могут повторяться.

    Примеры:
    countMostFrequent([1, 2, 2, 3], [0, 2, 4, 4]) => 3
    countMostFrequent([], [0, 0]) => 2
  */
  // const arr1 = [1, 2, 2, 3];
  // const arr2 = [0, 2, 4, 4];

  // Сложность  O((n + m) log(n + m)) из-за сортировки.
  const countMostFrequentMySolution = (arr1, arr2) => {
    const merged = [...arr1, ...arr2].sort();

    let currentValue;
    let countOfValueMatches = 1;
    let maxCountOfValueMatches = 0;

    for (let i = 0; i < merged.length; i++) {
      // Пропускаем первую итерацию и записываем первое число массива.
      if (i === 0) {
        currentValue = merged[i];
        continue;
      }

      // Если текущее число равно предыдущему, то увеличиваем счётчик.
      if (merged[i] === currentValue) {
        countOfValueMatches++;
      } else {
        // Иначе обнуляем счётчик и записываем текущее число.

        if (countOfValueMatches > maxCountOfValueMatches) {
          console.log("go");

          maxCountOfValueMatches = countOfValueMatches;
        }
        countOfValueMatches = 1;
        currentValue = merged[i];
      }
    }

    // После цикла нужно проверить последний блок повторяющихся чисел
    if (countOfValueMatches > maxCountOfValueMatches) {
      maxCountOfValueMatches = countOfValueMatches;
    }

    return maxCountOfValueMatches;
  };

  /*
      const countMostFrequentNotOptimized = (firstArray, secondArray) => {
    const union = [...firstArray, ...secondArray];
    const counter = {};

    for (const number of union) {
      counter[number] = counter[number] ? counter[number] + 1 : 1;
    }

    let maxFrequency = 0;

    for (const frequency of Object.values(counter)) {
      if (frequency > maxFrequency) {
        maxFrequency = frequency;
      }
    }

    return maxFrequency;
  };
  */
  // Сложность O(n + m)

  /*
    const countMostFrequentEasyWorstSolution = (firstArray, secondArray) => {
    const union = [...firstArray, ...secondArray];

    return union.reduce((maxOccurences, current, _, array) => {
      const currentOccurences = array.filter((num) => num === current).length;

      return Math.max(currentOccurences, maxOccurences);
    }, 0);
  }
*/
  // Сложность: O((n + m)^2)

  const countDuplicates = (array, startPosition) => {
    // сначала предположим, что число встречается всего один раз
    let lastPosition = startPosition;

    // последнее проверенное число — то же самое, что и в начале повторений. И мы не прошли массив полностью...
    while (
      array[startPosition] === array[lastPosition] &&
      lastPosition < array.length
    ) {
      // ...подвигаем указатель на последнее одинаковое число
      lastPosition++;
    }

    // а как только числа перестали совпадать, вернём длину отрезка с дубликатами
    return lastPosition - startPosition;
  };

  const countMostFrequentHard = (firstArray, secondArray) => {
    let result = 0;
    // храним указатели на текущие элементы в массиве
    let firstPointer = 0;
    let secondPointer = 0;

    // пока не закончился один из наших массивов
    while (
      firstPointer < firstArray.length &&
      secondPointer < secondArray.length
    ) {
      // если в первом массиве текущее число меньше, чем во втором, то нужно сначала посчитать количество этих чисел
      if (firstArray[firstPointer] < secondArray[secondPointer]) {
        // посчитаем дубликаты, начиная с текущего указателя
        const dup1 = countDuplicates(firstArray, firstPointer);

        // если получилось больше дубликатов, чем уже было, то запомним это число как текущий результат
        result = Math.max(result, dup1);
        // и подвигаем указатель внутри первого массива
        firstPointer += dup1;
        // если в массивах числа совпадают, то ...
      } else if (firstArray[firstPointer] === secondArray[secondPointer]) {
        // ...посчитаем их количество в каждом массиве
        const dup1 = countDuplicates(firstArray, firstPointer);
        const dup2 = countDuplicates(secondArray, secondPointer);

        // если нужно, обновим результат и подвигаем каждый из указателей
        result = Math.max(result, dup1 + dup2);
        firstPointer += dup1;
        secondPointer += dup2;
        // если же во втором массиве число больше, чем в первом, то сделаем над ним те же операции, что над первым
      } else {
        const dup2 = countDuplicates(secondArray, secondPointer);

        result = Math.max(result, dup2);
        secondPointer += dup2;
      }
    }

    // если один из массивов закончился, значит нужно досчитать дубликаты в оставшемся массиве подобным образом, пока не закончится и второй
    while (firstPointer < firstArray.length) {
      const dup1 = countDuplicates(firstArray, firstPointer);

      result = Math.max(result, dup1);
      firstPointer += dup1;
    }

    while (secondPointer < secondArray.length) {
      const dup2 = countDuplicates(secondArray, secondPointer);

      result = Math.max(result, dup2);
      secondPointer += dup2;
    }

    return result;
  };

  return (
    <div>
      <h1>Примеры алгоритмически переусложнённого кода</h1>
      <p>
        Задача: найти, сколько раз встречается самый частый элемент в
        объединении двух отсортированных по возрастанию массивов. Элементы могут
        повторяться.
      </p>
      <Tester
        result={countMostFrequentMySolution([1, 2, 2, 3], [0, 2, 4, 4])}
        answer={3}
      />
      <Tester result={countMostFrequentMySolution([], [0, 0, 0])} answer={3} />
    </div>
  );
};

export { General2 };
