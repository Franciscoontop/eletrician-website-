import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';

const projects = [
  { id: 1, title: 'Luxury Smart Home Integration', category: 'Residential', img: '/jackmac34.jpg' },
  { id: 2, title: 'Corporate Office Build-out', category: 'Commercial', img: '/jarmoluk.jpg' },
  { id: 3, title: 'High-Voltage Panel Upgrade', category: 'Industrial', img: '/jillrose.jpg' },
  { id: 4, title: 'Boutique Lighting Retrofit', category: 'Commercial', img: '/new-lightbulb.webp' },
  { id: 5, title: 'EV Charging Station Setup', category: 'Residential', img: '/jackmac34.jpg' },
  { id: 6, title: 'Warehouse Automation Wiring', category: 'Industrial', img: '/jillrose.jpg' },
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Residential', 'Commercial', 'Industrial'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section className="section container">
      <div className="scroll-fade-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{ color: 'var(--accent-amber)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.75rem' }}>Our Work</p>
        <h2 className="responsive-heading">Featured <span className="text-accent">Projects</span></h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '1rem auto 0' }}>A glimpse into our premium installations and master craftsmanship.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: activeFilter === filter ? 'var(--accent-amber)' : 'var(--border-glass)',
              background: activeFilter === filter ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
              color: activeFilter === filter ? 'var(--accent-amber)' : 'var(--text-main)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {filteredProjects.map((project, i) => (
          <div key={project.id} className={`gallery-item premium-card scroll-fade-up stagger-${(i % 4) + 1}`} style={{ height: '350px', position: 'relative', overflow: 'hidden', borderRadius: '16px', padding: 0 }}>
            <img 
              src={project.img} 
              alt={project.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} 
              className="gallery-img"
            />
            <div className="gallery-overlay" style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
              opacity: 0,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              padding: '2rem',
              transition: 'opacity 0.4s ease'
            }}>
              <div className="gallery-content" style={{ transform: 'translateY(20px)', transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <span style={{ color: 'var(--accent-amber)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{project.category}</span>
                <h3 style={{ color: '#fff', fontSize: '1.25rem', marginTop: '0.5rem', marginBottom: '1rem' }}>{project.title}</h3>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 500 }}>
                  View Project <Maximize2 size={16} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
