import RouterProvider from './Router';
import { Link } from "react-router-dom"
import Header from './layout/Header';
import Footer from './layout/Footer';

function App() {

    return (
        <div className="App">
            <Header/>
            <RouterProvider/>
            <Footer/>
        </div>
    )
}


export default App
