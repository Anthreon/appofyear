import { FC } from "react";
import Styles from "./GameCard.module.css";
import { motion } from "framer-motion";
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
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8, rotate: 360 }}
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
    </motion.div>
  );
};

export default GameCard;
