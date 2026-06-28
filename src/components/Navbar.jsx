import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, Menu, X, Phone } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleHomeClick = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    // Unlock body scroll first
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);
    // Always pass a fresh timestamp to force Home to fully reset
    navigate('/', { state: { reset: Date.now() }, replace: true });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="/" onClick={handleHomeClick} className="nav-logo">
          <Zap size={28} />
          <span>Heath</span> Electricians
        </a>

        {/* Mobile hamburger */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-links ${mobileOpen ? 'nav-links--open' : ''}`}>
          <a href="/" onClick={handleHomeClick} className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</a>
          <Link to="/services" className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}>Services</Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
          <div className="nav-cta-wrapper">
            <a href="tel:1-800-HEATH-NJ" className="nav-phone">📞 1-800-HEATH-NJ</a>
            <Link to="/contact" className="btn-primary btn-sm" onClick={() => setMobileOpen(false)}>Book Service</Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Fixed Bottom CTA */}
      <div className="mobile-fixed-cta">
        <a href="tel:1-800-HEATH-NJ" className="mobile-call-btn">
          <Phone size={20} /> Call Now
        </a>
        <Link to="/contact" className="mobile-book-btn">
          Book Service
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
