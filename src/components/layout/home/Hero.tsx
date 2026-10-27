import { Button } from "../../ui/button";

const Hero = () => {
	return (
		<section id="hero"
			className={`h-110 bg-[url('/src/assets/home/norden-hero.jpg')] bg-cover bg-[position:50%_54%] text-text relative`}
		>
			<div className="absolute top-15 px-4 md:px-0 right-0 min-[592px]:right-[1%] min-[600px]:right-[2%] min-[656px]:right-[4%]
				min-[718px]:right-[8%] min-[814px]:right-[5%] min-[814px]:right-[14%] min-[888px]:right-[18%] min-[972px]:right-[24%]
				min-[1024px]:right-[9%] min-[1106px]:right-[15%] min-[1216px]:right-[21%] min-[1316px]:right-[26%] min-[1464px]:right-[32%]
			">
				<h1 className="text-3xl font-bold text-4xl">Diseño que mejora tu espacio</h1>
				<p className="text-lg mt-4 text-base lg:text-2xl">
					Productos funcionales, estéticos y duraderos para tu hogar y oficina.
				</p>
				<Button className="absolute left-5 min-[656px]:left-0 mt-8 p-6 text-base lg:text-lg rounded-sm bg-surface text-primary
					hover:bg-primary hover:text-surface active:ring-2 active:ring-focus/90 active:ring-offset-0
				">
					Ver Colección
				</Button>
			</div>
		</section>
	)
};

export default Hero;