import './App.css';
import MainLayout from '@/components/layouts/MainLayout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';

function App() {
    return (
        <>
            <MainLayout>
                <Hero />
                <About />
            </MainLayout>
        </>
    )
}

export default App
