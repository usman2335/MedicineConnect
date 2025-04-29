import ServicesSection from "../Components/ServicesSection";
import Navbar from "../Components/navbar";
import HomePageHero from "../Components/HomepageHero";
import DoctorsSection from "../Components/DoctorsSection";
import AboutUs from "../Components/Aboutus";
import Appointment from "../Components/MakeAppointment";
export function LandingPage() {
  return (
    <>
      <HomePageHero />
      <ServicesSection />
      <DoctorsSection />
      <Appointment />
      <AboutUs />
      {/* other sections */}
    </>
  );
}
