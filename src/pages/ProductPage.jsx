import Product from "../components/Product"
import products from "../data/products"
import { useParams } from "react-router-dom"
import Prefooter from "../components/PreFooter"

export default function ProductPage(){
    const productName = useParams().name;
    const currentProduct = products.find(({ shortName}) =>  shortName == productName);
    

    return (
        <div>
            <Product product={currentProduct}/>
            <Prefooter/>
        </div>
    )
}