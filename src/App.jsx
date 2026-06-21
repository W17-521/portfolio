import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Strengths from './components/Strengths';
import ContactFooter from './components/ContactFooter';
import VineGrowth from './components/VineGrowth';

export default function App() {
  return (
    <>
      <Navbar />
      <VineGrowth />
      <main>
        <Hero />
        <About />
        <Projects />
        <Strengths />
        <ContactFooter />
      </main>
    </>
  );
}
