import React from "react";

const Sorting2 = () => {
  const data = [
    {
      ticker: "WISH",
      price: 5.14,
    },
    {
      ticker: "SPCE",
      price: 20.1,
    },
    {
      ticker: "AAPL",
      price: 151.86,
    },
    {
      ticker: "QCOM",
      price: 155.98,
    },
    {
      ticker: "ABNB",
      price: 178.06,
    },
  ];

  const loaded = {
    ticker: "BABA",
    price: 166.99,
  };

  const sortPush = (arr, el) => {
    // Сначала предположим, что элемент пойдет прямо в начало массива
    let pointOfInsertion = 0;

    // Пока не встретим элемент больше вставляемого или конец массива...
    while (
      pointOfInsertion < arr.length &&
      el.price > arr[pointOfInsertion].price
    ) {
      // ... двигаем указатель на место вставки.
      pointOfInsertion++;
    }

    return pointOfInsertion === 0
      ? [el, ...arr]
      : [...arr.slice(0, pointOfInsertion), el, ...arr.slice(pointOfInsertion)];
  };

  return (
    <div>
      <h1>Дозапрос элементов с API.</h1>
    </div>
  );
};

export { Sorting2 };
