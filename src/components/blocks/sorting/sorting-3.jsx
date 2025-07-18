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

  const VALUE_OF_TOP = 3;
  const SORT_SWITCH_THRESHOLD = 10;
  const topOfLeaguePoints = testData.length - 1 - VALUE_OF_TOP;

  const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const partition = (arr, left, right) => {
    const pivot = arr[random(left, right)].leaguePoints;
    while (left <= right) {
      while (arr[left].leaguePoints < pivot) {
        left++;
      }

      while (arr[right].leaguePoints > pivot) {
        right--;
      }

      if (left <= right) {
        swap(arr, left, right);
        left++;
        right--;
      }
    }

    return left;
  };

  const quickSelect = (arr, k, left = 0, right = arr.length - 1) => {
    if (left === right) {
      return arr[left];
    }

    const pivotIndex = partition(arr, left, right);

    if (k < pivotIndex) {
      return quickSelect(arr, k, left, pivotIndex - 1);
    } else {
      return quickSelect(arr, k, pivotIndex, right);
    }
  };

  const quickSort = (arr, left = 0, right = arr.length - 1) => {
    const pivotIndex = partition(arr, left, right);

    if (left < pivotIndex - 1) {
      quickSort(arr, left, pivotIndex - 1);
    }
    if (right > pivotIndex) {
      quickSort(arr, pivotIndex, right);
    }

    return arr;
  };

  const insertionSort = (arr, from = 0, to = arr.length) => {
    for (let i = from + 1; i < to; i++) {
      let current = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j].leaguePoints > current.leaguePoints) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = current;
    }
    return arr;
  };

  // Получаем топ 3 неотсортированных.
  quickSelect(testData, topOfLeaguePoints);

  // Сортируем эти топ 3 с помощью quickSort.
  // Практика показывает, что на малых данных quickSort плохо себя показывает.

  if (testData.length - 1 - topOfLeaguePoints < SORT_SWITCH_THRESHOLD) {
    insertionSort(testData, topOfLeaguePoints, testData.length);
  } else {
    quickSort(testData, topOfLeaguePoints, testData.length - 1);
  }

  // Формируем топ 3 для отображения.
  const reversedListItems = [];

  for (let i = testData.length - 1; i > topOfLeaguePoints; i--) {
    const el = testData[i];

    reversedListItems.push(
      <li key={el.login + el.leaguePoints}>
        <p>Login: {el.login}</p>
        <p>League Points: {el.leaguePoints}</p>
      </li>
    );
  }

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
      <p>
        Нужно вывести топ <b>{VALUE_OF_TOP}</b>
      </p>
      <ol>{reversedListItems}</ol>
    </div>
  );
};

export { Sorting3 };
