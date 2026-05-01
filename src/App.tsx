import './App.css';
import MainLayout from '@/components/layouts/MainLayout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Product from '@/components/sections/Product';
import Service from '@/components/sections/Services';

function App() {
    return (
        <>
            <MainLayout>
                <Hero />
                <About />
                <Product />
                <Service />
            </MainLayout>
        </>
    )
}

export default App
