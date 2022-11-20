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

export interface Card {
  id: string;
  cardName: string;
  currentlyRevealed: boolean;
  foreverRevealed: boolean;
  img: string;
}

const EntryScreen: FC<EntryScreenProps> = ({ title }) => {
  const [gameArray, setGameArray] = useState<Card[]>([]);
  const [wonGame, setWonGame] = useState<string>("");

  useEffect(() => {
    winningCondition.subscribe((winningValue) => {
      if (winningValue) {
        setWonGame("You Have Won");
      } else {
        setWonGame("");
      }
    });

    gameState.subscribe((cards) => {
      setGameArray(JSON.parse(JSON.stringify(cards)));
      console.log(JSON.parse(JSON.stringify(gameArray)));
    });
  }, []);

  return (
    <div>
      <div className={Styles.wrapper}>
        <div>
          <h1 className={Styles.title}>{title + " " + wonGame} </h1>
        </div>
        {wonGame ? (
          <div>
            <button onClick={newGame} className={Styles.newGameButton}>
              New Game ?
            </button>
          </div>
        ) : null}
      </div>

      <main className={Styles.gameWrapper}>
        {gameArray.map((card: Card) => {
          return (
            <GameCard
              cardBackgroundColor={card.foreverRevealed ? "green" : "brown"}
              cardPointerEvents={card.foreverRevealed ? "none" : "auto"}
              onCardSelect={selectCard.bind(this, card)}
              key={card.id}
              img={
                card.currentlyRevealed || card.foreverRevealed ? card.img : null
              }
              cardTitle={
                card.currentlyRevealed || card.foreverRevealed ? "" : "Pick me"
              }
            ></GameCard>
          );
        })}
      </main>
    </div>
  );
};

export default EntryScreen;
