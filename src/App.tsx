import { Routes, Route } from "react-router";

import NavBar from "@/components/layout/NavBar";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <>
      <NavBar />
      <main id="main-body" className="bg-surface">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  )
}

export default App
