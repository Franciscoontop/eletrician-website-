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
  const [isVideoFallback, setIsVideoFallback] = useState(() => {
    return window.innerWidth < 768 || typeof window.ImageDecoder === 'undefined';
  });

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const animationFrameId = useRef(null);
  const framesRef = useRef([]); 
  const frameCountRef = useRef(0);
  const lastTouchY = useRef(0);
  const videoRef = useRef(null);

  // ===== DRAW FRAME TO CANVAS (object-fit: cover) =====
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames.length) return;
    
    const idx = Math.max(0, Math.min(frames.length - 1, Math.round(frameIndex)));
    const bitmap = frames[idx];
    if (!bitmap) return;
    
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    if (canvas.width !== vw * dpr || canvas.height !== vh * dpr) {
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      canvas.style.width = vw + 'px';
      canvas.style.height = vh + 'px';
      ctx.scale(dpr, dpr);
    }
    
    const scale = Math.max(vw / bitmap.width, vh / bitmap.height);
    const x = (vw - bitmap.width * scale) / 2;
    const y = (vh - bitmap.height * scale) / 2;
    
    ctx.clearRect(0, 0, vw, vh);
    ctx.drawImage(bitmap, x, y, bitmap.width * scale, bitmap.height * scale);
  }, []);

  // ===== EXTRACT FRAMES FROM ANIMATED WEBP VIA ImageDecoder =====
  useEffect(() => {
    let cancelled = false;

    if (framesRef.current.length > 0) {
      setFramesReady(true);
      if (!isVideoFallback) drawFrame(0);
      return;
    }

    const extractFrames = async () => {
      const isMobile = window.innerWidth < 768;
      
      // If mobile or Firefox/Safari Desktop, jump straight to video fallback for perfect native MP4 scrubbing
      if (isVideoFallback || isMobile || !window.ImageDecoder) {
        setIsVideoFallback(true);
        setFramesReady(true);
        
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.currentTime = 0.01;
        }

        const unlockVideo = () => {
          if (videoRef.current) {
            videoRef.current.play().then(() => {
              if (videoRef.current) videoRef.current.pause();
            }).catch(() => {});
          }
          window.removeEventListener('touchstart', unlockVideo);
        };
        window.addEventListener('touchstart', unlockVideo);
        return;
      }

      try {
        let response = await fetch('/lightbulb.webp');
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        
        const decoder = new ImageDecoder({ type: 'image/webp', data: arrayBuffer });
        await decoder.tracks.ready;
        const totalFrames = decoder.tracks.selectedTrack.frameCount;
        frameCountRef.current = totalFrames;

        const extractedFrames = [];
        
        for (let i = 0; i < totalFrames; i++) {
          if (cancelled) return;
          const result = await decoder.decode({ frameIndex: i });
          const bitmap = await createImageBitmap(result.image);
          extractedFrames.push(bitmap);
          result.image.close();
          
          if (i === 0 && !cancelled) {
            framesRef.current = extractedFrames;
            drawFrame(0);
          }
        }
        
        framesRef.current = extractedFrames;
        
        if (!cancelled) {
          setFramesReady(true);
          drawFrame(0);
        }
        decoder.close();
      } catch (err) {
        console.error('Frame extraction failed, falling back to simple video element:', err);
        setIsVideoFallback(true);
        setFramesReady(true);
      }
    };

    extractFrames();
    return () => { cancelled = true; };
  }, [drawFrame, isVideoFallback]);

  // ===== RESET ON HOME/LOGO CLICK OR REFRESH =====
  useEffect(() => {
    // Prevent browser from auto-restoring scroll position which breaks the lock
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    document.body.style.overflow = 'hidden';
    
    // Tiny timeout ensures we override the browser's native scroll restoration
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    setIsAnimFinished(false);
    setScrollProgress(0);
    targetProgress.current = 0;
    currentProgress.current = 0;
    
    if (framesRef.current.length > 0) drawFrame(0);
    if (videoRef.current) videoRef.current.currentTime = 0;

    return () => { 
      document.body.style.overflow = 'auto'; 
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, [location.state, drawFrame]);

  // Lock/unlock body
  useEffect(() => {
    document.body.style.overflow = isAnimFinished ? 'auto' : 'hidden';
  }, [isAnimFinished]);

  // ===== SCROLL-DRIVEN ENGINE (wheel + touch) =====
  useEffect(() => {
    const handleWheel = (e) => {
      if (isAnimFinished) return;
      const maxDelta = 80;
      const clamped = Math.max(-maxDelta, Math.min(maxDelta, e.deltaY));
      targetProgress.current = Math.max(0, Math.min(1.05, targetProgress.current + clamped * 0.0005));
    };

    const handleTouchStart = (e) => {
      if (isAnimFinished) return;
      lastTouchY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isAnimFinished) return;
      e.preventDefault();
      const deltaY = lastTouchY.current - e.touches[0].clientY;
      lastTouchY.current = e.touches[0].clientY;
      const clamped = Math.max(-40, Math.min(40, deltaY));
      targetProgress.current = Math.max(0, Math.min(1.05, targetProgress.current + clamped * 0.001));
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    const smoothUpdate = () => {
      if (!isAnimFinished) {
        currentProgress.current += (targetProgress.current - currentProgress.current) * 0.03;
        const p = Math.max(0, Math.min(1, currentProgress.current));
        
        setScrollProgress((prev) => (Math.abs(prev - p) > 0.0005 ? p : prev));

        if (!isVideoFallback && framesRef.current.length > 0 && frameCountRef.current > 0) {
          drawFrame(Math.round(p * (frameCountRef.current - 1)));
        } else if (isVideoFallback && videoRef.current) {
          const duration = videoRef.current.duration || 3;
          videoRef.current.currentTime = p * duration;
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

  // Re-lock if scrolled back to top
  useEffect(() => {
    const onScroll = () => {
      if (isAnimFinished && window.scrollY <= 5) {
        setIsAnimFinished(false);
        targetProgress.current = 0.98;
        currentProgress.current = 0.98;
        setScrollProgress(0.98);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isAnimFinished]);

  // Resize handler
  useEffect(() => {
    const onResize = () => {
      if (framesRef.current.length > 0) {
        drawFrame(Math.round(currentProgress.current * (frameCountRef.current - 1)));
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [drawFrame]);

  // Scroll-triggered animations for content below
  useEffect(() => {
    if (!isAnimFinished) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); } }),
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.scroll-fade-up, .scroll-fade-left, .scroll-fade-right, .scroll-scale-in')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isAnimFinished]);

  // Phase text calculator
  const phase = (start, end) => {
    if (scrollProgress < start) return { opacity: 0, translateY: 80 };
    if (scrollProgress > end) return { opacity: 0, translateY: -80 };
    const p = (scrollProgress - start) / (end - start);
    let o = 1;
    if (p < 0.2) o = p * 5;
    else if (p > 0.8) o = (1 - p) * 5;
    return { opacity: Math.max(0, Math.min(1, o)), translateY: 40 - p * 80 };
  };

  const p1 = phase(0.0, 0.25);
  const p2 = phase(0.25, 0.50);
  const p3 = phase(0.50, 0.75);
  const p4 = phase(0.75, 1.00);

  const phaseStyle = (ph, clickable) => ({
    position: 'absolute', top: '50%', left: '50%', width: '100%',
    transform: `translate(-50%, calc(-50% + ${ph.translateY}px))`,
    opacity: ph.opacity, pointerEvents: clickable ? 'auto' : 'none',
  });

  return (
    <div>
      {/* ===== FULL-SCREEN SCROLL-LOCKED HERO ===== */}
      <section
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >
        {/* z-index: 0 — background canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: isVideoFallback ? 'none' : 'block',
            zIndex: 0,
          }}
        />

        {/* z-index: 0 — fallback video for mobile Safari */}
        <video
          ref={videoRef}
          src={window.innerWidth < 768 ? "/new png 720x12980 light bulb.mp4" : "/new destktop light bulb aniamtion.mp4"}
          muted
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            objectPosition: window.innerWidth < 768 ? '50% 50%' : '75% 50%',
            display: isVideoFallback ? 'block' : 'none',
            zIndex: 0,
          }}
        />

        {/* z-index: 1 — gradient overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: `linear-gradient(180deg, 
            rgba(10,10,12,${0.3 + scrollProgress * 0.7}) 0%, 
            rgba(10,10,12,${0.1 + scrollProgress * 0.6}) 40%,
            rgba(10,10,12,${0.4 + scrollProgress * 0.6}) 100%)`,
          zIndex: 1,
        }} />
        
        {/* z-index: 10 — all text content sits ON TOP */}
        <div style={{ position: 'relative', height: '100vh', zIndex: 10 }}>
          
          <div className="hero-content" style={phaseStyle(p1, scrollProgress < 0.2)}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              <span className="text-gradient">Licensed Electricians in </span>
              <span className="text-accent">Newark & North Jersey</span>
            </h1>
            <p className="hero-subtitle">Residential • Commercial • Emergency Service – 24/7 Response. Serving Homeowners Since 2010.</p>
            <div className="hero-buttons">
              <a href="tel:1-800-HEATH-NJ" className="btn-primary">Call Now – 24/7 Service</a>
              <Link to="/contact" className="btn-secondary">Request Free Estimate</Link>
            </div>
          </div>

          <div className="hero-content" style={phaseStyle(p2, false)}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              <span className="text-gradient">Fast. Reliable. </span>
              <span className="text-accent">Insured.</span>
            </h1>
            <p className="hero-subtitle" style={{ color: '#fff' }}>NJ-licensed professionals ready for any emergency, day or night.</p>
          </div>

          <div className="hero-content" style={phaseStyle(p3, false)}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              <span className="text-accent">Residential</span> & Commercial
            </h1>
            <p className="hero-subtitle" style={{ color: '#fff' }}>From panel upgrades to full commercial rewiring, we handle it all.</p>
          </div>

          <div className="hero-content" style={phaseStyle(p4, false)}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              <span className="text-gradient">100% Satisfaction </span>
              <span className="text-accent">Guaranteed.</span>
            </h1>
            <p className="hero-subtitle" style={{ color: '#fff' }}>We don't leave until the job is done right. NJ License #NJ12345.</p>
          </div>

          {/* Scroll hint — z-index: 10 on top of everything */}
          <div style={{
            position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
            opacity: scrollProgress < 0.05 ? 1 : 0, transition: 'opacity 0.5s ease',
            textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', zIndex: 10,
          }}>
            <div style={{ width: '24px', height: '40px', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '12px', margin: '0 auto 0.5rem', position: 'relative' }}>
              <div style={{ width: '4px', height: '8px', backgroundColor: 'var(--accent-amber)', borderRadius: '2px', position: 'absolute', top: '6px', left: '50%', transform: 'translateX(-50%)', animation: 'pulse 2s ease-in-out infinite' }} />
            </div>
            Scroll to explore
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'var(--bg-dark)' }}>
        
        {/* Trust Row - High Converting */}
        <div className="container scroll-fade-up" style={{ marginTop: '-40px', position: 'relative', zIndex: 20 }}>
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', backgroundColor: '#ffffff', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#111827' }}>
              <span style={{ fontSize: '1.2rem' }}>🏆</span> 500+ Projects Completed
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#111827' }}>
              <span style={{ fontSize: '1.2rem' }}>⭐</span> 4.9★ Google Rating
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#111827' }}>
              <span style={{ fontSize: '1.2rem' }}>⏱️</span> 15+ Years Experience
            </div>
          </div>
        </div>
        <section className="section container">
          <div className="scroll-fade-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="responsive-heading">Why Choose <span className="text-accent">Heath</span></h2>
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

        <section className="section container">
          <div className="image-wrapper scroll-scale-in" style={{ height: '50vh', minHeight: '400px' }}>
            <img src="/electrician-panel.png" alt="Electrician working on panel" />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(17,24,39,0.7) 0%, rgba(17,24,39,0.3) 50%, rgba(17,24,39,0.8) 100%)', zIndex: 1 }}></div>
            <div className="image-banner-content" style={{ zIndex: 2 }}>
              <h2 className="responsive-heading" style={{ color: '#fff' }}>Precision in <span className="text-accent">Every Connection</span></h2>
              <p style={{ color: '#e5e7eb' }}>Our team brings decades of experience to every project, no matter the scale.</p>
            </div>
          </div>
        </section>

        <section className="section" style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
          <div className="container">
            <div className="stats-grid">
              <div className="scroll-fade-up stagger-1"><h3 className="stat-number">10+</h3><p className="stat-label">Licensed Electricians</p></div>
              <div className="scroll-fade-up stagger-2"><h3 className="stat-number">2.5k</h3><p className="stat-label">Projects Completed</p></div>
              <div className="scroll-fade-up stagger-3"><h3 className="stat-number">100%</h3><p className="stat-label">Code Compliance</p></div>
              <div className="scroll-fade-up stagger-4"><h3 className="stat-number">24/7</h3><p className="stat-label">Emergency Support</p></div>
            </div>
          </div>
        </section>

        <section className="section container">
          <div className="story-grid">
            <div className="scroll-fade-left">
              <p style={{ color: 'var(--accent-amber)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.75rem' }}>Our Story</p>
              <h2 className="responsive-heading" style={{ marginBottom: '1.5rem', lineHeight: 1.2 }}>Built on <span className="text-accent">Trust</span>, Powered by <span className="text-gradient">Innovation</span></h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                Founded in 2010, Heath Electricians started with a single van and a simple mission: deliver electrical work so reliable and beautifully executed that it speaks for itself. Over 15 years, we've grown into one of the most trusted contractors in New Jersey.
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

        <section className="section container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '3rem', paddingRight: '2rem' }}>
              <div className="image-wrapper scroll-scale-in" style={{ width: '85%', zIndex: 1 }}>
                <img src="/smart-home.png" alt="Smart home interior lighting" style={{ aspectRatio: '4/5' }} />
              </div>
              <div className="image-wrapper scroll-fade-up" style={{ width: '55%', position: 'absolute', bottom: 0, right: 0, zIndex: 2, padding: '4px' }}>
                <img src="/electrician-panel.png" alt="Electrician detail" style={{ aspectRatio: '1/1' }} />
              </div>
            </div>
            <div className="scroll-fade-left">
              <h2 className="responsive-heading">Smart <span className="text-accent">Lighting</span> Solutions</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Transform any space into a modern, energy-efficient masterpiece with our custom smart integrations.</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={18} color="var(--accent-amber)" /> Complete Automation Control</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={18} color="var(--accent-amber)" /> Energy Efficiency Optimization</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={18} color="var(--accent-amber)" /> Voice & App Integration</li>
              </ul>
            </div>
          </div>
        </section>

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
              { icon: <Award size={24} />, title: '4. Guarantee', desc: 'Backed by our ironclad Heath performance guarantee.' },
            ].map((step, i) => (
              <div key={i} className={`glass-panel scroll-fade-up stagger-${i + 1}`} style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div className="process-icon">{step.icon}</div>
                <div><h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{step.title}</h3><p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{step.desc}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" style={{ backgroundColor: 'rgba(245, 158, 11, 0.03)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
          <div className="container">
            <div className="scroll-fade-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p style={{ color: 'var(--accent-amber)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.75rem' }}>Testimonials</p>
              <h2 className="responsive-heading">What Our <span className="text-accent">Clients</span> Say</h2>
            </div>
            <div className="testimonials-grid">
              {[
                { initials: 'JR', name: 'Jessica R.', role: 'Homeowner, Nutley, NJ', quote: '"Heath Electricians saved the day when our power went out in a storm. The tech arrived within 2 hours and fixed everything quickly. Highly recommend!"' },
                { initials: 'CM', name: 'Carlos M.', role: 'Homeowner, Jersey City', quote: '"Professional, on-time, and affordable. They replaced our old fuse box with a modern panel in one day. Outstanding work!"' },
                { initials: 'PS', name: 'Priya S.', role: 'Business Owner, Hoboken', quote: '"Five stars! The team installed LED lighting in my store and even gave me tips to reduce my energy bill. Very knowledgeable!"' },
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

        <section className="image-banner scroll-scale-in">
          <img src="/industrial-power.png" alt="Industrial power systems" />
          <div className="image-banner-overlay"></div>
          <div className="image-banner-content">
            <h2 className="responsive-heading">Built for <span className="text-accent">Industrial</span> Scale</h2>
            <p>Heavy-duty power distribution and high-voltage installations.</p>
          </div>
        </section>
        
        <section className="section container">
          <div className="scroll-fade-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: 'var(--accent-amber)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.75rem' }}>Common Questions</p>
            <h2 className="responsive-heading">Frequently Asked <span className="text-accent">Questions</span></h2>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { q: 'Do you offer emergency service 24/7?', a: 'Yes. We have electricians on call 24/7 for urgent issues like outages or sparking. We typically dispatch same day.' },
              { q: 'Are you fully licensed in New Jersey?', a: 'Absolutely – our license # is NJ12345. We follow all state electrical codes and provide permits and inspection paperwork.' },
              { q: 'How much does a panel upgrade cost?', a: 'It varies, but most upgrades start around $2,500 for a 200-Amp panel (parts & labor). We give firm estimates after an on-site inspection.' },
              { q: 'What areas do you serve?', a: 'We serve all of New Jersey, including Newark, Jersey City, Paterson, and surrounding towns. Give us a call, we’ll come to you!' }
            ].map((faq, i) => (
              <div key={i} className={`glass-panel scroll-fade-up stagger-${i + 1}`} style={{ padding: '1.5rem 2rem' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#fff' }}>{faq.q}</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
        
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
