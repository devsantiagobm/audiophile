import { createContext, useContext, useEffect, useState, useRef } from "react";
const ContextApp = createContext()

export function ContextProvider({ children }) {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    const [cartLength, setCartLength] = useState(Number(localStorage.getItem("cart-length")) || 0)
    const [total, setTotal] = useState(Number(localStorage.getItem("cart-total")) || 0)
    const $header = useRef(null);

    useEffect(() => {
        setTotal(cart.reduce((value, { totalPrice }) => value + totalPrice, 0))
        setCartLength(cart.reduce((value, { quantity }) => value + quantity, 0));

        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        localStorage.setItem("cart-length", cartLength)
    }, [cartLength])

    useEffect(() => {
        localStorage.setItem("cart-total", total)
    }, [total])

    return (
        <ContextApp.Provider value={{
            cart, setCart,
            $header,
            cartLength,
            total
        }}>
            {children}
        </ContextApp.Provider>
    )
}

export default function getContext() {
    return useContext(ContextApp);
}