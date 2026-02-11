import Header from "../../components/Header/Header.jsx";
import Banner from "../../components/Banner/Banner.jsx";
import SearchForm from "../../components/SearchForm/SearchForm.jsx";
import About from "../../components/About/About.jsx";
import HowItWork from "../../components/HowItWorks/HowItWorks.jsx";
import Feedback from "../../components/Feedback/Feedback.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import bannerImg from "../../assets/banners/banner.png";

import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <Banner name="home" link={bannerImg}>
        <SearchForm name="home-page" />
      </Banner>
      <main className="home-page__content">
        <About />
        <HowItWork />
        <Feedback />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
