import React from 'react';
import { ArrowRight, Cpu, Home as HomeIcon, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem', marginTop: '2rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Our <span className="text-accent">Services</span></h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Comprehensive electrical solutions tailored to your specific needs. From residential upgrades to massive industrial setups, we deliver brilliance.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {/* Residential */}
          <div className="premium-card service-page-grid" style={{ padding: '3rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: 'var(--accent-amber)' }}>
                <div className="service-icon-wrapper"><HomeIcon size={40} /></div>
                <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)' }}>Residential Services</h2>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
                Upgrade to a 200-Amp panel for more power and safety. We'll replace outdated panels so you never trip a breaker again. Safe, code-compliant setups for your entire home.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', color: 'var(--text-muted)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}><ArrowRight size={20} color="var(--accent-amber)"/> Panel Upgrades & Replacements</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}><ArrowRight size={20} color="var(--accent-amber)"/> Level 2 EV Charger Installation</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}><ArrowRight size={20} color="var(--accent-amber)"/> Custom LED Lighting Design</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}><ArrowRight size={20} color="var(--accent-amber)"/> Smart Home Automation</li>
              </ul>
              <div>
                <Link to="/contact" className="btn-secondary">Book Residential Service</Link>
              </div>
            </div>
            <div className="image-wrapper gallery-item" style={{ display: 'flex', minHeight: '400px', borderRadius: '16px', overflow: 'hidden' }}>
              <img src="/jackmac34.jpg" alt="Electrician at residential property" className="gallery-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
            </div>
          </div>

          {/* Commercial */}
          <div className="premium-card service-page-grid" style={{ padding: '3rem', alignItems: 'center' }}>
            <div className="image-wrapper gallery-item" style={{ display: 'flex', minHeight: '400px', borderRadius: '16px', overflow: 'hidden' }}>
              <img src="/jarmoluk.jpg" alt="Electrician wiring a commercial office" className="gallery-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: 'var(--accent-amber)' }}>
                <div className="service-icon-wrapper"><Cpu size={40} /></div>
                <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)' }}>Commercial Wiring</h2>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
                Expert wiring for offices and retail: lighting retrofits, data cabling, and backup power solutions. Fully licensed for all NJ commercial codes to minimize downtime and maximize productivity.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', color: 'var(--text-muted)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}><ArrowRight size={20} color="var(--accent-amber)"/> Office Build-outs & Renovations</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}><ArrowRight size={20} color="var(--accent-amber)"/> Data Cabling & Networking</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}><ArrowRight size={20} color="var(--accent-amber)"/> Security & Access Control Wiring</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}><ArrowRight size={20} color="var(--accent-amber)"/> Backup Generator Systems</li>
              </ul>
              <div>
                <Link to="/contact" className="btn-secondary">Book Commercial Service</Link>
              </div>
            </div>
          </div>

          {/* Industrial */}
          <div className="premium-card service-page-grid" style={{ padding: '3rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: 'var(--accent-amber)' }}>
                <div className="service-icon-wrapper"><Factory size={40} /></div>
                <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)' }}>Industrial Power</h2>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
                Heavy-duty solutions for demanding environments. We provide robust electrical engineering and installation for manufacturing facilities, warehouses, and industrial plants across New Jersey.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', color: 'var(--text-muted)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}><ArrowRight size={20} color="var(--accent-amber)"/> High-Voltage Installations</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}><ArrowRight size={20} color="var(--accent-amber)"/> Motor Controls & Automation</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}><ArrowRight size={20} color="var(--accent-amber)"/> Transformer Upgrades</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}><ArrowRight size={20} color="var(--accent-amber)"/> Preventive Maintenance</li>
              </ul>
              <div>
                <Link to="/contact" className="btn-secondary">Book Industrial Service</Link>
              </div>
            </div>
            <div className="image-wrapper gallery-item" style={{ display: 'flex', minHeight: '400px', borderRadius: '16px', overflow: 'hidden' }}>
              <img src="/jillrose.jpg" alt="Industrial electrical equipment installation" className="gallery-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
