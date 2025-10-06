import Head from 'next/head';
import Link from 'next/link'; 
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentTime, setCurrentTime] = useState('7:00');
  const [activeTab, setActiveTab] = useState('alarm');

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
    // Initialize comparison slider - reinitialize on tab change
    const wrapper = document.querySelector('.comparison-wrapper');
    const slider = document.querySelector('.comparison-slider');
    const before = document.querySelector('.comparison-before');
    const after = document.querySelector('.comparison-after');

    if (!wrapper || !slider || !before || !after) return;

    let isDragging = false;

    function updateSlider(clientX) {
      const rect = wrapper.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      let percentage = (x / rect.width) * 100;

      // Constrain slider to stay within phone edges (15% to 85% of container width)
      percentage = Math.max(15, Math.min(percentage, 85));

      before.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
      after.style.clipPath = `inset(0 0 0 ${percentage}%)`;
      slider.style.left = `${percentage}%`;
    }

    function handleMove(e) {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateSlider(clientX);
    }

    function handleStart(e) {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateSlider(clientX);
    }

    function handleEnd() {
      isDragging = false;
    }

    // Mouse events
    slider.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);

    // Touch events
    slider.addEventListener('touchstart', handleStart, { passive: true });
    document.addEventListener('touchmove', handleMove, { passive: true });
    document.addEventListener('touchend', handleEnd);

    // Initial position (centered)
    updateSlider(wrapper.getBoundingClientRect().left + wrapper.offsetWidth / 2);

    // Cleanup
    return () => {
      slider.removeEventListener('mousedown', handleStart);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      slider.removeEventListener('touchstart', handleStart);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [activeTab]);

  useEffect(() => {
    // Screenshot slider removed - this useEffect is no longer needed
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
            <a href="#download" className="download-nav-btn">Get App</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Wake up better.</h1>
              <p className="hero-subheadline">The alarm that's a pleasure, not a pain. Wake up better, every day.</p>
              <div className="hero-social-proof">
                <div className="rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">4.8</span>
                </div>
                <span className="divider">•</span>
                <span className="downloads">50,000+ downloads</span>
              </div>
              <div className="hero-store-badges">
                <a href="#" className="store-badge">
                  <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1630368000" alt="Download on the App Store" />
                </a>
                <a href="#" className="store-badge">
                  <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Comparison Section */}
      <section className="comparison-section">
        <div className="container">
          <h2 className="section-title">See The Difference</h2>
          <p className="section-subtitle">Drag the slider to compare traditional apps vs. Wake Up & Rise</p>

          <div className="comparison-slider-container">
            <div className="comparison-wrapper">
              {/* Alarm Comparison */}
              {activeTab === 'alarm' && (
                <>
                  <div className="comparison-before">
                    <div className="comparison-content">
                      <div className="comparison-phone before-phone">
                        <div className="comparison-phone-bezel before-bezel">
                          <div className="comparison-notch"></div>
                          <div className="comparison-screen before-screen">
                            <div className="alarm-ui harsh">
                              <div className="alarm-icon harsh-icon">⚠️</div>
                              <div className="alarm-time-display harsh-time">7:00</div>
                              <div className="alarm-label harsh-label">ALARM</div>
                              <div className="volume-indicator harsh-volume">
                                <div className="volume-bar full"></div>
                                <div className="volume-bar full"></div>
                                <div className="volume-bar full"></div>
                                <div className="volume-bar full"></div>
                                <div className="volume-bar full"></div>
                              </div>
                              <div className="alarm-actions">
                                <button className="alarm-btn harsh-btn">STOP</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="comparison-label before-label">Traditional Alarm</div>
                    </div>
                  </div>

                  <div className="comparison-after">
                    <div className="comparison-content">
                      <div className="comparison-phone after-phone">
                        <div className="comparison-phone-bezel after-bezel">
                          <div className="comparison-notch"></div>
                          <div className="comparison-screen after-screen">
                            <div className="alarm-ui gentle">
                              <div className="alarm-icon gentle-icon">☀️</div>
                              <div className="alarm-time-display gentle-time">7:00</div>
                              <div className="alarm-label gentle-label">Good Morning</div>
                              <div className="volume-indicator gentle-volume">
                                <div className="volume-bar filled"></div>
                                <div className="volume-bar filled"></div>
                                <div className="volume-bar partial"></div>
                                <div className="volume-bar"></div>
                                <div className="volume-bar"></div>
                              </div>
                              <div className="alarm-actions">
                                <button className="alarm-btn gentle-btn">Dismiss</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="comparison-label after-label">Wake Up & Rise</div>
                    </div>
                  </div>
                </>
              )}

              {/* Routine Comparison */}
              {activeTab === 'routine' && (
                <>
                  <div className="comparison-before">
                    <div className="comparison-content">
                      <div className="comparison-phone before-phone">
                        <div className="comparison-phone-bezel before-bezel">
                          <div className="comparison-notch"></div>
                          <div className="comparison-screen before-screen">
                            <div className="routine-ui basic">
                              <div className="routine-header harsh-text">Morning Checklist</div>
                              <div className="routine-list">
                                <div className="routine-item">☐ Wake up</div>
                                <div className="routine-item">☐ Shower</div>
                                <div className="routine-item">☐ Breakfast</div>
                                <div className="routine-item">☐ Get dressed</div>
                                <div className="routine-item">☐ Leave house</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="comparison-label before-label">Basic Checklist</div>
                    </div>
                  </div>

                  <div className="comparison-after">
                    <div className="comparison-content">
                      <div className="comparison-phone after-phone">
                        <div className="comparison-phone-bezel after-bezel">
                          <div className="comparison-notch"></div>
                          <div className="comparison-screen after-screen">
                            <div className="routine-ui guided">
                              <div className="routine-header gentle-text">Morning Routine</div>
                              <div className="routine-progress">
                                <div className="progress-bar">
                                  <div className="progress-fill"></div>
                                </div>
                                <div className="progress-text">Step 2 of 5</div>
                              </div>
                              <div className="routine-current">
                                <div className="routine-icon">🧘</div>
                                <div className="routine-name">5-Min Meditation</div>
                                <div className="routine-timer">2:30 remaining</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="comparison-label after-label">Guided Routine</div>
                    </div>
                  </div>
                </>
              )}

              {/* Audio Comparison */}
              {activeTab === 'audio' && (
                <>
                  <div className="comparison-before">
                    <div className="comparison-content">
                      <div className="comparison-phone before-phone">
                        <div className="comparison-phone-bezel before-bezel">
                          <div className="comparison-notch"></div>
                          <div className="comparison-screen before-screen">
                            <div className="audio-ui basic">
                              <div className="audio-header harsh-text">Select Sound</div>
                              <div className="audio-list">
                                <div className="audio-option">🔔 Default 1</div>
                                <div className="audio-option">🔔 Default 2</div>
                                <div className="audio-option">🔔 Default 3</div>
                                <div className="audio-option">🔔 Default 4</div>
                                <div className="audio-option">🔔 Default 5</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="comparison-label before-label">Limited Sounds</div>
                    </div>
                  </div>

                  <div className="comparison-after">
                    <div className="comparison-content">
                      <div className="comparison-phone after-phone">
                        <div className="comparison-phone-bezel after-bezel">
                          <div className="comparison-notch"></div>
                          <div className="comparison-screen after-screen">
                            <div className="audio-ui custom">
                              <div className="audio-header gentle-text">Your Audio</div>
                              <div className="audio-categories">
                                <div className="audio-category">
                                  <div className="category-icon">🎵</div>
                                  <div className="category-name">Music</div>
                                </div>
                                <div className="audio-category">
                                  <div className="category-icon">🎧</div>
                                  <div className="category-name">DJ Mixes</div>
                                </div>
                                <div className="audio-category">
                                  <div className="category-icon">🎸</div>
                                  <div className="category-name">Band Sets</div>
                                </div>
                              </div>
                              <button className="import-btn">+ Import Audio</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="comparison-label after-label">Custom Audio</div>
                    </div>
                  </div>
                </>
              )}

              <div className="comparison-slider">
                <div className="slider-handle">
                  <div className="slider-handle-line"></div>
                  <div className="slider-handle-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="slider-handle-line"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Navigation */}
          <div className="comparison-carousel-nav">
            <button
              className="carousel-arrow carousel-arrow-prev"
              onClick={() => {
                const tabs = ['alarm', 'routine', 'audio'];
                const currentIndex = tabs.indexOf(activeTab);
                const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
                setActiveTab(tabs[prevIndex]);
              }}
              aria-label="Previous comparison"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>

            <div className="comparison-carousel-dots">
              <button
                className={`carousel-dot ${activeTab === 'alarm' ? 'active' : ''}`}
                onClick={() => setActiveTab('alarm')}
                aria-label="Alarm comparison"
              />
              <button
                className={`carousel-dot ${activeTab === 'routine' ? 'active' : ''}`}
                onClick={() => setActiveTab('routine')}
                aria-label="Routine comparison"
              />
              <button
                className={`carousel-dot ${activeTab === 'audio' ? 'active' : ''}`}
                onClick={() => setActiveTab('audio')}
                aria-label="Audio comparison"
              />
            </div>

            <button
              className="carousel-arrow carousel-arrow-next"
              onClick={() => {
                const tabs = ['alarm', 'routine', 'audio'];
                const currentIndex = tabs.indexOf(activeTab);
                const nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
                setActiveTab(tabs[nextIndex]);
              }}
              aria-label="Next comparison"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
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
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="m19.07 4.93-1.41 1.41A8.5 8.5 0 0 1 19.07 19.07l1.41 1.41A10.5 10.5 0 0 0 19.07 4.93Z"></path>
                  <path d="m15.54 8.46-1.41 1.41a4 4 0 0 1 0 4.24l1.41 1.41a6 6 0 0 0 0-7.06Z"></path>
                </svg>
              </div>
              <h3 className="feature-title">Gradual Volume Ramping</h3>
              <p className="feature-description">Gentle volume increase from whisper to full—no more jolting awake.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
              </div>
              <h3 className="feature-title">Your Music, Your Way</h3>
              <p className="feature-description">Import DJ mixes, band sets, or any audio. Random start points keep every morning fresh.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon">
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
              </div>
              <h3 className="feature-title">Morning Routine Builder</h3>
              <p className="feature-description">Build lasting habits with 100+ guided activities. Track progress and own your mornings.</p>
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
          <div className="copyright">
            <p>&copy; 2025 Wake Up & Rise. All rights reserved.</p>
            <div className="footer-links">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
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
          justify-content: center;
          padding: 150px 20px 100px;
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .hero-text {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .hero-text h1 {
          font-size: 8rem;
          font-weight: 800;
          margin: 0;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 0.95;
          letter-spacing: -0.04em;
        }

        .hero-subheadline {
          font-size: 1.5rem;
          color: #64748b;
          max-width: 700px;
          margin: 0;
          line-height: 1.5;
          font-weight: 400;
        }

        .hero-social-proof {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.1rem;
          color: #475569;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .stars {
          color: #fbbf24;
          font-size: 1.2rem;
          letter-spacing: 2px;
        }

        .rating-text {
          font-weight: 700;
          color: #1e293b;
        }

        .divider {
          color: #cbd5e1;
        }

        .downloads {
          font-weight: 600;
          color: #64748b;
        }

        .hero-store-badges {
          display: flex;
          gap: 1rem;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 1rem;
        }

        .hero-store-badges .store-badge {
          display: inline-block;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hero-store-badges .store-badge img {
          height: 60px;
          width: auto;
          display: block;
        }

        .hero-store-badges .store-badge:last-child img {
          height: 90px;
          margin: -15px 0;
        }

        .hero-store-badges .store-badge:hover {
          transform: translateY(-4px);
          opacity: 0.85;
        }

        .btn-primary {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          color: white;
          padding: 1.25rem 3rem;
          border: none;
          border-radius: 100px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          display: inline-block;
          box-shadow: 0 4px 20px rgba(30, 64, 175, 0.2);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(30, 64, 175, 0.4);
        }

        /* Comparison Slider Section */
        .comparison-section {
          padding: 6rem 0;
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
        }

        /* Carousel Navigation */
        .comparison-carousel-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          margin: 3rem auto 0;
        }

        .carousel-arrow {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: 2px solid rgba(226, 232, 240, 0.8);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: #64748b;
        }

        .carousel-arrow:hover {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          border-color: transparent;
          color: white;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(30, 64, 175, 0.2);
        }

        .carousel-arrow svg {
          width: 20px;
          height: 20px;
        }

        .comparison-carousel-dots {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
        }

        .carousel-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(30, 64, 175, 0.2);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .carousel-dot:hover {
          background: rgba(30, 64, 175, 0.4);
          transform: scale(1.2);
        }

        .carousel-dot.active {
          width: 32px;
          border-radius: 5px;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          box-shadow: 0 2px 8px rgba(30, 64, 175, 0.3);
        }

        .comparison-tabs {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin: 3rem auto 2rem;
          max-width: 600px;
        }

        .comparison-tab {
          flex: 1;
          padding: 1rem 1.5rem;
          background: white;
          border: 2px solid rgba(226, 232, 240, 0.8);
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Inter', sans-serif;
        }

        .comparison-tab:hover {
          border-color: #1e40af;
          color: #1e40af;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(30, 64, 175, 0.1);
        }

        .comparison-tab.active {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          border-color: #1e40af;
          color: white;
          box-shadow: 0 4px 15px rgba(30, 64, 175, 0.15);
        }

        .comparison-slider-container {
          max-width: 900px;
          margin: 4rem auto 0;
        }

        .comparison-wrapper {
          position: relative;
          width: 100%;
          min-height: 600px;
          overflow: hidden;
          border-radius: 24px;
        }

        .comparison-before,
        .comparison-after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .comparison-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
        }

        .comparison-phone {
          width: 240px;
          margin-bottom: 1.5rem;
        }

        .comparison-phone-bezel {
          background: linear-gradient(145deg, #1e293b, #0f172a);
          border-radius: 40px;
          padding: 4px;
          box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.2),
            0 0 0 2px rgba(51, 65, 85, 0.4),
            inset 0 1px 2px rgba(255, 255, 255, 0.15);
          position: relative;
        }

        .comparison-notch {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 12px;
          height: 12px;
          background: radial-gradient(circle at 30% 30%, #1a1f3a, #000000);
          border-radius: 50%;
          z-index: 10;
          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 0.1),
            0 0 0 1px rgba(100, 100, 150, 0.2),
            0 1px 3px rgba(0, 0, 0, 0.5);
        }

        .comparison-notch::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 4px;
          height: 4px;
          background: rgba(100, 150, 255, 0.3);
          border-radius: 50%;
          filter: blur(1px);
        }

        .comparison-screen {
          aspect-ratio: 9 / 19.5;
          border-radius: 36px;
          overflow: hidden;
          position: relative;
        }

        .before-screen {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
        }

        .after-screen {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
        }

        .alarm-ui {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          gap: 1.5rem;
        }

        .alarm-icon {
          font-size: 4rem;
          animation: pulse-icon 2s ease-in-out infinite;
        }

        .harsh-icon {
          filter: drop-shadow(0 0 20px rgba(255, 0, 0, 0.5));
        }

        .gentle-icon {
          filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.5));
        }

        @keyframes pulse-icon {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .alarm-time-display {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .harsh-time {
          color: #ffffff;
          text-shadow: 0 0 30px rgba(255, 0, 0, 0.8);
        }

        .gentle-time {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .alarm-label {
          font-size: 1.2rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .harsh-label {
          color: #ffffff;
          animation: blink 1s step-start infinite;
        }

        @keyframes blink {
          50% { opacity: 0.5; }
        }

        .gentle-label {
          color: #64748b;
        }

        .volume-indicator {
          display: flex;
          gap: 0.5rem;
          align-items: flex-end;
          height: 60px;
        }

        .volume-bar {
          width: 12px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .volume-bar:nth-child(1) { height: 20%; }
        .volume-bar:nth-child(2) { height: 40%; }
        .volume-bar:nth-child(3) { height: 60%; }
        .volume-bar:nth-child(4) { height: 80%; }
        .volume-bar:nth-child(5) { height: 100%; }

        .harsh-volume .volume-bar.full {
          background: #ffffff;
          box-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
          animation: shake 0.5s ease-in-out infinite;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }

        .gentle-volume .volume-bar.filled {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
        }

        .gentle-volume .volume-bar.partial {
          background: linear-gradient(135deg, #1e40af 0%, rgba(30, 64, 175, 0.3) 100%);
        }

        .alarm-actions {
          margin-top: 1rem;
        }

        .alarm-btn {
          padding: 1rem 3rem;
          border: none;
          border-radius: 100px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .harsh-btn {
          background: #ffffff;
          color: #dc2626;
          box-shadow: 0 4px 20px rgba(255, 0, 0, 0.3);
        }

        .harsh-btn:hover {
          transform: scale(1.05);
        }

        .gentle-btn {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          color: white;
          box-shadow: 0 4px 20px rgba(30, 64, 175, 0.3);
        }

        .gentle-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(30, 64, 175, 0.4);
        }

        /* Routine UI Styles */
        .routine-ui {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 2rem 1.5rem;
          gap: 1.5rem;
        }

        .routine-ui.basic {
          justify-content: flex-start;
        }

        .routine-ui.guided {
          justify-content: center;
        }

        .routine-header {
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 1rem;
        }

        .harsh-text {
          color: #ffffff;
        }

        .gentle-text {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .routine-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .routine-item {
          font-size: 1.1rem;
          color: #ffffff;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }

        .routine-progress {
          margin-bottom: 2rem;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(30, 64, 175, 0.2);
          border-radius: 100px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
          width: 40%;
          height: 100%;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          border-radius: 100px;
          animation: progress-pulse 2s ease-in-out infinite;
        }

        @keyframes progress-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .progress-text {
          font-size: 0.9rem;
          color: #64748b;
          text-align: center;
        }

        .routine-current {
          text-align: center;
          padding: 2rem;
          background: rgba(30, 64, 175, 0.05);
          border-radius: 16px;
          border: 2px solid rgba(30, 64, 175, 0.1);
        }

        .routine-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .routine-name {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .routine-timer {
          font-size: 1rem;
          color: #64748b;
        }

        /* Audio UI Styles */
        .audio-ui {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 2rem 1.5rem;
          gap: 1.5rem;
        }

        .audio-ui.basic {
          justify-content: flex-start;
        }

        .audio-ui.custom {
          justify-content: center;
        }

        .audio-header {
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 1rem;
        }

        .audio-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .audio-option {
          font-size: 1.1rem;
          color: #ffffff;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          text-align: center;
        }

        .audio-categories {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .audio-category {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(30, 64, 175, 0.05);
          border: 2px solid rgba(30, 64, 175, 0.1);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .audio-category:hover {
          background: rgba(30, 64, 175, 0.1);
          border-color: rgba(30, 64, 175, 0.2);
        }

        .category-icon {
          font-size: 2rem;
        }

        .category-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e293b;
        }

        .import-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .import-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(30, 64, 175, 0.3);
        }

        .comparison-label {
          font-size: 1.25rem;
          font-weight: 700;
          text-align: center;
        }

        .before-label {
          color: #dc2626;
        }

        .after-label {
          color: #1e40af;
        }

        .comparison-slider {
          position: absolute;
          top: 0;
          left: 50%;
          width: 4px;
          height: 100%;
          background: transparent;
          cursor: ew-resize;
          z-index: 100;
        }

        .slider-handle {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .slider-handle-line {
          flex: 1;
          width: 2px;
          background: linear-gradient(to bottom,
            transparent 0%,
            white 10%,
            white 90%,
            transparent 100%);
        }

        .slider-handle-circle {
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          color: #1e40af;
          cursor: grab;
          transition: all 0.3s ease;
        }

        .slider-handle-circle:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 30px rgba(30, 64, 175, 0.4);
        }

        .slider-handle-circle:active {
          cursor: grabbing;
        }

        /* Routine Screens */
        .routine-before-screen {
          background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
        }

        .routine-after-screen {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
        }

        .routine-ui {
          height: 100%;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .routine-header {
          font-size: 1.3rem;
          font-weight: 700;
          text-align: center;
        }

        .harsh-text {
          color: #374151;
        }

        .gentle-text {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .routine-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .routine-item {
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 8px;
          font-size: 0.95rem;
          color: #374151;
        }

        .routine-progress {
          text-align: center;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(30, 64, 175, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
          width: 40%;
          height: 100%;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          border-radius: 4px;
        }

        .progress-text {
          font-size: 0.9rem;
          color: #64748b;
        }

        .routine-current {
          background: rgba(255, 255, 255, 0.8);
          padding: 2rem 1.5rem;
          border-radius: 16px;
          text-align: center;
        }

        .routine-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .routine-name {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .routine-timer {
          font-size: 1rem;
          color: #64748b;
        }

        /* Audio Screens */
        .audio-before-screen {
          background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
        }

        .audio-after-screen {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
        }

        .audio-ui {
          height: 100%;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .audio-header {
          font-size: 1.3rem;
          font-weight: 700;
          text-align: center;
        }

        .audio-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .audio-option {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 8px;
          font-size: 0.95rem;
          color: #374151;
        }

        .audio-categories {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          flex: 1;
        }

        .audio-category {
          background: rgba(255, 255, 255, 0.8);
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .category-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .category-name {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
        }

        .import-btn {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }

        /* Settings Screens */
        .settings-before-screen {
          background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
        }

        .settings-after-screen {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
        }

        .settings-ui {
          height: 100%;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .settings-header {
          font-size: 1.3rem;
          font-weight: 700;
          text-align: center;
        }

        .settings-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .setting-item {
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 6px;
          font-size: 0.85rem;
          color: #374151;
        }

        .settings-cards {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex: 1;
        }

        .setting-card {
          background: rgba(255, 255, 255, 0.8);
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .card-icon {
          font-size: 2rem;
        }

        .card-title {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
        }

        .card-value {
          font-size: 0.9rem;
          color: #64748b;
        }

        @media (max-width: 768px) {
          .comparison-wrapper {
            min-height: 650px;
          }

          .comparison-phone {
            width: 220px;
          }

          .comparison-content {
            padding: 2.5rem 1.5rem;
          }

          .comparison-label {
            font-size: 1.1rem;
          }

          .alarm-ui {
            gap: 1.25rem;
            padding: 1.75rem 1.25rem;
          }

          .alarm-time-display {
            font-size: 2.75rem;
          }

          .alarm-icon {
            font-size: 3rem;
          }

          .alarm-label {
            font-size: 1rem;
          }

          .alarm-btn {
            padding: 0.875rem 2.5rem;
            font-size: 0.95rem;
          }

          .volume-indicator {
            height: 50px;
          }

          .volume-bar {
            width: 10px;
          }

          .routine-ui {
            padding: 1.75rem 1.25rem;
            gap: 1.25rem;
          }

          .routine-header {
            font-size: 1.15rem;
          }

          .routine-item {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
          }

          .routine-icon {
            font-size: 2.75rem;
          }

          .routine-name {
            font-size: 1.1rem;
          }

          .routine-timer {
            font-size: 0.95rem;
          }

          .routine-current {
            padding: 1.75rem 1.25rem;
          }

          .progress-text {
            font-size: 0.85rem;
          }

          .audio-ui {
            padding: 1.75rem 1.25rem;
            gap: 1.25rem;
          }

          .audio-header {
            font-size: 1.15rem;
          }

          .audio-option {
            padding: 0.875rem 1rem;
            font-size: 0.9rem;
          }

          .audio-category {
            padding: 1.5rem 1.25rem;
          }

          .category-icon {
            font-size: 2.25rem;
          }

          .category-name {
            font-size: 0.95rem;
          }

          .import-btn {
            padding: 0.875rem 2rem;
            font-size: 0.95rem;
          }

          .slider-handle-circle {
            width: 50px;
            height: 50px;
          }

          .slider-handle-circle svg {
            width: 20px;
            height: 20px;
          }

          .comparison-tabs {
            gap: 0.5rem;
            max-width: 100%;
          }

          .comparison-tab {
            padding: 0.875rem 1.25rem;
            font-size: 0.95rem;
            border-radius: 10px;
          }

          .section-title {
            font-size: 2.25rem;
          }

          .section-subtitle {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .comparison-wrapper {
            min-height: 600px;
          }

          .comparison-phone {
            width: 200px;
          }

          .comparison-content {
            padding: 2rem 1rem;
          }

          .comparison-label {
            font-size: 1rem;
          }

          .alarm-ui {
            gap: 1rem;
            padding: 1.5rem 1rem;
          }

          .alarm-time-display {
            font-size: 2.5rem;
          }

          .alarm-icon {
            font-size: 2.5rem;
          }

          .alarm-label {
            font-size: 0.95rem;
          }

          .alarm-btn {
            padding: 0.75rem 2rem;
            font-size: 0.9rem;
          }

          .volume-indicator {
            height: 45px;
          }

          .volume-bar {
            width: 9px;
          }

          .routine-ui {
            padding: 1.5rem 1rem;
            gap: 1rem;
          }

          .routine-header {
            font-size: 1.05rem;
          }

          .routine-item {
            padding: 0.625rem 0.875rem;
            font-size: 0.85rem;
          }

          .routine-icon {
            font-size: 2.5rem;
          }

          .routine-name {
            font-size: 1rem;
          }

          .routine-timer {
            font-size: 0.9rem;
          }

          .routine-current {
            padding: 1.5rem 1rem;
          }

          .progress-text {
            font-size: 0.8rem;
          }

          .audio-ui {
            padding: 1.5rem 1rem;
            gap: 1rem;
          }

          .audio-header {
            font-size: 1.05rem;
          }

          .audio-option {
            padding: 0.75rem 0.875rem;
            font-size: 0.85rem;
          }

          .audio-category {
            padding: 1.25rem 1rem;
          }

          .category-icon {
            font-size: 2rem;
          }

          .category-name {
            font-size: 0.9rem;
          }

          .import-btn {
            padding: 0.75rem 1.75rem;
            font-size: 0.9rem;
          }

          .comparison-tab {
            padding: 0.75rem 1rem;
            font-size: 0.85rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .section-subtitle {
            font-size: 1rem;
          }
        }

        .section-title {
          text-align: center;
          font-size: 3rem;
          line-height: 3.5rem;
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
          padding: 6rem 0 8rem;
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

        .download-buttons .store-badge:last-child img {
          height: 90px;
          margin: -15px 0;
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
          background: #f8fafc;
          padding: 2rem 0;
          border-top: 1px solid rgba(226, 232, 240, 0.8);
        }

        .copyright {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #64748b;
          font-size: 0.9rem;
        }

        .copyright p {
          margin: 0;
        }

        .footer-links {
          display: flex;
          gap: 1.5rem;
        }

        .footer-links a {
          color: #64748b;
          text-decoration: none;
          transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .footer-links a:hover {
          color: #1e40af;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .hero-text h1 {
            font-size: 4rem;
          }

          .hero-subheadline {
            font-size: 1.15rem;
          }

          .hero-social-proof {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            font-size: 1rem;
          }

          .hero-social-proof .divider {
            display: none;
          }

          .hero-store-badges .store-badge img {
            height: 50px;
          }

          .hero-store-badges .store-badge:last-child img {
            height: 70px;
            margin: -10px 0;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .download-buttons {
            flex-direction: column;
            align-items: center;
          }

          .email-form {
            flex-direction: column;
          }

          .copyright {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
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