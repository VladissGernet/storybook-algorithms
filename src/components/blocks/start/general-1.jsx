import React from "react";

import image from "/src/assets/general-1/banners.png";

const General1 = () => {
  /*
    Самое наивное решение — поочерёдно брать пару баннеров из всех возможных и смотреть на сумму их ширины.
    Берём их, если они подходят. А если не подходят — идём дальше и сравниваем следующие.

    Это решение по сложности будет таким же, как и в «Выбрать два цвета для ремонта», O(n²), потому что
    каждый новый баннер заставит нас делать по n новых итераций, чтобы сравнить его с предыдущими.
  */

  const sortedArray = [40, 50, 100, 300, 700];
  const testUserWidth = 150;

  let findBanners1Counter = 0;

  const findBanners1 = (banners, userWidth) => {
    for (let i = 0; i < banners.length; i++) {
      for (let j = i + 1; j < banners.length; j++) {
        findBanners1Counter++;
        if (banners[i] + banners[j] === userWidth) {
          return [banners[i], banners[j]];
        }
      }
    }
  };
  console.log("Первое решение:");
  console.log(findBanners1(sortedArray, testUserWidth));
  console.log("Число итераций:", findBanners1Counter);
  console.log("==========================================");

  /*
    Для нового решения нам нужно хранить все баннеры в строго отсортированном по возрастанию массиве.
    Допустим, у нас есть массив из баннеров с шириной [40, 50, 100, 300, 700], а у пользователя вмещается сетка шириной 150 пикселей.
    Тогда возьмём два самых крайних элемента — 700 и 40. В сумме они дают 740, что значительно больше ширины пользовательского экрана.
    Возьмём следующий с конца элемент — 300, а новая сумма будет равна 340 — всё ещё больше, чем нужно.
    Посмотрим на элемент левее — 100. Теперь новая сумма меньше той, что нам нужна — 140. Чтобы её увеличить, возьмём следующий
    после 40 элемент — 50 и получим, наконец, нужные нам баннеры!

    При добавлении одного баннера в отсортированный массив нам в худшем случае придётся сделать на одну итерацию больше, чем без него.
    А значит, мы пришли к линейному алгоритму, который работает за O(n)!
  */

  let findBanners2Counter = 0;

  const findBanners2 = (banners, userWidth) => {
    let leftPointer = 0;
    let rightPointer = banners.length - 1;

    while (leftPointer < rightPointer) {
      const bannersWidth = banners[leftPointer] + banners[rightPointer];
      findBanners2Counter++;
      if (bannersWidth === userWidth) {
        return [banners[leftPointer], banners[rightPointer]];
      }
      if (bannersWidth > userWidth) {
        rightPointer--;
      } else {
        leftPointer++;
      }
    }
  };

  console.log("Второе решение:");
  console.log(findBanners2(sortedArray, testUserWidth));
  console.log("Число итераций:", findBanners2Counter);

  return (
    <div>
      <h1>Пример из фронтенда</h1>
      <p>
        Допустим, дизайнер нарисовал интересный макет, согласно которому мы
        должны показывать пользователю два рекламных баннера в сетке, состоящей
        из колонок по 20 пикселей каждая. Нам нужно всего лишь выбирать два
        разных по ширине баннера, которые идеально вписываются в сетку на экране
        браузера пользователя, и их выводить.
      </p>
      <img src={image} alt="banners" width="50%" />
    </div>
  );
};

export { General1 };
