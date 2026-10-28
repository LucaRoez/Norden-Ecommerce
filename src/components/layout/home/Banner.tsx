import weeklyBanners from "@/data/promo-banner.json";

const Banner = () => {
    const day = new Date().getDay();
    const banner = weeklyBanners[day];
    return (
        <section
            className="group relative flex h-[30rem] w-full items-center bg-cover bg-center"
            style={{ backgroundImage: `url("${banner.src}")` }}
        >
            <div className="pointer-events-none absolute inset-0 bg-transparent transition-colors duration-300 group-hover:bg-primary/50" />

            <div className="relative px-8 text-text transition-colors duration-300 group-hover:text-surface md:px-16">
                <h1 className="text-4xl font-bold md:text-6xl">
                {banner.title}
                </h1>

                <p className="mt-4 text-lg">
                {banner.subtitle}
                </p>

                <a
                    href={banner.buttonLink}
                    className="mt-6 inline-block rounded-sm bg-primary px-6 py-3 text-surface transition-colors duration-300 hover:bg-surface hover:text-primary active:ring-3 active:ring-focus/60 active:ring-offset-0"
                >
                    {banner.buttonText}
                </a>
            </div>
        </section>
    );
};

export default Banner;