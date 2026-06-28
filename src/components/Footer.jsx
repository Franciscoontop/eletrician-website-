import React from 'react';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
        <div>
          <div className="nav-logo" style={{ marginBottom: '1rem' }}>
            <Zap size={28} />
            <span>Lumina</span> Electrical
          </div>
          <p style={{ color: 'var(--text-muted)' }}>
            Premium electrical services for modern homes and businesses. Illuminating your world with precision and expertise.
          </p>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontWeight: 500 }}>
            Proudly serving residential and commercial properties across Spark City and surrounding communities.
          </p>
        </div>
        
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-amber)' }}>Contact Info</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-muted)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={18} /> 1-800-LUMINA-E
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={18} /> info@luminaelectrical.com
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} /> 123 Power Avenue, Spark City, 90210
            </li>
          </ul>
        </div>
        
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-amber)' }}>Working Hours</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-muted)' }}>
            <li>Mon - Fri: 8:00 AM - 6:00 PM</li>
            <li>Saturday: 9:00 AM - 2:00 PM</li>
            <li>Sunday: Emergency Service Only</li>
          </ul>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '2rem 0 0', marginTop: '3rem', borderTop: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} Lumina Electrical. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
