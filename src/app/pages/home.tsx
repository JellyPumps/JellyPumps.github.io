
export default function Home() {
    return (
        <section id="home">
          <div className="hero">
            <svg className="sigil" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" stroke="#c8601a" strokeWidth="1.5" strokeDasharray="4 3" fill="none"/>
              <circle cx="40" cy="40" r="28" stroke="#c8601a" strokeWidth="0.5" fill="none"/>
              <path d="M40 10 L43 37 L70 40 L43 43 L40 70 L37 43 L10 40 L37 37 Z" fill="#c8601a" opacity="0.8"/>
              <circle cx="40" cy="40" r="4" fill="#ff8c3a"/>
              <path d="M40 4 L40 76 M4 40 L76 40" stroke="#c8601a" strokeWidth="0.5" opacity="0.4"/>
            </svg>
 
            <h1 className="hero-title">Sarthak Rai</h1>
 
            <div className="divider">
              <div className="divider-line"></div>
              <div className="divider-gem"></div>
              <div className="divider-line"></div>
            </div>
 
            <p className="hero-subtitle">
              Game Developer ◆ 3D Artist ◆ 2nd Year CS Student
            </p>
 
            <div className="scroll-hint">▼ Descend ▼</div>
          </div>
        </section>
    );
}