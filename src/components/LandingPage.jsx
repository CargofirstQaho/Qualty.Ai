import Header from "./Header";
import Hero from "./Hero";
import Services from "./Services";
import Contact from "./Contact";
import Footer from "./Footer";
import About from "./About";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header/>
      <Hero />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;