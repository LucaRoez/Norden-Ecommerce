import { Button } from "../../ui/button";
import type { Category } from "@/interfaces/category";
import { getAsset } from "@/utils/assets";

interface HeroProps {
  category: Category;
};

const Hero = ({ category }: HeroProps) => {
    const imageUrl = getAsset(category.bannerImg);

	return (
		<section id="hero"
            style={{ backgroundImage: `url("${imageUrl}")` }}
			className="h-110 py-5 flex items-center px-10 bg-cover bg-center text-text"
		>
			<div className="flex flex-col justify-center items-center gap-4">
				<h1 className="text-3xl font-bold text-4xl [text-shadow:0px_0px_4px_#E5DED3]">{category.name}</h1>
				<p className="text-lg mt-4 text-base lg:text-2xl [text-shadow:0px_0px_2px_#E5DED3]">
					{category.description}
				</p>
                <div className="w-full flex items-start xs:pl-5 sm:pl-25">
                    <Button className="mt-8 p-5 text-base lg:text-lg lg:p-6 rounded-sm bg-surface text-primary
                        hover:bg-primary hover:text-surface active:ring-2 active:ring-focus/50 active:ring-offset-0
                    ">
                        Volver Atrás
                    </Button>
                </div>
			</div>
		</section>
	)
};

export default Hero;