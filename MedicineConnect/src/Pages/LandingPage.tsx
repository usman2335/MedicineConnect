import ServicesSection from "../Components/ServicesSection";
import Navbar from "../Components/navbar";
import HomePageHero from "../Components/HomepageHero";
import DoctorsSection from "../Components/DoctorsSection";
import AboutUs from "../Components/Aboutus";
export function LandingPage() {
  return (
    <>
      <Navbar />
      <HomePageHero />
      <ServicesSection />
      <DoctorsSection />
      <AboutUs />
      {/* other sections */}
    </>
  );
}
