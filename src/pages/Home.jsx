import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Zap, Wrench, CheckCircle, Clock, Award, Star, Heart, ArrowRight } from 'lucide-react';

const Home = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const location = useLocation();
  
  const [isAnimFinished, setIsAnimFinished] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [framesReady, setFramesReady] = useState(false);

  // Refs for ultra-smooth lerping
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const animationFrameId = useRef(null);
  const framesRef = useRef([]); 
  const frameCountRef = useRef(0);
  const lastTouchY = useRef(0);

  // Draw a specific frame index to the canvas
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames.length) return;
    
    const idx = Math.max(0, Math.min(frames.length - 1, Math.round(frameIndex)));
    const bitmap = frames[idx];
    if (!bitmap) return;
    
    const ctx = canvas.getContext('2d');
    
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;
    
    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = displayWidth + 'px';
      canvas.style.height = displayHeight + 'px';
      ctx.scale(dpr, dpr);
    }
    
    let scale;
    if (displayWidth < 768) {
      scale = Math.min(displayWidth / bitmap.width, displayHeight / bitmap.height) * 1.2;
    } else {
      scale = Math.max(displayWidth / bitmap.width, displayHeight / bitmap.height);
    }

    const x = (displayWidth - bitmap.width * scale) / 2;
    const y = (displayHeight - bitmap.height * scale) / 2;
    
    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(bitmap, x, y, bitmap.width * scale, bitmap.height * scale);
  }, []);

  // ===== EXTRACT MP4 FRAMES BY PLAYING VIDEO =====
  useEffect(() => {
    let cancelled = false;

    if (framesRef.current.length > 0) {
      setFramesReady(true);
      drawFrame(0);
      return;
    }

    const extractFrames = async () => {
      try {
        const video = document.createElement('video');
        video.src = '/Lever_flipping,_LED_bulb_glowing_202606191155.mp4';
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';

        await new Promise((resolve, reject) => {
          video.addEventListener('canplaythrough', resolve, { once: true });
          video.addEventListener('error', reject, { once: true });
          video.load();
        });

        const frames = [];
        const offscreen = document.createElement('canvas');
        const offCtx = offscreen.getContext('2d');
        offscreen.width = video.videoWidth;
        offscreen.height = video.videoHeight;

        // Play at 3x speed so extraction is fast
        video.playbackRate = 3;
        await video.play();

        // Capture frames as the video plays naturally
        while (!video.ended && !video.paused && !cancelled) {
          offCtx.drawImage(video, 0, 0, offscreen.width, offscreen.height);
          const bitmap = await createImageBitmap(offscreen);
          frames.push(bitmap);

          if (frames.length === 1) {
            framesRef.current = frames;
            frameCountRef.current = 1;
            drawFrame(0);
          }

          // Wait for the next animation frame
          await new Promise((r) => requestAnimationFrame(r));
        }

        if (!cancelled && frames.length > 0) {
          framesRef.current = frames;
          frameCountRef.current = frames.length;
          setFramesReady(true);
          drawFrame(0);
          console.log(`Extracted ${frames.length} frames`);
        }
      } catch (err) {
        console.error('Frame extraction failed:', err);
      }
    };

    extractFrames();
    return () => { cancelled = true; };
  }, [drawFrame]);

  // Reset when Home/Logo is clicked
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    setIsAnimFinished(false);
    setScrollProgress(0);
    targetProgress.current = 0;
    currentProgress.current = 0;
    
    if (framesRef.current.length > 0) {
      drawFrame(0);
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [location.state, drawFrame]);

  // Lock/unlock body scroll
  useEffect(() => {
    document.body.style.overflow = isAnimFinished ? 'auto' : 'hidden';
  }, [isAnimFinished]);

  // Main scroll-driven animation engine
  useEffect(() => {
    const handleWheel = (e) => {
      if (isAnimFinished) return;
      const maxDelta = 80;
      const clampedDeltaY = Math.max(-maxDelta, Math.min(maxDelta, e.deltaY));
      const scrollAmount = clampedDeltaY * 0.0005; 
      targetProgress.current = Math.max(0, Math.min(1.05, targetProgress.current + scrollAmount));
    };

    const handleTouchStart = (e) => {
      if (isAnimFinished) return;
      lastTouchY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isAnimFinished) return;
      e.preventDefault();
      const currentTouchY = e.touches[0].clientY;
      const deltaY = lastTouchY.current - currentTouchY;
      lastTouchY.current = currentTouchY;
      
      const maxDelta = 40;
      const clampedDelta = Math.max(-maxDelta, Math.min(maxDelta, deltaY));
      const scrollAmount = clampedDelta * 0.001;
      targetProgress.current = Math.max(0, Math.min(1.05, targetProgress.current + scrollAmount));
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    const smoothUpdate = () => {
      if (!isAnimFinished) {
        currentProgress.current += (targetProgress.current - currentProgress.current) * 0.03;
        
        const renderProgress = Math.max(0, Math.min(1, currentProgress.current));
        
        setScrollProgress((prev) => {
           if (Math.abs(prev - renderProgress) > 0.0005) return renderProgress;
           return prev;
        });

        if (framesRef.current.length > 0 && frameCountRef.current > 0) {
          const frameIndex = Math.round(renderProgress * (frameCountRef.current - 1));
          drawFrame(frameIndex);
        }

        if (currentProgress.current >= 0.99 && targetProgress.current >= 1.0) {
           setIsAnimFinished(true);
        }
      }
      animationFrameId.current = requestAnimationFrame(smoothUpdate);
    };

    animationFrameId.current = requestAnimationFrame(smoothUpdate);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isAnimFinished, drawFrame]);

  // Re-lock if user scrolls back to very top
  useEffect(() => {
    const handleGlobalScroll = () => {
       if (isAnimFinished && window.scrollY <= 5) {
         setIsAnimFinished(false);
         targetProgress.current = 0.98;
         currentProgress.current = 0.98;
         setScrollProgress(0.98);
       }
    };
    window.addEventListener('scroll', handleGlobalScroll);
    return () => window.removeEventListener('scroll', handleGlobalScroll);
  }, [isAnimFinished]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (framesRef.current.length > 0) {
        const frameIndex = Math.round(currentProgress.current * (frameCountRef.current - 1));
        drawFrame(frameIndex);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Scroll-triggered animations for content below the hero
  useEffect(() => {
    if (!isAnimFinished) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const els = document.querySelectorAll('.scroll-fade-up, .scroll-fade-left, .scroll-fade-right, .scroll-scale-in');
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isAnimFinished]);

  // Phase calculator for hero text transitions
  const calculatePhase = (start, end) => {
    if (scrollProgress < start) return { opacity: 0, translateY: 80 };
    if (scrollProgress > end) return { opacity: 0, translateY: -80 };
    
    const range = end - start;
    const p = (scrollProgress - start) / range;
    
    let opacity = 1;
    if (p < 0.2) opacity = p * 5;
    else if (p > 0.8) opacity = (1 - p) * 5;
    
    return { opacity: Math.max(0, Math.min(1, opacity)), translateY: 40 - (p * 80) };
  };

  const phase1 = calculatePhase(0.0, 0.25);
  const phase2 = calculatePhase(0.25, 0.50);
  const phase3 = calculatePhase(0.50, 0.75);
  const phase4 = calculatePhase(0.75, 1.00);

  return (
    <div>
      {/* ===== SCROLL-LOCKED HERO ANIMATION ===== */}
      <section ref={containerRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden', backgroundColor: '#000' }}>
        
        {/* Static poster from video — shown while frames extract, NOT an animated file */}
        <video 
          src="/Lever_flipping,_LED_bulb_glowing_202606191155.mp4"
          muted
          playsInline
          preload="auto"
          style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 0, 
            opacity: framesReady ? 0 : 1, transition: 'opacity 0.5s ease',
            pointerEvents: 'none'
          }} 
        />

        {/* Canvas for frame-by-frame scrubbing */}
        <canvas 
          ref={canvasRef} 
          style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            display: 'block', zIndex: 1, opacity: framesReady ? 1 : 0, transition: 'opacity 0.5s ease'
          }} 
        />
        
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: `linear-gradient(180deg, 
            rgba(10,10,12,${0.3 + scrollProgress * 0.7}) 0%, 
            rgba(10,10,12,${0.1 + scrollProgress * 0.6}) 40%,
            rgba(10,10,12,${0.4 + scrollProgress * 0.6}) 100%
          )`,
          zIndex: 2
        }}></div>
        
        <div className="hero" style={{ height: '100vh', position: 'relative', zIndex: 3, background: 'transparent' }}>
          
          {/* Phase 1 */}
          <div className="hero-content" style={{ 
            position: 'absolute', top: '50%', left: '50%', 
            transform: `translate(-50%, calc(-50% + ${phase1.translateY}px))`,
            opacity: phase1.opacity, width: '100%',
            pointerEvents: scrollProgress < 0.2 ? 'auto' : 'none'
          }}>
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

          {/* Phase 2 */}
          <div className="hero-content" style={{ 
            position: 'absolute', top: '50%', left: '50%', 
            transform: `translate(-50%, calc(-50% + ${phase2.translateY}px))`,
            opacity: phase2.opacity, width: '100%', pointerEvents: 'none'
          }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              <span className="text-gradient">Uncompromising Quality.</span>
            </h1>
            <p className="hero-subtitle" style={{ color: '#fff' }}>We engineer reliable, high-performance energy systems designed to last a lifetime.</p>
          </div>

          {/* Phase 3 */}
          <div className="hero-content" style={{ 
            position: 'absolute', top: '50%', left: '50%', 
            transform: `translate(-50%, calc(-50% + ${phase3.translateY}px))`,
            opacity: phase3.opacity, width: '100%', pointerEvents: 'none'
          }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              <span className="text-accent">Smart</span> Home Ready.
            </h1>
            <p className="hero-subtitle" style={{ color: '#fff' }}>Seamless integration with the latest automated technology.</p>
          </div>

          {/* Phase 4 */}
          <div className="hero-content" style={{ 
            position: 'absolute', top: '50%', left: '50%', 
            transform: `translate(-50%, calc(-50% + ${phase4.translateY}px))`,
            opacity: phase4.opacity, width: '100%', pointerEvents: 'none'
          }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              <span className="text-gradient">Industrial Grade </span>
              <span className="text-accent">Power.</span>
            </h1>
            <p className="hero-subtitle" style={{ color: '#fff' }}>The backbone your business needs to thrive.</p>
          </div>

          {/* Scroll hint */}
          <div style={{
            position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
            opacity: scrollProgress < 0.05 ? 1 : 0, transition: 'opacity 0.5s ease',
            textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem',
          }}>
            <div style={{ width: '24px', height: '40px', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '12px', margin: '0 auto 0.5rem', position: 'relative' }}>
              <div style={{ width: '4px', height: '8px', backgroundColor: 'var(--accent-amber)', borderRadius: '2px', position: 'absolute', top: '6px', left: '50%', transform: 'translateX(-50%)', animation: 'pulse 2s ease-in-out infinite' }}></div>
            </div>
            Scroll to explore
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'var(--bg-dark)' }}>
        
        {/* Why Choose Section */}
        <section className="section container">
          <div className="scroll-fade-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="responsive-heading">Why Choose <span className="text-accent">Lumina</span></h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>We bring light to the darkest corners with state-of-the-art technology and master craftsmanship.</p>
          </div>
          <div className="services-grid">
            <div className="service-card glass-panel scroll-fade-up stagger-1">
              <div className="service-icon"><Zap size={32} /></div>
              <h3>Modern Solutions</h3>
              <p style={{ color: 'var(--text-muted)' }}>From smart home integrations to energy-efficient LED upgrades, we use the latest technology to power your space.</p>
            </div>
            <div className="service-card glass-panel scroll-fade-up stagger-2">
              <div className="service-icon"><Shield size={32} /></div>
              <h3>Premium Safety</h3>
              <p style={{ color: 'var(--text-muted)' }}>Your safety is our top priority. We exceed industry standards to ensure every connection is flawlessly secure.</p>
            </div>
            <div className="service-card glass-panel scroll-fade-up stagger-3">
              <div className="service-icon"><Wrench size={32} /></div>
              <h3>Master Craftsmanship</h3>
              <p style={{ color: 'var(--text-muted)' }}>Our team of licensed professionals treats every wire and panel as a work of art.</p>
            </div>
          </div>
        </section>

        {/* Featured Image Banner */}
        <section className="image-banner scroll-scale-in">
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
              <div className="scroll-fade-up stagger-1"><h3 className="stat-number">15+</h3><p className="stat-label">Years Experience</p></div>
              <div className="scroll-fade-up stagger-2"><h3 className="stat-number">2.5k</h3><p className="stat-label">Projects Completed</p></div>
              <div className="scroll-fade-up stagger-3"><h3 className="stat-number">100%</h3><p className="stat-label">Safety Record</p></div>
              <div className="scroll-fade-up stagger-4"><h3 className="stat-number">24/7</h3><p className="stat-label">Emergency Support</p></div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="section container">
          <div className="story-grid">
            <div className="scroll-fade-left">
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
            <div className="glass-panel scroll-fade-right" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(10,10,12,0.9) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
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
        <section className="image-banner scroll-scale-in">
          <img src="/smart-home.png" alt="Smart home interior lighting" />
          <div className="image-banner-overlay"></div>
          <div className="image-banner-content">
            <h2 className="responsive-heading">Smart <span className="text-accent">Lighting</span> Solutions</h2>
            <p>Transform any space into a modern, energy-efficient masterpiece.</p>
          </div>
        </section>

        {/* Process Section */}
        <section className="section container">
          <div className="scroll-fade-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
              <div key={i} className={`glass-panel scroll-fade-up stagger-${i + 1}`} style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div className="process-icon">{step.icon}</div>
                <div><h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{step.title}</h3><p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{step.desc}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="section" style={{ backgroundColor: 'rgba(245, 158, 11, 0.03)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
          <div className="container">
            <div className="scroll-fade-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p style={{ color: 'var(--accent-amber)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.75rem' }}>Testimonials</p>
              <h2 className="responsive-heading">What Our <span className="text-accent">Clients</span> Say</h2>
            </div>
            <div className="testimonials-grid">
              {[
                { initials: 'MR', name: 'Michael R.', role: 'Homeowner, Residential Rewire', quote: '"Lumina completely rewired our 1960s home and installed a smart panel. The team was incredibly professional and the work was flawless."' },
                { initials: 'SL', name: 'Sarah L.', role: 'Restaurant Owner, Commercial', quote: '"We needed a full electrical build-out in just three weeks. Lumina delivered ahead of schedule with zero issues during inspection."' },
                { initials: 'DK', name: 'David K.', role: 'Operations Manager, Industrial', quote: '"Outstanding work on our warehouse high-voltage installation. Their attention to safety protocols is second to none."' },
              ].map((t, i) => (
                <div key={i} className={`glass-panel scroll-fade-up stagger-${i + 1}`} style={{ padding: '2rem' }}>
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
        <section className="image-banner scroll-scale-in">
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
            <div className="glass-panel cta-banner scroll-fade-up">
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
