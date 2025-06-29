import React from "react";

import { Tester } from "../tester/tester";

const testData1 = [5, 3, 2, 1];
const testData2 = [1, 2, 3];

const bubbleSort = (arr) => {
  while (true) {
    let isArrChanged = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        const newValue1 = arr[i];
        const newValue2 = arr[i + 1];
        arr[i] = newValue2;
        arr[i + 1] = newValue1;
        isArrChanged = true;
      }
    }

    if (isArrChanged === false) {
      return arr;
    }
  }
};

const Sorting1 = () => {
  return (
    <div>
      <h1>Сортировка Пузырьком</h1>
      <Tester result={bubbleSort(testData1).join(", ")} answer={"1, 2, 3, 5"} />
      <Tester result={bubbleSort(testData2).join(", ")} answer={"1, 2, 3"} />
    </div>
  );
};

export { Sorting1 };
