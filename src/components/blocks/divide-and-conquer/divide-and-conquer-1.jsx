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
  let counter = 10;

  return [];
};

/*
  const factorial = (n) => {
  if (n <= 1) {
    return 1;
  }

  return n * factorial(n - 1);
};

console.log(factorial(5));
*/

/*
  Практика рекурсии. \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  №1
  Напишите функцию sumTo(n), которая вычисляет сумму чисел 1 + 2 + ... + n.

  const sumToCycle = (num) => {
  let result = 0;
  for (let i = num; i > 0; i--) {
    result += i;
  }
  return result;
};

const sumToRecursion = (num) => {
  if (num === 1) {
    return 1; // базовый случай
  }

  return num + sumToRecursion(num - 1); // рекурсивный вызов с суммированием
};

const sumToMath = (num) => {
  return (num * (num + 1)) / 2;
};

№2
Факториал натурального числа – это число, умноженное на "себя минус один", затем на "себя минус два", и так далее до 1. Факториал n обозначается как n!

Определение факториала можно записать как:

n! = n * (n - 1) * (n - 2) * ...*1

const calcFactorial = (n) => {
  if (n < 2) {
    return n;
  }
  return n * calcFactorial(n - 1);
};

function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}


function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

*/

/*
  Конец практики рекурсии.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/

const DivideAndConquer1 = () => {
  return (
    <div>
      <h1>Уменьшение вложенности массива</h1>
      <p>
        Есть массив с элементами и другими массивами — вложенность может быть
        любой. Нужно устранить вложенность, сохранив очерёдность элементов.
      </p>
      {/* <TesterDivideAndConquer1 result={flatArray(arr1)} answer={[]} /> */}
      <TesterDivideAndConquer1
        result={flatArray(arr2)}
        answer={[1, 5, 5, 10]}
      />
      {/* <TesterDivideAndConquer1 result={flatArray(arr3)} answer={[1, 2, 3, 4]} />
      <TesterDivideAndConquer1
        result={flatArray(arr4)}
        answer={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      /> */}
    </div>
  );
};

export { DivideAndConquer1 };
