import React from "react";

const GreedyAlgorithms1 = () => {
  const appointments = [
    {
      title: "Планирование и приоритизация задач",
      start: 10,
      end: 13,
    },
    {
      title: "Обед",
      start: 12,
      end: 13,
    },
    {
      title: "О защите от мошенников",
      start: 10,
      end: 11,
    },
    {
      title: "Об увольнении Игоря",
      start: 14,
      end: 16,
    },
    {
      title: "Встреча, которую можно было бы заменить одним письмом",
      start: 13,
      end: 15,
    },
    {
      title: "Что подарим Кексу на день рождения?",
      start: 15,
      end: 17,
    },
    {
      title: "Вопросы с поставками",
      start: 9,
      end: 11,
    },
  ];

  const prioritize = (appointments) => {
    const MAX_DAYTIME = 24;
    let result = [];

    // Изначальные данные.
    let initialTime = MAX_DAYTIME;
    let initialIndex = null;
    let newAppointments = [];

    // Ищем самое минимальное время начала события.
    for (let i = 0; i < appointments.length; i++) {
      if (initialTime >= appointments[i].start) {
        // Если элемент задачи уже был до этого, то добавляем его.
        if (initialIndex !== null) {
          newAppointments.push(appointments[initialIndex]);
        }

        initialTime = appointments[i].start;
        initialIndex = i;
      } else {
        newAppointments.push(appointments[i]);
      }
    }

    // Добавляем найденое событие в массив результата.
    result.push(appointments[initialIndex]);

    // Перезаписываем initialTime на время окончания последнего события.
    initialTime = appointments[initialIndex].end;

    // Ищем все остальные.
    // Ограничитель выполения цикла.
    let flag = false;
    // Промежуточный массив
    let nextAppointments = [];

    do {
      const lastEndEventTime = result[result.length - 1].end;
      let minStartTimeIndex = null;

      // Ищем подходящий индекс события по времени для вставки следующим.
      for (let i = 0; i < newAppointments.length; i++) {
        const event = newAppointments[i];

        // Рассматриваем только подходящее время события.
        if (lastEndEventTime <= event.start) {
          flag = true;
          // Добавляем в массив только интересующие нас события.
          nextAppointments.push(event);

          // Если еще не нашли время события, то записываем.
          // Иначе записываем более подходящее.
          if (
            minStartTimeIndex === null ||
            newAppointments[minStartTimeIndex].start > event.start
          ) {
            minStartTimeIndex = i;
          }
        }
      }

      // Добавляем найденное событие в результат.
      result.push(newAppointments[minStartTimeIndex]);
      // Проверяю, на отсутвие интересующих событий
      if (nextAppointments.length === 1) {
        flag = false;
      }
      // Обновляем массив для следующего поиска.
      newAppointments = nextAppointments;
      // Обнуляю массив для следующего цикла.
      nextAppointments = [];
    } while (flag);

    return result;
  };

  // console.log(prioritize(appointments));

  const prioritizeSolution = (appointments) => {
    const timetable = [];

    // Сохраним здесь время начала самой поздней встречи, чтобы остановить алгоритм, когда уже перейдем это время
    const { end: latestAppointment } = appointments.reduce(
      (currentLatest, next) =>
        currentLatest.end < next.end ? next : currentLatest,
      appointments[0]
    );
    // Будем хранить здесь время окончания предыдущей встречи
    let startAfter = 0;

    // пока мы ещё можем впихнуть встречу в конец
    while (startAfter < latestAppointment) {
      // Найдем встречу, которая заканчивается максимально рано после последней и вставим её в конец!
      const nextAppointments = appointments.filter(({ start }) => {
        return start >= startAfter;
      });

      const appointment = nextAppointments.reduce(
        (currentShortest, next) =>
          currentShortest.end > next.end ? next : currentShortest,
        nextAppointments[0]
      );

      startAfter = appointment.end;
      timetable.push(appointment);
    }

    return timetable;
  };

  // prioritizeSolution(appointments);

  return (
    <div>
      <h1>Задача о составлении расписания</h1>
      <p>
        Задача о составлении расписания в различных её формулировках является
        ещё одной популярной задачей из серии решаемых жадно. Давайте посмотрим
        на неё и решим с помощью жадности!
      </p>
      <p>
        В вашем отделе внезапно уволились два из трёх менеджеров, и все их
        встречи и организационные вопросы перешли к третьему. Конечно, на все
        встречи один менеджер попасть не может — они просто накладываются по
        времени друг на друга. Помогите менеджеру организовать свой календарь
        таким образом, чтобы попасть на максимальное количество встреч.
      </p>
    </div>
  );
};

export { GreedyAlgorithms1 };
