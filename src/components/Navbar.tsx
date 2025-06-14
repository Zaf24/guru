import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ReactDOM from 'react-dom';

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'How it Works', href: '#how-it-works' },
  { name: 'Why Us', href: '#one-stop-solution' },
];

const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isTutorPage = location.pathname === '/tutor';





  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-sm w-full max-w-full overflow-x-hidden">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link 
            to="/" 
            className="-m-1.5 p-1.5"
            onClick={() => window.location.reload()}
          >
            <span className="text-2xl font-bold text-gradient flex items-center gap-1">
              Guru
              <GraduationCap className="w-6 h-6 text-orange-500" />
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => {
              console.log('🍔 HAMBURGER MENU CLICKED');
              console.log('📱 Current mobile menu state:', mobileMenuOpen);
              console.log('📄 Current page:', isTutorPage ? 'Tutor Page' : 'Student Page');
              setMobileMenuOpen(true);
              console.log('✅ Mobile menu state set to: true');
            }}
          >
            <div className="flex flex-col justify-center items-center w-6 h-6 space-y-1">
              <div className="w-6 h-0.5 bg-gradient rounded-full"></div>
              <div className="w-6 h-0.5 bg-gradient rounded-full"></div>
              <div className="w-6 h-0.5 bg-gradient rounded-full"></div>
            </div>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => smoothScrollTo(item.href.replace('#', ''))}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-orange-600 cursor-pointer"
            >
              {item.name}
            </button>
          ))}
          <Link
            to={isTutorPage ? "/" : "/tutor"}
            className="text-sm font-semibold leading-6 text-orange-600 hover:text-orange-500"
          >
            {isTutorPage ? "For Students" : "For Tutors"}
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
            Sign In
          </Button>
          <Button className="bg-gradient text-white hover:opacity-90">
            {isTutorPage ? "Start Teaching" : "Find a Tutor"}
          </Button>
        </div>
      </nav>


      {/* Mobile menu */}
      {mobileMenuOpen && ReactDOM.createPortal(
        <div 
          className="fixed inset-0" 
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
            zIndex: 999999,
            position: 'fixed'
          }}
          onClick={() => {
            console.log('🌫️ BACKDROP CLICKED - Closing menu');
            console.log('📱 Previous menu state:', mobileMenuOpen);
            setMobileMenuOpen(false);
            console.log('❌ Mobile menu closed via backdrop');
          }}
        >
          <div 
            className="fixed top-0 right-0 h-full bg-white shadow-xl" 
            style={{
              width: '320px',
              maxWidth: '80vw',
              zIndex: 9999999,
              position: 'fixed'
            }}
            onClick={(e) => {
              e.stopPropagation();
              console.log('📱 Menu panel clicked - preventing close');
            }}
          >
            <div style={{
              backgroundColor: 'white',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <span style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(to right, #f97316, #ea580c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Guru
                </span>
                <button 
                  onClick={() => {
                    console.log('❌ CLOSE BUTTON CLICKED');
                    console.log('📱 Previous menu state:', mobileMenuOpen);
                    setMobileMenuOpen(false);
                    console.log('✅ Mobile menu closed via X button');
                  }}
                  style={{
                    backgroundColor: '#f3f4f6',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <X style={{width: '24px', height: '24px', color: '#374151'}} />
                </button>
              </div>

              {/* Navigation */}
              <div style={{
                flex: 1,
                padding: '20px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{marginBottom: '30px'}}>
                  <button
                    onClick={() => {
                      console.log('🎯 FEATURES CLICKED');
                      console.log('📍 Scrolling to: features section');
                      smoothScrollTo('features');
                      setMobileMenuOpen(false);
                      console.log('✅ Menu closed after navigation');
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px 16px',
                      marginBottom: '8px',
                      backgroundColor: '#f9fafb',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#111827',
                      cursor: 'pointer'
                    }}
                  >
                    Features
                  </button>
                  <button
                    onClick={() => {
                      console.log('🎯 HOW IT WORKS CLICKED');
                      console.log('📍 Scrolling to: how-it-works section');
                      smoothScrollTo('how-it-works');
                      setMobileMenuOpen(false);
                      console.log('✅ Menu closed after navigation');
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px 16px',
                      marginBottom: '8px',
                      backgroundColor: '#f9fafb',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#111827',
                      cursor: 'pointer'
                    }}
                  >
                    How it Works
                  </button>
                  <button
                    onClick={() => {
                      console.log('🎯 WHY US CLICKED');
                      console.log('📍 Scrolling to: one-stop-solution section');
                      smoothScrollTo('one-stop-solution');
                      setMobileMenuOpen(false);
                      console.log('✅ Menu closed after navigation');
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px 16px',
                      marginBottom: '8px',
                      backgroundColor: '#f9fafb',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#111827',
                      cursor: 'pointer'
                    }}
                  >
                    Why Us
                  </button>
                  <Link
                    to={isTutorPage ? "/" : "/tutor"}
                    onClick={() => {
                      console.log('🔄 PAGE TOGGLE CLICKED');
                      console.log('📄 Switching to:', isTutorPage ? 'Student Page' : 'Tutor Page');
                      setMobileMenuOpen(false);
                      console.log('✅ Menu closed after page switch');
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px 16px',
                      marginBottom: '8px',
                      backgroundColor: '#fff7ed',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#ea580c',
                      cursor: 'pointer'
                    }}
                  >
                    {isTutorPage ? "For Students" : "For Tutors"}
                  </Link>
                </div>

                {/* Action Buttons */}
                <div>
                  <button 
                    onClick={() => {
                      console.log('🔑 SIGN IN BUTTON CLICKED');
                      console.log('📱 Closing menu after sign in click');
                      setMobileMenuOpen(false);
                      console.log('✅ Ready for sign in flow');
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      marginBottom: '12px',
                      border: '2px solid #ea580c',
                      backgroundColor: 'white',
                      color: '#ea580c',
                      borderRadius: '8px',
                      fontSize: '18px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => {
                      console.log('🚀 CTA BUTTON CLICKED');
                      console.log('📄 Button type:', isTutorPage ? 'Start Teaching' : 'Find a Tutor');
                      console.log('📱 Closing menu after CTA click');
                      setMobileMenuOpen(false);
                      console.log('✅ Ready for main action flow');
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: 'none',
                      background: 'linear-gradient(to right, #f97316, #ea580c)',
                      color: 'white',
                      borderRadius: '8px',
                      fontSize: '18px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {isTutorPage ? "Start Teaching" : "Find a Tutor"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
} 