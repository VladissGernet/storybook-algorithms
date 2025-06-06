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

  const binarySearch = (plants, plant) => {
    let currentIndex = plants.length;
    if (currentIndex === 0) {
      return null;
    }

    let binaryArray = [1, currentIndex];
    let counter = 0;

    while (currentIndex > 0 && counter < 30) {
      counter++;
      currentIndex = Math.floor(
        (binaryArray[0] + binaryArray[binaryArray.length - 1]) / 2
      );

      if (plants[currentIndex] === plant) {
        return currentIndex;
      } else if (plant > plants[currentIndex]) {
        binaryArray = [currentIndex, plants.length];
      } else if (plant < plants[currentIndex]) {
        binaryArray = [0, currentIndex];
      }
    }

    return null;
  };

  return (
    <div>
      <h1>Пример</h1>
      <p>
        Напишем простенький бинарный поиск на примере из предыдущей статьи. На
        входе будем иметь отсортированный в алфавитном порядке список из
        растений. Напишем функцию, которая будет бинарным поиском искать позицию
        переданного в неё растения
      </p>
      <Tester result={binarySearch(plants, "Пион")} answer={5} />
      <Tester result={binarySearch(plants, "Роза")} answer={null} />
      <Tester result={binarySearch(plants, "Аспарагус")} answer={0} />
      <Tester result={binarySearch(plants, "Юкка")} answer={9} />
    </div>
  );
};

export { Search1 };
