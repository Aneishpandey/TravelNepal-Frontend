export interface Destination {
    id: number
    title: string
    description: string
    image: string
    alt: string
    isTop10: boolean
    slug: string
    category: string
  }
  
  export const CATEGORIES = [
    "Adventure Travel",
    "Wildlife Safaris",
    "Island Getaways",
    "Historical Sites",
    "Beach Escapes",
    "Mountain Retreats",
    "Cultural Experiences",
    "Urban Exploration",
  ]
  
  export const DESTINATIONS: Destination[] = [
    {
      id: 1,
      title: "Adventure Travel",
      description: "Discover extraordinary adventure travel curated just for you",
      image: "/images/adventure-travel.jpg",
      alt: "River rafting through a canyon",
      isTop10: true,
      slug: "adventure-travel",
      category: "Adventure Travel",
    },
    {
      id: 2,
      title: "Wildlife Safaris",
      description: "Discover extraordinary wildlife safaris curated just for you",
      image: "/images/wildlife-safaris.jpg",
      alt: "Sunset over African savanna with silhouettes of animals",
      isTop10: true,
      slug: "wildlife-safaris",
      category: "Wildlife Safaris",
    },
    {
      id: 3,
      title: "Island Getaways",
      description: "Discover extraordinary island getaways curated just for you",
      image: "/images/island-getaways.jpg",
      alt: "Aerial view of a tropical island with clear blue water",
      isTop10: true,
      slug: "island-getaways",
      category: "Island Getaways",
    },
    {
      id: 4,
      title: "Historical Sites",
      description: "Discover extraordinary historical sites curated just for you",
      image: "/images/historical-sites.jpg",
      alt: "Ancient columns of a historical monument at sunset",
      isTop10: true,
      slug: "historical-sites",
      category: "Historical Sites",
    },
    {
      id: 5,
      title: "Beach Escapes",
      description: "Discover extraordinary beach destinations curated just for you",
      image: "/images/beach-escapes.jpg",
      alt: "Palm trees on a tropical beach at sunset",
      isTop10: true,
      slug: "beach-escapes",
      category: "Beach Escapes",
    },
    {
      id: 6,
      title: "Mountain Retreats",
      description: "Discover extraordinary mountain retreats curated just for you",
      image: "/images/mountain-retreats.jpg",
      alt: "Cabin overlooking a mountain range",
      isTop10: false,
      slug: "mountain-retreats",
      category: "Mountain Retreats",
    },
    {
      id: 7,
      title: "Cultural Experiences",
      description: "Discover extraordinary cultural experiences curated just for you",
      image: "/images/cultural-experiences.jpg",
      alt: "Traditional cultural celebration with colorful costumes",
      isTop10: false,
      slug: "cultural-experiences",
      category: "Cultural Experiences",
    },
    {
      id: 8,
      title: "Urban Exploration",
      description: "Discover extraordinary urban exploration curated just for you",
      image: "/images/urban-exploration.jpg",
      alt: "Cityscape view of a modern metropolis",
      isTop10: false,
      slug: "urban-exploration",
      category: "Urban Exploration",
    },
  ]
  