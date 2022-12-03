import { MdKeyboardArrowRight as ArrowIcon } from "react-icons/md"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import animateValues from "../data/animationValues";

export default function List() {
    const { initial, animate, transition} = animateValues

    function goUp() {

        setTimeout(() => {
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth"
            })
        }, 200);
    }
    return (

        <div className="products">
            {
                cards.map(({ img, category, link }) => (

                    <motion.div
                        initial={initial}
                        whileInView={animate}
                        transition={transition}
                        viewport={{ once: true }}
                        className="products__card" key={category}>

                        <picture className="products__picture">
                            <img src={img} alt={`${category}image `} />
                        </picture>

                        <span className="products__category"> {category}</span>

                        <Link to={link} className="products__arrow-box" onClick={goUp}>
                            shop
                            <ArrowIcon className="products__arrow" />
                        </Link>

                        <div className="products__background"></div>

                    </motion.div>
                ))
            }
        </div>
    )

}

const cards = [
    {
        img: `images/shared/desktop/image-headphones.png`,
        category: "headphones",
        link: "/headphones"
    },
    {
        img: `images/shared/desktop/image-speakers.png`,
        category: "speakers",
        link: "/speakers"
    },
    {
        img: `images/shared/desktop/image-earphones.png`,
        category: "earphones",
        link: "/earphones"
    },

]