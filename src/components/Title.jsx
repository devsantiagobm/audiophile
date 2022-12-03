import { motion } from "framer-motion"
import animateValues from "../data/animationValues"

export default function Title({ name }) {
    const { initial, animate, transition } = animateValues

    return (
        <div className='title'>
            <motion.h1 className="title__text"
                initial={initial}
                whileInView={animate}
                transition={transition}

                viewport={{ once: true }}>
                {name}
            </motion.h1>
        </div>
    )
}