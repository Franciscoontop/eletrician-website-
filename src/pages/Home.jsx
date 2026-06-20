import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Wrench, CheckCircle, Clock, Award, Star, Heart, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        
        {/* Background video — plays automatically, loops, purely decorative */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
          style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 0, opacity: 0.4
          }}
        >
          <source src="/Lever_flipping,_LED_bulb_glowing_202606191155.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(180deg, rgba(10,10,12,0.6) 0%, rgba(10,10,12,0.3) 40%, rgba(10,10,12,0.8) 100%)',
          zIndex: 1
        }}></div>
        
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="hero-title">
            <span className="text-gradient">Powering The Future, </span>
            <span className="text-accent">Brilliantly.</span>
          </h1>
          <p className="hero-subtitle">Premium electrical installations and smart solutions for the modern world.</p>
          <div className="hero-buttons">
            <Link to="/services" className="btn-primary">Explore Services</Link>
            <Link to="/contact" className="btn-secondary">Get a Quote</Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', zIndex: 2,
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          <div style={{ width: '24px', height: '40px', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '12px', margin: '0 auto 0.5rem', position: 'relative' }}>
            <div style={{ width: '4px', height: '8px', backgroundColor: 'var(--accent-amber)', borderRadius: '2px', position: 'absolute', top: '6px', left: '50%', transform: 'translateX(-50%)', animation: 'pulse 2s ease-in-out infinite' }}></div>
          </div>
          Scroll to explore
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'var(--bg-dark)' }}>
        
        {/* Why Choose Section */}
        <section className="section container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="responsive-heading">Why Choose <span className="text-accent">Lumina</span></h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>We bring light to the darkest corners with state-of-the-art technology and master craftsmanship.</p>
          </div>
          <div className="services-grid">
            <div className="service-card glass-panel">
              <div className="service-icon"><Zap size={32} /></div>
              <h3>Modern Solutions</h3>
              <p style={{ color: 'var(--text-muted)' }}>From smart home integrations to energy-efficient LED upgrades, we use the latest technology to power your space.</p>
            </div>
            <div className="service-card glass-panel">
              <div className="service-icon"><Shield size={32} /></div>
              <h3>Premium Safety</h3>
              <p style={{ color: 'var(--text-muted)' }}>Your safety is our top priority. We exceed industry standards to ensure every connection is flawlessly secure.</p>
            </div>
            <div className="service-card glass-panel">
              <div className="service-icon"><Wrench size={32} /></div>
              <h3>Master Craftsmanship</h3>
              <p style={{ color: 'var(--text-muted)' }}>Our team of licensed professionals treats every wire and panel as a work of art.</p>
            </div>
          </div>
        </section>

        {/* Featured Image Banner */}
        <section className="image-banner">
          <img src="/electrician-panel.png" alt="Electrician working on panel" />
          <div className="image-banner-overlay"></div>
          <div className="image-banner-content">
            <h2 className="responsive-heading">Precision in <span className="text-accent">Every Connection</span></h2>
            <p>Our team brings decades of experience to every project, no matter the scale.</p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section" style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
          <div className="container">
            <div className="stats-grid">
              <div><h3 className="stat-number">15+</h3><p className="stat-label">Years Experience</p></div>
              <div><h3 className="stat-number">2.5k</h3><p className="stat-label">Projects Completed</p></div>
              <div><h3 className="stat-number">100%</h3><p className="stat-label">Safety Record</p></div>
              <div><h3 className="stat-number">24/7</h3><p className="stat-label">Emergency Support</p></div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="section container">
          <div className="story-grid">
            <div>
              <p style={{ color: 'var(--accent-amber)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.75rem' }}>Our Story</p>
              <h2 className="responsive-heading" style={{ marginBottom: '1.5rem', lineHeight: 1.2 }}>Built on <span className="text-accent">Trust</span>, Powered by <span className="text-gradient">Innovation</span></h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                Founded in 2009, Lumina Electrical started with a single van and a simple mission: deliver electrical work so reliable and beautifully executed that it speaks for itself. Over 15 years, we've grown into one of the most trusted contractors in the region.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
                Every wire we run, every panel we install, and every circuit we design reflects our unwavering commitment to excellence. We don't cut corners—we illuminate them.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={20} color="var(--accent-amber)" />
                  <span style={{ color: '#ddd', fontSize: '0.95rem' }}>Fully Licensed & Insured</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={20} color="var(--accent-amber)" />
                  <span style={{ color: '#ddd', fontSize: '0.95rem' }}>Veteran Owned</span>
                </div>
              </div>
            </div>
            <div className="glass-panel" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(10,10,12,0.9) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Heart size={24} color="var(--accent-amber)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div><h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Our Mission</h4><p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>To deliver electrical excellence that enhances safety, comfort, and energy efficiency for every client.</p></div>
              </div>
              <div style={{ height: '1px', backgroundColor: 'var(--border-glass)' }}></div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Star size={24} color="var(--accent-amber)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div><h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Our Vision</h4><p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>To become the gold standard in electrical contracting—where innovation meets integrity.</p></div>
              </div>
              <div style={{ height: '1px', backgroundColor: 'var(--border-glass)' }}></div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Award size={24} color="var(--accent-amber)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div><h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Our Promise</h4><p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>Every project backed by our lifetime craftsmanship guarantee. No questions asked.</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* Smart Home Image Banner */}
        <section className="image-banner">
          <img src="/smart-home.png" alt="Smart home interior lighting" />
          <div className="image-banner-overlay"></div>
          <div className="image-banner-content">
            <h2 className="responsive-heading">Smart <span className="text-accent">Lighting</span> Solutions</h2>
            <p>Transform any space into a modern, energy-efficient masterpiece.</p>
          </div>
        </section>

        {/* Process Section */}
        <section className="section container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: 'var(--accent-amber)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.75rem' }}>How We Work</p>
            <h2 className="responsive-heading">Our Proven <span className="text-accent">Process</span></h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0.5rem auto 0' }}>Seamless execution from consultation to the final switch flip.</p>
          </div>
          <div className="process-grid">
            {[
              { icon: <Clock size={24} />, title: '1. Consultation', desc: 'We evaluate your needs and provide a transparent, upfront estimate.' },
              { icon: <Wrench size={24} />, title: '2. Execution', desc: 'Our experts perform the work with precision and minimal disruption.' },
              { icon: <CheckCircle size={24} />, title: '3. Inspection', desc: 'Rigorous testing to ensure everything meets the highest standards.' },
              { icon: <Award size={24} />, title: '4. Guarantee', desc: 'Backed by our ironclad Lumina performance guarantee.' },
            ].map((step, i) => (
              <div key={i} className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div className="process-icon">{step.icon}</div>
                <div><h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{step.title}</h3><p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{step.desc}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="section" style={{ backgroundColor: 'rgba(245, 158, 11, 0.03)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p style={{ color: 'var(--accent-amber)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.75rem' }}>Testimonials</p>
              <h2 className="responsive-heading">What Our <span className="text-accent">Clients</span> Say</h2>
            </div>
            <div className="testimonials-grid">
              {[
                { initials: 'MR', name: 'Michael R.', role: 'Homeowner, Residential Rewire', quote: '"Lumina completely rewired our 1960s home and installed a smart panel. The team was incredibly professional and the work was flawless."' },
                { initials: 'SL', name: 'Sarah L.', role: 'Restaurant Owner, Commercial', quote: '"We needed a full electrical build-out in just three weeks. Lumina delivered ahead of schedule with zero issues during inspection."' },
                { initials: 'DK', name: 'David K.', role: 'Operations Manager, Industrial', quote: '"Outstanding work on our warehouse high-voltage installation. Their attention to safety protocols is second to none."' },
              ].map((t, i) => (
                <div key={i} className="glass-panel" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem' }}>{[1,2,3,4,5].map(s => <Star key={s} size={18} fill="var(--accent-amber)" color="var(--accent-amber)" />)}</div>
                  <p style={{ color: '#ddd', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.8 }}>{t.quote}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="avatar">{t.initials}</div>
                    <div><p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{t.name}</p><p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t.role}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industrial Image Banner */}
        <section className="image-banner">
          <img src="/industrial-power.png" alt="Industrial power systems" />
          <div className="image-banner-overlay"></div>
          <div className="image-banner-content">
            <h2 className="responsive-heading">Built for <span className="text-accent">Industrial</span> Scale</h2>
            <p>Heavy-duty power distribution and high-voltage installations.</p>
          </div>
        </section>
        
        {/* CTA Banner */}
        <section className="section">
          <div className="container">
            <div className="glass-panel cta-banner">
              <h2 className="responsive-heading">Ready to <span className="text-accent">Light Up</span> Your Project?</h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>Get a free, no-obligation estimate today.</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Get a Free Estimate <ArrowRight size={18} style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }} /></Link>
                <Link to="/services" className="btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Browse Services</Link>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default Home;
