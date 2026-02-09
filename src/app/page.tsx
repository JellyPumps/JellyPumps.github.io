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

  let siteTitle = pageType === PageType.Games ? "BouncyJelly" : "Sarthak Rai";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = pageType === PageType.Games ? "Games" : "Github";
        const snapshot = await get(ref(db, path));
        if (!snapshot.exists()) return;

        const data = Object.values(snapshot.val());

        if (pageType === PageType.Games) {
          const gamesData = data as Game[];
          gamesData.sort((a, b) => Number(b.current) - Number(a.current));
          setGames(gamesData);
        } else {
          const githubData = data as GithubProject[];
          githubData.sort((a, b) => Number(b.current) - Number(a.current));
          setGithubProjects(githubData);
        }

        setCurrentIndex(0);
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

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* ===== GAME BANNER ===== */}
        {pageType === PageType.Games && games[currentIndex] && (
          <div
            className={styles.banner}
            style={{
              backgroundImage: `url(${games[currentIndex].banner})`,
            }}
          />
        )}

        {/* ===== GITHUB BACKGROUND ===== */}
        {pageType === PageType.Github && (
          <div className={styles.waveBackground}>
            <div className={styles.wave} />
            <div className={styles.wave} />
          </div>
        )}

        <nav className={styles.navbar}>
          <h1 className={styles.logo}>{siteTitle}</h1>
          <ul className={styles.menu}>
            <li onClick={() => setPageType(PageType.Games)}>Games</li>
            <li onClick={() => setPageType(PageType.Github)}>Github Projects</li>
          </ul>
          <div className={styles.search}>🔍</div>
        </nav>

        {/* ===== GAMES PAGE ===== */}
        {pageType === PageType.Games && games[currentIndex] && (
          <>
            <div className={styles.info}>
              <h2 className={styles.title}>{games[currentIndex].name}</h2>
              <p className={styles.year}>{games[currentIndex].year}</p>
              <p className={styles.description}>
                {games[currentIndex].desc}
              </p>
            </div>

            <div className={styles.carousel}>
              {games.map((game, index) => (
                <div
                  key={index}
                  className={`${styles.card} ${
                    index === currentIndex ? styles.active : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  {game.icon ? (
                    <div
                      className={styles.cardImage}
                      style={{ backgroundImage: `url(${game.icon})` }}
                    />
                  ) : (
                    <div className={styles.animatedPlaceholder}>
                      <span>{game.name[0]}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===== GITHUB PAGE ===== */}
        {pageType === PageType.Github && githubProjects[currentIndex] && (
          <>
            <div className={styles.info}>
              <h2 className={styles.title}>
                {githubProjects[currentIndex].name}
              </h2>
              <p className={styles.year}>
                {githubProjects[currentIndex].year}
              </p>
              <p className={styles.description}>
                {githubProjects[currentIndex].desc}
              </p>
            </div>

            <div className={styles.carousel}>
              {githubProjects.map((proj, index) => (
                <div
                  key={index}
                  className={`${styles.card} ${
                    index === currentIndex ? styles.active : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  title={proj.name}
                >
                  {proj.icon ? (
                    <div
                      className={styles.cardImage}
                      style={{ backgroundImage: `url(${proj.icon})` }}
                    />
                  ) : (
                    <div className={styles.animatedPlaceholder}>
                      <span>{proj.name[0]}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
