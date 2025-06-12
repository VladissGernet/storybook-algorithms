import React from "react";
const TesterDivideAndConquer1 = ({ result, answer }) => {
  let textColor = "salmon";
  let text = `Тест не пройден! ${result} не равно ${answer}`;
  // Небольшой хак для сравнения массивов. Не делайте так в production!
  const left = JSON.stringify(result);
  const right = JSON.stringify(answer);

  if (left === right) {
    textColor = "lightgreen";
    text = "Тест пройден!";
  }

  return (
    <div style={{ color: textColor, backgroundColor: "black" }}>{text}</div>
  );
};

export { TesterDivideAndConquer1 };
