import { personalInfo } from '../data/portfolio.js';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        © {year} {personalInfo.fullName}. Feito com React &amp; Vite.
      </p>
    </footer>
  );
}
