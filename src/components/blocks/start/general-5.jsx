import React from "react";

import { Tester } from "../tester/tester";

const General5 = () => {
  /*
    Примеры:
      count([]) // 0
      count([[1, 5], [5, 10]]) // 1
      count([[1, 5], [0, 1], [4, 5]]) // 2
      count([[1, 10], [5, 6], [2, 3], [7, 8]]) // 2
      count([[1, 2], [1, 10], [4, 9], [8, 15], [5, 6], [8, 16]]) // 4
  */

  const case1 = [];
  const case2 = [
    [1, 5],
    [5, 10],
  ];
  const case3 = [
    [1, 5],
    [0, 1],
    [4, 5],
  ];
  const case4 = [
    [1, 10],
    [5, 6],
    [2, 3],
    [7, 8],
  ];
  const case5 = [
    [1, 2],
    [1, 10],
    [4, 9],
    [8, 15],
    [5, 6],
    [8, 16],
  ];

  // Асимтотическая сложность O(n * k).
  // const countMaxPeople = (timesArr) => {
  //   if (timesArr && timesArr.length === false) {
  //     return 0;
  //   }

  //   let dayTimes = {};
  //   let maxHour = 0;

  //   for (let time of timesArr) {
  //     const enter = time[0];
  //     const exit = time[1];

  //     for (let i = exit - enter; i > 0; i--) {
  //       const currentHour = exit - i;
  //       if (!dayTimes[currentHour]) {
  //         dayTimes[currentHour] = 1;
  //       } else {
  //         dayTimes[currentHour] = ++dayTimes[currentHour];
  //       }
  //     }
  //   }

  //   for (let hour in dayTimes) {
  //     maxHour = Math.max(maxHour, dayTimes[hour]);
  //   }
  //   return maxHour;
  // };

  // Решение из гайда.
  const compareEntries = (left, right) => {
    // Выход раньше входа в то же время
    if (left.time === right.time) {
      return left.isEntering ? 1 : -1;
    }

    return left.time - right.time;
  };

  const countMaxPeople = (input) => {
    if (input && input.length === false) {
      return 0;
    }

    /*
      Если перекладывать это решение в код, то для начала нам нужно преобразовать данные в такой
      формат событий «прохода через турникеты». Например, возьмём следующую структуру объекта:

      {
        time: 0,
        isEntering: true, // если в этот момент человек входил — true, выходил — false
      }
      И перегоним наблюдения системы в него. Это займет у нас O(n) времени.
    */

    const entries = [];

    for (let [enteringTime, leavingTime] of input) {
      entries.push({
        time: enteringTime,
        isEntering: true,
      });

      entries.push({
        time: leavingTime,
        isEntering: false,
      });
    }

    entries.sort(compareEntries);

    let currentCount = 0;
    let maxCount = 0;

    for (let { isEntering } of entries) {
      currentCount += isEntering ? 1 : -1;
      maxCount = Math.max(currentCount, maxCount);
    }

    return maxCount;
  };

  return (
    <div>
      <h1>Пример</h1>
      <p>
        На примере этой задачи можно понять, насколько правильный подход к
        подготовке данных для задачи имеет вес в производительности и простоте
        решения.
      </p>
      <p>
        Офис X работает по правилам коворкинга: каждый сотрудник может работать
        из дома или приходить в офис. В спокойные дни в офисе тихо, приходят
        пара-тройка людей. А ближе к релизам/отчетным периодам/другим завалам
        людей гораздо больше, но все сотрудники всё равно никогда не выходят.
      </p>
      <p>
        Начальство хочет какое-то время понаблюдать, сколько же человек максимум
        приходят в офис, чтобы сократить количество «посадочных мест» и меньше
        платить за аренду. Для этого они наладили систему, которая фиксирует
        время захода и выхода людей из офиса, и планируют из этих данных
        получить максимальное количество присутствующих сотрудников в день.
        Система эта сохраняет нужные данные в формате [времяВхода, времяВыхода]
        для каждого сотрудника. Если люди входят и выходят одновременно,
        считается, что выход происходит раньше (уходящий человек уже встал с
        места и освободил его, а входящий ещё не успел занять).
      </p>
      <p>
        Ваша задача — написать функцию, получающую из информации в системе
        максимальное количество одновременно находящихся сотрудников в офисе.
      </p>
      <Tester result={countMaxPeople(case1)} answer={0} />
      <Tester result={countMaxPeople(case2)} answer={1} />
      <Tester result={countMaxPeople(case3)} answer={2} />
      <Tester result={countMaxPeople(case4)} answer={2} />
      <Tester result={countMaxPeople(case5)} answer={4} />
    </div>
  );
};

export { General5 };
