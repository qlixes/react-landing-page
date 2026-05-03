import './App.css';
import MainLayout from '@/components/layouts/MainLayout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Product from '@/components/sections/Product';
import Service from '@/components/sections/Services';
import Market from '@/components/sections/Market';
import Contact from '@/components/sections/Contact';

function App() {
    return (
        <>
            <MainLayout>
                <Hero />
                <About />
                <Product />
                <Service />
                <Market />
                <Contact />
            </MainLayout>
        </>
    )
}

export default App
