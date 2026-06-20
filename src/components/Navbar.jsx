import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { label: '关于', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '能力', href: '#strengths' },
  { label: '联系', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          <img src={import.meta.env.BASE_URL + 'signature.png'} alt="吴应晴" className={styles.signature} />
        </a>
        <ul className={styles.links}>
          {NAV_ITEMS.map(item => (
            <li key={item.href}>
              <a href={item.href} className={styles.link}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
