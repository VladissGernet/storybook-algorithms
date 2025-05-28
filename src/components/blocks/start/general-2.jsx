import React from "react";

/*
  План создания примера из гайда "Примеры алгоритмически переусложнёного кода":
  1. Написать тестер со статическими данными.
  2. Добавить динамику.
  3. Оформит решение задачи.

  Отсановился на написании тестера.
*/
const Tester = ({ result, answer }) => {
  let textColor = "salmon";
  let text = `Тест не пройден! ${result} не равно ${answer}`;

  if (result === answer) {
    textColor = "lightgreen";
    text = "Тест пройден!";
  }

  return (
    <div style={{ color: textColor, backgroundColor: "black" }}>{text}</div>
  );
};

const General2 = () => {
  /*
    Задача: найти, сколько раз встречается самый частый элемент в объединении двух отсортированных
    по возрастанию массивов. Элементы могут повторяться.

    Примеры:
    countMostFrequent([1, 2, 2, 3], [0, 2, 4, 4]) => 3
    countMostFrequent([], [0, 0]) => 2
  */
  const arr1 = [1, 2, 2, 3];
  const arr2 = [0, 2, 4, 4];

  const countMostFrequentMySolution = (arr1, arr2) => {
    const merged = [...arr1, ...arr2].sort();

    let resultValue;
    let countOfValueMatches;
    let maxCountOfValueMatches = 1;
    let maxResultValue;

    for (let i = 0; i < merged.length; i++) {
      // Пропускаем первую итерацию и записываем первое число массива.
      if (i === 0) {
        resultValue = merged[i];
        continue;
      }

      // Если текущее число равно предыдущему, то увеличиваем счётчик.
      if (merged[i] === resultValue) {
        countOfValueMatches++;
      } else {
        // Иначе проверяем счётчик, если он больше максимального, то обновляем максимальный и сохраняем максимальный результат.
        if (countOfValueMatches > maxCountOfValueMatches) {
          maxResultValue = resultValue;
        }
        countOfValueMatches = 1;
        resultValue = merged[i];
      }
    }

    return maxResultValue;
  };

  countMostFrequentMySolution(arr1, arr2);

  return (
    <div>
      <h1>Примеры алгоритмически переусложнённого кода</h1>
      <p>
        Задача: найти, сколько раз встречается самый частый элемент в
        объединении двух отсортированных по возрастанию массивов. Элементы могут
        повторяться.
      </p>
      <Tester result={123} answer={123} />
    </div>
  );
};

export { General2 };
