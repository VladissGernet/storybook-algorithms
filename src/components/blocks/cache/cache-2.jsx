import React from "react";

/* 
Результат:
Timestamp	      Message
0	              Cannot read property 'score' of undefined x2
0	              TypeError: 'undefined' is not an object x3
14            	Uncaught RangeError: Maximum call stack size exceeded
15            	Cannot read property 'score' of undefined
18            	ReferenceError: event is not defined x2
21            	Cannot read property 'score' of undefined
*/

const Cache2 = () => {
  const data = [
    {
      message: "Cannot read property 'score' of undefined",
      timestamp: 0,
    },
    {
      message: "TypeError: 'undefined' is not an object",
      timestamp: 0,
    },
    {
      message: "Cannot read property 'score' of undefined",
      timestamp: 3,
    },
    {
      message: "TypeError: 'undefined' is not an object",
      timestamp: 5,
    },
    {
      message: "TypeError: 'undefined' is not an object",
      timestamp: 10,
    },
    {
      message: "Uncaught RangeError: Maximum call stack size exceeded",
      timestamp: 14,
    },
    {
      message: "Cannot read property 'score' of undefined",
      timestamp: 15,
    },
    {
      message: "ReferenceError: event is not defined",
      timestamp: 18,
    },
    {
      message: "Cannot read property 'score' of undefined",
      timestamp: 21,
    },
    {
      message: "ReferenceError: event is not defined",
      timestamp: 22,
    },
  ];

  const MAX_TIMESTAMP = 5;

  const rateLimit = (logs) => {
    const encountered = new Map();
    const resultCache = [];

    for (let i = 0; i < logs.length; i++) {
      const { message, timestamp } = logs[i];
      if (encountered.has(message)) {
        // Если сообщение уже попадалось.
        // Позиция в кеше сообщения, которое уже попадалось.
        const prevResultCachePosition = encountered.get(message);
        // Время timestamp в предыдущем сообщении.
        const prevTimestamp =
          resultCache[prevResultCachePosition].prevTimestamp;

        // Добавлять ли новое сообщение, которое было давно?
        const isMessageNew = timestamp - prevTimestamp > MAX_TIMESTAMP;

        if (isMessageNew) {
          // Если новое одинаковое сообщение пришло с промежутком позже 5 секунд.
          // Обнавляю в хеш таблице позициую нового одинакового сообщения.
          encountered.set(message, resultCache.length - 1);
          // Добавляю новое одинаковое сообщение в кеш.
          resultCache.push({
            message: message,
            prevTimestamp: timestamp,
            repeats: 0,
          });
        } else if (prevTimestamp <= MAX_TIMESTAMP) {
          // Если новое одинаковое сообщение пришло с промежутком менее 5 секунд.
          // Увеличиваю значение повторений на 1.
          resultCache[prevResultCachePosition].repeats++;

          // Обновляю timestamp на новый.
          resultCache[prevResultCachePosition].prevTimestamp = timestamp;
        }
      } else {
        // Если сообщение получаем впервые:
        // Получаю позицию в кэше.
        const resultCacheIndexPosition =
          resultCache.length === 0 ? 0 : resultCache.length;

        // Устанавливаю в хеш таблице сообщение и его индекс в кэше.
        encountered.set(message, resultCacheIndexPosition);
        // Добавляю в кэш текущее сообщение.
        resultCache.push({
          message: message,
          prevTimestamp: timestamp,
          repeats: 0,
        });
      }
    }

    // Очищаем коллекцию для освобождения памяти.
    encountered.clear();

    return resultCache;
  };

  return (
    <div>
      <h1>Ограничитель скорости обработки запросов системой логирования</h1>
      <p>
        Чем больше фич успешно выпускала команда разработки «Удара легенд», тем
        больше игроков приходило в игру. Бизнес доволен, а вот команда
        технической поддержки не очень. Ведь если раньше отслеживать все
        пользовательские ошибки можно было на одном мониторе разработчика
        поддержки, то теперь следить за ними и своевременно реагировать стало
        нереально: и фичи (конечно же, которые писали не вы) полны багов, и баги
        эти случаются гораздо чаще (ведь игроков стало в разы больше).
      </p>
      <p>
        Помогите команде поддержки. Напишите ограничитель скорости обработки
        запросов системой логирования. Все сообщения приходят в следующем
        формате: см.комментарии
      </p>
      <pre>
        {`{
            "message": "Cannot read property 'score' of undefined",
            "timestamp": 20,
        }`}
      </pre>
      <p>
        Необходимо игнорировать все сообщения с одинаковым содержимым, которые
        приходили с промежутком менее пяти секунд от последнего (разница в
        timestamp меньше 5). И вместо их вывода дописывать в конец предыдущего
        такого же сообщения{" "}
        <b>
          (x${"{"}количество повторений{"}"})
        </b>
        : к примеру, <b>Cannot read property 'score' of undefined (x3)</b>, если
        оно встретилось три раза за последние пять секунд. Имейте в виду, что
        система логирования сейчас очень нагружена, поэтому все операции над
        логами нужно производить максимально быстро!
      </p>
      <p>
        Имейте в виду, что система логирования сейчас очень нагружена, поэтому
        все операции над логами нужно производить максимально быстро!
      </p>
      <h2>Резульат:</h2>
      <ol>
        {rateLimit(data).map((el) => (
          <li key={el.message + el.prevTimestamp + el.repeats}>
            <p>
              {el.message}
              {el.repeats > 0 ? ` ${1 + el.repeats}x` : ""}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export { Cache2 };
