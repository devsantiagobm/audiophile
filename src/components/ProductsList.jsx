import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import animateValues from "../data/animationValues"

export default function ProductsList({ products }) {
    const reversedProducts = products.map((item, i, arr) => arr[arr.length - 1 - i])

    return (
        <div className="products__list">
            {
                reversedProducts.map(product => {
                    const id = product.id;
                    return (
                        <Product product={product} key={id} />
                    )
                })
            }
        </div>
    )
}


function Product({ product }) {
    const { image, name, description, category, shortName } = product;
    const currentImage = image.desktop
    const { initial, animate, transition} = animateValues

    function goUp(){
       
        setTimeout(() => {
            window.scroll( {
                top: 0,
                left:0,
                behavior: "smooth"
            })
        }, 200);
    }

    return (
        <div className="product">
            <motion.picture className="product__image" initial={initial}
                whileInView={animate}
                transition={transition}
                viewport={{ once: true }}>
                <img src={currentImage} alt="Product image" />
            </motion.picture>
            <motion.div className="product__information" initial={initial}
                whileInView={animate}
                transition={transition}
                viewport={{ once: true }}>
                <span className="product__new">
                    {product.new && "new product"}
                </span>
                <span className="product__name">
                    {name}
                </span>
                <p className="product__paragraph">
                    {description}
                </p>

                <Link to={`/${category}/${shortName}`} className="product__button" onClick={goUp}>see product</Link>

            </motion.div>
        </div>
    )
}