import React, { useRef, useEffect } from "react";
import styled, { css } from "styled-components";

const commonStyles = css`
  padding: 0 10px;
  margin-right: 5px;
  border: 1px solid #ffffff;
  display: inline-block;
  width: 20px;
  height: 20px;
`;

const colors = ["#dcd6f7", "#a6b1e1", "#b4869f"];

const Color1 = styled.span`
  ${commonStyles}
  background-color: ${colors[0]};
`;

const Color2 = styled.span`
  ${commonStyles}
  background-color: ${colors[1]};
`;

const Color3 = styled.span`
  ${commonStyles}
  background-color: ${colors[2]};
`;

const Tree2 = () => {
  const list = useRef(null);

  // Решение обходом в глубину.
  const paintListItemsMySolution = (node) => {
    let currentDepthLevel = -1;
    const recursive = (node) => {
      const isCurrentNodeList = node.localName === "ul";

      if (isCurrentNodeList) {
        if (currentDepthLevel > colors.length - 2) {
          currentDepthLevel = -1;
        }
        currentDepthLevel++;

        for (let listElement of node.children) {
          listElement.style.backgroundColor = colors[currentDepthLevel];

          for (let listElementChild of listElement.children) {
            recursive(listElementChild);
          }
        }
      }
    };

    recursive(node);
  };

  const paintListItemsPerplexity = (node, depth = 0) => {
    if (node?.localName !== "ul") {
      return;
    }

    for (const li of node.children) {
      if (li.localName === "li") {
        li.style.backgroundColor = colors[depth % colors.length];
      }

      // Ищем возможно вложенные <ul> внутри этого <li> и рекурсивно раскрашиваем их

      for (const child of li.children) {
        if (child.localName === "ul") {
          paintListItemsPerplexity(child, depth + 1);
        }
      }
    }
  };

  // Решение обходом в ширину.
  const paintListItemsGuide = (node) => {
    // Обход дерева в ширину.
    const queue = [];

    queue.push({ node, depth: 0 });

    // Обход всех нод из списка.
    while (queue.length) {
      const { node: currentNode, depth: currentDepth } = queue.shift();
      const isStylable = currentNode.localName === "li";

      if (isStylable) {
        currentNode.style.backgroundColor =
          colors[currentDepth % colors.length];
      }

      for (const node of currentNode.children) {
        queue.push({
          node,
          depth: isStylable ? currentDepth + 1 : currentDepth,
        });
      }
    }
  };

  useEffect(() => {
    // paintListItemsPerplexity(list.current);
    paintListItemsGuide(list.current);
  }, []);

  return (
    <div>
      <h1>Технологи вспомнили о новичках</h1>
      <p>
        После череды успешных разработок наши технологи перешли от фич для уже
        бывалых игроков к фичам для новичков. Теперь они хотят сделать чуть
        более красивый FAQ. Сейчас он представляет собой вложенный список из
        вопросов-ответов, и ребята хотят, чтобы на разных уровнях вложенности
        ответы были разных цветов для наглядного разделения разделов.
      </p>
      <p>
        Используя пример вёрстки ниже, раскрасьте фон li разных уровней
        вложенности списков в следующие цвета по очереди: <Color1 />
        #DCD6F7, <Color2 />
        #A6B1E1, <Color3 />
        #B4869F. Также нужно предусмотреть, что уровней вложенности может быть и
        больше трёх — просто красьте следующую вложенность, начиная с первого в
        этом списке цвета.
      </p>
      <hr />
      <ul ref={list}>
        <li>
          <h3>А что можно делать в "Ударе легенд"?</h3>
          <p>Всё, даже грабить караваны!</p>
        </li>
        <li>
          <h3>Всё, что касается раннего доступа</h3>
          <ul>
            <li>
              <h4>Когда игра выйдет из раннего доступа?</h4>
              <p>Через два года в лучшем случае</p>
            </li>
            <li>
              <h4>
                Вы что, маленькая инди компания, ставить такие долгие сроки?
              </h4>
              <p>Да</p>
            </li>
            <li>
              <h4>Всё про покупки в раннем доступе</h4>
              <ul>
                <li>
                  <h5>Что случится со всем, что я купил в общем доступе?</h5>
                  <p>Мы аннулируем все покупки</p>
                </li>
                <li>
                  <h5>Но вернете деньги?</h5>
                  <p>Нет</p>
                </li>
                <li>
                  <h5>Кто это придумал??</h5>
                  <ul>
                    <li>
                      <h5>Главный технолог</h5>
                      <p>Анастасия Настина</p>
                    </li>
                    <li>
                      <h5>CTO</h5>
                      <p>Александр Алексеев</p>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <h3>Кто реализовал все крутые фичи со счетом после игры?</h3>
          <p>Тот, кто это читает &lt;3</p>
        </li>
        <li>
          <h3>Как вы боретесь с читерами</h3>
          <ul>
            <li>
              <h4>Короткий ответ</h4>
              <p>Сейчас никак</p>
            </li>
            <li>
              <h4>Ответ длиннее</h4>
              <p>Пока что у нас нет денег на разработку анти-чита</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export { Tree2 };
