import React from "react";

const pStyleError = {
  color: "tomato",
  backgroundColor: "black",
};

const pStyleSuccess = {
  color: "lime",
  backgroundColor: "black",
};

const TesterDivideAndConquer4 = ({ resultObj, points, answerObj }) => {
  // Сравнение результата с правильным ответом.
  if (
    resultObj.guild !== answerObj.guild &&
    resultObj.placement !== answerObj.placement
  ) {
    return <p style={pStyleError}>Гильдия и место неверное.</p>;
  } else if (resultObj.guild !== answerObj.guild) {
    return <p style={pStyleError}>Гильдия неверная.</p>;
  } else if (resultObj.placement !== answerObj.placement) {
    return <p style={pStyleError}>Место неверное.</p>;
  }

  // Если резултаты совпадают с ответом.
  if (!resultObj.placement) {
    return (
      <p style={pStyleSuccess}>Вы — единствнный игрок со счетом {points}</p>
    );
  } else {
    return (
      <p style={pStyleSuccess}>
        Ваш счет — {points}. Вы могли бы играть в гильдии {resultObj.guild} и
        занять там {resultObj.placement} место
      </p>
    );
  }
};

export { TesterDivideAndConquer4 };
