import useSetScreenWidth from "../../hooks/useSetScreenWidth"
import { Link } from "react-router-dom"
import PreFooter from "../PreFooter"
import List from "../List"
import { motion } from "framer-motion"
import animateValues from "../../data/animationValues"

export default function Main() {
    return (
        <div className='main'>
            <List />
            <Content />
            <PreFooter className="home-main__prefooter" />
        </div>
    )
}

function Content() {
    const { initial, animate, transition } = animateValues
    const currentDevice = useSetScreenWidth()
    return (
        <div className="content">
            <motion.div className="content__card"
                initial={initial}
                whileInView={animate}
                transition={transition}
                viewport={{ once: true }}>
                <div className="content__image">
                    <picture className="content__picture">
                        <img src={`images/home/${currentDevice}/image-speaker-zx9.png`} alt="Speaker image" className="content__img" />
                    </picture>
                </div>

                <img src="images/home/desktop/pattern-circles.svg" alt="Pattern Circles" className="content__circles" />

                <div className="content__box content__box--main">
                    <span className="content__title">
                        zx9 speaker
                    </span>

                    <span className="content__paragraph">
                        Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                    </span>

                    <Link to="/speakers/ZX9" className="content__button">see product</Link>
                </div>
            </motion.div>

            <motion.div className="content__card" initial={initial}
                whileInView={animate}
                transition={transition}
                viewport={{ once: true }}>
                <img src={`images/home/${currentDevice}/image-speaker-zx7.jpg`} alt="Speaker image" className="content__background" />
                <div className="content__box">
                    <span className="content__title">zx7 speaker</span>
                    <Link to="/speakers/ZX7" className="content__button">see product</Link>
                </div>
            </motion.div>

            <motion.div className="content__card" initial={initial}
                whileInView={animate}
                transition={transition}
                viewport={{ once: true }}>
                <div className="content__picture">
                    <img src={`images/home/${useSetScreenWidth()}/image-earphones-yx1.jpg`} alt="yx1 Earphone image" />
                </div>
                <div className="content__box">
                    <span className="content__title">yx1 earphones</span>
                    <Link to="/speakers/YX1" className="content__button">see product</Link>
                </div>
            </motion.div>




        </div>
    )
}
