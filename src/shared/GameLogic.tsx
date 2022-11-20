import { BehaviorSubject } from "rxjs";
import { Card } from "../screens/EntryScreen";

const defaultGameState: Card[] = [
  {
    id: "1",
    cardName: "1",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/Aragorn.PNG"),
  },
  {
    id: "2",
    cardName: "1",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/Aragorn.PNG"),
  },
  {
    id: "3",
    cardName: "2",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/Boromir.PNG"),
  },
  {
    id: "4",
    cardName: "2",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/Boromir.PNG"),
  },
  {
    id: "5",
    cardName: "3",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/Gandalf.PNG"),
  },
  {
    id: "6",
    cardName: "3",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/Gandalf.PNG"),
  },
  {
    id: "7",
    cardName: "4",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/Gimli.PNG"),
  },
  {
    id: "8",
    cardName: "4",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/Gimli.PNG"),
  },
  {
    id: "9",
    cardName: "5",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/Gollum.PNG"),
  },
  {
    id: "10",
    cardName: "5",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/Gollum.PNG"),
  },
  {
    id: "11",
    cardName: "6",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/Saruman.PNG"),
  },
  {
    id: "12",
    cardName: "6",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/Saruman.PNG"),
  },
  {
    id: "13",
    cardName: "7",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/Sauron.PNG"),
  },
  {
    id: "14",
    cardName: "7",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/Sauron.PNG"),
  },
  {
    id: "15",
    cardName: "8",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/Theoden.PNG"),
  },
  {
    id: "16",
    cardName: "8",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/Theoden.PNG"),
  },
  {
    id: "17",
    cardName: "9",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/WitchKing.PNG"),
  },
  {
    id: "18",
    cardName: "9",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/WitchKing.PNG"),
  },
  {
    id: "19",
    cardName: "10",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/Halldir.PNG"),
  },
  {
    id: "20",
    cardName: "10",
    currentlyRevealed: false,
    foreverRevealed: false,
    img: require("../assets/Halldir.PNG"),
  },
];

const shuffledArray = shuffle(JSON.parse(JSON.stringify(defaultGameState)));

function shuffle(array: Card[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const selectCard = (card: Card) => {
  const cards = selectedCards.value;
  cards.push(card);
  cards.forEach((card) => {
    card.currentlyRevealed = true;
  });
  console.log("REVEALED CARDS: ", cards);
  const currentCardState = gameState.value;
  console.log("jozin:", currentCardState);

  if (selectedCards.value.length === 1) {
    currentCardState.find((card) => card.id === cards[0].id).currentlyRevealed =
      true;
  }

  if (selectedCards.value.length === 2) {
    currentCardState.find((card) => card.id === cards[0].id).currentlyRevealed =
      true;
    currentCardState.find((card) => card.id === cards[1].id).currentlyRevealed =
      true;
  }
  gameState.next(currentCardState);
  selectedCards.next(cards);

  compareTwoCards();
};

const checkWinningCondition = () => {
  gameState.subscribe((currentGameState: Card[]) => {
    let winningCount = 0;
    currentGameState.forEach((card) => {
      if (card.foreverRevealed) {
        winningCount++;
      }
    });
    if (winningCount === 20) {
      winningCondition.next(true);
    }
  });
};

export const newGame = () => {
  if (winningCondition.value) {
    winningCondition.next(false);
    const shuffledArray = shuffle(defaultGameState);
    console.log(shuffledArray);

    gameState.next(shuffledArray);
    selectedCards.next([]);
  }
};

const resetCurrentlyRevealedCards = () => {
  gameState.value.forEach((card: Card) => {
    card.currentlyRevealed = false;
  });
};

const compareTwoCards = () => {
  if (selectedCards.value.length === 2) {
    const currentlySelectedCards = selectedCards.value;
    const comparedCards = gameState.value;
    if (
      currentlySelectedCards[0].cardName ===
        currentlySelectedCards[1].cardName &&
      currentlySelectedCards[0].id !== currentlySelectedCards[1].id
    ) {
      comparedCards.find(
        (card) => card.id === currentlySelectedCards[0].id
      ).foreverRevealed = true;
      comparedCards.find(
        (card) => card.id === currentlySelectedCards[1].id
      ).foreverRevealed = true;
      gameState.next(comparedCards);
      console.log("GAME STATE AFTER RIGHT CARDS: ", gameState.value);
      checkWinningCondition();
    } else {
      resetCurrentlyRevealedCards();
    }
    const newState: Card[] = [];
    selectedCards.next(newState);
  }
};

export const gameState = new BehaviorSubject<Card[]>(shuffledArray);
export const selectedCards = new BehaviorSubject<Card[]>([]);
export const winningCondition = new BehaviorSubject<boolean>(false);
