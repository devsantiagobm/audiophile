import useSetScreenWidth from "../hooks/useSetScreenWidth"
import { motion } from "framer-motion"
import animateValues from "../data/animationValues"

export default function PreFooter() {
    const { initial, animate, transition } = animateValues
    const currentDevice = useSetScreenWidth()
    
    return (
        <motion.div className="prefooter" initial={initial}
            whileInView={animate}
            transition={transition}>
            <div className="prefooter__box">
                <div className="prefooter__title">
                    bringing you the {" "}
                    <span className="prefooter__title--orange">
                        best
                    </span>
                    {" "} audio gear
                </div>
                <div className="prefooter__paragraph">
                    Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
                </div>
            </div>
            <picture className="prefooter__picture">
                <img src={`images/shared/${currentDevice}/image-best-gear.jpg`} alt="" />
            </picture>
        </motion.div>
    )
}