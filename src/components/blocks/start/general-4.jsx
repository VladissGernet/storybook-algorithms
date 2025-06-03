import React from "react";

import { Tester } from "../tester/tester";

const General4 = () => {
  /*
    В данном нам тексте нужно провалидировать, что все скобки корректно расставлены.
    Например, (((())())) является корректной расстановкой, а ()( — нет.

    Примеры:
    validateparenthesis('(((())()))') => true
    validateparenthesis('())') => false

    Корректно: ((())), ()(), (()())

    Некорректно: ((), ())(, ()), )(
  */

  // Корректно
  const case1 = "(((())()))";
  const case2 = "((()))";
  const case3 = "()()";
  const case4 = "(()())";
  const case9 = "([])";

  // Некорректно
  const case5 = "())";
  const case6 = "(()";
  const case7 = "())(";
  const case8 = ")(";
  const case10 = "([)]";

  // Моё решение только для круглых скобок.
  // const validateparenthesis = (text) => {
  //   let rightBracketCount = 0;

  //   for (let i = 0; i < text.length; i++) {
  //     text[i] === "(" ? rightBracketCount++ : rightBracketCount--;

  //     if (rightBracketCount < 0) {
  //       return false;
  //     }
  //   }

  //   return rightBracketCount === 0;
  // };

  // Решение из гайда.
  const parantesisPairs = {
    "(": ")",
    "[": "]",
  };

  /*
      Для более быстрой проверки, является ли символ нужной нам скобкой используем Set.
    */
  const openingParenthesis = new Set(Object.keys(parantesisPairs));
  const closingParenthesis = new Set(Object.values(parantesisPairs));

  const validateParenthesisFromGuide = (text) => {
    const stack = [];

    for (const character of text) {
      if (openingParenthesis.has(character)) {
        stack.push(character);
      }

      if (closingParenthesis.has(character)) {
        // Проверка на пустоту stack на данный момент.
        if (!stack.length) {
          return false;
        }

        const parenthesis = stack.pop();
        // Если наша скобка — не закрывающая текущей открывающей

        /*
          Эта строчка кода

          if (character !== parantesisPairs[parenthesis]) {
            return false;
          }
          делает проверку, соответствует ли текущая закрывающая скобка character той открывающей скобке, которая была последней добавлена в стек и теперь извлечена в переменную parenthesis.

          Подробно:

          parenthesis — это последняя открывающая скобка, которую мы достали из стека с помощью stack.pop().

          parantesisPairs — это объект, где ключ — открывающая скобка, а значение — соответствующая ей закрывающая. Например, "(" : ")".

          parantesisPairs[parenthesis] — это закрывающая скобка, которая должна соответствовать открывающей parenthesis.

          character — текущий символ из строки, который является закрывающей скобкой.

          Если текущая закрывающая скобка character не совпадает с ожидаемой закрывающей скобкой для parenthesis, значит скобки расставлены неправильно, и функция сразу возвращает false.

          Иными словами, эта проверка гарантирует, что каждая закрывающая скобка соответствует именно той открывающей, которую она должна закрыть. Если это не так — значит последовательность скобок некорректна.
        */

        if (character !== parantesisPairs[parenthesis]) {
          return false;
        }
      }
    }

    return !stack.length;
  };

  return (
    <div>
      <h1>Пример</h1>
      <p>
        В данном нам тексте нужно провалидировать, что все скобки корректно
        расставлены. Например, (((())())) является корректной расстановкой, а
        ()( — нет.
      </p>
      <Tester result={validateParenthesisFromGuide(case1)} answer />
      <Tester result={validateParenthesisFromGuide(case2)} answer />
      <Tester result={validateParenthesisFromGuide(case3)} answer />
      <Tester result={validateParenthesisFromGuide(case4)} answer />
      <Tester result={validateParenthesisFromGuide(case9)} answer />
      <Tester result={validateParenthesisFromGuide(case5)} answer={false} />
      <Tester result={validateParenthesisFromGuide(case6)} answer={false} />
      <Tester result={validateParenthesisFromGuide(case7)} answer={false} />
      <Tester result={validateParenthesisFromGuide(case8)} answer={false} />
      <Tester result={validateParenthesisFromGuide(case10)} answer={false} />
    </div>
  );
};

export { General4 };
