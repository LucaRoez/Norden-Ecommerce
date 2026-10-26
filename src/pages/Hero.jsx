
import { Button } from "../components/ui/button";

export const Hero = () => {
  return (
    <section id="hero" className="h-500">
      <div className="">
        <h1 className="text-4xl font-bold">Diseño que mejora tu espacio</h1>
        <p className="text-lg mt-4">
          Productos funcionales, estéticos y duraderos para tu hogar y oficina.
        </p>
        <Button className="mt-6">
          Explorar productos
        </Button>
      </div>
    </section>
  )
};

export default Hero;