import React from "react";
const Tester = ({ result, answer }) => {
  let textColor = "salmon";
  let text = `Тест не пройден! ${result} не равно ${answer}`;

  if (result === answer) {
    textColor = "lightgreen";
    text = "Тест пройден!";
  }

  return (
    <div style={{ color: textColor, backgroundColor: "black" }}>{text}</div>
  );
};

export { Tester };
