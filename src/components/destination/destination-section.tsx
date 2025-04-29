"use client"

import React, { useState, useEffect, useRef } from "react"
import { ChevronRight, ChevronLeft, Search, Filter, X } from "lucide-react"
import { register } from "swiper/element/bundle"
import DestinationCard from "./destination-card"
import { useMediaQuery } from "@/hooks/use-media-query"
import { type Destination, CATEGORIES } from "@/lib/destination-data"
import styles from "./destination.module.css" // <-- Import your CSS module

// Register Swiper custom elements
register();

interface DestinationSectionProps {
  destinations: Destination[]
}

export default function DestinationSection({ destinations }: DestinationSectionProps) {
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(destinations)
  const [visibleCount, setVisibleCount] = useState(5)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const swiperRef = useRef<HTMLElement | null>(null)
  const swiperNavPrevRef = useRef<HTMLButtonElement | null>(null)
  const swiperNavNextRef = useRef<HTMLButtonElement | null>(null)

  const isTabletOrLarger = useMediaQuery("(min-width: 768px)")

  // Filter destinations based on search query and category
  useEffect(() => {
    let results = destinations

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (destination) =>
          destination.title.toLowerCase().includes(query) || destination.description.toLowerCase().includes(query),
      )
    }

    if (selectedCategory) {
      results = results.filter((destination) => destination.category === selectedCategory)
    }

    setFilteredDestinations(results)
  }, [searchQuery, selectedCategory, destinations])

  // Initialize Swiper when component mounts or when screen size changes
  useEffect(() => {
    const swiperContainer = swiperRef.current as HTMLElement & {
        swiper?: any
        initialize?: () => void
    }

    if (swiperContainer && isTabletOrLarger) {
      const params = {
        slidesPerView: 2.2,
        spaceBetween: 20,
        grabCursor: true,
        loop: filteredDestinations.length > 3,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          clickable: true,
          el: ".swiper-pagination",
        },
        navigation: {
          prevEl: swiperNavPrevRef.current,
          nextEl: swiperNavNextRef.current,
        },
        breakpoints: {
          768: {
            slidesPerView: 2.2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        },
        injectStyles: [
          `
          .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background: #CBD5E1;
            opacity: 1;
          }
          .swiper-pagination-bullet-active {
            background: #3B82F6;
            width: 24px;
            border-radius: 4px;
          }
        `,
        ],
        preloadImages: false,
        lazy: {
          loadPrevNext: true,
          loadPrevNextAmount: 2,
        },
        watchSlidesProgress: true,
      }

      Object.assign(swiperContainer, params)
      swiperContainer.initialize?.();
    }

    return () => {
      if (swiperContainer && swiperContainer.swiper) {
        swiperContainer.swiper.destroy();
      }
    };
  }, [isTabletOrLarger, filteredDestinations.length])

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5)
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCategory(null)
    setIsSearchOpen(false)
    setIsFilterOpen(false)
  }

  return (
    <section className={styles["destination-section"]}>
      <div className={styles["container"]}>
        <div className={styles["section-header"]}>
          <div>
            <h2 className={styles["section-title"]}>Destinations By Theme</h2>
            <p className={styles["section-subtitle"]}>Discover your next adventure through our curated collections</p>
          </div>
          <div className={styles["section-actions"]}>
            <button
              className={styles["icon-button"]}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search destinations"
            >
              <Search className={styles["icon-button-svg"]} />
            </button>
            <button
              className={styles["icon-button"]}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              aria-label="Filter destinations"
            >
              <Filter className={styles["icon-button-svg"]} />
            </button>
          </div>
        </div>

        {/* Search and Filter UI */}
        {(isSearchOpen || isFilterOpen) && (
          <div className={styles["search-filter-container"]}>
            {isSearchOpen && (
              <div className={styles["search-container"]}>
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles["search-input"]}
                  aria-label="Search destinations"
                />
              </div>
            )}

            {isFilterOpen && (
              <div className={styles["filter-container"]}>
                <div className={styles["filter-options"]}>
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      className={`${styles["filter-button"]} ${selectedCategory === category ? styles["filter-button-active"] : ""}`}
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(searchQuery || selectedCategory) && (
              <button className={styles["clear-filters-button"]} onClick={handleClearFilters}>
                <X className={styles["clear-filters-icon"]} />
                Clear filters
              </button>
            )}
          </div>
        )}

        {filteredDestinations.length === 0 ? (
          <div className={styles["no-results"]}>
            <p>No destinations found. Try adjusting your search or filters.</p>
          </div>
        ) : isTabletOrLarger ? (
          // Tablet and Desktop: Horizontal Swiper
          <div className={styles["slider-container"]}>
            {React.createElement (
              'swiper-container',
              {
                ref: swiperRef,
                init: 'false',
                class: 'destination-swiper',
              },
              filteredDestinations.map((destinations) =>
              React.createElement(
                'swiper-slide',
                { key: destinations.id },
                <DestinationCard destination={destinations} />
              ))
            )}
            <div className={styles["slider-navigation"]}>
              <button
                ref={swiperNavPrevRef}
                className={`${styles["slider-nav-button"]} ${styles["slider-nav-prev"]}`}
                aria-label="Previous slide"
              >
                <ChevronLeft className={styles["slider-nav-icon"]} aria-hidden="true" />
              </button>
              <div className="swiper-pagination"></div>
              <button
                ref={swiperNavNextRef}
                className={`${styles["slider-nav-button"]} ${styles["slider-nav-next"]}`}
                aria-label="Next slide"
              >
                <ChevronRight className={styles["slider-nav-icon"]} aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : (
          // Mobile: Vertical Scroll with Load More
          <div className={styles["mobile-grid"]}>
            {filteredDestinations.slice(0, visibleCount).map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}

            {visibleCount < filteredDestinations.length && (
              <button className={styles["load-more-button"]} onClick={handleLoadMore}>
                Load More Destinations
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
