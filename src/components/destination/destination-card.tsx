"use client"

import type { Destination } from "@/lib/destination-data"
import Image from "next/image"
import { useState } from "react"
import { ChevronRight, Crown } from "lucide-react"
import styles from "./destination.module.css"
import Link from "next/link"

interface DestinationCardProps {destination : Destination}
// interface= we are creating a rule or 
// DestinationCard = if you want to use something called DestinationCard,you need to give it some information.or "I made a list of what the DestinationCard needs. 
// destination =  that infomation should include one thing called destination. or  It needs one item: a destination
// Destination = it must follow a certain structure called Destination or and this destination has to be in a certain format (like  name,  etc.—whatever is defined in Destination)."

export default function DestinationCard({destination} : DestinationCardProps) {


    const [imageLoaded, setImageLoaded] = useState(false)  // lets keep the track of whether the image is loadedyet. for now it is not loaded. 
    const [imageError, setImageError] = useState(false)   // also keep track of whether image has problem in loading . for now no problem. 

    const handleImageLoaded = () => {  //function when the image successfully loads when we call this and it says the image is done loading
        setImageLoaded(true)
    }

    const handleImageError = () => { //function when something goes wrong with image . when image fails to load. 
        setImageError(true)
        setImageLoaded(true)  //remove loading spinner
    }


    return (
        <div className={styles["destination-card"]}>
            <div className={styles["destination-image-container"]}>
                <div className={styles["destination-image-placeholder"]}></div>
                <Image src={destination.image || "/assets/images/"}
                alt={destination.alt}
                width={400}
                height={300}
                className={`${styles["destination-image"]} ${imageLoaded ? styles["destination-image-loaded"] : ""}`}
                onLoad={handleImageLoaded}
                onError={handleImageError}
                loading="lazy"
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
                quality={80}
                />

                {!imageLoaded && !imageError &&(
                    <div className={styles["destination-image-loading"]}>
                        <div className={styles["destination-image-spinner"]}></div>
                    </div>
                )}
              {/* if i need top 10 */}
            </div>
                <div className={styles["destination-content"]}>
                    <h3 className={styles["destination-title"]}>{destination.title}</h3>
                    <p className={styles["destination-description"]}>{destination.description}</p>
                    <Link href={`/destinations/${destination.slug}`} className={styles["destination-link"]}>
                    View Details <ChevronRight className={styles["destination-link-icon"]} aria-hidden="true" />
                    </Link>

                </div>

        </div>
    )
}