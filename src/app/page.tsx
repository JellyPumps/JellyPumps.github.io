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

type GithubProject = {
  name: string;
  desc: string;
  url: string;
  icon: string;
  current: boolean;
  year: number;
};

enum PageType {
  Games = "Games",
  Github = "Github",
}

export default function Home() {
  const [pageType, setPageType] = useState<PageType>(PageType.Games);

  const [games, setGames] = useState<Game[]>([]);
  const [githubProjects, setGithubProjects] = useState<GithubProject[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = pageType === PageType.Games ? "Games" : "Github";
        const snapshot = await get(ref(db, path));

        if (!snapshot.exists()) return;

        const data = Object.values(snapshot.val());

        if (pageType === PageType.Games) {
          const gamesData = data as Game[];
          gamesData.sort((a, b) => (b.current ? 1 : 0) - (a.current ? 1 : 0));
          setGames(gamesData);
          setCurrentIndex(0);
        } else {
          const githubData = data as GithubProject[];
          githubData.sort((a, b) => (b.current ? 1 : 0) - (a.current ? 1 : 0));
          setGithubProjects(githubData);
          setCurrentIndex(0);
        }
      } catch (err) {
        console.error("Firebase error:", err);
      }
    };

    fetchData();
  }, [pageType]);

  if (
    (pageType === PageType.Games && games.length === 0) ||
    (pageType === PageType.Github && githubProjects.length === 0)
  ) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const currentGame = games[currentIndex];
  const currentProject = githubProjects[currentIndex];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {pageType === PageType.Games && (
          <div
            className={styles.banner}
            style={{
              backgroundImage: `url(${currentGame.banner})`,
            }}
          />
        )}

        {pageType === PageType.Github && (
          <div className={styles.waveBackground}>
            <div className={styles.wave} />
            <div className={styles.wave} />
          </div>
        )}

        <nav className={styles.navbar}>
          <h1 className={styles.logo}>BouncyJelly</h1>
          <ul className={styles.menu}>
            <li onClick={() => setPageType(PageType.Games)}>Games</li>
            <li onClick={() => setPageType(PageType.Github)}>
              Github Projects
            </li>
          </ul>
          <div className={styles.search}>🔍</div>
        </nav>

        {pageType === PageType.Games && (
          <>
            <div className={styles.info}>
              <h2 className={styles.title}>{currentGame.name}</h2>
              <p className={styles.year}>{currentGame.year}</p>
              <p className={styles.description}>{currentGame.desc}</p>
            </div>

            <div className={styles.carousel}>
              {games.map((game, index) => (
                <div
                  key={index}
                  className={`${styles.card} ${
                    index === currentIndex ? styles.active : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  style={{ backgroundImage: `url(${game.icon})` }}
                />
              ))}
            </div>
          </>
        )}

        {pageType === PageType.Github && (
          <>
            <div className={styles.info}>
              <h2 className={styles.title}>{currentProject.name}</h2>
              <p className={styles.year}>{currentProject.year}</p>
              <p className={styles.description}>{currentProject.desc}</p>
            </div>

            <div className={styles.carousel}>
              {githubProjects.map((proj, index) => (
                <div
                  key={index}
                  className={`${styles.card} ${
                    index === currentIndex ? styles.active : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  style={{ backgroundImage: `url(${proj.icon})` }}
                  title={proj.name}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
