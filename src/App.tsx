import './App.css';
import MainLayout from '@/components/layouts/MainLayout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Product from '@/components/sections/Product';
import Service from '@/components/sections/Services';
import Market from '@/components/sections/Market';

function App() {
    return (
        <>
            <MainLayout>
                <Hero />
                <About />
                <Product />
                <Service />
                <Market />
            </MainLayout>
        </>
    )
}

export default App
