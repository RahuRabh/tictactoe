import React, { useEffect, useState } from "react";
import cross from "../utils/cross.svg";
import circle from "../utils/circle.svg";
import retry from "../utils/retry.png";

const GameArea = ({ player }) => {
  let user = player === "cross" ? cross : circle;
  let pc = player === "cross" ? circle : cross;

  const [state, setstate] = useState(Array(9).fill(null));
  const [userTurn, setuserTurn] = useState(true);
  const [gameover, setgameover] = useState(false);
  const [userScore, setuserScore] = useState(0);
  const [pcScore, setpcScore] = useState(0);
  const [tieScore, settieScore] = useState(0);
  const [showRetryDiv, setShowRetryDiv] = useState(false);

  const pcplay = () => {
    const availableIndices = state.reduce((acc, curr, index) => {
      if (curr === null) {
        acc.push(index);
      }
      return acc;
    }, []);
    return availableIndices[
      Math.floor(Math.random() * availableIndices.length)
    ];
  };

  const checkWinner = (currentState) => {
    const logic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let l of logic) {
      const [a, b, c] = l;
      if (
        currentState[a] !== null &&
        currentState[a] === currentState[b] &&
        currentState[a] === currentState[c]
      ) {
        return currentState[a];
      }
    }
    if (!currentState.includes(null)) {
      return null
    }
  
    return  false ;
  };

  const handledivclick = (index) => {
    if (state[index] === null) {
      var copyState = [...state];
      copyState[index] = userTurn ? user : pc;
      setstate(copyState);
      setuserTurn(!userTurn);

      const isWinner = checkWinner(copyState);

      const pcindex = pcplay();

      if (isWinner) {
        if (isWinner === pc) {
          setpcScore(pcScore + 1);
        } else {
          setuserScore(userScore + 1);
        }
      } else if (!state.includes(null)) {
        settieScore(tieScore + 1);
      }

      copyState[pcindex] = isWinner || userTurn ? pc : user;
      setstate(copyState);
      setuserTurn(userTurn);

      setgameover(isWinner || !state.includes(null));

      localStorage.setItem("userScore", userScore);
      localStorage.setItem("tieScore", tieScore);
      localStorage.setItem("pcScore", pcScore);
    }
  };

  const resetGame = () => {
    setstate(Array(9).fill(null));
    setuserTurn(true);
    setgameover(false);
    setuserScore(userScore + 0);
    settieScore(tieScore + 0);
    setpcScore(pcScore + 0);
  };

  const playAgain = () => {
    setstate(Array(9).fill(null));
    setuserTurn(true);
    setgameover(false);
    setuserScore(userScore);
    settieScore(tieScore);
    setpcScore(pcScore);
  };

  const toggleRetryDiv = () => {
    setShowRetryDiv(!showRetryDiv);
  };

  useEffect(() => {
    const storedUserScore = localStorage.getItem("userScore");
    if (storedUserScore) {
      setuserScore(parseInt(storedUserScore));
    }
  }, []);

  useEffect(() => {
    const storedTieScore = localStorage.getItem("tieScore");
    if (storedTieScore) {
      settieScore(parseInt(storedTieScore));
    }
  }, []);

  useEffect(() => {
    const storedPcScore = localStorage.getItem("pcScore");
    if (storedPcScore) {
      setpcScore(parseInt(storedPcScore));
    }
  }, []);

  return (
    <div>
      <div className="gamearea flex items-center justify-center mt-20">
        <div className="bg-[#192A32] flex flex-col w-[410px] relative h-[750px] rounded-[40px]">
          <div className="flex justify-around absolute top-[200px] gap-20 inset-x-14">
            <div className="images flex gap-2">
              <img alt="tictac1" src={cross} />
              <img alt="tictac2" src={circle} />
            </div>
            <div className="turn flex justify-between w-[90px] h-[40px] bg-[#1F3540] p-2.5 rounded-lg">
              <img alt="tictac3" src={user} className="w-4 h-4 mt-1" />
              <p className="font-bold w-[32px] h-[16px] text-[#A8BEC9] text-xs">
                TURN
              </p>
            </div>
            <div
              onClick={toggleRetryDiv}
              className="retry bg-[#A7BDC8] rounded w-8 h-8 flex items-center justify-center"
            >
              <img alt="tictac4" src={retry} />
            </div>
          </div>

          <div className="reactangle absolute top-[250px] left-[50px]">
            <div className="flex gap-10 mt-3">
              <div
                onClick={() => handledivclick(0)}
                className="bg-[#1F3540] drop-shadow-md shadow-black w-20 h-20 rounded-lg"
              >
                <img className="w-10 h-10 m-5" src={state[0]}/>
              </div>
              <div
                onClick={() => handledivclick(1)}
                className="bg-[#1F3540] drop-shadow-md shadow-black w-20 h-20 rounded-lg"
              >
                <img className="w-10 h-10 m-5" src={state[1]} />
              </div>
              <div
                onClick={() => handledivclick(2)}
                className="bg-[#1F3540] drop-shadow-md shadow-black w-20 h-20 rounded-lg"
              >
                <img className="w-10 h-10 m-5" src={state[2]} />
              </div>
            </div>

            <div className="flex gap-10 mt-5">
              <div
                onClick={() => handledivclick(3)}
                className="bg-[#1F3540] drop-shadow-md shadow-black w-20 h-20 rounded-lg"
              >
                <img className="w-10 h-10 m-5" src={state[3]} />
              </div>
              <div
                onClick={() => handledivclick(4)}
                className="bg-[#1F3540] drop-shadow-md shadow-black w-20 h-20 rounded-lg"
              >
                <img className="w-10 h-10 m-5" src={state[4]} />
              </div>
              <div
                onClick={() => handledivclick(5)}
                className="bg-[#1F3540] drop-shadow-md shadow-black w-20 h-20 rounded-lg"
              >
                <img className="w-10 h-10 m-5" src={state[5]} />
              </div>
            </div>

            <div className="flex gap-10 mt-5">
              <div
                onClick={() => handledivclick(6)}
                className="bg-[#1F3540] drop-shadow-md shadow-black w-20 h-20 rounded-lg"
              >
                <img className="w-10 h-10 m-5" src={state[6]} />
              </div>
              <div
                onClick={() => handledivclick(7)}
                className="bg-[#1F3540] drop-shadow-md shadow-black w-20 h-20 rounded-lg"
              >
                <img className="w-10 h-10 m-5" src={state[7]} />
              </div>
              <div
                onClick={() => handledivclick(8)}
                className="bg-[#1F3540] drop-shadow-md shadow-black w-20 h-20 rounded-lg"
              >
                <img className="w-10 h-10 m-5" src={state[8]} />
              </div>
            </div>
          </div>

          <div
            className={`buttons ${
              gameover ? "block" : "hidden"
            } buttons absolute top-[580px] left-[50px] flex gap-10`}
          >
            <div className=" user bg-[#31C4BE] w-20 h-14 rounded-lg text-center p-3.5 font-semibold text-[12px]">
              (YOU){" "}
              <span className="font-extrabold text-[14px]">{userScore}</span>
            </div>
            <div className="tie bg-[#A8BEC9] flex flex-col w-20 h-14 rounded-lg text-center p-3.5 font-semibold text-[12px]">
              TIES<span className="font-extrabold text-[14px]">{tieScore}</span>
            </div>
            <div className="pc bg-[#F2B237] w-20 h-14 rounded-lg text-center p-3.5 font-semibold text-[12px]">
              (CPU){" "}
              <span className="font-extrabold text-[14px]">{pcScore}</span>
            </div>
          </div>
        </div>
      </div>

      {/* RESULT DIV */}
      <div
        className={`result ${
          gameover ? "block" : "hidden"
        }  w-[410px] h-[250px] absolute top-[400px] left-[650px] bg-[#192A32]`}
      >
        <div className="flex flex-col p-8">
        {gameover && checkWinner(state) === user && (
          <>
          <h3 className="text-center font-bold text-[15px] text-[#e2edf2]">
            YOU WON!
          </h3>
          <div className="flex justify-center gap-5 mt-5">
            <img alt="show" src={user} className="w-8 h-8" />
            <span className="text-[#31C4BE] text-3xl font-extrabold text-center">
              TAKES THE ROUND
            </span>
          </div>
          </>
        )}
        {gameover && checkWinner(state) === pc && (
          <>
          <h3 className="text-center font-bold text-[15px] text-[#e2edf2]">
            YOU LOST!
          </h3>
          <div className="flex justify-center gap-5 mt-5">
            <img alt="show" src={pc} className="w-8 h-8" />
            <span className="text-[#F2B237] text-3xl font-extrabold text-center">
              TAKES THE ROUND
            </span>
          </div>
          </>
        )}
        {gameover && !state.includes(null) && (
          <>
          <h3 className="text-center font-bold text-[15px] text-[#e2edf2]">
            IT's A TIE!
          </h3>
          <div className="flex justify-center gap-5 mt-5">
            <span className="text-[#f4e7ce] text-3xl font-extrabold text-center">
              NOBODY WINS
            </span>
          </div>
          </>
        )}

          <div className="flex justify-center mt-8 gap-10">
            <button
              onClick={resetGame}
              className="bg-[#F2B237] w-28 h-8 rounded-lg text-[#192A32] p-1 font-extrabold"
            >
              QUIT
            </button>
            <button
              onClick={playAgain}
              className="bg-[#31C4BE] w-28 h-8 rounded-lg text-[#192A32] p- font-extrabold"
            >
              NEXT ROUND
            </button>
          </div>
        </div>
      </div>

      {/* RETRY DIV */}
      <div
        className={`Retry ${
          showRetryDiv ? "" : "hidden"
        } w-[410px] h-[250px] absolute top-[350px] left-[650px] bg-[#192A32]`}
      >
        <h2 className="text-3xl font-extrabold text-center text-[#F2B237] mt-10">
          Do you want to quit ?
        </h2>
        <div className="flex justify-around gap-8 mt-10 mx-14">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleRetryDiv();
              playAgain();
            }}
            className="bg-[#31C4BE] w-72 h-8 rounded-lg text-[#192A32] font-extrabold p-1"
          >
            PLAY AGAIN
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleRetryDiv();
              resetGame();
            }}
            className="bg-[#F2B237] w-72 h-8  rounded-lg text-[#192A32] font-extrabold p-1"
          >
            QUIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameArea;