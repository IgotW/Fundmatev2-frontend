import Navbar from "../components/home/NavBar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import CTA from "../components/home/CTA";
import Footer from "../components/home/Footer";
import WhyFundMate from "../components/home/WhyFundMate";

const Home = () => {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <WhyFundMate />
      <CTA />
      <Footer />
    </main>
  );
};

export default Home;
