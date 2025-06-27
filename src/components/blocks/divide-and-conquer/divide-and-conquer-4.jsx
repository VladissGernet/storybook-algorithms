import React from "react";

import { TesterDivideAndConquer4 } from "../tester/tester-divide-and-conquer-4";

const testData1 = [
  [
    {
      login: "stypeano",
      leaguePoints: 23,
      guild: "seabass",
    },
    {
      login: "rstrazir",
      leaguePoints: 42,
      guild: "seabass",
    },
  ],
  [
    {
      login: "kinerber",
      leaguePoints: 28,
      guild: "goldfish",
    },
    {
      login: "eridarma",
      leaguePoints: 53,
      guild: "goldfish",
    },
  ],
];

const testData2 = [
  [
    {
      login: "stypeano",
      leaguePoints: 4,
      guild: "seabass",
    },
    {
      login: "rstrazir",
      leaguePoints: 356,
      guild: "seabass",
    },
    {
      login: "cathead",
      leaguePoints: 930,
      guild: "seabass",
    },
    {
      login: "cavernous",
      leaguePoints: 1056,
      guild: "seabass",
    },
  ],
  [
    {
      login: "ConspiracyLil",
      leaguePoints: 18,
      guild: "goldfish",
    },
    {
      login: "CzarStories",
      leaguePoints: 568,
      guild: "goldfish",
    },
    {
      login: "GottaSaiyan",
      leaguePoints: 931,
      guild: "goldfish",
    },
    {
      login: "Mountaintrid",
      leaguePoints: 1130,
      guild: "goldfish",
    },
  ],
  [
    {
      login: "Rectionom",
      leaguePoints: 42,
      guild: "catfish",
    },
    {
      login: "JoshChase",
      leaguePoints: 931,
      guild: "catfish",
    },
    {
      login: "DreamLess",
      leaguePoints: 956,
      guild: "catfish",
    },
    {
      login: "BlondiePlanet",
      leaguePoints: 1045,
      guild: "catfish",
    },
  ],
  [
    {
      login: "Breakingbing",
      leaguePoints: 64,
      guild: "bream",
    },
    {
      login: "Goldenelox",
      leaguePoints: 932,
      guild: "bream",
    },
    {
      login: "SaiyanBroadway",
      leaguePoints: 1432,
      guild: "bream",
    },
    {
      login: "BoostScooby",
      leaguePoints: 1476,
      guild: "bream",
    },
  ],
];
// Моё решение O(M + log N).
const findGuildAndPlacement = (points, data) => {
  // Левая и правая граница рекурсии.
  let dataBorders = {
    left: 0,
    right: data.length - 1,
  };

  // Бинарный поиск текущей гильдии.
  const searchBinaryRecursive = (guild, left = 0, right = guild.length - 1) => {
    // Базовый случай бинарного рекурсионного поиска.
    if (left > right) {
      return null;
    }

    const mid = Math.floor((left + right) / 2);

    if (guild[mid].leaguePoints === points) {
      // Возвращаем объект.
      return { guild: guild[mid].guild, placement: guild.length - mid };
    }

    if (guild[mid].leaguePoints < points) {
      left = mid + 1;
    } else if (guild[mid].leaguePoints > points) {
      right = mid - 1;
    }

    return searchBinaryRecursive(guild, left, right);
  };

  const initFind = (dataBorders) => {
    let { left, right } = dataBorders;

    // Базовый случай окончания рекурсии.
    if (left > right) {
      return {};
    }

    // Текущий массив лидеров в гильдии.
    const guild = data[dataBorders.left];

    // Минимальное количество очков в текущей гильдии.
    const minGuildPoints = guild[0].leaguePoints;
    // Второй базовый случай, если minGuildPoints больше points, то ничего не найдено.
    if (minGuildPoints > points) {
      return {};
    }

    // Если максимальное количество очков в текущей гильдии меньше искомого points, то это сразу шаг вправо.
    const maxGuildPoints = guild[guild.length - 1].leaguePoints;
    if (maxGuildPoints < points) {
      return initFind({ left: ++left, right });
    }

    // Бинарный поиск текущей гильдии.
    const result = searchBinaryRecursive(guild);

    if (result) {
      return result;
    }

    // Каждый проход смешает вправо шаг leftDataBorder.
    return initFind({ left: ++left, right });
  };

  // Активация рекурсии.
  return initFind(dataBorders);
};

// Решение из гайда "Разделяй и властвуй" ("Вivide and Сonquer").
const searchSubtask = (
  leaderboard,
  leaguePoints,
  topBorder,
  leftBorder,
  bottomBorder,
  rightBorder
) => {
  return null;
};

const searchScore = (leaderboard, leaguePoints) => {
  // Если матрица пуста, то и возвращать мы будем null.
  if (!(leaderboard.length && leaderboard[0].length)) {
    return null;
  }

  const bottomBorder = leaderboard.length - 1;
  const rightBorder = leaderboard[0].length - 1;

  return searchSubtask(
    leaderboard,
    leaguePoints,
    0,
    0,
    bottomBorder,
    rightBorder
  );
};

const DivideAndConquer4 = () => {
  return (
    <div>
      <h1>Технологи хотят ещё одну фичу</h1>
      <p>
        Технологи «Удара легенд» очень довольны после запуска опции с поиском
        игроков из предыдущего модуля! На волне успеха они принесли ещё одну
        новую фичу. В игре, помимо лиг, доступны и гильдии, по которым также
        существуют свои таблицы лидеров. Технологи очень хотят, чтобы похожие по
        счёту игроки искались не только внутри лиг, но и внутри гильдий — вдруг
        игроки захотят вступить в гильдии с игроками с похожим счётом? Гипотеза
        странная, но стоит проверки.
      </p>
      <p>
        Имея счёт игрока, нужно найти в таблице лидеров для гильдий игрока с
        таким же счётом и вернуть его название гильдии и место в гильдии.
      </p>
      <p>
        Как и в случае с лигами, это «отсортированная матрица», только
        сортировка немного другая. Гильдии отсортированы сверху вниз по счёту
        самого «слабого» из их игроков. А внутри гильдии все игроки
        отсортированы по количеству очков, как и в прошлый раз. Важное
        уточнение: в отличие от лиг, в таблице лидеров для гильдий в каждой
        гильдии находится одинаковое количество участников, то есть матрица
        является прямоугольной. Чтобы нагляднее показать разницу между задачами,
        посмотрите на примерные данные, с которыми придётся работать (а заодно
        посмотрите на новую модель данных игроков в таблице):
      </p>
      <TesterDivideAndConquer4
        resultObj={findGuildAndPlacement(53, testData1)}
        points={53}
        answerObj={{ guild: "goldfish", placement: 1 }}
      />
      <TesterDivideAndConquer4
        resultObj={findGuildAndPlacement(23, testData1)}
        points={23}
        answerObj={{ guild: "seabass", placement: 2 }}
      />
      <TesterDivideAndConquer4
        resultObj={findGuildAndPlacement(4, testData2)}
        points={4}
        answerObj={{ guild: "seabass", placement: 4 }}
      />
      <TesterDivideAndConquer4
        resultObj={findGuildAndPlacement(64, testData2)}
        points={64}
        answerObj={{ guild: "bream", placement: 4 }}
      />
      <TesterDivideAndConquer4
        resultObj={findGuildAndPlacement(568, testData2)}
        points={568}
        answerObj={{ guild: "goldfish", placement: 3 }}
      />
      <TesterDivideAndConquer4
        resultObj={findGuildAndPlacement(18, testData2)}
        points={18}
        answerObj={{ guild: "goldfish", placement: 4 }}
      />
      <TesterDivideAndConquer4
        resultObj={findGuildAndPlacement(1045, testData2)}
        points={1045}
        answerObj={{ guild: "catfish", placement: 1 }}
      />
    </div>
  );
};

export { DivideAndConquer4 };
