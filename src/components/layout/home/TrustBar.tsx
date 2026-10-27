

const TrustBar = () => {
    const trustBar = {
        "Envíos a todo el país": "Recibí tus productos rápido y seguro",
        "Compra protegida": "Tus datos y pagos están seguros",
        "Devoluciones fáciles": "Comprá con tranquilidad",
        "Productos sustentables": "Pensados para el futuro"
    };
    return (
        <section id="trust-bar" className="
            bg-background text-text py-6 px-4 text-center flex max-[998px]:grid max-[998px]:grid-cols-2 justify-between lg:justify-evenly
        ">
            {
                Object.entries(trustBar).map(([title, description]) => (
                    <div key={title} className='
                        flex flex-col items-center justify-center gap-1 lg:gap-4
                        border-r-3 border-border/30 last:border-r-0 py-4
                        max-[1084px]:border-r-0 max-[1084px]:pr-0 min-[1084px]:pr-6 min-[1100px]:pr-7
                        min-[1158px]:pr-8 min-[1188px]:pr-9 min-[1240px]:pr-10
                        min-[1267px]:pr-11 min-[1308px]:pr-12 min-[1348px]:pr-13 min-[1392px]:pr-14
                        min-[1416px]:pr-15 min-[1439px]:pr-16 min-[1474px]:pr-17 min-[1512px]:pr-18
                    '>
                        <h3 className="text-lg font-bold">{title}</h3>
                        <p className="text-sm">{description}</p>
                    </div>
                ))
            }
        </section>
    );
}

export default TrustBar;