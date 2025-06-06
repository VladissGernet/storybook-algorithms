import React from "react";

import { Tester } from "../tester/tester";

const Search1 = () => {
  /*
    На входе будем иметь отсортированный в алфавитном порядке список из растений.
  */
  const plants = [
    "Аспарагус",
    "Гвоздика",
    "Жасмин",
    "Калина",
    "Малина",
    "Пион",
    "Тысячелистник",
    "Хризантема",
    "Шафран",
    "Юкка",
  ];
  /*
    Написать бинарный поиск.

    binarySearch(plants, "Пион") => 5
    binarySearch(plants, "Роза") => null
  */

  const binarySearch = (plants, plant) => {
    return null;
  };

  return (
    <div>
      <h1>Пример</h1>

      <Tester result={binarySearch(plants, "Пион")} answer={5} />
      <Tester result={binarySearch(plants, "Роза")} answer={null} />
    </div>
  );
};

export { Search1 };
