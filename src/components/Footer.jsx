import React from 'react';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer reveal-footer">
      <div className="marquee-container">
        <div className="marquee-content">
          <span>⚡ EXPERT ELECTRICAL SERVICES ⚡ 24/7 EMERGENCY SUPPORT ⚡ MASTER CRAFTSMANSHIP ⚡ SMART HOME INTEGRATION ⚡ INDUSTRIAL POWER SOLUTIONS ⚡ </span>
          {/* Duplicate string exactly once for the perfect loop */}
          <span>⚡ EXPERT ELECTRICAL SERVICES ⚡ 24/7 EMERGENCY SUPPORT ⚡ MASTER CRAFTSMANSHIP ⚡ SMART HOME INTEGRATION ⚡ INDUSTRIAL POWER SOLUTIONS ⚡ </span>
        </div>
      </div>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', paddingTop: '3rem' }}>
        <div>
          <div className="nav-logo" style={{ marginBottom: '1rem', color: '#fff' }}>
            <Zap size={28} />
            <span style={{ color: '#fff' }}>Heath</span> Electricians
          </div>
          <p style={{ color: '#9ca3af' }}>
            Family-owned NJ Licensed Electricians since 2010. Illuminating your world with precision and expertise.
          </p>
          <p style={{ color: '#9ca3af', marginTop: '1rem', fontWeight: 500 }}>
            Proudly serving residential and commercial properties across Newark and North Jersey.
          </p>
        </div>
        
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-amber)' }}>Contact Info</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#9ca3af' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={18} /> <a href="tel:1-800-HEATH-NJ" style={{ color: 'inherit', textDecoration: 'none' }}>1-800-HEATH-NJ</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={18} /> info@heathelectricians.com
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} /> 123 Power Avenue, Newark, NJ
            </li>
            <li style={{ marginTop: '0.5rem' }}>
              <a href="/contact" style={{ color: 'var(--accent-amber)', fontWeight: 600, textDecoration: 'none' }}>Get a Free Quote &rarr;</a>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-amber)' }}>Working Hours</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#9ca3af' }}>
            <li>Mon - Fri: 8:00 AM - 6:00 PM</li>
            <li>Saturday: 9:00 AM - 2:00 PM</li>
            <li>Sunday: Emergency Service Only</li>
          </ul>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '2rem 0', marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#6b7280', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span>NJ Electrical Contractor License #NJ12345 | Fully Insured</span>
        <span>&copy; {new Date().getFullYear()} Heath Electricians. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
