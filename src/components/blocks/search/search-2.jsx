import React from "react";

import { TesterSearch2 } from "../tester/tester-search-2";

const testDataInitial = [
  [
    {
      login: "stypeano",
      leaguePoints: 23,
    },
    {
      login: "rstrazir",
      leaguePoints: 42,
    },
  ],
  [
    {
      login: "kinerber",
      leaguePoints: 322,
    },
    {
      login: "eridarma",
      leaguePoints: 1337,
    },
  ],
];

const testDataFinal = [
  [
    {
      login: "stypeano",
      leaguePoints: 4,
    },
    {
      login: "rstrazir",
      leaguePoints: 45,
    },
    {
      login: "cathead",
      leaguePoints: 143,
    },
    {
      login: "cavernous",
      leaguePoints: 324,
    },
  ],
  [
    {
      login: "ConspiracyLil",
      leaguePoints: 356,
    },
    {
      login: "CzarStories",
      leaguePoints: 568,
    },
    {
      login: "GottaSaiyan",
      leaguePoints: 598,
    },
    {
      login: "Mountaintrid",
      leaguePoints: 785,
    },
  ],
  [
    {
      login: "Rectionom",
      leaguePoints: 930,
    },
    {
      login: "JoshChase",
      leaguePoints: 931,
    },
    {
      login: "DreamLess",
      leaguePoints: 956,
    },
    {
      login: "BlondiePlanet",
      leaguePoints: 1045,
    },
  ],
  [
    {
      login: "Breakingbing",
      leaguePoints: 1056,
    },
    {
      login: "Goldenelox",
      leaguePoints: 1130,
    },
    {
      login: "SaiyanBroadway",
      leaguePoints: 1432,
    },
    {
      login: "BoostScooby",
      leaguePoints: 1476,
    },
  ],
];

const binarySearch = (arr, value) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (value === arr[mid].leaguePoints) {
      return mid;
    } else if (value < arr[mid].leaguePoints) {
      right = mid - 1;
    } else if (value > arr[mid].leaguePoints) {
      left = mid + 1;
    }
  }
  return null;
};

const Search2 = () => {
  const searchByLeaderboard = (points, table) => {
    // Прохожу по всем лигам таблицы. Асимтотическая сложность O(n).
    for (let i = 0; i <= table.length - 1; i++) {
      /*
        В каждой лиге ищу бинарным поиском человека с искомым значением очков.
        Асимтотическая сложность бинарного поиска O(logn).
      */
      const binarySearchResult = binarySearch(table[i], points);
      /*
        Если первый попавшейся человек был найден с нужным значением очков, то возвращаю объект.
        "league" — это номер лиги (люди считают с единицы, в отличие от индексации массива). Корректирую прибавлением 1.
        "placement" — место в лиге (с конца, ведь лучшие игроки в массиве лиги идут после худших).
      */
      if (binarySearchResult !== null) {
        const returnResult = {
          league: i + 1,
          placement: table[i].length - binarySearchResult,
        };
        return returnResult;
      }
    }
    return null;
  };

  return (
    <div>
      <h1>Задача: Онлайн игра «Удар легенд»</h1>
      <details>
        <summary>Условия задачи.</summary>
        <p>
          Онлайн игра «Удар легенд» имеет ранговый режим, при котором игроки
          соревнуются между собой. Игрок может попасть в одну из пяти лиг в
          зависимости от счёта: чем номер лиги выше, тем лучше. Перед тем, как
          попасть в лигу, игроки должны отыграть пять калибровочных игр, а до
          завершения пятой они не знают, на какое место и какую лигу претендуют.
          Аналитики хотят добавить в экран завершения игры новую опцию:
          показывать игрока с точно таким же рейтингом, как у текущего игрока в
          момент калибровки. Таким образом, игроки будут примерно представлять,
          в какую лигу и в какое её место они попадут после калибровки.
        </p>
        <p>Каждый из игроков в рейтинге представлен следующим объектом:</p>
        <pre>
          <code>
            {`
            {
              "login": "LuckyWasTaken",
              "leaguePoints": 9001
            }
          `}
          </code>
        </pre>
        <p>
          А сам рейтинг — массив из лиг, которые тоже представляют собой массивы
          с игроками (это объекты, описанные выше). Например, вот таблица со
          счётами играков представлена в объекте testData.
        </p>
        <p>
          Тогда, если по окончании одного из матчей у игрока 322 очка, на экране
          завершения игры мы должны показать, что он — претендент в начало
          второй лиги.
        </p>
        <p>
          Ваша задача — реализовать функцию для поиска по таблице лидеров,
          которая на вход принимает количество очков и непосредственно таблицу,
          а возвращает объект:
        </p>
        <pre>
          <code>
            {`
            {
              "league": 1,
              "placement": 1,
            }
          `}
          </code>
        </pre>
        <p>
          Где <b>league</b> — это номер лиги (осторожно, люди считают с единицы,
          в отличие от индексации массива), а <b>placement</b> — место в лиге (с
          конца, ведь лучшие игроки в массиве лиги идут после худших).
        </p>
        <p>
          То есть если игрок набрал при калибровке 322 очка, то функция должна
          вернуть:
        </p>
        <pre>
          <code>
            {`
            {
              "league": 2,
              "placement": 2,
            }
          `}
          </code>
        </pre>
        <p>
          Если таких игроков несколько — возвращайте первого найденного, а если
          никого не нашлось — <b>null</b>. Естественно, в настоящей таблице
          могут быть миллионы игроков (по крайней мере, аналитики надеются на
          такой успех), поэтому и поиск должен работать максимально оптимальным
          образом!
        </p>
        <p>
          Реализуйте функцию в любом удобном для вас редакторе кода и сравните
          получившийся результат с функцией в следующей демонстрации. Помните,
          что количество лиг и количество людей в каждой из них в настоящих
          данных может быть любым.
        </p>
      </details>
      <TesterSearch2
        result={searchByLeaderboard(322, testDataInitial)}
        answer={{
          league: 2,
          placement: 2,
        }}
      />
      <TesterSearch2
        result={searchByLeaderboard(931, testDataFinal)}
        answer={{
          league: 3,
          placement: 3,
        }}
      />
    </div>
  );
};

export { Search2 };
