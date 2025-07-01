import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import TutorPage from './pages/TutorPage';

import AnimatedHowItWorksStudent from './components/AnimatedHowItWorksStudent';
import OneStopSolution from './components/OneStopSolution';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <Navbar />
      {children}
    </div>
  );
}

function StudentPage() {
  return (
    <main>
      <Hero />
      <Features />
      <AnimatedHowItWorksStudent />
      <OneStopSolution />
    </main>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tutor" element={
          <Layout>
            <TutorPage />
          </Layout>
        } />
        <Route path="/" element={
          <Layout>
            <StudentPage />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
