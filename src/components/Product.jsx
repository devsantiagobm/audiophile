import { useState, useEffect, useRef } from "react";
import { AiOutlinePlus as AddIcon } from "react-icons/ai"
import { BiMinus as MinusIcon } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"
import animateValues from "../data/animationValues";
import getContext from "../Context";
import { BsCheck2 as CheckIcon } from "react-icons/bs"
import { BiArrowBack as BackIcon } from "react-icons/bi"
import useFormatter from "../hooks/useFormatter"
import useSetScreenWidth from "../hooks/useSetScreenWidth"

export default function Product({ product }) {
    const { name, image, description, features, price, cartImage, gallery, includedItems, others, shortName, id } = product
    const { initial, animate, transition } = animateValues
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false)
    const { cart, setCart, $header } = getContext()
    const priceFormatted = useFormatter(price)
    const $goBack = useRef(null)
    const navigate = useNavigate()
    const currentDevice = useSetScreenWidth()



    function handleAdd() {
        setQuantity(1)
        deleteAdvice()
        setAdded(true)
        const currentProduct = {
            cartImage,
            quantity,
            shortName,
            id,
            price
        }

        const productInCart = cart.find(({ id }) => id === currentProduct.id);

        if (Boolean(productInCart)) {
            addExistentProduct(currentProduct, productInCart)

            return;
        }

        currentProduct.totalPrice = quantity * price;
        setCart([...cart, currentProduct])

    }

    function addExistentProduct(currentProduct, productInCart) {
        const index = cart.findIndex(({ id }) => id === productInCart.id)
        const arrOfReserve = [...cart];

        currentProduct.quantity += productInCart.quantity;
        currentProduct.totalPrice = currentProduct.quantity * price;

        arrOfReserve[index] = currentProduct

        setCart(arrOfReserve)
    }

    function deleteAdvice() {
        setTimeout(() => setAdded(false), 2000);
    }

    useEffect(() => {
        const headerHeight = $header.current.scrollHeight
        $goBack.current.style.setProperty("--y", `${headerHeight + 24}px`)
    })

    return (
        <div className='page-product'>



            <motion.span
                onClick={() => navigate(-1)}
                className="page-product__back" ref={$goBack} initial={{ x: 0 }} whileHover={{ x: -4 }} transition={{ duration: .2 }}>
                <BackIcon />

            </motion.span>
            <AnimatePresence>

                {
                    added && (
                        <motion.div
                            className="page-product__advice"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: .4 }}>
                            <CheckIcon className="page-product__check" />
                            <span className="page-product__bold">'{name}'</span> added to cart
                        </motion.div>)
                }
            </AnimatePresence>
            <div className="page-product__hero">

                <motion.picture className="page-product__image" initial={initial}
                    whileInView={animate}
                    transition={transition}
                    viewport={{ once: true }}>
                    <img src={
                        window.screen.width <= 572 ? image.mobile : image.desktop } alt={`${name} image`} />
                </motion.picture>

                <motion.div className="page-product__information" initial={initial}
                    whileInView={animate}
                    transition={transition}
                    viewport={{ once: true }}>
                    <span className="page-product__new">
                        {product.new && "new product"}
                    </span>
                    <span className="page-product__name">
                        {name}
                    </span>
                    <span className="page-product__paragraph">
                        {description}
                    </span>
                    <span className="page-product__price">
                        {priceFormatted}
                    </span>

                    <div className="page-product__actions">
                        <div className="page-product__buttons">
                            <button className='page-product__button' onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                                <MinusIcon />
                            </button>
                            <span className="page-product__quantity">
                                {quantity}
                            </span>
                            <button className='page-product__button' onClick={() => setQuantity(quantity + 1)}>
                                <AddIcon />
                            </button>
                        </div>

                        <button className="page-product__add" onClick={handleAdd}>
                            add to cart
                        </button>
                    </div>
                </motion.div>
            </div>

            <div className="page-product__extra">
                <motion.div className="page-product__features" initial={initial}
                    whileInView={animate}
                    transition={transition}
                    viewport={{ once: true }}>
                    <span className="page-product__extra-title">features</span>
                    <p className="page-product__paragraph">
                        {features}
                    </p>
                </motion.div>

                <motion.div className="page-product__in-box" initial={initial}
                    whileInView={animate}
                    transition={transition}
                    viewport={{ once: true }}>
                    <span className="page-product__extra-title">
                        in the box
                    </span>
                    <ul className="page-product__list">
                        {
                            includedItems.map(({ quantity, item }) => (
                                <li className="page-product__item" key={item}>
                                    <span className="page-product__orange">
                                        {quantity}x
                                    </span>
                                    <span className="page-product__included-item">
                                        {item}
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </motion.div>


            </div>

            <div className="page-product__gallery">
                <motion.picture className="page-product__picture" initial={initial}
                    whileInView={animate}
                    transition={transition}
                    viewport={{ once: true }}>
                    <img className="page-product__gallery-image" src={gallery.first[currentDevice]} alt="" />
                </motion.picture>
                <motion.picture className="page-product__picture" initial={initial}
                    whileInView={animate}
                    transition={transition}
                    viewport={{ once: true }}>
                    <img className="page-product__gallery-image" src={gallery.second[currentDevice]} alt="" />
                </motion.picture>
                <motion.picture className="page-product__picture" initial={initial}
                    whileInView={animate}
                    transition={transition}
                    viewport={{ once: true }}>
                    <img className="page-product__gallery-image" src={gallery.third.desktop} alt="" />
                </motion.picture>
            </div>

            <div className="page-product__others">
                <span className="page-product__extra-title">
                    you may also like
                </span>

                <motion.div className="page-product__others-list" initial={initial}
                    whileInView={animate}
                    transition={transition}
                    viewport={{ once: true }}>
                    {
                        others.map(article => {
                            const id = article.name;
                            return <Other key={id} article={article} />
                        })
                    }
                </motion.div>
            </div>
        </div>
    )
}

function Other({ article }) {
    const { image, name, slug } = article;

    function goUp() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }
    
    return (
        <div className="page-product__other">
            <picture className="page-product__picture">
                <img src={image.desktop} alt={`${name} image`} />
            </picture>
            <span className="page-product__other-name">
                {name}
            </span>
            <Link to={`../../${slug}`} className="page-product__link" onClick={goUp}>see product</Link>
        </div>
    )
}