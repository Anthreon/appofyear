import { FC } from "react";
import Styles from "./GameCard.module.css";

interface GameCardProps {
  onCardSelect: () => void;
  cardBackgroundColor: string;
  cardPointerEvents: any;
  img: string;
  cardTitle: string;
}

const GameCard: FC<GameCardProps> = ({
  cardTitle,
  onCardSelect,
  cardBackgroundColor,
  cardPointerEvents,
  img,
}) => {
  return (
    <div
      style={{
        backgroundColor: cardBackgroundColor,
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        pointerEvents: cardPointerEvents,
        backgroundPosition: "center",
      }}
      onClick={onCardSelect}
      className={Styles.cardWrapper}
    >
      <h2 className={Styles.cardTitle}>{cardTitle}</h2>
    </div>
  );
};

export default GameCard;
