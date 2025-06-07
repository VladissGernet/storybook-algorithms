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

  // Мое решение не подходило, потому что:
  // 1.  Рекомендуется переписать код с использованием двух переменных для границ поиска.
  // 2. Баг, когда слова нет в списке, то цикл бесконечно пытается найти.

  // const binarySearch = (plants, plant) => {
  //   let currentIndex = plants.length;
  //   if (currentIndex === 0) {
  //     return null;
  //   }

  //   let binaryArray = [1, currentIndex];
  //   let counter = 0;

  //   while (currentIndex > 0 && counter < 30) {
  //     counter++;
  //     currentIndex = Math.floor(
  //       (binaryArray[0] + binaryArray[binaryArray.length - 1]) / 2
  //     );

  //     if (plants[currentIndex] === plant) {
  //       return currentIndex;
  //     } else if (plant > plants[currentIndex]) {
  //       binaryArray = [currentIndex, plants.length];
  //     } else if (plant < plants[currentIndex]) {
  //       binaryArray = [0, currentIndex];
  //     }
  //   }
  //   return null;
  // };

  // Асиптотическая сложность O(log n).
  const binarySearch = (plants, plant) => {
    // Левая и правая границы поиска.
    let left = 0;
    let right = plants.length - 1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (plants[mid] === plant) {
        return mid;
      } else if (plant > plants[mid]) {
        left = mid + 1;
      } else if (plant < plants[mid]) {
        right = mid - 1;
      }
    }
    return null;
  };

  /*
    Решение из гайда:

    function binarySearch(plants, plant) {
      let left = 0;
      let right = plants.length - 1;

      while (left <= right) {
        const center = Math.floor((right + left) / 2);

        if (plants[center] === plant) {
          return center;
        }

        // Если то, что мы ищем, левее по алфавиту, идем искать в левую часть массива
        if (plants[center].localeCompare(plant) === 1) {
          right = center - 1;
        // иначе идем в другую сторону
        } else {
          left = center + 1;
        }
      }

      return null;
    }

    Метод localeCompare в JavaScript используется для сравнения строк с учётом правил локали
    (языка и культурных особенностей алфавита). Он возвращает:

    -1, если первая строка идёт раньше второй по алфавиту;

    0, если строки равны;

    1, если первая строка идёт позже второй по алфавиту.

    Зачем использовать localeCompare, когда есть ">" и "<"?

    Операторы > и < сравнивают строки по их Unicode-кодам, а не по алфавитному порядку, принятому в конкретном языке.

    Для русского языка, а также других языков с нестандартным алфавитом, результаты сравнения с помощью > и < могут быть
    некорректными, особенно при наличии специальных символов, заглавных и строчных букв.

    localeCompare учитывает правила сортировки, специфичные для выбранной локали, что важно для корректного алфавитного
    поиска и сортировки в многоязычных приложениях.

    console.log('Ёлка' > 'Яблоко'); // true, но по алфавиту "Ёлка" должна идти раньше "Яблоко"
    console.log('Ёлка'.localeCompare('Яблоко', 'ru')); // -1, правильно для русского алфавита

    Вывод:
    localeCompare нужен для корректного и универсального сравнения строк, особенно если массив содержит слова на русском
    или других языках, где алфавитный порядок отличается от порядка Unicode-кодов. Это особенно важно в задачах бинарного
    поиска по строкам, чтобы поиск работал правильно независимо от языка данных.

  */

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
