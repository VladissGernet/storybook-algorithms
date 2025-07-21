import React from "react";

import image from "/src/assets/tree-3/download.png";

const Tree3 = () => {
  const data = [
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
      login: "Mountaintrid",
      leaguePoints: 1130,
    },
    {
      login: "cathead",
      leaguePoints: 930,
    },
    {
      login: "Goldenelox",
      leaguePoints: 932,
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

  // Пункт №1.
  // BST = Binary Search Tree
  class BSTNode {
    constructor(value, left, right) {
      this.value = value;
      this.left = left;
      this.right = right;
    }
  }

  const leftLeftLeft = new BSTNode(data[4], null, null);
  const leftLeft = new BSTNode(data[7], leftLeftLeft, null);
  const leftRight = new BSTNode(data[0], null, null);
  const left = new BSTNode(data[5], leftLeft, leftRight);

  const rightLeft = new BSTNode(data[3], null, null);
  const rightRight = new BSTNode(data[6], null, null);
  const right = new BSTNode(data[2], rightLeft, rightRight);

  // "Корень" нашего дерева, будем обходить начиная с него
  const root = new BSTNode(data[1], left, right);

  // №2.
  const topThree = () => {
    let bestThreeRoot = root;

    // пока снизу справа есть как минимум один уровень...
    while (bestThreeRoot.right && bestThreeRoot.right.right) {
      //  ... обновляем указатель на лучшую тройку
      bestThreeRoot = bestThreeRoot.right;
    }

    // №3.
    return [
      bestThreeRoot.right.value,
      bestThreeRoot.value,
      bestThreeRoot.left.value,
    ];
  };

  console.log(topThree());

  return (
    <div>
      <h1>Пример</h1>
      <img src={image} width={493} height={333} />
      <p>Должен вывести игроков BoostScooby, SaiyanBroadway, Mountaintrid</p>
      <p>Построение бинарного дерева руками.</p>
      <p>
        1. Мы уже знаем, в каком формате хранятся обычные деревья, нам нужно
        немного изменить их структуру и назвать детей каждой ноды по их
        положению — слева или справа. Построим следующее дерево из визуализации,
        представленной выше.
      </p>
      <p>
        2. Теперь наша задача довольно проста: нужно лишь найти самую правую
        часть дерева, у которой есть два потомка. Так как наше дерево
        самобалансируется, предположим, что у каждой правой ноды есть либо ноль,
        либо оба ребёнка.
      </p>
      <p>
        3. Мы точно знаем, что у полученного нами корня лучшей тройки слева
        точно идёт самый маленький счет, справа — самый большой, а в самом корне
        — топ-2. Остается лишь вернуть их в нужной очерёдности.
      </p>
    </div>
  );
};

export { Tree3 };
