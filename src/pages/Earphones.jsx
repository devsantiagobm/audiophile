import earphones from "../data/categories/earphones"
import ProductsList from "../components/ProductsList"
import PreFooter from "../components/PreFooter";
import List from "../components/List"       
import Title from "../components/Title";


export default function Earphones(){
    return (
        <div className="earphones">
            <Title name={"earphones"}/>
            <ProductsList products={ earphones } />
            <List/>
            <PreFooter/>
        </div>
    )
}