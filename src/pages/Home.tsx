
import Hero from '../components/layout/home/Hero.tsx';
import TrustBar from '../components/layout/home/TrustBar.tsx';
import Categories from '../components/layout/home/Categories.tsx';
import Banner from '../components/layout/home/Banner.tsx';
import FeaturedProducts from '../components/layout/home/Features.tsx';

const Home = () => {
    return (
        <div>
            <Hero />
            <TrustBar />
            <Categories />
            <Banner />
            <FeaturedProducts />
        </div>
    );
};

export default Home;