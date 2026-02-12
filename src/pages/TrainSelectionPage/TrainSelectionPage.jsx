import Banner from "../../components/Banner/Banner";
import Header from "../../components/Header/Header";
import SearchForm from "../../components/SearchForm/SearchForm";
import Footer from "../../components/Footer/Footer";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import WidgetFilter from "../../components/WidgetFilter/WidgetFilter";
import "./TrainSelectionPage.css";
import TrainSelection from "../../components/TrainSelection/TrainSelection";
import bannerImg from "../../assets/banners/banner2.png";

const TrainSelectionPage = () => {
  return (
    <div className="selection">
      <Header />
      <Banner name="trains" link={bannerImg}>
        <SearchForm name="trains" />
      </Banner>
      <ProgressBar name="trains" step1="current-step" />
      <main className="selection__main">
        <WidgetFilter />
        <section className="selection__section">
          <div className="selection__trains">
            <TrainSelection />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TrainSelectionPage;
