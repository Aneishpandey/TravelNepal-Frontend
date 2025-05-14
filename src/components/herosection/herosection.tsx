"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight, ChevronDown } from "lucide-react"
// import  "./HeroSection.module.css"

const Slides = [
  {
    id: 1,
    image: "/assets/images/reve-image.jpeg",
    alt: "Mountain landscape with clear blue sky",
  },
  {
    id: 2,
    image: "/assets/images/nature.jpeg",
    alt: "something image name",
  },
  {
    id: 3,
    image: "/assets/images/scene.jpeg",
    alt: "something image ",
  },
]


const POPULAR_DESTINATIONS = [
  "Kathmandu",
  "Pokhara",
  "Lumbini",
  "Chitwan",
  "Annapurna Base Camp",
  "Mustang",
]


export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0) //check which component is showing first, second or third
  const [isLoaded, setISLoaded] = useState(false) // check if the component has finished loading
  const slideshowRef = useRef<HTMLDivElement>(null) // this points to the slide show section so we can scroll to the next later

  //to handle slideshow autoplay
  useEffect(() => {
    setISLoaded(true) //this might trigger some animation or style that happens after page is fully loaded
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Slides.length)
    }, 3000)
    return () => clearInterval(interval) //this is cleanup function. if the component is removed please stop slideshow changes. 
  }, [])

  //handle form submission 
  const handleExplore = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Explore clicked")
  }

  // scroll to next section
  const scrollToNextSection = () => {
    const nextSection = slideshowRef.current?.nextElementSibling
    nextSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={slideshowRef}
      className={"hero-section"}
      aria-label="Discove your next adventure"
      role="region"
    >
      {/* Background Slideshow */}
      <div className={"hero-slide-show"}>
        {Slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${"hero-slide"} ${currentSlide === index ? "hero-slide-active" : ""
              } ${isLoaded ? "hero-slide-loaded" : ""}`}
            aria-hidden={currentSlide !== index}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className={"hero-slide-image"}
              quality={90}
            />
          </div>
        ))}
        <div className={"hero-overlay"}></div>
      </div>

      {/* Hero Content */}
      <div className={"hero-container"}>
        <div className={"hero-content"}>
          {/* heading */}
          <h1 className={"hero-title"}>Discover your next adventure</h1>

          {/* subheading */}
          <p className={"hero-description"}>
            Plan, explore, and create unforgettable journeys with ultimate travel companion
          </p>

          {/* search form */}
          <form onSubmit={handleExplore} className={"hero-search-form"} aria-label="Travel Search">
            <div className={"hero-search-field"}>
              <label htmlFor="destination" className={"hero-search-label"}>where to?</label>
              <input
                type="text"
                id="destination"
                placeholder="Select Destination"
                className={"hero-search-input"}
                aria-label="Destination"
              />
            </div>

            <button type="submit" className={"hero-search-button"}>
              Explore
              <ArrowRight className={"hero-button-icon"} aria-hidden="true" />
            </button>
          </form>

          {/* Popular Destinations */}
          <div className={"hero-popular"}>
            <h2 className={"hero-popular-title"}>Popular Destinations</h2>
            <div className={"hero-popular-tags"}>
              {POPULAR_DESTINATIONS.map((destination) => (
                <button
                  key={destination}
                  className={"hero-popular-tag"}
                  onClick={() => {
                    const input = document.getElementById("destination") as HTMLInputElement
                    if (input) input.value = destination
                  }}
                >
                  {destination}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* scroll indicator */}
        <div className={"hero-scroll"} onClick={scrollToNextSection}>
          <span className={"hero-scroll-text"}>Scroll to explore</span>
          <ChevronDown className={"hero-scroll-icon"} aria-hidden="true" />
        </div>
      </div>

      {/* slideshow indicators */}
      <div className={"hero-indicators"} aria-hidden="true">
        {Slides.map((_, index) => (
          <button
            key={index}
            className={`${"hero-indicator"} ${currentSlide === index ? "hero-indicator-active" : ""}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  )
}
