import React from "react";
const TesterSearch2 = ({ result, answer }) => {
  let { league: leagueResult, placement: placementResult } = result;
  let { league: leagueAnswer, placement: placementAnswer } = answer;

  let textColor = "salmon";
  let text = `Тест не пройден! Все значения неверные.`;

  if (leagueResult === leagueAnswer && placementResult === placementAnswer) {
    textColor = "lightgreen";
    text = "Тест пройден!";
  } else if (
    leagueResult !== leagueAnswer &&
    placementResult === placementAnswer
  ) {
    text = `Тест не пройден! Полученный номер лиги ${leagueResult} не равен номеру лиги ответа ${leagueAnswer}`;
  } else if (
    leagueResult === leagueAnswer &&
    placementResult !== placementAnswer
  ) {
    text = `Тест не пройден! Полученное место в лиге ${placementResult} не равно месту в лиге ответа ${placementAnswer}`;
  }
  return (
    <div style={{ color: textColor, backgroundColor: "black" }}>{text}</div>
  );
};

export { TesterSearch2 };
