import React from "react";
import { Tester } from "../tester/tester";

const General3 = () => {
  /*
    Задача: написать функцию для прохождения типового задания с числами в тесте iq — из списка
    чисел найти то, которое отличается по чётности от остальных, и вернуть его позицию.
  */

  const iqTest = (numbers) => {
    return 0;
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
      <Tester result={iqTest("2 4 7 8 10")} answer={3} />
      <Tester result={iqTest("1 2 1 1")} answer={2} />
    </div>
  );
};

export { General3 };
