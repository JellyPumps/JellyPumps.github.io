"use client";

import styles from "./page.module.css";
import { db } from "../firebase/firebase";
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from "react";

type Game = {
  name: string,
  icon: string,
  banner: string,
  current: boolean,
}

export default function Home() {
  const [games, set_games] = useState<Game[]>([]);
  const [current_index, set_current_index] = useState(0);

  useEffect(() => {
    const fetch_games = async () => {
      const snapshot = await getDocs(collection(db, "Games"));
      let games_data: Game[] = snapshot.docs.map(doc => doc.data() as Game);

      games_data.sort((a, b) => (b.current ? 1 : 0) - (a.current ? 1 : 0));
      set_games(games_data);
    };

    fetch_games();
  }, []);

  const next = () => set_current_index((prev) => (prev + 1) % games.length);
  const prev = () => set_current_index((prev) => (prev - 1 + games.length) % games.length);

  if (games.length === 0) return <div>OwO</div>;

  return (
    <div className={styles.page}>
      <main 
        className={styles.main}
        style={{
          backgroundImage: `url(${games[current_index].banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          color: "#fff",
        }}
      >
        {/* Navbar */}
        <h1>BouncyJelly</h1>

        {/* Carousel */}
        <div className={styles.carousel}>
          <button onClick={prev} className={styles.navButton}>
            ◀
          </button>

          <img
            src={games[current_index].icon}
            alt={games[current_index].name}
            className={styles.gameIcon}
          />

          <button onClick={next} className={styles.navButton}>
            ▶
          </button>
        </div>

        <h2>{games[current_index].name}</h2>

        {/* Carousel indicators */}
        <div className={styles.indicators}>
          {games.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                index === current_index ? styles.active : ""
              }`}
              onClick={() => set_current_index(index)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
