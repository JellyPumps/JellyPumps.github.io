"use client";

import styles from "./page.module.css";
import { db } from "../firebase/firebase";
import { ref, get } from "firebase/database";
import { useEffect, useState } from "react";

type Game = {
  name: string;
  icon: string;
  banner: string;
  current: boolean;
  year: number;
  desc: string;
};

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const snapshot = await get(ref(db, "Games"));
        if (snapshot.exists()) {
          const gamesData: Game[] = Object.values(snapshot.val()) as Game[];
          gamesData.sort((a, b) => (b.current ? 1 : 0) - (a.current ? 1 : 0));
          setGames(gamesData);
        } else {
          console.log("No games found");
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  if (games.length === 0) return <div className={styles.loading}>Loading...</div>;

  const currentGame = games[currentIndex];

  return (
    <div className={styles.page}>
      <main
        className={styles.main}
        style={{
          backgroundImage: `url(${currentGame.banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Navbar */}
        <nav className={styles.navbar}>
          <h1 className={styles.logo}>BouncyJelly</h1>
          <ul className={styles.menu}>
            <li>Home</li>
            <li>Blog</li>
          </ul>
          <div className={styles.search}>🔍</div>
        </nav>

        {/* Game Info */}
        <div className={styles.info}>
          <h2 className={styles.title}>{currentGame.name}</h2>
          <p className={styles.year}>{currentGame.year}</p>
          <p className={styles.description}>{currentGame.desc}</p>
        </div>

        {/* Carousel */}
        <div className={styles.carousel}>
          {games.map((game, index) => (
            <div
              key={index}
              className={`${styles.card} ${index === currentIndex ? styles.active : ""}`}
              onClick={() => setCurrentIndex(index)}
              style={{ backgroundImage: `url(${game.icon})` }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
