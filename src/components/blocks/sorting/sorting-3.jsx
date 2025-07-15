import React from "react";

const Sorting3 = () => {
  const testData = [
    {
      login: "DreamLess",
      leaguePoints: 956,
    },
    {
      login: "cavernous",
      leaguePoints: 1056,
    },
    {
      login: "SaiyanBroadway",
      leaguePoints: 1432,
    },
    {
      login: "BlondiePlanet",
      leaguePoints: 1045,
    },
    {
      login: "Mountaintrid",
      leaguePoints: 1130,
    },
    {
      login: "cathead",
      leaguePoints: 930,
    },
    {
      login: "rstrazir",
      leaguePoints: 356,
    },
    {
      login: "stypeano",
      leaguePoints: 4,
    },
    {
      login: "CzarStories",
      leaguePoints: 568,
    },
    {
      login: "ConspiracyLil",
      leaguePoints: 18,
    },
    {
      login: "GottaSaiyan",
      leaguePoints: 931,
    },
    {
      login: "Goldenelox",
      leaguePoints: 932,
    },
    {
      login: "Breakingbing",
      leaguePoints: 64,
    },
    {
      login: "Rectionom",
      leaguePoints: 42,
    },
    {
      login: "BoostScooby",
      leaguePoints: 1476,
    },
    {
      login: "JoshChase",
      leaguePoints: 931,
    },
  ];

  return (
    <div>
      <h1>5.9. Проблемы с производительностью списка лидеров</h1>
      <p>
        Аналитики уже известного нам «Удара легенд» с ужасом заметили, что показ
        общего списка лидеров по запросу игроков отрабатывает очень долго и
        сильно нагружает игровые серверы. Зная, что вы писали несколько фичей
        для других списков лидеров внутри игры, они пришли просить вашей помощи.
      </p>
      <p>
        Используя ту же модель данных, что и в прошлом практическом задании,
        напишите функцию, которая из НЕсортированного списка счётов игроков
        отдаёт топ-3 лучших, не прибегая к полной сортировке. Можете
        использовать любой из уже известных вам алгоритмов сортировки.
      </p>
    </div>
  );
};

export { Sorting3 };
