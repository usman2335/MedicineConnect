import ServicesSection from "../Components/ServicesSection";
import HomePageHero from "../Components/HomepageHero";
import DoctorsSection from "../Components/DoctorsSection";
import AboutUs from "../Components/Aboutus";
import Appointment from "../Components/MakeAppointment";
const LandingPage = () => {
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
};

export default LandingPage;
