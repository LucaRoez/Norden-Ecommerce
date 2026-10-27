import { useState } from "react";
import {
  Menu,
  Search,
  UserRound,
  ShoppingCart,
  Zap
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import categories from "@/data/categories-navbar.json";
const ALL_CATEGORIES = ["Todos los productos", ...categories];

export default function Navbar() {
    const [search, setSearch] = useState("");

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const query = search.trim();
        if (!query) return;

        // futura implementación el buscador
        console.log("Buscar:", query);
    }

    return (
        <header className="w-full bg-background text-primary-dark">
            <div className="border-b border-border-soft">
                <div className="mx-auto flex items-center gap-4 pl-4 pr-6 py-4 lg:gap-8 lg:pr-8 lg:pl-6">
                    {/* Menú Mobile */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger>
                                <Button
                                    size="icon"
                                    className="shrink-0 text-secondary hover:bg-surface/20 hover:text-primary lg:hidden size-10"
                                    aria-label="Abrir menú"
                                >
                                    <Menu className="size-5" />
                                </Button>
                            </SheetTrigger>

                            <SheetContent
                                side="left"
                                className="bg-primary text-surface"
                            >
                                <SheetHeader>
                                    <SheetTitle className="text-left text-xl font-bold tracking-widest text-secondary">
                                        NORDEN
                                    </SheetTitle>
                                </SheetHeader>

                                <nav className="mt-6 flex flex-col">
                                    {categories.map((category) => (
                                        <a
                                            key={category}
                                            href="#productos"
                                            className="border-b border-surface/10 px-2 py-4 text-sm transition-colors hover:text-secondary"
                                        >
                                            {category}
                                        </a>
                                    ))}

                                    <a
                                    href="#cuenta"
                                    className="px-2 py-4 text-sm hover:text-secondary"
                                    >
                                        Mi cuenta
                                    </a>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <a
                        href="/"
                        className="flex shrink-0 items-center gap-2"
                        aria-label="Norden, página principal"
                    >
                        <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-secondary">
                            <Zap className="size-6" strokeWidth={2.5} />
                        </span>

                        <span className="text-xl font-bold tracking-widest sm:text-2xl">
                            NORDEN
                        </span>
                    </a>

                    {/* Buscador Desktop */}
                    <form
                        onSubmit={handleSearch}
                        role="search"
                        className="hidden max-w-4xl min-w-0 flex-1 lg:block"
                    >
                        <div className="relative">
                            <Input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Buscar productos, marcas..."
                                aria-label="Buscar productos"
                                className="border-border bg-surface/10 pr-12 text-text placeholder:text-text-muted/70 focus-visible:border-border focus-visible:ring-focus/30"
                            />

                            <Button
                                type="submit"
                                variant="ghost"
                                size="icon"
                                aria-label="Buscar"
                                className="absolute right-1 top-1/2 -translate-y-1/2 text-text-subtle hover:bg-surface/20 hover:primary-hover"
                            >
                                <Search className="size-5" />
                            </Button>
                        </div>
                    </form>

                    {/* Botones de acción */}
                    <div className="ml-auto flex shrink-0 items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Mi cuenta"
                            className="hidden text-secondary hover:bg-surface/20 hover:button-primary-hover sm:inline-flex"
                        >
                            <UserRound className="size-5" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Carrito de compras"
                            className="relative text-secondary hover:bg-surface/20 hover:button-primary-hover"
                        >
                            <ShoppingCart className="size-5" />
                            <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-secondary">
                                0
                            </span>
                        </Button>
                    </div>
                </div>

                {/* Buscador Mobile */}
                <form onSubmit={handleSearch} role="search" className="border-t border-border-soft px-4 lg:hidden">
                    <div className="relative">
                        <Input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Buscar productos, marcas..."
                            aria-label="Buscar productos"
                            className="h-11 border-border-soft/50 bg-surface/10 pr-12 text-text placeholder:text-text-muted/70 focus-visible:border-border focus-visible:ring-focus/30"
                        />

                        <Button
                            type="submit"
                            variant="ghost"
                            size="icon"
                            aria-label="Buscar"
                            className="absolute right-1 top-1/2 -translate-y-1/2 text-text-muted hover:bg-surface/20 hover:text-text-secondary"
                        >
                            <Search className="size-5" />
                        </Button>
                    </div>
                </form>
            </div>

            {/* Menú Desktop */}
            <nav
                aria-label="Categorías de productos"
                className="hidden border-b border-primary/10 lg:block"
            >
                <div className="mx-auto flex max-w-7xl items-center justify-evenly gap-8 overflow-x-auto px-6 max-[1212px]:px-14">
                    {ALL_CATEGORIES.map((category) => (
                        <a
                            key={category}
                            href="#productos"
                            className="py-4 text-sm transition-colors hover:text-secondary"
                        >
                            {category}
                        </a>
                    ))}
                </div>
            </nav>
        </header>
    );
}
