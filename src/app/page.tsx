
import DestinationSection from "@/components/destination/destination-section";
import HeroSection from "@/components/herosection/herosection";
import { DESTINATIONS } from "@/lib/destination-data";
import Image from "next/image";

export default function Home() {
  return (
  
   <main>
    <HeroSection />
    <DestinationSection destinations={DESTINATIONS}/>
   </main>
  );
}
