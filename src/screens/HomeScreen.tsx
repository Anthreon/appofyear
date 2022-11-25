import { FC, useEffect, useState } from "react";
import Styles from "./HomeScreen.module.css";
import { Link } from "react-router-dom";
import "../assets/fonts/newFont.TTF";
import { motion } from "framer-motion";
const background = require("../assets/video/Background.mp4");
const audio: HTMLAudioElement = new Audio(
  require("../assets/music/BackgroundMusic.mp4")
);
const soundIcon = require("../assets/b.png");
console.log(soundIcon);

audio.loop = true;

const HomeScreen: FC = () => {
  const [musicPlaying, setMusicPlaying] = useState(false);

  const playMusic = () => {
    setMusicPlaying(true);
    audio.play();
  };

  const stopMusic = () => {
    setMusicPlaying(false);
    audio.pause();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <img
        onClick={musicPlaying ? stopMusic : playMusic}
        src={soundIcon}
        className={`${Styles.soundController} ${
          musicPlaying ? Styles.musicStopped : Styles.musicPlaying
        }`}
      ></img>

      <main>
        <div className={Styles.menuWrapper}>
          <Link onClick={stopMusic} className={Styles.startGame} to="/game">
            <h1>Play Game</h1>
          </Link>
        </div>

        <div className={Styles.videoWrapper}>
          <video
            className={Styles.video}
            src={background}
            autoPlay
            loop
            muted
          />
        </div>
      </main>
    </motion.div>
  );
};

export default HomeScreen;
