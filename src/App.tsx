import { Routes, Route } from "react-router";

import NavBar from "@/components/layout/NavBar";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import NotFound from "@/pages/NotFound";
import Cart from "@/pages/Cart";

function App() {
  return (
    <>
      <NavBar />
      <main id="main-body" className="bg-surface">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/carrito-de-compra" element={<Cart />} />
          <Route path="/carrito-de-compras" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  )
}

export default App
