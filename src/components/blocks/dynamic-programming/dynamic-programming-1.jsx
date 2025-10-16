import React from "react";

import step0 from "/src/assets/dynamic-programming-1/step-0.png";
import step1 from "/src/assets/dynamic-programming-1/step-1.png";
import step2 from "/src/assets/dynamic-programming-1/step-2.png";
import step2Wrong from "/src/assets/dynamic-programming-1/step-2-wrong.png";
import step3 from "/src/assets/dynamic-programming-1/step-3.png";

// Стуктурные модули таблицы.
const TableData = ({ children, last, lastRow }) => (
  <td
    style={{
      backgroundColor: last && lastRow ? "green" : "#2f2f2f",
      padding: "10px 8px",
      border: "1px solid white",
    }}
  >
    {children}
  </td>
);

const TableRow = ({ row, lastRow, rowIndex, filePartSizes }) => {
  return (
    <tr style={{ backgroundColor: "#2f2f2f", color: "#e0e0e0" }}>
      <TableData>{filePartSizes[rowIndex]} MB</TableData>
      {row.map((item, itemIndex) => {
        return (
          <TableData
            key={itemIndex}
            last={row.length - 1 === itemIndex}
            lastRow={lastRow}
          >
            {item}
          </TableData>
        );
      })}
    </tr>
  );
};

const TableTh = ({ children, style }) => <th style={style}>{children}</th>;

const TableHead = ({ data }) => (
  <thead>
    <tr>
      <TableTh style={{ padding: "8px" }} />
      {data[0].map((_, index) => (
        <TableTh
          key={index}
          style={{
            padding: "12px 8px",
            backgroundColor: "tomato",
          }}
        >
          {index + 1} MB
        </TableTh>
      ))}
    </tr>
  </thead>
);

const Table = ({ data, filePartSizes }) => {
  return (
    <table style={{ textAlign: "center", borderSpacing: "10px" }}>
      <caption style={{ fontWeight: "bold" }}>
        Максимальное количество занимаемого места —{" "}
        {data[data.length - 1][data[data.length - 1].length - 1]} МБ
      </caption>
      <TableHead data={data} />
      <tbody>
        {data.map((row, index) => (
          <TableRow
            key={index}
            row={row}
            rowIndex={index}
            filePartSizes={filePartSizes}
            lastRow={data.length - 1 === index}
          />
        ))}
      </tbody>
    </table>
  );
};

const DynamicProgramming1 = () => {
  const filePartSizes = [4, 5, 7];
  // Напишем нашу функцию для оптимизации, принимающую массив размеров частей и размер пачки

  // НЕ ИСПОЛЬЗОВАТЬ! Нейросеть perplexity говорит о неэффективности.
  const prioritizeMySolution = (filePartSizes, chunkSize) => {
    // Создаем табилцу из нулей.
    const table = Array(filePartSizes.length)
      .fill(null)
      .map(() => Array(chunkSize).fill(0));

    for (let rowIndex = 0; rowIndex < filePartSizes.length; rowIndex++) {
      // Начиная с rowIndex линии
      const tableRow = table[rowIndex];

      // columnIndex - минимальная часть, откуда нужно будет начинать, чтобы избежать лишних итераций.
      for (
        let columnIndex = filePartSizes[0];
        columnIndex <= tableRow.length;
        columnIndex++
      ) {
        // Ищем число максимальное число, которое можно поместить в chunk.
        let currentChunk = tableRow[columnIndex - 1];

        // Результат ячейки выше.
        const chunkAbove =
          table[rowIndex - 1] === undefined
            ? table[rowIndex][columnIndex - 1]
            : table[rowIndex - 1][columnIndex - 1];

        // Если достигнут максимум, то пропускаем итерацию.
        if (chunkAbove === columnIndex) {
          currentChunk += chunkAbove;
        } else {
          // Иначе пробуем найти нвое число
          let rowIteration = rowIndex;
          while (rowIteration >= 0) {
            if (currentChunk + filePartSizes[rowIteration] > columnIndex) {
              rowIteration--;
            } else {
              currentChunk = currentChunk + filePartSizes[rowIteration];
            }
          }
        }

        tableRow[columnIndex - 1] = currentChunk;
      }
    }

    return table;
  };

  const prioritizeGuide = (filePartSizes, chunkSize) => {
    // создаем нашу табличку
    const table = Array(filePartSizes.length)
      .fill()
      .map(() => Array(chunkSize).fill(0));

    // Заполняем каждую строчку последовательно
    for (let rowIndex = 0; rowIndex < filePartSizes.length; rowIndex++) {
      for (let cellIndex = 0; cellIndex < chunkSize; cellIndex++) {
        const currentChunkSize = cellIndex + 1;
        const currentFilePartSize = filePartSizes[rowIndex];

        // считаем максимальное количество места, которое мы можем занять частями текущего размера
        // Формула ниже — это максимально возможный размер, который можно занять частями данного размера, не превышая текущий доступный объём.
        const maximumCurrent =
          Math.floor(currentChunkSize / currentFilePartSize) *
          currentFilePartSize;

        // максимальное количество данных, которое мы можем положить в оставшееся количество места
        // берем максимум решения предыдущей подзадачи для оставшегося места если оно есть, либо 0
        // table[rowIndex - 1] проверяет, существует ли такая строка, чтобы не выйти за границы массива.

        const maximumRest =
          (table[rowIndex - 1] &&
            table[rowIndex - 1][cellIndex - maximumCurrent]) ||
          0;

        // получаем общее решение для данной ячейки
        const solution = maximumCurrent + maximumRest;

        // Если есть, с чем сравнить текущее решение — сравниваем и берем максимум
        table[rowIndex][cellIndex] =
          rowIndex > 0
            ? Math.max(solution, table[rowIndex - 1][cellIndex])
            : solution;
      }
    }

    // Результат — нижняя правая ячейка
    return table;
  };

  // const result = prioritizeMySolution(filePartSizes, 10);
  const result = prioritizeGuide(filePartSizes, 10);

  return (
    <div>
      <Table data={result} filePartSizes={filePartSizes} />
      <h1>Задача о рюкзаке</h1>
      <p>
        Напомним условия нашей задачи. Предположим, вы разрабатываете
        веб-приложение для загрузки файлов — этакий менеджер загрузок из
        прошлого. Но из-за ограничений на стороне сервера можете получать данные
        только пачками по несколько мегабайт в зависимости от местоположения
        сервера (притом в одной пачке могут лежать части разных файлов). И уже
        на фронте вы склеиваете их в нормальные файлы. Всё усложняется тем, что
        все файлы заранее разбиты на части разных размеров. То есть какие-то из
        них могут быть с частями по 7 МБ, какие-то — по 4 МБ, какие-то — по 5
        МБ... Задача состоит в том, чтобы добавить в каждую пачку с сервера
        столько частей разных файлов, чтобы использовать максимальное количество
        места из доступного для пачки из 10 МБ.
      </p>
      <p>
        Давайте с новыми знаниями вернёмся к старой задаче и попробуем решить её
        оптимально. Как мы узнали из предыдущей статьи, нам нужно попытаться
        свести задачу к подзадачам, которые связаны между собой. В нашем случае
        стоит начать решать задачу для меньших пачек данных. А затем, используя
        их решения, получить решение исходной задачи.
      </p>
      <p>
        Составим таблицу из всех возможных частей файлов и всех возможных
        размеров пачки меньше 10 МБ с шагом в один мегабайт:
      </p>
      <img src={step0} alt="banners" width="100%" />
      <p>
        Теперь начнём заполнять таблицу сверху вниз. Сначала попробуем заполнить
        строку принятия решений «класть нам часть из 4 МБ или нет». В каждую
        ячейку будем записывать общий размер получающейся пачки и то, какие
        части файлов туда пойдут. Заполнить эту строчку довольно просто. В пачки
        до 4 МБ мы ничего не можем положить. В пачку от 4 МБ до 8 МБ положим
        одну часть. В более объёмные — две.
      </p>
      <img src={step1} alt="banners" width="100%" />
      <p>
        На этом этапе важно помнить, что сейчас мы решаем задачу только для
        частей одного размера, а трогать части из других строк пока не можем.
        Сейчас мы заняты решением подзадачи, которое будем переиспользовать в
        других подзадачах для частей большего размера.
      </p>
      <p>
        Начнём заполнять вторую строчку. Можно предположить, что она заполнится
        так же, как и в первый раз:
      </p>
      <img src={step2Wrong} alt="banners" width="100%" />
      <p>
        Но уже здесь мы видим неоптимальность. В 4 МБ всё ещё может поместиться
        одна часть по 4 МБ, в 8 МБ — две части. А вот в 9 МБ мы уже можем
        добавить части двух разных размеров и использовать все 9 МБ. Это
        обеспечит нам максимальную утилизацию пространства. Давайте обновим
        максимумы в нашей таблице с учётом решения предыдущей подзадачи!
      </p>
      <img src={step2} alt="banners" width="100%" />
      <p>По такому же принципу заполним и третью строку:</p>
      <img src={step3} alt="banners" width="100%" />
      <p>
        Теперь в нижней правой ячейке таблицы и есть решение нашей задачи! Это
        переиспользованное решение подзадачи с двумя предыдущими доступными
        частями.
      </p>
      <p>
        Самое время формализировать алгоритм заполнения этой таблицы, ведь до
        этого момента мы пользовались лишь здравым смыслом. Алгоритм довольно
        простой: в каждую ячейку идёт максимум из двух значений. Первое — это
        максимум решения предыдущей задачи (то, что находится ровно над
        заполняемой ячейкой), если он есть. А второе — размер максимального
        количества частей, помещающихся в этот размер + максимум решения
        предыдущей задачи для оставшегося места, если он есть.
      </p>
      <p>
        Например, когда мы заполняли решение задачи для частей двух разных
        размеров и пачки в 9 МБ, мы посчитали максимальное количество места,
        которое можем занять частями этого размера (получилась одна часть в 5
        мегабайт). И у нас осталось ещё 4 МБ, которые мы можем заполнить.
        Поэтому мы пошли в предыдущий столбец и посмотрели, чем мы можем
        заполнить их: одной частью в 4 МБ. Всего получилось 9 МБ. Ещё мы взяли
        максимум решения предыдущей подзадачи, 8 МБ, и максимум из двух
        получившихся чисел — 9. Это и пошло в нашу максимальную оценку для этой
        подзадачи.
      </p>
      <p>
        Эта таблица будет давать тот же ответ, если мы поменяем строчки местами
        или добавим части новых размеров. Можете построить подобные таблицы с
        новыми правилами вручную, чтобы убедиться в этом.
      </p>
    </div>
  );
};

export { DynamicProgramming1 };
