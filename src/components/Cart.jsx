import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import getContext from "../Context"
import EmptyCartIcon from "/images/shared/CartEmpty.svg"
import { AiOutlinePlus as AddIcon } from "react-icons/ai"
import { BiMinus as MinusIcon } from "react-icons/bi"
import useFormatter from "../hooks/useFormatter"
import { Link } from "react-router-dom"

export default function Cart({ isOpen, setIsOpen }) {
    const { cart, $header } = getContext()
    const $cartBox = useRef(null);

    useEffect(() => {
        const headerHeight = $header.current.scrollHeight;
        $cartBox.current.style.setProperty("--y", `${headerHeight + 24}px`)
    })


    return (
        <motion.div
            className={`cart ${isOpen && "cart__open"}`}
            animate={
                isOpen ? { opacity: 1 } : { opacity: 0 }
            }
            transition={{ duration: .2 }}>
            <div className="cart__bg" onClick={() => setIsOpen(false)}></div>

            <motion.div
                className="cart__box"
                ref={$cartBox}
                animate={
                    isOpen ?
                        {
                            opacity: [0, 1],
                            y: [16, 0]
                        } : {}
                }
                transition={{ duration: .5 }}
            >
                {
                    cart.length > 0
                        ? <CartWithProducts setIsOpen={ setIsOpen}/>
                        : <EmptyCart />

                }

            </motion.div>
        </motion.div>
    )
}

function EmptyCart() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="cart__empty"
        >
            <picture className="cart__picture">
                <img src={EmptyCartIcon} alt="Empty cart icon" className="cart__icon" />
            </picture>
            <span className="cart__empty-title">Your cart is empty</span>
            <span className="cart__empty-paragraph">Looks like you have not added anything to your cart. Go ahead and explore top products</span>
        </motion.div>
    )
}

function CartWithProducts({ setIsOpen}) {
    const { cart, cartLength, setCart, total } = getContext()

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>

            <div className="cart__title">
                <span className="cart__length">
                    cart ({cartLength})
                </span>
                <button className="cart__remove-all" onClick={() => setCart([])}>
                    Remove All
                </button>
            </div>
            <div className="cart__list">
                {
                    cart.map(product => {
                        const { id } = product
                        return <ProductItem key={id} product={product} />
                    })
                }
            </div>

            <div className="cart__total">
                total
                <div className="cart__total-amount">
                    {useFormatter(total)}
                </div>
            </div>

            <Link to="/checkout" className="cart__link" onClick={() => setIsOpen(false)}>
            checkout</Link>


        </motion.div>
    )
}

function ProductItem({ product }) {
    const { cartImage, id, quantity, shortName, price } = product
    const { cart, setCart } = getContext()

    function handleChangeQuantity(e){
        const currentId = e.currentTarget.dataset.id;
        const elementToChange = cart.find(({id}) => id == currentId)
        const currentQuantity = elementToChange.quantity
        const addButton = e.currentTarget.dataset.add === "true"
        const indexInCart = cart.findIndex(({id}) => id === elementToChange.id)
        const reserveArr = [...cart]
        const newQuantity = addButton ? currentQuantity + 1 :  currentQuantity - 1

        if(newQuantity === 0){
            const filteredCart = cart.filter(({id}) => currentId != id)
            setCart(filteredCart)
            return;
        }

        elementToChange.quantity = newQuantity;
        elementToChange.totalPrice = elementToChange.price * newQuantity
        reserveArr[indexInCart] = elementToChange

        setCart(reserveArr)
    }

    return (
        <div className="cart__item">
            <div className="cart__information">
                <picture className="cart__picture">
                    <img src={cartImage} alt={`${shortName} name`} className="cart__image" />
                </picture>
                <div className="cart__data">
                    <span className="cart__name">{shortName}</span>
                    <span className="cart__total-price">{useFormatter(price)}</span>
                </div>
            </div>

            <div className="cart__actions">
                <div className="cart__buttons">
                    <button className='cart__button' onClick={ handleChangeQuantity} data-id={id} data-add="false">
                        <MinusIcon />
                    </button>
                    <span className="cart__quantity">
                        {quantity}
                    </span>
                    <button className='cart__button' onClick={ handleChangeQuantity} data-id={id} data-add="true">
                        <AddIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}