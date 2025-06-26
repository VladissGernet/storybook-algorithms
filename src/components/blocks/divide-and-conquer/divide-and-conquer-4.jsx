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

const findGuildAndPlacement = (points, data) => {
  console.log(points);
  console.log(data);

  /*
    Алгоритм, решающий эту задачу, похож на бинарный поиск, но отбрасывать
    из наших данных на каждом шаге мы сможем только одну четверть, а не половину.
    Попробуйте найти в тестовых данных какой-нибудь счёт и посмотреть,
    какую из сторон матрицы вы совсем не рассматриваете.
  */

  // return { guild: "goldfish", placement: 1 };
  return {};
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
        resultObj={findGuildAndPlacement(53, testData2)}
        points={53}
        answerObj={{ guild: "goldfish", placement: 1 }}
      />
    </div>
  );
};

export { DivideAndConquer4 };
