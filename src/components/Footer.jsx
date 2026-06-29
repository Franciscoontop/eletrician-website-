import React from 'react';
import { Zap, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer reveal-footer">
      <div className="marquee-container">
        <div className="marquee-content">
          <span>⚡ EXPERT ELECTRICAL SERVICES ⚡ 24/7 EMERGENCY SUPPORT ⚡ MASTER CRAFTSMANSHIP ⚡ SMART HOME INTEGRATION ⚡ INDUSTRIAL POWER SOLUTIONS ⚡ </span>
          <span>⚡ EXPERT ELECTRICAL SERVICES ⚡ 24/7 EMERGENCY SUPPORT ⚡ MASTER CRAFTSMANSHIP ⚡ SMART HOME INTEGRATION ⚡ INDUSTRIAL POWER SOLUTIONS ⚡ </span>
        </div>
      </div>
      
      <div className="container" style={{ padding: '6rem 2rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          
          {/* Column 1: Company */}
          <div>
            <div className="nav-logo" style={{ marginBottom: '1.5rem', color: 'var(--text-light)', fontSize: '2rem' }}>
              <Zap size={32} color="var(--accent-amber)" />
              <span style={{ color: 'var(--text-light)' }}>Heath</span> Electricians
            </div>
            <p style={{ color: 'rgba(229, 229, 229, 0.7)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Family-owned and operated since 2010. We deliver premium electrical engineering, flawless installations, and 24/7 emergency support across New Jersey.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" className="social-icon" style={{ fontWeight: 700, fontSize: '0.85rem' }}>IG</a>
              <a href="#" className="social-icon" style={{ fontWeight: 700, fontSize: '0.85rem' }}>FB</a>
              <a href="#" className="social-icon" style={{ fontWeight: 700, fontSize: '0.85rem' }}>IN</a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-light)', fontWeight: 600 }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><Link to="/" className="footer-link"><ChevronRight size={16} /> Home</Link></li>
              <li><Link to="/services" className="footer-link"><ChevronRight size={16} /> Residential Services</Link></li>
              <li><Link to="/services" className="footer-link"><ChevronRight size={16} /> Commercial Wiring</Link></li>
              <li><Link to="/services" className="footer-link"><ChevronRight size={16} /> Industrial Power</Link></li>
              <li><Link to="/contact" className="footer-link"><ChevronRight size={16} /> Request Estimate</Link></li>
            </ul>
          </div>

          {/* Column 3: Service Areas */}
          <div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-light)', fontWeight: 600 }}>Service Areas</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li className="footer-link"><MapPin size={16} color="var(--accent-amber)" /> Newark</li>
              <li className="footer-link"><MapPin size={16} color="var(--accent-amber)" /> Jersey City</li>
              <li className="footer-link"><MapPin size={16} color="var(--accent-amber)" /> Hoboken</li>
              <li className="footer-link"><MapPin size={16} color="var(--accent-amber)" /> Montclair</li>
              <li className="footer-link"><MapPin size={16} color="var(--accent-amber)" /> Morristown</li>
            </ul>
          </div>
          
          {/* Column 4: Emergency Contact & Hours */}
          <div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-light)', fontWeight: 600 }}>Contact & Hours</h4>
            <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
              <p style={{ color: 'var(--accent-amber)', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={20} /> 24/7 Emergency</p>
              <a href="tel:1-800-HEATH-NJ" style={{ color: 'var(--text-light)', fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none' }}>1-800-HEATH-NJ</a>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'rgba(229, 229, 229, 0.7)', fontSize: '0.95rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Mon - Fri:</span> <span style={{ color: 'var(--text-light)' }}>8:00 AM - 6:00 PM</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Saturday:</span> <span style={{ color: 'var(--text-light)' }}>9:00 AM - 2:00 PM</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Sunday:</span> <span style={{ color: 'var(--accent-amber)' }}>Emergency Only</span></li>
            </ul>
          </div>

        </div>
        
        <div style={{ textAlign: 'center', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'rgba(229, 229, 229, 0.7)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>NJ Electrical Contractor License #NJ12345 | Fully Insured & Bonded</span>
          <span>&copy; {new Date().getFullYear()} Heath Electricians. All rights reserved. Designed for excellence.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
