import React from "react";
import { Tester } from "../tester/tester";

const General3 = () => {
  /*
    Задача: написать функцию для прохождения типового задания с числами в тесте iq — из списка
    чисел найти то, которое отличается по чётности от остальных, и вернуть его позицию.
  */

  const numbers1 = "2 4 7 8 10";
  const numbers2 = "1 2 1 1";
  const numbers3 = "1 1 1 2";

  /*
    План решения задачи:
    1. На первых трех числах определить, четный массив или нет.
    2. На первых двух, если они одинаковые, можно это быстрее определить.
    3. Перебирать массив до нахождения числа, отличающиегося четностью и выполнить его return.

    Дополнительно решить задачу через бинарные операции и спросить у нейронки, что эффективнее.
    Всё четные числа в двоичной системе имееют конец 0, а нечетные — 1.
  */

  // Первое мое решение.
  const iqTestSolution1 = (numbers) => {
    const arr = numbers.split(" ").map((number) => Number(number));

    // Проверка на нечетность всёго массива.
    let isEven = false;

    // На первых терх числах определяем общую четность.
    if (
      (arr[0] % 2 === 0 && arr[1] % 2 === 0) ||
      (arr[0] % 2 === 0 && arr[2] % 2 === 0) ||
      (arr[1] % 2 === 0 && arr[2] % 2 === 0)
    ) {
      isEven = true;
    }

    for (let i = 0; i < arr.length; i++) {
      const isCurrentNumberEven = arr[i] % 2 === 0;
      if (isCurrentNumberEven !== isEven) {
        return i + 1;
      }
    }

    return undefined; // Если четность не определена, возвращаем undefined.
  };

  // Второе мое решение с помощью побитовых операций.
  const iqTestSolution2 = (numbers) => {
    const arr = numbers.split(" ").map((number) => Number(number).toString(2));

    // По умолчанию ставлю: четный ? - нет.
    let isEven = false;
    // Проверяем сумму последних чисел для проверки четности массива.
    let sumOfLastNumbers = 0;
    // На случай, если в первых трех числах есть одно отличающиеся четностью.
    const numberIndexObject = {};

    for (let i = 0; i < arr.length; i++) {
      if (i < 3) {
        const lastNumber = Number(arr[i][arr[i].length - 1]);
        numberIndexObject[lastNumber === 0 ? "even" : "odd"] = i;

        sumOfLastNumbers += lastNumber;
      } else if (i === 3) {
        // Определяем четность массива.
        isEven = sumOfLastNumbers < 2 ? true : false;
        console.log("Числа в массиве четные?", isEven);

        /*
          Если среди первых трех чисел есть одно число, отличающегося четностью, то сделать return этого отличающигося четностью числа.
          Если массив четный, то возвращаем индекс нечетного числа, если нечетный — четного.
        */

        if (sumOfLastNumbers !== 0 && sumOfLastNumbers !== 3) {
          return isEven
            ? numberIndexObject["odd"] + 1
            : numberIndexObject["even"] + 1;
        }

        // Если первые три числа с одинаковой четностью, то цикл продложать до тех пор, пока не найдется отличающеся четностью число.
        if (isEven === true && arr[i][arr[i].length - 1] !== "0") {
          return i + 1;
        } else if (isEven === false && arr[i][arr[i].length - 1] !== "1") {
          return i + 1;
        }
      } else {
        // Продолжаем искать число по массиву отличающееся четностью.
        if (isEven === true && arr[i][arr[i].length - 1] !== "0") {
          return i + 1;
        } else if (isEven === false && arr[i][arr[i].length - 1] !== "1") {
          return i + 1;
        }
      }
    }

    return undefined; // Если четность не определена, возвращаем undefined.
  };

  // test(iqTest("2 4 7 8 10"), 3);
  // test(iqTest("1 2 1 1"), 2);

  return (
    <div>
      <h1>Пример</h1>
      <p>
        Задача: написать функцию для прохождения типового задания с числами в
        тесте iq — из списка чисел найти то, которое отличается по чётности от
        остальных, и вернуть его позицию.
      </p>
      {/* <Tester result={iqTestSolution2("2 4 7 8 10")} answer={3} /> */}
      <Tester result={iqTestSolution2("1 1 1 1 1 2 1")} answer={6} />
      {/* <Tester result={iqTestSolution2("1 2 1 1")} answer={2} /> */}
    </div>
  );
};

export { General3 };
