
import Hero from '../components/layout/home/Hero.js';
import TrustBar from '../components/layout/home/TrustBar.js';
import Categories from '../components/layout/home/Categories.js';
import Banner from '../components/layout/home/Banner.js';

const Home = () => {
    return (
        <div>
            <Hero />
            <TrustBar />
            <Categories />
            <Banner />
        </div>
    );
}

export default Home;