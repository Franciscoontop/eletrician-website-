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
          <div className="glass-panel service-page-grid">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: 'var(--accent-amber)' }}>
                <HomeIcon size={32} />
                <h2 style={{ fontSize: '2rem', color: 'var(--text-main)' }}>Residential Solutions</h2>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.05rem' }}>
                Transform your home with cutting-edge electrical setups. We specialize in smart home integration, custom lighting designs, breaker panel upgrades, and seamless rewiring to keep your sanctuary safe and stunning.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={18} color="var(--accent-amber)"/> Custom LED Lighting Design</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={18} color="var(--accent-amber)"/> Smart Home Automation Integration</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={18} color="var(--accent-amber)"/> Panel Upgrades & Replacements</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={18} color="var(--accent-amber)"/> EV Charger Installation</li>
              </ul>
              <div>
                <Link to="/contact" className="btn-secondary">Book Residential Service</Link>
              </div>
            </div>
            <div className="image-wrapper" style={{ display: 'flex', minHeight: '300px' }}>
              <img src="/residential.png" alt="Residential Services" />
            </div>
          </div>

          {/* Commercial */}
          <div className="glass-panel service-page-grid">
            <div className="image-wrapper" style={{ display: 'flex', minHeight: '300px' }}>
              <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000&auto=format&fit=crop" alt="Commercial Systems" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: 'var(--accent-amber)' }}>
                <Cpu size={32} />
                <h2 style={{ fontSize: '2rem', color: 'var(--text-main)' }}>Commercial Systems</h2>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.05rem' }}>
                Powering businesses with reliable, scalable, and highly efficient electrical infrastructure. We minimize downtime and maximize productivity through expert design and maintenance.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={18} color="var(--accent-amber)"/> Office Build-outs & Renovations</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={18} color="var(--accent-amber)"/> Data Cabling & Networking</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={18} color="var(--accent-amber)"/> Security & Access Control Wiring</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={18} color="var(--accent-amber)"/> Backup Generator Systems</li>
              </ul>
              <div>
                <Link to="/contact" className="btn-secondary">Book Commercial Service</Link>
              </div>
            </div>
          </div>

          {/* Industrial */}
          <div className="glass-panel service-page-grid">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: 'var(--accent-amber)' }}>
                <Factory size={32} />
                <h2 style={{ fontSize: '2rem', color: 'var(--text-main)' }}>Industrial Power</h2>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.05rem' }}>
                Heavy-duty solutions for demanding environments. We provide robust electrical engineering and installation for manufacturing facilities and warehouses.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={18} color="var(--accent-amber)"/> High-Voltage Installations</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={18} color="var(--accent-amber)"/> Motor Controls & Automation</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={18} color="var(--accent-amber)"/> Transformer Upgrades</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={18} color="var(--accent-amber)"/> Preventive Maintenance</li>
              </ul>
              <div>
                <Link to="/contact" className="btn-secondary">Book Industrial Service</Link>
              </div>
            </div>
            <div className="image-wrapper" style={{ display: 'flex', minHeight: '300px' }}>
              <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop" alt="Industrial Power" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
