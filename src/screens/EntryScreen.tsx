import { FC, useEffect } from "react";
import GameCard from "../components/GameCard";
import { EntryScreenProps } from "../interfaces/entryscreen.interface";
import Styles from "./EntryScreen.module.css";
import { useState } from "react";
import {
  gameState,
  selectCard,
  winningCondition,
  newGame,
} from "../shared/GameLogic";
import { motion } from "framer-motion";

window.addEventListener("popstate", function (e) {
  audio.pause();
  progressBarWidth = 400;
});

const cardForeground = require("../assets/images/cardForeground.jpg");

export interface Card {
  id: string;
  cardName: string;
  currentlyRevealed: boolean;
  foreverRevealed: boolean;
  img: string;
}

const gameScreenBackground = require("../assets/images/gameBackground.jpg");

const audio: HTMLAudioElement = new Audio(
  require("../assets/music/BestMusic.mp3")
);
audio.addEventListener("loadeddata", () => {
  let duration = audio.duration;
  console.log(duration);

  // The duration variable now holds the duration (in seconds) of the audio clip
});

let progressBarWidth = 400;

function startInterval() {
  const progressBar = document.getElementById("progressBarStatus");
  const stopCondition = winningCondition.subscribe((won) => {
    if (won) {
      clearInterval(interval);
    }
  });
  console.log(progressBar);
  const interval = setInterval(
    () => {
      progressBar.style.width = `${progressBarWidth}px`;
      if (progressBarWidth < 300) {
        progressBar.style.backgroundImage =
          "linear-gradient(to right top, #25d644, #45d43c, #59d235, #69cf2e, #77cd28)";
      }
      if (progressBarWidth < 200) {
        progressBar.style.backgroundImage =
          "linear-gradient(to right top, #b9a446, #b4ac38, #abb42a, #9ebd1b, #8cc60a)";
      }
      if (progressBarWidth < 100) {
        progressBar.style.backgroundImage =
          "linear-gradient(to right top, #d3d223, #dfb206, #e4910f, #e17022, #d84f32)";
      }
      progressBarWidth -= 4;
    },
    794,
    64
  );
}

const EntryScreen: FC<EntryScreenProps> = () => {
  const [gameArray, setGameArray] = useState<Card[]>([]);
  const [wonGame, setWonGame] = useState<string>("");
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [startGameClicked, setStartGameClicked] = useState<boolean>(false);

  const timeExpiredGameOver = () => {
    const timeout = setTimeout(() => {
      if (wonGame) {
        clearTimeout(timeout);
        return;
      }
      if (!wonGame) {
        stopMusic();
        setGameOver(true);
      }
    }, 79464);
  };

  const playMusic = () => {
    setStartGameClicked(true);
    audio.currentTime = 0;
    audio.play();
    timeExpiredGameOver();
    startInterval();
    setAudioPlaying(true);
  };

  const stopMusic = () => {
    audio.pause();
    setAudioPlaying(false);
  };

  const playAgain = () => {
    progressBarWidth = 400;
    const progressBar = document.getElementById("progressBarStatus");
    progressBar.style.backgroundColor = "green";
    progressBar.style.backgroundImage = "";
    playMusic();
    newGame();
  };

  useEffect(() => {
    winningCondition.subscribe((winningValue) => {
      if (winningValue) {
        setWonGame("You Have Won");
        stopMusic();
      } else {
        setWonGame("");
      }
    });

    gameState.subscribe((cards) => {
      setGameArray(JSON.parse(JSON.stringify(cards)));
      console.log(JSON.parse(JSON.stringify(gameArray)));
    });
  }, []);

  const normalState = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={Styles.mainContent}
    >
      <img className={Styles.gameBackground} src={gameScreenBackground}></img>
      <div className={Styles.wrapper}>
        {!audioPlaying && !startGameClicked ? (
          <button
            className={Styles.musicButton}
            onClick={audioPlaying ? stopMusic : playMusic}
          >
            Start Game
          </button>
        ) : null}

        <div id={Styles.progressBarWrapper}>
          <div
            style={{ backgroundColor: "green", borderRadius: "8px" }}
            id="progressBarStatus"
          ></div>
        </div>
        {wonGame ? (
          <div>
            <button onClick={playAgain} className={Styles.newGameButton}>
              New Game ?
            </button>
          </div>
        ) : null}
      </div>

      <main className={Styles.gameWrapper}>
        {gameArray.map((card: Card) => {
          return (
            <GameCard
              cardBackgroundColor={card.foreverRevealed ? "green" : ""}
              cardPointerEvents={
                card.foreverRevealed || !audioPlaying ? "none" : "auto"
              }
              onCardSelect={selectCard.bind(this, card)}
              key={card.id}
              img={
                card.currentlyRevealed || card.foreverRevealed
                  ? card.img
                  : cardForeground
              }
              cardTitle={
                card.currentlyRevealed || card.foreverRevealed
                  ? ""
                  : "Reveal me"
              }
            ></GameCard>
          );
        })}
      </main>
    </motion.div>
  );

  return (
    <div>
      {gameOver ? (
        <div>
          <h1>You have lost, watch LOTR films to get better</h1>
        </div>
      ) : (
        normalState
      )}
    </div>
  );
};

export default EntryScreen;
