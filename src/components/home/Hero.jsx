import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import animateValues from "../../data/animationValues"
import useSetScreenWidth from "../../hooks/useSetScreenWidth"

export default function Hero() {
    const { initial, animate, transition } = animateValues
    return (
        <motion.div className="hero">
            <motion.div
                initial={initial}
                animate={animate}
                transition={transition}
                className="hero__column"
            >
                <div className="hero__subtitle">new product</div>
                <h1 className="hero__title">
                    xx99 mark ii headphones
                </h1>
                <p className="hero__paragraph">
                    Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
                </p>

                <Link className="hero__button" to="/headphones/XX99%20MK%20II">
                    see product
                </Link>

            </motion.div>

            <motion.picture
                initial={initial}
                animate={animate}
                transition={transition}

                className="hero__picture">
                <img src={`images/home/tablet/image-hero.jpg`} alt="hearphones xx99 mark ii headphones image" className="hero__image" />

            </motion.picture>

        </motion.div>
    )
}
