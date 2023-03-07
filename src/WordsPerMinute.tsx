import { useState, useEffect } from "react";

const WORDS = [
  "apple",
  "banana",
  "carrot",
  "dog",
  "elephant",
  "fox",
  "giraffe",
  "horse",
  "igloo",
  "jacket",
  "kite",
  "lion",
  "monkey",
  "nose",
  "ocean",
  "penguin",
  "quilt",
  "rainbow",
  "sun",
  "tiger",
  "umbrella",
  "violin",
  "whale",
  "xylophone",
  "yacht",
  "zebra",
  "acorn",
  "butterfly",
  "cactus",
  "dolphin",
  "eggplant",
  "firefly",
  "grape",
  "hedgehog",
  "iceberg",
  "jellyfish",
  "kangaroo",
  "lighthouse",
  "mosquito",
  "nightingale",
  "octopus",
  "panda",
  "quokka",
  "rhinoceros",
  "squirrel",
  "toucan",
  "unicorn",
  "vulture",
  "wombat",
  "xyris",
  "yellowtail",
  "zeppelin",
  "alpaca",
  "bison",
  "capybara",
  "dachshund",
  "elecampane",
  "flamingo",
  "gazelle",
  "humpback",
  "iguana",
  "jaguar",
  "kookaburra",
  "lemur",
  "meerkat",
  "narwhal",
  "ocelot",
  "puma",
  "quail",
  "raccoon",
  "sheep",
  "turtle",
  "urchin",
  "vole",
  "weasel",
  "xenops",
  "yellowhammer",
  "zealot",
  "anteater",
  "badger",
  "catfish",
  "dromedary",
  "eland",
  "flounder",
  "gibbon",
  "hyena",
  "impala",
  "jackal",
  "kiwi",
  "lemming",
  "mongoose",
  "nighthawk",
  "opossum",
  "platypus",
  "quokka",
  "rattlesnake",
  "scorpion",
  "tapir",
  "urchin",
  "vulture",
  "walrus",
  "xerus",
  "yellowjacket",
  "zebu",
];

export const WordsPerMinute = () => {
  const [word, setWord] = useState(
    () => WORDS[(Math.random() * WORDS.length) | 0]
  );
  const [characterCount, setCharacterCount] = useState(0);
  const [wordsPerMin, setWordsPerMin] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [hit, setHit] = useState(0);
  const [miss, setMiss] = useState(0);
  const [buffer, setBuffer] = useState("");
  const [time, setTime] = useState(0);
  const [over, setOver] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (buffer.toLowerCase() === word.toLowerCase()) {
      setHit((hit) => (hit += 1));
      setWord(WORDS[(Math.random() * WORDS.length) | 0]);
      setCharacterCount((characterCount) => characterCount + word.length);
      setWordsPerMin((wordsPerMin) => (wordsPerMin += 1));
      setBuffer("");
    } else if (buffer.toLowerCase() !== word.toLowerCase()) {
      setMiss((miss) => (miss += 1));
      setBuffer("");
    }
  };

  const handleUserKeyPress = (event: any) => {
    const { key } = event;
    if (key === " " && !over) {
      handleSubmit(event);
    }
  };

  useEffect(() => {
    if (time !== 0) {
      const timeout = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timeout);
    }
    if (time === 0 && wordsPerMin > 0) {
      setOver(true);
    }
  }, [time, wordsPerMin]);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  });

  useEffect(() => {
    setAccuracy((hit / (miss + hit + 0.0000000000001)) * 100);
  }, [hit, miss]);

  return (
    <div className="container">
      <div className="titles">
        <h3 className={!over ? "title" : "title3"}>
          {!over ? "TYPING SPEED TEST" : "YOUR SCORE:"}
        </h3>
        <h1 className="title2">{!over ? "Test your typing skills" : ""}</h1>
      </div>

      <div className="box-container">
        <div>
          <div className="timeBox">
            <span className="time">{time}</span>
          </div>
          <div className="label">
            <p>seconds</p>
          </div>
        </div>

        <div>
          <div className="box">
            <span>{wordsPerMin}</span>
          </div>
          <div className="label">
            <p>words/min</p>
          </div>
        </div>

        <div>
          <div className="box">
            <span>{characterCount}</span>
          </div>
          <div className="label">
            <p>chars/min</p>
          </div>
        </div>

        <div>
          <div className="box">
            <span>{accuracy.toFixed(2)}</span>
          </div>
          <div className="label">
            <p>% accuracy</p>
          </div>
        </div>
      </div>

      <div className="form">
        {time ? (
          <div>
            <div>
              <h1 className="word">{word}</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                className="bufferInput"
                value={buffer}
                onChange={(e) => setBuffer(e.target.value)}
                type="text"
                autoFocus
              />

              <div>
                <button className="submitBtn" type="submit">
                  * press space bar to submit *
                </button>
              </div>
            </form>
          </div>
        ) : over ? (
          <button className="playBtn" onClick={() => window.location.reload()}>
            Play Again
          </button>
        ) : (
          <button className="playBtn" onClick={() => setTime(60)}>
            Play
          </button>
        )}
      </div>
    </div>
  );
};
