import React from "react";

import { Tester } from "../tester/tester";

const DivideAndConquer2 = () => {
  /*
    Примеры:
    fibonacci(1) // 0
    fibonacci(2) // 1
    fibonacci(13) // 144

    Задача из learn.javascript.ru

    Последовательность чисел Фибоначчи определяется формулой Fn = Fn-1 + Fn-2. То есть, следующее число получается как сумма двух предыдущих.

    Первые два числа равны 1, затем 2(1+1), затем 3(1+2), 5(2+3) и так далее: 1, 1, 2, 3, 5, 8, 13, 21....

    Числа Фибоначчи тесно связаны с золотым сечением и множеством природных явлений вокруг нас.

    Напишите функцию fib(n) которая возвращает n-е число Фибоначчи.

    Пример работы:

    function fib(n) {  ваш код  }

    alert(fib(3)); // 2
    alert(fib(7)); // 13
    alert(fib(77)); // 5527939700884757
    P.S. Все запуски функций из примера выше должны работать быстро. Вызов fib(77) должен занимать не более доли секунды.

    */

  /*

  Задача из learn.javascript
      Напишите функцию printList(list), которая выводит элементы списка по одному.

Сделайте два варианта решения: используя цикл и через рекурсию.

Как лучше: с рекурсией или без?
    */

  const list = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: null,
        },
      },
    },
  };

  // const printList = (list) => {
  //   if (list.next === null) {
  //     console.log(list.value, "done");
  //     return null;
  //   }
  //   console.log(list.value);

  //   list = list.next;

  //   return printList(list);
  // };

  let counter = 10;

  const printList = (list) => {
    while (list.next !== null && counter > 0) {
      counter--;
      console.log("list.value", list.value);
      list = list.next;
    }
    console.log(list.value, "last");
  };

  printList(list);

  // const fib = (index) => {
  //   if (index === 1) {
  //     return 0;
  //   } else if (index === 2) {
  //     return 1;
  //   }
  //   let fibArr = [0, 1];

  //   for (let i = 2; i <= index; i++) {
  //     fibArr.push(fibArr[i - 1] + fibArr[i - 2]);
  //   }
  //   console.log(fibArr);

  //   return fibArr[fibArr.length - 1];
  // };

  /*
    В вашем решении вы используете массив для хранения уже вычисленных чисел, что значительно эффективнее.

Это пример мемоизации — сохранения промежуточных результатов.

Ваш подход избегает повторных вычислений и работает за линейное время O(n).
  */
  const fib = (index, fibArr = [0, 1]) => {
    if (index === 1) {
      return 0;
    } else if (index === 2) {
      return 1;
    }

    if (index === fibArr.length - 1) {
      return fibArr[fibArr.length - 1];
    }
    fibArr.push(fibArr[fibArr.length - 1] + fibArr[fibArr.length - 2]);

    return fib(index, fibArr);
  };

  /*
  Решение из гайда:

    function fibonacci(index) {
      if (index === 1) {
        return 0;
      }

      if (index === 2) {
        return 1;
      }

      return fibonacci(index - 1) + fibonacci(index - 2);
    }

    Как работает двойной вызов fibonacci(index - 1) + fibonacci(index - 2)?
Если index больше 2, функция возвращает сумму двух чисел Фибоначчи с индексами index - 1 и index - 2.

Для вычисления каждого из этих чисел функция рекурсивно вызывает себя.

Таким образом, функция разбивает задачу на две более простые: найти два предыдущих числа Фибоначчи.

Каждый из этих вызовов в свою очередь вызывает функцию ещё раз, пока не дойдёт до базовых случаев index === 1 или index === 2.

Недостаток решения из гайда
Оно очень неэффективно из-за повторных вычислений.

Например, для fibonacci(5) вычисление fibonacci(3) происходит дважды.

Количество вызовов растёт экспоненциально с увеличением index.
  */

  return (
    <div>
      <h1>Пример</h1>
      <p>
        Посмотрим на ещё одну классическую и простую для рекурсивного решения
        задачу: функция для получения числа из последовательности Фибоначчи по
        индексу. Первое её число — 0, второе — 1, а каждое последующее — сумма
        двух предыдущих.
      </p>
      <Tester result={fib(1)} answer={0} />
      <Tester result={fib(2)} answer={1} />
      <Tester result={fib(3)} answer={2} />
      <Tester result={fib(7)} answer={13} />
      <Tester result={fib(13)} answer={233} />
      <Tester result={fib(77)} answer={5527939700884757} />
    </div>
  );
};

export { DivideAndConquer2 };
