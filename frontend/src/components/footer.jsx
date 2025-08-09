import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer footer-center flex flex-col gap-5 bg-base-200 text-base-content p-4">    
      <nav>
        <div className="flex gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-gray-600 hover:text-primary text-2xl transition-colors"
            />
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-gray-600 hover:text-primary text-2xl transition-colors"
            />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-gray-600 hover:text-primary text-2xl transition-colors"
            />
          </a>
        </div>
      </nav>

      <nav className="flex gap-4">
        <a className="link link-hover" href="/privacy">
          Privacy
        </a>
        <a className="link link-hover" href="/terms">
          Terms
        </a>
      </nav>

      <aside>
        <p>&copy; 2025 StaySphere Private Limited</p>
      </aside>
    </footer>
  );
};

export default Footer;