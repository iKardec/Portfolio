export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <p className="footer-text">© {currentYear} Alan Kardec Lima Campos Júnior</p>
        <p className="footer-location">
          <i className="fas fa-map-marker-alt" aria-hidden="true" /> Salvador - BA | Brasil
        </p>
      </div>
    </footer>
  );
}
