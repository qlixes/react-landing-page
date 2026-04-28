import './App.css';
import Navbar from '@/components/common/Navbar';
import Hero from '@/components/sections/Hero';

function App() {
    return (
        <>
            <div className="min-h-screen bg-gray-50">
                {/* Memasang Navbar */}
                <Navbar />

                <Hero />
            </div>
        </>
    )
}

export default App
