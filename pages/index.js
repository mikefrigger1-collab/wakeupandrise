import Head from 'next/head';
import Link from 'next/link'; 
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentTime, setCurrentTime] = useState('7:00');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    return () => {
      fadeElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.screenshot-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const track = document.querySelector('.screenshot-track');
    let autoRotateInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    function showSlide(index) {
      const currentActiveSlide = document.querySelector('.screenshot-slide.active');
      const currentActiveDot = document.querySelector('.dot.active');

      if (currentActiveSlide) {
        currentActiveSlide.classList.remove('active');
      }

      if (currentActiveDot) {
        currentActiveDot.classList.remove('active');
      }

      slides[index].classList.add('active');
      dots[index].classList.add('active');

      currentSlide = index;
    }

    function nextSlide() {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }

    function prevSlide() {
      const prev = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prev);
    }

    function startAutoRotate() {
      autoRotateInterval = setInterval(nextSlide, 8000);
    }

    function stopAutoRotate() {
      clearInterval(autoRotateInterval);
    }

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        stopAutoRotate();
        startAutoRotate();
      }
    }

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoRotate();
        startAutoRotate();
      });

      nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoRotate();
        startAutoRotate();
      });
    }

    if (track) {
      track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        stopAutoRotate();
        startAutoRotate();
      });
    });

    startAutoRotate();

    return () => {
      stopAutoRotate();
      if (prevBtn && nextBtn) {
        prevBtn.removeEventListener('click', prevSlide);
        nextBtn.removeEventListener('click', nextSlide);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Wake Up & Rise | Transform Your Mornings</title>
        <meta name="description" content="Transform your mornings with Wake Up & Rise - the smart alarm app featuring gradual volume ramping, custom audio, and morning routines." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wakeupandriseapp.com/" />
        <meta property="og:title" content="Wake Up & Rise - Smart Alarm Clock App" />
        <meta property="og:description" content="Transform your mornings with gradual volume ramping, custom audio, and morning routines." />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Wake Up & Rise - Smart Alarm Clock App" />
        <meta property="twitter:description" content="Transform your mornings with gradual volume ramping, custom audio, and morning routines." />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-container">
            <div className="logo">Wake Up & Rise</div>
            <ul className="nav-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>

              <li><a href="#download">Download</a></li>
            </ul>
            <a href="#download" className="download-nav-btn">Get App</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Transform Your Mornings</h1>
              <p>The smart alarm app that makes waking up a joy, not a struggle. Features gradual volume ramping, custom audio import, morning routine builder, and reliable full-screen alarms.</p>
              <div className="hero-buttons">
                <a href="#download" className="btn-primary">Download Free</a>
                <a href="#features" className="btn-secondary">See Features</a>
              </div>
            </div>
            <div className="phone-mockup">
              <div className="phone">
                <div className="phone-screen">
                  <div className="alarm-display">
                    <div className="alarm-time">{currentTime}</div>
                    <div className="alarm-label">Good Morning!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="problem-solution">
        <div className="container">
          <h2 className="section-title">Tired of Harsh, Jarring Alarms?</h2>
          <p className="section-subtitle">See how Wake Up & Rise transforms your morning routine</p>

          <div className="timeline-container">
            <div className="timeline-section before-section fade-in">
              <div className="timeline-header">
                <div className="timeline-icon sad">😫</div>
                <h3 className="timeline-title">Before</h3>
                <p className="timeline-subtitle">Your typical morning</p>
              </div>
              <div className="timeline-path">
                <div className="timeline-step">
                  <div className="step-content">
                    <h4>6:00 AM</h4>
                    <p>Loud, jarring alarm blasts you awake</p>
                  </div>
                  <div className="step-connector before"></div>
                  <div className="step-icon before">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </div>
                  <div className="step-connector before"></div>
                </div>
                <div className="timeline-step">
                  <div className="step-content">
                    <h4>6:20 AM</h4>
                    <p>Hit snooze for the 3rd time</p>
                  </div>
                  <div className="step-connector before"></div>
                  <div className="step-icon before">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </div>
                  <div className="step-connector before"></div>
                </div>
                <div className="timeline-step">
                  <div className="step-content">
                    <h4>6:30 AM</h4>
                    <p>Finally wake up groggy and stressed</p>
                  </div>
                  <div className="step-connector before"></div>
                  <div className="step-icon before">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </div>
                  <div className="step-connector before"></div>
                </div>
                <div className="timeline-step">
                  <div className="step-content">
                    <h4>7:00 AM</h4>
                    <p>Rush through morning, feeling behind</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-divider">
              <div className="divider-line"></div>
            </div>

            <div className="timeline-section after-section fade-in">
              <div className="timeline-header">
                <div className="timeline-icon happy">😊</div>
                <h3 className="timeline-title">After</h3>
                <p className="timeline-subtitle">With Wake Up & Rise</p>
              </div>
              <div className="timeline-path">
                <div className="timeline-step">
                  <div className="step-content">
                    <h4>6:00 AM</h4>
                    <p>Gentle music gradually fades in</p>
                  </div>
                  <div className="step-connector after"></div>
                  <div className="step-icon after">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div className="step-connector after"></div>
                </div>
                <div className="timeline-step">
                  <div className="step-content">
                    <h4>6:05 AM</h4>
                    <p>Wake up naturally, feeling refreshed</p>
                  </div>
                  <div className="step-connector after"></div>
                  <div className="step-icon after">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div className="step-connector after"></div>
                </div>
                <div className="timeline-step">
                  <div className="step-content">
                    <h4>6:15 AM</h4>
                    <p>Follow your personalized morning routine</p>
                  </div>
                  <div className="step-connector after"></div>
                  <div className="step-icon after">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div className="step-connector after"></div>
                </div>
                <div className="timeline-step">
                  <div className="step-content">
                    <h4>7:00 AM</h4>
                    <p>Start your day energized and focused</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">Smart Alarm Features</h2>
          <p className="section-subtitle">Advanced features that actually work to improve your mornings</p>
          
          <div className="features-grid">
            <div className="feature-card fade-in">
              <div className="feature-icon"><div className="feature-icon">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="m19.07 4.93-1.41 1.41A8.5 8.5 0 0 1 19.07 19.07l1.41 1.41A10.5 10.5 0 0 0 19.07 4.93Z"></path>
    <path d="m15.54 8.46-1.41 1.41a4 4 0 0 1 0 4.24l1.41 1.41a6 6 0 0 0 0-7.06Z"></path>
  </svg>
</div>
</div>
              <h3 className="feature-title">Gradual Volume Ramping</h3>
              <p className="feature-description">Never get startled awake again. Our smart volume ramping gradually increases from a gentle whisper to your preferred volume over 30 seconds to 5 minutes.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon"><div className="feature-icon">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13"></path>
    <circle cx="6" cy="18" r="3"></circle>
    <circle cx="18" cy="16" r="3"></circle>
  </svg>
</div></div>
              <h3 className="feature-title">Custom Audio Import</h3>
              <p className="feature-description">Wake up to your favorite songs, podcasts, or nature sounds. Our smart audio processing handles any format and optimizes for the perfect morning sound.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon"><div className="feature-icon">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
</div></div>
              <h3 className="feature-title">Full-Screen Lock Bypass</h3>
              <p className="feature-description">Never miss an alarm again. Our advanced full-screen alarm system works even when your phone is locked, in Do Not Disturb mode, or running other apps.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon"><div className="feature-icon">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8"></polyline>
    <line x1="4" y1="20" x2="21" y2="3"></line>
    <polyline points="21 16 21 21 16 21"></polyline>
    <line x1="15" y1="15" x2="21" y2="21"></line>
    <line x1="4" y1="4" x2="9" y2="9"></line>
  </svg>
</div></div>
              <h3 className="feature-title">Random Start Points</h3>
              <p className="feature-description">Perfect for long tracks and DJ mixes. Start your alarm at different points in your audio files for variety in your wake-up experience every day.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon"><div className="feature-icon">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v8"></path>
    <path d="m4.93 4.93 1.41 1.41"></path>
    <path d="M2 12h2"></path>
    <path d="m4.93 19.07 1.41-1.41"></path>
    <path d="M12 22v-2"></path>
    <path d="m19.07 19.07-1.41-1.41"></path>
    <path d="M22 12h-2"></path>
    <path d="m19.07 4.93-1.41 1.41"></path>
    <circle cx="12" cy="12" r="4"></circle>
  </svg>
</div></div>
              <h3 className="feature-title">Morning Routine Builder</h3>
              <p className="feature-description">Build lasting habits with our library of 100+ guided morning activities. Track your progress and create the perfect start to every day.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon"><div className="feature-icon">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="9" cy="9" r="2"></circle>
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
  </svg>
</div></div>
              <h3 className="feature-title">Custom Wallpapers</h3>
              <p className="feature-description">Personalize your wake-up experience with beautiful custom wallpapers that appear during your alarm. Choose from our collection or use your own photos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="screenshots" id="screenshots">
        <div className="container">
          <h2 className="section-title">See It In Action</h2>
          <p className="section-subtitle">Experience the beautiful interface designed for morning people</p>

          <div className="screenshot-slider">
            <button className="slider-nav prev" aria-label="Previous screenshot">‹</button>
            <button className="slider-nav next" aria-label="Next screenshot">›</button>

            <div className="screenshot-track">
              <div className="screenshot-slide active">
                <div className="screenshot-device">
                  <div className="screenshot-bezel">
                    <div className="screenshot-notch"></div>
                    <div className="screenshot-screen">
                      <div className="screenshot-content">Main Alarm Interface</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="screenshot-slide">
                <div className="screenshot-device">
                  <div className="screenshot-bezel">
                    <div className="screenshot-notch"></div>
                    <div className="screenshot-screen">
                      <div className="screenshot-content">Audio Selection</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="screenshot-slide">
                <div className="screenshot-device">
                  <div className="screenshot-bezel">
                    <div className="screenshot-notch"></div>
                    <div className="screenshot-screen">
                      <div className="screenshot-content">Morning Routine</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="screenshot-slide">
                <div className="screenshot-device">
                  <div className="screenshot-bezel">
                    <div className="screenshot-notch"></div>
                    <div className="screenshot-screen">
                      <div className="screenshot-content">Full-Screen Alarm</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="screenshot-slide">
                <div className="screenshot-device">
                  <div className="screenshot-bezel">
                    <div className="screenshot-notch"></div>
                    <div className="screenshot-screen">
                      <div className="screenshot-content">Progress Tracking</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="slider-dots">
              <span className="dot active" data-slide="0"></span>
              <span className="dot" data-slide="1"></span>
              <span className="dot" data-slide="2"></span>
              <span className="dot" data-slide="3"></span>
              <span className="dot" data-slide="4"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="download-section" id="download">
        <div className="container">
          <h2 className="section-title">Ready to Transform Your Mornings?</h2>
          <p className="section-subtitle">Join thousands who&rsquo;ve revolutionized their wake-up experience</p>

          <div className="download-buttons">
            <a href="#" className="store-badge">
              <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1630368000" alt="Download on the App Store" />
            </a>
            <a href="#" className="store-badge">
              <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" />
            </a>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Wake Up & Rise</h3>
              <p>The smart alarm clock app that transforms your mornings with gradual volume ramping and personalized routines.</p>
            </div>
            <div className="footer-section">
              <h3>Features</h3>
              <a href="#features">Gradual Volume Alarm</a>
              <a href="#features">Custom Audio Import</a>
              <a href="#features">Morning Routine Builder</a>
              <a href="#features">Full-Screen Alarms</a>
            </div>
            <div className="footer-section">
              <h3>Support</h3>
              <a href="mailto:support@wakeupandriseapp.com">Contact Support</a>
<Link href="/privacy">Privacy Policy</Link>
<Link href="/terms">Terms of Service</Link>
<Link href="/faq">FAQ</Link>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2025 Wake Up & Rise. All rights reserved.</p>
          </div>
        </div>
      </footer>

<style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #1e293b;
          background: #ffffff;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Navigation */
        .nav {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(226, 232, 240, 0.5);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 0;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 2.5rem;
        }

        .nav-links a {
          color: #475569;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 50%;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-50%);
        }

        .nav-links a:hover {
          color: #1e40af;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .download-nav-btn {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          color: white;
          padding: 0.625rem 1.75rem;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(30, 64, 175, 0.1);
        }

        .download-nav-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(30, 64, 175, 0.4);
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 100px;
          padding-bottom:50px;
          background: linear-gradient(135deg, rgba(249, 250, 251, 0) 0%, rgba(237, 233, 254, 0.3) 100%);
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(30, 64, 175, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .hero-text h1 {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.4;
          letter-spacing: -0.03em;
        }

        .hero-text p {
          font-size: 1.25rem;
          margin-bottom: 2.5rem;
          color: #64748b;
          line-height: 1.7;
          font-weight: 400;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          color: white;
          padding: 1rem 2.25rem;
          border: none;
          border-radius: 100px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          display: inline-block;
          box-shadow: 0 -10px -10px 30px rgba(30, 64, 175, 0.1);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(30, 64, 175, 0.4);
        }

        .btn-secondary {
          background: rgba(30, 64, 175, 0.05);
          color: #1e40af;
          padding: 1rem 2.25rem;
          border: 2px solid rgba(30, 64, 175, 0.2);
          border-radius: 100px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          display: inline-block;
        }

        .btn-secondary:hover {
          background: rgba(30, 64, 175, 0.1);
          border-color: #1e40af;
          transform: translateY(-2px);
        }

        .phone-mockup {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .phone {
          width: 320px;
          height: 640px;
          background: linear-gradient(145deg, #1e293b, #0f172a);
          border-radius: 48px;
          padding: 5px;
          box-shadow:
            0 30px 30px rgba(0, 0, 0, 0.1),
            0 0 0 2px rgba(51, 65, 85, 0.2),
            inset 0 1px 2px rgba(255, 255, 255, 0.15);
          position: relative;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .phone:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .phone::before {
          content: '';
          position: absolute;
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 28px;
          background: #000000;
          border-radius: 0 0 20px 20px;
          z-index: 10;
          box-shadow:
            inset 0 -2px 4px rgba(255, 255, 255, 0.1),
            0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .phone::after {
          content: '';
          position: absolute;
          top: 13px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          background: #1e3a8a;
          border-radius: 50%;
          opacity: 0.7;
          z-index: 11;
        }

        .phone-screen {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%);
          border-radius: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .phone-screen::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(30, 64, 175, 0.15) 0%, transparent 70%);
          animation: pulse 8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        .alarm-display {
          text-align: center;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          z-index: 1;
        }

        .alarm-time {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .alarm-label {
          font-size: 1.1rem;
          opacity: 0.9;
          font-weight: 600;
        }

        /* Problem/Solution Section */
        .problem-solution {
          padding: 6rem 0;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          position: relative;
          overflow: hidden;
        }

        .problem-solution::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 100%;
          background: linear-gradient(180deg, transparent 0%, rgba(30, 64, 175, 0.1) 20%, rgba(30, 64, 175, 0.1) 80%, transparent 100%);
          pointer-events: none;
        }

        .section-title {
          text-align: center;
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          text-align: center;
          font-size: 1.25rem;
          color: #64748b;
          margin-bottom: 4rem;
          font-weight: 400;
        }

        .timeline-container {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 3rem;
          margin-top: 3rem;
          align-items: start;
        }

        .timeline-section {
          position: relative;
        }

        .timeline-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .timeline-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          margin: 0 auto 1rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .timeline-icon.sad {
          background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
        }

        .timeline-icon.happy {
          background: linear-gradient(135deg, #047857 0%, #065f46 100%);
        }

        .timeline-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #1e293b;
        }

        .timeline-subtitle {
          font-size: 1.1rem;
          color: #64748b;
        }

        .timeline-path {
          position: relative;
        }

        .timeline-step {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .timeline-step:last-child {
          margin-bottom: 0;
        }

        .step-connector {
          width: 2px;
          height: 2rem;
          opacity: 0.3;
          margin: 0.5rem 0;
        }

        .step-connector.before {
          background: linear-gradient(180deg, #b91c1c 0%, #991b1b 100%);
        }

        .step-connector.after {
          background: linear-gradient(180deg, #047857 0%, #065f46 100%);
        }

        .timeline-step:last-child .step-connector {
          display: none;
        }

        .step-icon {
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1;
          flex-shrink: 0;
        }

        .step-icon.before {
          background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
          color: white;
        }

        .step-icon.after {
          background: linear-gradient(135deg, #047857 0%, #065f46 100%);
          color: white;
        }

        .step-icon svg {
          width: 1.2rem;
          height: 1.2rem;
          stroke-width: 3;
        }

        .step-content {
          background: white;
          padding: 1.5rem 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          width: 100%;
          max-width: 400px;
        }

        .before-section .step-content {
          border-top: 3px solid #b91c1c;
        }

        .after-section .step-content {
          border-top: 3px solid #047857;
        }

        .step-content:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }

        .step-content h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .step-content p {
          font-size: 1rem;
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }

        .timeline-divider {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-top: 8rem;
        }

        .divider-line {
          width: 1px;
          flex: 1;
          background: linear-gradient(180deg, transparent 0%, rgba(30, 64, 175, 0.2) 50%, transparent 100%);
        }

        .divider-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          box-shadow: 0 10px 40px rgba(30, 64, 175, 0.3);
          margin: 1rem 0;
        }

        .feature-icon svg {
          width: 3rem;
          height: 3rem;
          color: #1E3A8A;
        }

        /* Features Section */
        .features {
          padding: 6rem 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .feature-card {
          background: white;
          padding: 2.5rem;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #1e40af 0%, #1e3a8a 100%);
          transform: scaleX(0);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:hover::before {
          transform: scaleX(1);
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(30, 64, 175, 0.15);
          border-color: rgba(30, 64, 175, 0.2);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #1E3A8A;
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #1e293b;
          letter-spacing: -0.01em;
        }

        .feature-description {
          color: #64748b;
          line-height: 1.7;
          font-size: 1.05rem;
        }

        /* Screenshots Section */
        .screenshots {
          padding: 6rem 0;
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
        }

        .screenshot-slider {
          position: relative;
          max-width: 300px;
          max-height: calc(100vh - 300px);
          margin: 4rem auto 0;
        }

        .screenshot-track {
          position: relative;
          aspect-ratio: 9 / 19.5;
          max-height: 70vh;
          margin: 0 auto;
        }

        .screenshot-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
          pointer-events: none;
        }

        .screenshot-slide.active {
          opacity: 1;
          pointer-events: auto;
        }

        .screenshot-device {
          margin: 0 auto;
        }

        .screenshot-bezel {
          background: linear-gradient(145deg, #1e293b, #0f172a);
          border-radius: 48px;
          padding: 5px;
          box-shadow:
            0 30px 60px rgba(0, 0, 0, 0.25),
            0 0 0 2px rgba(51, 65, 85, 0.5),
            inset 0 1px 2px rgba(255, 255, 255, 0.15);
          position: relative;
        }

        .screenshot-notch {
          position: absolute;
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 28px;
          background: #000000;
          border-radius: 0 0 20px 20px;
          z-index: 10;
          box-shadow:
            inset 0 -2px 4px rgba(255, 255, 255, 0.1),
            0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .screenshot-notch::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          background: #1e3a8a;
          border-radius: 50%;
          opacity: 0.7;
        }

        .screenshot-notch::after {
          content: '';
          position: absolute;
          top: 10px;
          right: 20px;
          width: 12px;
          height: 4px;
          background: rgba(148, 163, 184, 0.4);
          border-radius: 2px;
        }

        .screenshot-screen {
          aspect-ratio: 9 / 19.5;
          background: linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%);
          border-radius: 40px;
          overflow: hidden;
          position: relative;
        }

        .screenshot-content {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          padding: 2rem;
        }

        .slider-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          font-size: 2rem;
          color: #1e40af;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .slider-nav:hover {
          background: #ffffff;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 8px 20px rgba(30, 64, 175, 0.2);
        }

        .slider-nav.prev {
          left: -70px;
        }

        .slider-nav.next {
          right: -70px;
        }

        .slider-dots {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 2rem;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(30, 64, 175, 0.2);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dot.active {
          background: #1e40af;
          transform: scale(1.2);
        }

        .dot:hover {
          background: rgba(30, 64, 175, 0.5);
        }

        @media (max-width: 768px) {
          .screenshot-slider {
            max-width: 280px;
          }

          .slider-nav {
            display: none;
          }
        }

        /* Social Proof Section */
        .social-proof {
          padding: 6rem 0;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .stat {
          text-align: center;
          background: white;
          padding: 2.5rem;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stat:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(30, 64, 175, 0.12);
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }

        .stat-label {
          color: #64748b;
          margin-top: 0.75rem;
          font-size: 1.05rem;
        }

        .testimonials {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .testimonial {
          background: white;
          padding: 2.5rem;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(226, 232, 240, 0.8);
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .testimonial:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(30, 64, 175, 0.12);
        }

        .testimonial::before {
          content: '"';
          position: absolute;
          top: 1.5rem;
          left: 2rem;
          font-size: 4rem;
          color: rgba(30, 64, 175, 0.1);
          font-family: Georgia, serif;
          line-height: 1;
        }

        .testimonial-text {
          font-style: italic;
          margin-bottom: 1rem;
          font-size: 1.15rem;
          color: #475569;
          line-height: 1.7;
        }

        .testimonial-author {
          font-weight: 600;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* How It Works Section */
        .how-it-works {
          padding: 6rem 0;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .step {
          text-align: center;
          background: white;
          padding: 2.5rem;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .step:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(30, 64, 175, 0.12);
        }

        .step-number {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          font-weight: 800;
          margin: 0 auto 1.5rem;
          color: white;
          box-shadow: 0 10px 30px rgba(30, 64, 175, 0.3);
        }

        .step-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #1e293b;
          letter-spacing: -0.01em;
        }

        .step-description {
          color: #64748b;
          line-height: 1.7;
          font-size: 1.05rem;
        }

        /* Download Section */
        .download-section {
          padding: 6rem 0;
          text-align: center;
        }

        .download-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .store-badge {
          display: inline-block;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .store-badge img {
          height: 60px;
          width: auto;
          display: block;
        }

        .store-badge:last-child img {
          height: 80px;
        }

        .store-badge:hover {
          transform: translateY(-4px);
          opacity: 0.85;
        }

        .email-signup {
          margin-top: 3rem;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #E5E7EB;
        }

        .email-signup h3 {
          color: #1E3A8A;
          margin-bottom: 1rem;
        }

        .email-form {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .email-input {
          flex: 1;
          padding: 1rem;
          border: 1px solid #D1D5DB;
          border-radius: 6px;
          background: white;
          color: #374151;
          font-size: 1rem;
        }

        .email-input::placeholder {
          color: #9CA3AF;
        }

        .email-input:focus {
          outline: none;
          border-color: #1E3A8A;
          box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
        }

        /* Footer */
        footer {
          background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 3rem 0 1rem;
          border-top: 1px solid rgba(226, 232, 240, 0.8);
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-section h3 {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .footer-section a {
          color: #64748b;
          text-decoration: none;
          display: block;
          margin-bottom: 0.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 0.95rem;
        }

        .footer-section a:hover {
          color: #1e40af;
          transform: translateX(4px);
        }

        .footer-section p {
          color: #64748b;
          line-height: 1.7;
        }

        .copyright {
          text-align: center;
          border-top: 1px solid #E5E7EB;
          padding-top: 1rem;
color: #9CA3AF;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-text h1 {
            font-size: 2.5rem;
          }

          .hero-buttons {
            justify-content: center;
          }

          .timeline-container {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .timeline-divider {
            display: none;
          }

          .problem-solution::before {
            display: none;
          }

          .before-section {
            padding-bottom: 2rem;
            border-bottom: 2px solid rgba(30, 64, 175, 0.1);
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .phone {
            width: 250px;
            height: 500px;
          }

          .alarm-time {
            font-size: 2rem;
          }

          .download-buttons {
            flex-direction: column;
            align-items: center;
          }

          .email-form {
            flex-direction: column;
          }
        }

        /* Simple fade-in animation */
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}

      </style>

    </>
  );
}