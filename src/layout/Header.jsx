import { GiHamburgerMenu as BurgerIcon } from "react-icons/gi"
import { BsCart3 as ShopCart } from "react-icons/bs"
import Logo from "/images/shared/desktop/logo.svg"
import { Link, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import Cart from "../components/Cart"
import getContext from "../Context"
import { motion, AnimatePresence } from "framer-motion"



export default function Header() {
    const { $header, cart, cartLength } = getContext()
    const [navWidth, setNavWidth] = useState(0)
    const location = useLocation()
    const $nav = useRef(null)
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenNav, setIsOpenNav] = useState(false);
    const currentPath = location.pathname;
    const currentWidth = window.screen.width

    useEffect(() => {
        setNavWidth($nav.current.offsetWidth)
    })

    return (
        <header className="header" ref={$header}>
            {
                currentWidth <= 892 ? <BurgerIcon onClick={() => setIsOpenNav(!isOpenNav)} /> : null
            }
            <Link to="/" className="header__picture">
                <img src={Logo} alt="Logo icon" className="header__image" />
            </Link>
            
            <AnimatePresence>
                {
                    currentWidth <= 892 && isOpenNav
                        ? <motion.div 
                        className="header__bg-nav" 
                        onClick={() => setIsOpenNav(false)}
                        animate={{ opacity: [0,1]}}
                        transition={{ duration: .2}}
                        exit={{ opacity: [1,0]}}>
                        </motion.div>
                        : null
                }
        </AnimatePresence>

            <motion.nav className="header__nav nav"
                animate={
                    currentWidth <= 892
                        ? isOpenNav
                            ? {
                                x: 0
                            }
                            : { x: navWidth }
                        :
                        {}}
                transition={{
                    duration: .4
                }}
                ref={$nav}
            >
                <ul className="nav__list">
                    {
                        links.map(({ link, id }) => (
                            <li key={id}>
                                <Link
                                    to={link}
                                    className={`nav__link ${currentPath === link ? "nav__link--active" : ""}`}>
                                    {id}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </motion.nav>

            <button onClick={() => setIsOpen(!isOpen)} className={`header__shop-cart ${isOpen && "header__shop-cart--active"}`}>
                <ShopCart />
                <AnimatePresence>

                    {
                        cart.length > 0 && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: .3 }}
                                exit={{ opacity: 0 }}
                                className="header__amount">{cartLength}</motion.span>
                        )
                    }
                </AnimatePresence>
            </button>

            <Cart isOpen={isOpen} setIsOpen={setIsOpen} />
        </header>

    )
}

const links = [
    {
        link: "/",
        id: "home"
    },
    {
        link: "/headphones",
        id: "headphones"
    },
    {
        link: "/speakers",
        id: "speakers"
    },
    {
        link: "/earphones",
        id: "earphones"
    },
]