import React from "react";

const Cache1 = () => {
  class Cache {
    constructor(size) {
      // размер кеша в ключах, которые он может сохранить.
      this.size = size;
      //   №1.
      this._map = new Map();
    }

    // Получение из кеша по ключу
    // (обычно ключом как раз выступает аргумент функции, которую мы хотим кешировать)
    get(key) {
      // №1.
      //   return this._map.get(key);
      // №3.
      const value = this._map.get(key);
      return value;
    }

    // Запись в кеш
    set(key, value) {
      // №2.
      if (this._map.size === this.size) {
        this.delete(this._first());
      }

      this._map.set(key, value);
    }

    _first() {
      return this._map.keys().next().value;
    }

    // Удаление по ключу, если вдруг нам это пригодится
    delete(key) {
      // №1.
      this._map.delete(key);
    }
  }

  const cache = new Cache(2);

  cache.set(1, "foo");
  cache.set(2, "bar");

  cache.get(1); // foo

  cache.set(3, "baz");

  cache.get(1); // undefined

  //   №4.

  function cachedFibonacci() {
    const cache = new Cache(300);

    return function fibonacci(index) {
      if (index < 1 || !Number.isInteger(index)) {
        throw new Error(
          "Индекс должен быть целым числом больше или равным единице!"
        );
      }

      if (index === 1) {
        return 0;
      }

      if (index === 2) {
        return 1;
      }

      const cached = cache.get(index);

      if (cached) {
        return cached;
      }

      const calculated = fibonacci(index - 1) + fibonacci(index - 2);

      cache.set(index, calculated);

      return calculated;
    };
  }

  const fibonacci = cachedFibonacci();

  function uncachedFibonacci(index) {
    if (index < 1 || !Number.isInteger(index)) {
      throw new Error(
        "Индекс должен быть целым числом больше или равным единице!"
      );
    }

    if (index === 1) {
      return 0;
    }

    if (index === 2) {
      return 1;
    }

    return uncachedFibonacci(index - 1) + uncachedFibonacci(index - 2);
  }

  function log(message) {
    const result = document.createElement("li");

    result.innerHTML = message;

    // вывод результата
    // results.appendChild(result);
  }

  function benchmark(callback) {
    const start = performance.now();

    const result = callback();

    const end = performance.now();

    const time = (end - start) / 1000;

    log(`Получили ${result} за ${time.toFixed(5)} секунд`);
  }

  //   benchmark(() => fibonacci(300));
  //   benchmark(() => uncachedFibonacci(42));

  return (
    <div>
      <h1>Кешируем с помощью Map</h1>
      <p>
        Самая частая проблема для использования Map — кеширование. Про него мы
        уже говорили во втором разделе, когда познакомились с Map. Теперь пришло
        время и самим написать кеш!
      </p>
      <p>
        Напомним, что кеш — это некая структура данных, с помощью которой мы
        «запоминаем» результаты выполнения долгих функций (запрос с API или
        просто тяжёлые вычисления) и потом переиспользуем их вместо того, чтобы
        заново всё высчитывать. Было бы хорошо, чтобы кеш работал за O(1) на
        чтение и запись (что Map нам и позволяет сделать).
      </p>
      <p>
        Писать будем так называемый LRU-кеш или Least Recently Used кеш. Суть
        его в том, чтобы запоминать только последние несколько записей (сколько
        — дело нашей настройки), а как только в него пытаются записать больше —
        удалять самую старую. Такой кеш хорошо подходит для случаев, когда
        параметров может быть очень много, а памяти мы хотим или можем выделять
        только определённое количество.
      </p>
      <p>
        №1. Для начала создадим непосредственно хеш-таблицу и опишем самые
        простые методы. Описание удаления и чтения из кеша очень просты — это
        всего лишь «обёртки» над встроенными в Map функциями.
      </p>
      <p>
        №2. А вот с заполнением кеша не всё так просто — хотя с реализацией Map
        в JavaScript нам повезло больше, чем другим языкам. Перед тем, как
        положить новый ключ в таблицу, нам нужно убедиться, что она не
        переполнена. И если так есть, то удалить самый первый ключ. К счастью,
        Map хранит ключи итератором (получаемым методом keys()) в порядке
        добавления, а размер — отдельным полем size. Так что нам не придётся
        мучиться ни с поддержкой собственного счётчика размера, ни с
        организацией ключей в самописный связный список (хотя это мы уже можем
        делать).
      </p>
      <p>
        №3. Можно убедиться в работоспособности нашего кеша на «игрушечных
        данных», но на самом деле он помогает решить настоящие проблемы.
      </p>
      <p>
        №4. Одним из частых применений кеша, помимо кеширования ответов запросов
        с API, является кеширование результата функций «Разделяй и властвуй».
        Как правило, они «скатываются» если не к одним и тем же, то к очень
        похожим случаям.
      </p>
      <p>
        Можно, например, написать гораздо более быструю реализацию функции для
        получения чисел Фибоначчи, просто скопировав её рекурсивную версию и
        внедрив в неё кеш!
      </p>
      <p>
        Посмотрите на сравнение быстродействия нашей старой функции для подсчета
        Фибоначчи и её же, но с кешем!
      </p>
    </div>
  );
};

export { Cache1 };
