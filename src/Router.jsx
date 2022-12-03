import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Headphones from "./pages/Headphones"
import Speakers from "./pages/Speakers"
import Earphones from "./pages/Earphones"
import Checkout from "./pages/Checkout"
import ProductPage from "./pages/ProductPage"

export default function RouterProvider() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/headphones" >
                <Route index element={<Headphones />} />
                <Route path=":name" element={<ProductPage/>} />
            </Route>
            <Route path="/speakers">
                <Route index element={<Speakers />} />
                <Route path=":name" element={<ProductPage/>} />
            </Route>
            <Route path="/earphones">
                <Route index element={<Earphones />} />
                <Route path=":name" element={<ProductPage/>} />
            </Route>
            <Route path="/checkout" element={<Checkout />} />
        </Routes>
    )
}