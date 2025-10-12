import React from "react";

const GreedyAlgorithms2 = () => {
  const data = [2, 3, 1, 1, 4];

  // Решение из гайда.
  const countJumpsGuideSolution = (pebbles) => {
    let jumps = 0;

    let previousPosition = 0; // Позиция предыдущего оптимального прыжка
    let currentPosition = 0; // Позиция текущего прыжка

    // Пока не допрыгали до конца...

    while (currentPosition < pebbles.length - 1) {
      // Прыгаем!
      jumps++;

      // Нам нужно обойти все камни, которые мы можем достигнуть с предыдущего до текущего прыжка
      // Но так как дальше мы будем менять previousPosition, я заранее сохраняю его

      let candidate = previousPosition;

      // Текущий прыжок становится предыдущим
      previousPosition = currentPosition;

      while (candidate <= previousPosition) {
        if (jumps === 2) {
          console.log("previousPosition", previousPosition);
          console.log("currentPosition", currentPosition);
          console.log("candidate", candidate);
          console.log(
            "candidate + pebbles[candidate]",
            candidate + pebbles[candidate]
          );

          console.log("================");
        }
        // А текущий прыжок — это максимально достижимый камень с предыдущей
        currentPosition = Math.max(
          currentPosition,
          candidate + pebbles[candidate]
        );
        candidate++;
      }
    }

    return jumps;
  };

  // console.log(countJumpsGuideSolution(data));

  const countJumpsSelfTry = (pebbles) => {
    let jumps = 0;

    let currentPos = 0;
    let currentSteps = pebbles[0];

    while (currentPos + currentSteps <= pebbles.length - 1) {
      jumps++;
      // Выбранный камень с наибольшим значением.
      let selectedPebble = 0;
      for (let i = ++currentPos; i < currentPos + currentSteps; i++) {
        if (selectedPebble <= pebbles[i]) {
          selectedPebble = pebbles[i];
          currentPos = i;
        }
      }
      currentSteps = selectedPebble;
    }

    return jumps;
  };

  // countJumpsSelfTry(data);

  return (
    <div>
      <h1>Ещё одна мини-игра</h1>
      <p>
        После большого наплыва новых игроков в «Ударе Легенд» закончились
        вычислительные мощности... Чтобы игрокам было не так скучно ждать в
        очереди на сервер, технологи придумали мини-игру.
      </p>
      <p>
        Через речку проложена дорога из камней, а на каждом камне написана цифра
        — на сколько камней вперёд максимально можно прыгнуть с него. За каждое
        прохождение игры, если игрок потратил минимально возможное количество
        ходов, даётся небольшое количество внутриигровой валюты. Такая вот
        компенсация ожидания!
      </p>
      <p>
        Другие разработчики реализовали логику игры, но не смогли реализовать
        логику проверки на минимальное количество ходов. Они обратились к вам за
        помощью: разработайте функцию, которая принимает в себя массив из цифр
        на камнях и возвращает минимальное количество шагов для прохождения.
      </p>
    </div>
  );
};

export { GreedyAlgorithms2 };
