import ProductsList from "../components/ProductsList"
import speakers from "../data/categories/speakers"
import List from "../components/List"       
import Prefooter from "../components/Prefooter" 
import Title from "../components/Title"

export default function Speakers(){
    return (
        <div className="spakers">
            <Title name="speakers"/>
            <ProductsList products={speakers}/>
            <List/>
            <Prefooter/>
        </div>
    )
}