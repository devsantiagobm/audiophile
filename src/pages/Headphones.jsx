import ProductsList from "../components/ProductsList"
import headphones from "../data/categories/headphones" 
import List from "../components/List"       
import Prefooter from "../components/Prefooter"       
import Title from "../components/Title"

export default function Headphones(){

    return (
        <div className="headphones">
            <Title name={"headphones"}/>
            <ProductsList products={ headphones }/>
            <List/>
            <Prefooter/>
        </div>
    )
}

