import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import { HashRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { TopNavigationBar } from "./components/header/topNavigationBar";
import Home from "./pages/home";
import Product from "./pages/product";
import Basket from "./pages/basket";
import TopButton from "./components/topButton/topButton";
import CategoryBar from "./components/category/categoryBar";
import { OrderComplete } from "./components/cart/orderComplete";
import CategoryCpu from './components/category/CategoryCpu';
import ShowMySpec from "./components/eventBanner/ShowMySpec";
import InsertSpec from "./components/eventBanner/insertSpec";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const convertPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.scrollTo(0, scrollY);
  }, [scrollY]);

  return (
    <HashRouter>
      <TopNavigationBar cart={cart} />
      {/* <CategoryBar></CategoryBar> */}
      <TopButton></TopButton>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              convertPrice={convertPrice}
              products={products}
              setProducts={setProducts}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <Product
              convertPrice={convertPrice}
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Basket cart={cart} setCart={setCart} convertPrice={convertPrice} />
          }
        />
        <Route
          path="/cart/orderComplete"
          element={
            <OrderComplete />
          }
        />
        {/* <Route
          path="/category/:n"
          element={
            <CategoryMove
              convertPrice={convertPrice}
              products={products}
              setProducts={setProducts}
            />

          }
        /> */}
        <Route
          path="/category/c1"
          element={
            <CategoryCpu
              convertPrice={convertPrice}
              products={products}
              setProducts={setProducts}
            />
          }
        />
        <Route
          path="/showMySpec"
          element={
            <ShowMySpec />
          }
        />
        <Route
          path="/insertSpec"
          element={
            <InsertSpec />
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;