"use client"

import { useState, useEffect } from "react"
import Link from "next/link";
import styles from "./navbar.module.css"
import Image from "next/image";
import { escape } from "querystring";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {  //creat a function that checks if you scrolled down 
      if (window.scrollY > 10) {
        setScrolled(true)         // if scrolled down remember that
      } else {
        setScrolled(false)          // if not scrolled remember this
      }
    }

    window.addEventListener("scroll", handleScroll) //start watching for scrolling 

    return () => removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`${styles.navbar} ${scrolled ? styles['navbar-scrolled'] : ""}`}>
      {/*   {}  1  inside React whenever you want to use js inside jsx you must use {} so it is there
           ``   2     backticks create template literals , which let you mix string + variable so it is there. 
      navbar    3   always include navbar there 
          $     4  from where logic is written
      scrolled  5  a state variable that tracks whether user has scrolled down 
          ?     6 if yes use navbar-scrolled
          :     7 if no it remains same */}

      <div className={styles.container}>

        {/* for the logo */}
        <div className={styles["logo-full"]}>
          <Link href="/" aria-label="Travel Nepal - Home">
            <Image
              src="/assets/logos/Travel.png"
              alt="Travel Nepal Logo"
              width={120}
              height={40}
              priority // ensures fast load since it's likely above the fold
            />
          </Link>
        </div>
        {/* logo part finished */}

        {/* desktop navigation */}
        <nav className={styles["navbar-desktop"]} aria-label="Main Navigation">
          <ul className={styles["navbar-links"]}>
            <li>
              <Link href="/" className={styles["navbar-link"]}>Home</Link>
            </li>
            <li>
              <Link href="/" className={styles["navbar-link"]}>Services</Link>
            </li>
            <li>
              <Link href="/" className={styles["navbar-link"]}>Destinations</Link>
            </li>
            <li>
              <Link href="/" className={styles["navbar-link"]}>Blogs</Link>
            </li>
            <li>
              <Link href="/" className={styles["navbar-link"]}>Contact US</Link>
            </li>

            <div className={styles["Nav-Buttons"]}>
              <button className={styles["Login-Button"]} aria-label="Log in to your account">
                <span className={styles["Button-Text"]}>Login</span>
              </button>

              <button className={styles["SignUp-Button"]} aria-label="Create a new account">
                <span className={styles["Button-Text"]}>SignUp</span>
              </button>
            </div>
          </ul>
        </nav>
        {/* desktop navigation finished */}

        {/* hamburger button */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles["hamburger-active"] : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <span className={`${styles["hamburger-line"]} ${styles["hamburger-line-1"]}`}></span>
          <span className={`${styles["hamburger-line"]} ${styles["hamburger-line-2"]}`}></span>
          <span className={`${styles["hamburger-line"]} ${styles["hamburger-line-3"]}`}></span>
        </button>
        {/* hamburger button finished */}

        {/* Mobile navigation */}
        <div id="mobile-menu" className={`${styles["navbar-mobile"]} ${isMenuOpen ? styles["navbar-mobile-open"] : ""}`}>
          arialhidden={!isMenuOpen}
          {/* navbar ko mathi ko right side ma euta cross button huncha tesko lagi */}
          <button className={styles["navbar-mobile-close"]} onClick={() => setIsMenuOpen(false)} aria-label="close-Menu">
            <span className={styles["navbar-mobile-close-icon"]}></span>
          </button>

          <nav aria-label="Mobile Navigation">
            <ul className={styles["navbar-mobile-links"]}>
              <li>
                <Link href="/" className={styles["navbar-mobile-link"]} onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles["navbar-mobile-link"]} onClick={() => setIsMenuOpen(false)}>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/services" className={styles["navbar-mobile-link"]} onClick={() => setIsMenuOpen(false)}>
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className={styles["navbar-mobile-link"]} onClick={() => setIsMenuOpen(false)}>
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/blog" className={styles["navbar-mobile-link"]} onClick={() => setIsMenuOpen(false)}>
                  Community
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles["navbar-mobile-link"]} onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
              </li>
              <li className={styles["mobile-navbar-buttons"]}>
                <button className={styles["Mobile-Login"]} aria-label="log in to your  account">Login</button>
                <button className={styles["Mobile-Signup"]} aria-label="sign up into your account">SignUp</button>
              </li>
            </ul>
          </nav>
        </div>
        {/* navbar bahek ja click gare pani navbar close huna ko lagi */}
        {isMenuOpen && <div className={styles["navbar-mobile-overlay"]} onClick={() => setIsMenuOpen(false)}></div>}
      </div>
    </header>
  )
}

export default Navbar;
