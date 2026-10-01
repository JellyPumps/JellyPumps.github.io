
export default function Footer() {
    return (
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-sigil">
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="#c8601a" strokeWidth="0.75" strokeDasharray="3 2"/>
                <path d="M20 5 L21.5 18.5 L35 20 L21.5 21.5 L20 35 L18.5 21.5 L5 20 L18.5 18.5 Z" fill="#c8601a" opacity="0.7"/>
                <circle cx="20" cy="20" r="2.5" fill="#ff8c3a"/>
              </svg>
            </div>
 
            <p className="footer-brand">Sarthak Rai</p>
 
            <div className="footer-divider">
              <span className="footer-line" />
              <span className="footer-gem" />
              <span className="footer-line" />
            </div>
 
            <nav className="footer-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
              <span className="footer-sep">◆</span>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <span className="footer-sep">◆</span>
              <a href="mailto:sarthakrai@bouncyjelly.com">sarthakrai@bouncyjelly.com</a>
            </nav>
 
            <p className="footer-copy">
              © {new Date().getFullYear()} — Music by Brandon Morris/HaelDB
            </p>
          </div>
        </footer>
    );
}