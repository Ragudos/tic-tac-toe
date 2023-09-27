import React from "react";
import { ticTacToe } from "./lib/utils";

const keys = Object.keys(ticTacToe);

const arrOfWinningMatches = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];

const checkIfWin = (currentState: typeof ticTacToe, type: "x" | "o") => {
  for (let idx = 0; idx < arrOfWinningMatches.length; ++idx) {
    let amountOfMatches = 0;
    for (let j = 0; j < arrOfWinningMatches[idx].length; ++j) {
      if (currentState[arrOfWinningMatches[idx][j] as keyof typeof ticTacToe] === type) {
        ++amountOfMatches;
      }
    }
    console.table({
      type, idx, amountOfMatches
    });
    if (amountOfMatches === 3) {
      return true;
    }

    amountOfMatches = 0;
  }

  return false;
};

const checkIfDraw = (currentState: typeof ticTacToe) => {
  let amountOfChecked = 0;
  for (let idx = 0; idx < keys.length; ++idx) {
    if (currentState[idx as keyof typeof ticTacToe] !== null) {
      amountOfChecked += 1;
    }
  }

  if (amountOfChecked >= keys.length) {
    return true;
  }

  return false;
};

function getRandomPos(currentState: typeof ticTacToe, k: number, idx: number) {
  if (idx >= keys.length) {
    return undefined;
  }
  const random = Math.floor(Math.random() * keys.length);
  if (k === random) {
    return getRandomPos(currentState, k, idx + 1);
  }
  if (currentState[random as keyof typeof currentState] !== null) {
    return getRandomPos(currentState, k, idx + 1);
  }
  return random;
};

export default function App() {
  const [currentState, setCurrentState] = React.useState(ticTacToe);
  const [finsihedMsg, setFinishedMsg] = React.useState("");

  const handleClick = (k: number) => {
    setCurrentState((prev) => {
      if (prev[k as keyof typeof currentState] !== null) {
        return prev;
      }

      const newObject = {
        ...prev,
        [k]: "x"
      };

      if (checkIfWin(newObject, "x")) {
        setFinishedMsg("You won!");
        return newObject;
      }

      if (checkIfDraw(newObject)) {
        setFinishedMsg("It's a draw!");
        return newObject;
      }

      const enemyKey = getRandomPos(prev, k, 0);

      if (enemyKey !== undefined) {
        if (newObject[enemyKey as keyof typeof currentState] !== null) {
          return newObject;
        }

        const addedEnemyMove = {
          ...newObject,
          [enemyKey]: "o"
        }

        if (checkIfWin(addedEnemyMove, "o")) {
          setFinishedMsg("You lost :(");
          return addedEnemyMove;
        }
        if (checkIfDraw(addedEnemyMove)) {
          setFinishedMsg("It's a draw!");
          return addedEnemyMove;
        }

        return addedEnemyMove;
      }

      return newObject;
    });
  };
  return (
    <React.Fragment>
      {finsihedMsg && (
        <div className="text-center">
          <span>{finsihedMsg}</span>

          <button
            type="button"
            title="restart"
            className="normal"
            onClick={() => {
              setCurrentState(ticTacToe);
              setFinishedMsg("");
            }}
          >
            Play again
          </button>
        </div>
      )}
      <div className="tic-tac-toe">
        {keys.map((k) => (
          <button
            type="button"
            value={k}
            key={k}
            title="Tic Tac Toe Button"
            onClick={() => handleClick(+k)}
            className={currentState[+k as keyof typeof currentState] ?? undefined}
            disabled={Boolean(finsihedMsg)}
          >
          </button>
        ))}
      </div>

      <footer>
        <div>
        Simple Tic Tac Toe
        </div>
        <div>
          by
        </div>
        <a
          href="https://youtube.com/@programmers_sanctuary?si=FJ0QlmZSrT4_KMps"
          rel="noreferrer"
          title="Go to my YouTube Channel"
          aria-label="Go to my YouTube Channel"
          target="_blank"
          style={{
            color: "inherit",
          }}
        >
          Programmer&apos;s Sanctuary
        </a>
      </footer>
    </React.Fragment>
  );
};