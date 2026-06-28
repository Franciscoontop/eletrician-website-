import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    propertyType: 'residential',
    service: 'panel_upgrade',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert('Thank you for reaching out! We will contact you shortly.');
    setFormData({ name: '', email: '', propertyType: 'residential', service: 'panel_upgrade', message: '' });
  };

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Get in <span className="text-accent">Touch</span></h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Ready to illuminate your project? Contact our team of expert electricians for a free consultation and quote.
          </p>
        </div>

        <div className="contact-page-grid">
          
          <div className="glass-panel" style={{ padding: '3rem 2rem' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--text-main)' }}>Contact Information</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-amber)', flexShrink: 0 }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: 'var(--text-main)' }}>Call Us</h4>
                  <p style={{ color: 'var(--text-muted)' }}>1-800-LUMINA-E</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Mon-Fri: 8am - 6pm</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-amber)', flexShrink: 0 }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: 'var(--text-main)' }}>Email Us</h4>
                  <p style={{ color: 'var(--text-muted)' }}>info@luminaelectrical.com</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>24/7 online support</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-amber)', flexShrink: 0 }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: 'var(--text-main)' }}>Visit Us</h4>
                  <p style={{ color: 'var(--text-muted)' }}>123 Power Avenue,</p>
                  <p style={{ color: 'var(--text-muted)' }}>Spark City, SC 90210</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '3rem' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--text-main)' }}>Send a Message</h3>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="form-input" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-input" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="contact-form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="propertyType">Property Type</label>
                  <select 
                    id="propertyType" 
                    name="propertyType" 
                    className="form-input" 
                    value={formData.propertyType} 
                    onChange={handleChange}
                    style={{ appearance: 'none', backgroundColor: '#fff', color: '#111827' }}
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="service">Service Needed</label>
                  <select 
                    id="service" 
                    name="service" 
                    className="form-input" 
                    value={formData.service} 
                    onChange={handleChange}
                    style={{ appearance: 'none', backgroundColor: '#fff', color: '#111827' }}
                  >
                    <option value="panel_upgrade">Panel Upgrade</option>
                    <option value="emergency">Emergency Repair</option>
                    <option value="lighting">Lighting Installation</option>
                    <option value="rewiring">Full/Partial Rewiring</option>
                    <option value="ev_charger">EV Charger Installation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Project Details</label>
                <textarea 
                  id="message" 
                  name="message" 
                  className="form-input" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  placeholder="Tell us about your electrical needs..."
                ></textarea>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                Send Message <Send size={18} style={{ marginLeft: '0.5rem' }} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
