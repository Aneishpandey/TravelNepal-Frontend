"use client"

import { match } from "assert"
import { useEffect, useState } from "react"


// this is custom hook . it is called useMediaQuery and it takes a query (string) like "max-width" and returns a boolean(true or false)
export function useMediaQuery(query : string):boolean {


    // matches is a boolean value
    // true : screen size matches the query . and flase : it doesnt match . 
    const [matches, setMatches] =useState(false) //we make a small box to store the answer. at first we assume false it doesnt match. 

    //  useEffect runs after the component is shown to the user . 
    // it depends on below query(line no 23 cont media) . so it runs when query changes . 



    useEffect(() => {   // when the page loads run this code

        // Next js first renders on the server . if we are on the server do nothing . only continue if we are on the browser. 
        if (typeof window === "undefined"){
            return
        }
          

        // this uses browser api called matchmedia
        // tells you if the query matches now . 
        // listen to changes when the screen size changes. 
        const media = window.matchMedia(query)   // hey browser . please check this media query rule for me . 


        // if the current size matches . matches: true if not matches:false
        setMatches(media.matches) 
          

        // we create a function called listener . it takes one input called evernt . type of event is mediaqueryevent. 
        
        const listener = (event: MediaQueryListEvent) => { // this will run whenever screesizes changes. 
            setMatches(event.matches)   // it will update the matches value with new result.
        }

        media.addEventListener("change",listener) //please watch any screen size change and run listener when it happens. 
 

        // when the user leaves this page remove the listener. 
        return () => {
            media.removeEventListener("change",listener)
        }
    },[query]) //we only run this setup again if the query changes. if the query stays the same no need to run. 


     return matches // give back to current state to whoever is using this hook.
}