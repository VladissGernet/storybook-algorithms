import React, { useEffect, useRef } from "react";

const Cache3 = () => {
  /* 
    В «Ударе легенд» есть следующая механика удержания игроков. После игры одному участнику может упасть внутриигровой предмет 
    (который иначе пришлось бы покупать за реальные деньги). Решается это случайным образом, поэтому чем больше ты играешь, тем 
    выше шансы получить что-то бесплатно.

    Технологи «Удара» решили придать этому ещё больше интереса. Теперь вместо статичного сообщения «Игрок X выиграл предмет» они 
    хотят сделать небольшую мини-игру. Сначала показываются все ники игроков, но раз в секунду одного из них будут убирать. 
    Логика удаления будет следующей. Сначала мы показываем на первого игрока. Отступаем от него на 0-3 позиции вперёд и убираем 
    игрока, на которого попали. Затем продолжаем вычёркивать, начиная от него, пока не останется один игрок. Как только мы упрёмся 
    в конец списка, просто начинаем сначала.

    Напишите функцию, которая будет определять победителя этой мини-игры на удачу. Имея массив ников игроков, например, 
    ['GottaSaiyan', 'Mountaintrid', 'Rectionom', 'JoshChase', 'DreamLess', 'BlondiePlanet', 'Breakingbing', 'Goldenelox'], 
    возвращайте массив из итераций этой игры.
  */

  const mockData = [
    "GottaSaiyan",
    "Mountaintrid",
    "Rectionom",
    "JoshChase",
    "DreamLess",
    "BlondiePlanet",
    "Breakingbing",
    "Goldenelox",
  ];

  const MAX_STEP = 3;

  // Решение нейоросети.
  /*   const initEliminating = (arr) => {
    const players = [...arr];
    const eliminated = [];
    let currentStep = 0;

    while (players.length > 1) {
      const step = Math.floor(Math.random() * MAX_STEP + 1);
      const removeIndex = (currentStep + step) % players.length;

      eliminated.push({
        login: players[removeIndex],
        step: step,
      });
      players.splice(removeIndex, 1);
      currentStep = removeIndex % players.length;
    }

    return eliminated;
  }; */

  // Решение из гайда.
  const initEliminating = (arr) => {
    const players = [...arr];
    const eliminated = [];

    while (players.length > 1) {
      const step = Math.floor(Math.random() * MAX_STEP + 1);
      let remove = step;

      while (remove) {
        const removedPlayer = players.shift();
        players.push(removedPlayer);
        remove--;
      }

      const eliminatedPlayer = players.shift();
      eliminated.push({
        login: eliminatedPlayer,
        step,
      });
    }

    return eliminated;
  };

  const eliminatedQue = initEliminating(mockData);

  const list = useRef(null);

  useEffect(() => {
    let timeout = 500;

    eliminatedQue.forEach((el) => {
      const listItem = list.current.querySelector(`li[data-login=${el.login}]`);
      if (listItem) {
        timeout += 500;
        setTimeout(() => {
          listItem.style.color = "red";
        }, timeout);
      }
    });
  }, []);

  return (
    <div>
      <h1>Игра в игре</h1>
      <ul ref={list}>
        {mockData.map((item) => (
          <li key={item} data-login={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Cache3 };
