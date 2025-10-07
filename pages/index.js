import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Wifi, Battery, Sun, Newspaper, Sparkles, Music, Bell, Guitar, Piano, CloudRain, Waves, Coffee, Flower2, Flame } from 'lucide-react';

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
              <p className="hero-subheadline">The alarm that&rsquo;s a pleasure, not a pain. Wake up better, every day.</p>
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
                              <div className="status-bar">
                                <span className="time-text">7:00 AM</span>
                                <div className="status-icons">
                                  <Wifi size={16} strokeWidth={1} />
                                  <Battery size={16} strokeWidth={1} />
                                </div>
                              </div>
                              <div className="alarm-content-center">
                                <div className="alarm-icon-large harsh-icon"><Bell size={48} strokeWidth={1} /></div>
                                <div className="alarm-time-large harsh-time">7:00</div>
                                <div className="alarm-label-caps harsh-label">ALARM</div>
                                <div className="volume-bars-container">
                                  <div className="volume-bar-item maxed"></div>
                                  <div className="volume-bar-item maxed"></div>
                                  <div className="volume-bar-item maxed"></div>
                                  <div className="volume-bar-item maxed"></div>
                                  <div className="volume-bar-item maxed"></div>
                                </div>
                              </div>
                              <div className="alarm-bottom-actions">
                                <button className="alarm-stop-btn harsh-btn">STOP</button>
                                <button className="alarm-snooze-text">Snooze</button>
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
                              <div className="status-bar gentle-status">
                                <span className="time-text">7:00 AM</span>
                                <div className="status-icons">
                                  <Wifi size={16} strokeWidth={1} />
                                  <Battery size={16} strokeWidth={1} />
                                </div>
                              </div>
                              <div className="alarm-content-center">
                                <div className="weather-widget">
                                  <Sun size={24} strokeWidth={1.25} className="weather-icon" style={{color: '#c47900ff'}} />
                                  <span className="weather-temp">72°F</span>
                                </div>
                                <div className="alarm-time-large gentle-time">7:00</div>
                                <div className="alarm-label-soft gentle-label">Good Morning, Alex</div>
                                <div className="alarm-subtitle">Playing: Morning Meditation Mix</div>

                                <div className="quick-actions">
                                  <div className="quick-action-item">
                                    <Coffee size={20} strokeWidth={1.25} className="action-icon" style={{color: '#7a541fff'}} />
                                    <span className="action-label">Coffee</span>
                                  </div>
                                  <div className="quick-action-item">
                                    <Flower2 size={20} strokeWidth={1.25} className="action-icon" style={{color: '#7a289bff'}} />
                                    <span className="action-label">Meditate</span>
                                  </div>
                                  <div className="quick-action-item">
                                    <Newspaper size={20} strokeWidth={1.25} className="action-icon" style={{color: '#1b5277ff'}} />
                                    <span className="action-label">News</span>
                                  </div>
                                </div>
                              </div>
                              <div className="alarm-bottom-actions">
                                <button className="alarm-dismiss-btn gentle-btn">I&apos;m Awake! <Sparkles size={16} strokeWidth={1.25} style={{display: 'inline', color: '#9e7e00ff'}} /></button>
                                <button className="alarm-snooze-text gentle-snooze">Snooze 10 min</button>
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
                              <div className="status-bar">
                                <span className="time-text">7:05 AM</span>
                                <div className="status-icons">
                                  <Wifi size={16} strokeWidth={1} />
                                  <Battery size={16} strokeWidth={1} />
                                </div>
                              </div>
                              <div className="routine-header">Morning TODO</div>
                              <div className="routine-list-basic">
                                <div className="routine-item-basic">☐ Wake up</div>
                                <div className="routine-item-basic">☐ Shower</div>
                                <div className="routine-item-basic">☐ Breakfast</div>
                                <div className="routine-item-basic">☐ Get dressed</div>
                                <div className="routine-item-basic">☐ Leave house</div>
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
                              <div className="status-bar gentle-status">
                                <span className="time-text">7:05 AM</span>
                                <div className="status-icons">
                                  <Wifi size={16} strokeWidth={1} />
                                  <Battery size={16} strokeWidth={1} />
                                </div>
                              </div>
                              <div className="routine-header-modern">Morning Flow</div>
                              <div className="routine-progress-modern">
                                <div className="progress-bar-modern">
                                  <div className="progress-fill-modern"></div>
                                </div>
                                <div className="routine-stats">
                                  <span className="progress-text-modern">Step 2 of 5</span>
                                  <span className="streak-indicator"> 12 day streak</span>
                                </div>
                              </div>
                              <div className="routine-current-card">
                                <div className="routine-icon-large"><Flower2 size={40} strokeWidth={1.5} style={{color: '#7c3697ff'}} /></div>
                                <div className="routine-name-large">Guided Meditation</div>
                                <div className="routine-description">Focus on your breathing</div>
                                <div className="routine-timer-display">
                                  <div className="timer-circle-modern">
                                    <svg className="timer-ring" viewBox="0 0 120 120">
                                      <circle cx="60" cy="60" r="54" className="timer-ring-bg"/>
                                      <circle cx="60" cy="60" r="54" className="timer-ring-progress"/>
                                    </svg>
                                    <span className="timer-text">2:30</span>
                                  </div>
                                  <div className="timer-label">of 5:00 remaining</div>
                                </div>
                                <div className="routine-audio-playing">
                                  <div className="audio-wave">
                                    <span className="wave-bar"></span>
                                    <span className="wave-bar"></span>
                                    <span className="wave-bar"></span>
                                    <span className="wave-bar"></span>
                                  </div>
                                  <span className="audio-title">Peaceful Morning Sounds</span>
                                </div>
                              </div>
                              <div className="routine-actions">
                                <button className="routine-skip-btn">Skip</button>
                                <button className="routine-next-btn">Complete ✓</button>
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
                              <div className="status-bar">
                                <span className="time-text">6:55 PM</span>
                                <div className="status-icons">
                                  <Wifi size={16} strokeWidth={1} />
                                  <Battery size={16} strokeWidth={1} />
                                </div>
                              </div>
                              <div className="audio-header-basic">Select Sound</div>
                              <div className="audio-list-basic">
                                <div className="audio-option-basic"><Bell size={16} strokeWidth={1} style={{display: 'inline', marginRight: '8px'}} /> Default 1</div>
                                <div className="audio-option-basic"><Bell size={16} strokeWidth={1} style={{display: 'inline', marginRight: '8px'}} /> Default 2</div>
                                <div className="audio-option-basic"><Bell size={16} strokeWidth={1} style={{display: 'inline', marginRight: '8px'}} /> Default 3</div>
                                <div className="audio-option-basic"><Bell size={16} strokeWidth={1} style={{display: 'inline', marginRight: '8px'}} /> Default 4</div>
                                <div className="audio-option-basic"><Bell size={16} strokeWidth={1} style={{display: 'inline', marginRight: '8px'}} /> Default 5</div>
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
                              <div className="status-bar gentle-status">
                                <span className="time-text">6:55 PM</span>
                                <div className="status-icons">
                                  <Wifi size={16} strokeWidth={1} />
                                  <Battery size={16} strokeWidth={1} />
                                </div>
                              </div>
                              <div className="audio-header-modern">Your Audio</div>
                              <div className="audio-grid-modern">
                                <div className="audio-card-modern featured">
                                  <div className="card-icon-large"><Music size={32} strokeWidth={1.5} style={{color: '#E74C3C'}} /></div>
                                  <div className="card-title">Sunrise Sessions</div>
                                  <div className="card-meta">
                                    <span className="card-count">24 tracks</span>
                                    <span className="card-duration">2.5 hrs</span>
                                  </div>
                                  <div className="card-preview">
                                    <div className="preview-waveform">
                                      <span className="waveform-bar"></span>
                                      <span className="waveform-bar"></span>
                                      <span className="waveform-bar"></span>
                                      <span className="waveform-bar"></span>
                                      <span className="waveform-bar"></span>
                                      <span className="waveform-bar"></span>
                                    </div>
                                  </div>
                                </div>
                                <div className="audio-card-modern">
                                  <div className="card-icon-large"><Waves size={32} strokeWidth={1.5} style={{color: '#3498DB'}} /></div>
                                  <div className="card-title">DJ Mixes</div>
                                  <div className="card-meta">
                                    <span className="card-count">8 mixes</span>
                                    <span className="card-duration">12 hrs</span>
                                  </div>
                                  <div className="card-tags">
                                    <span className="tag">Electronic</span>
                                    <span className="tag">Chill</span>
                                  </div>
                                </div>
                                <div className="audio-card-modern">
                                  <div className="card-icon-large"><Guitar size={32} strokeWidth={1.5} style={{color: '#E67E22'}} /></div>
                                  <div className="card-title">Live Sets</div>
                                  <div className="card-meta">
                                    <span className="card-count">12 sets</span>
                                    <span className="card-duration">8 hrs</span>
                                  </div>
                                  <div className="card-tags">
                                    <span className="tag">Rock</span>
                                    <span className="tag">Indie</span>
                                  </div>
                                </div>
                              </div>
                              <div className="audio-actions">
                                <button className="import-btn-modern">
                                  + Import Audio
                                </button>
                              </div>
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
          margin: 0rem auto 0;
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
          overflow-y: scroll;
          overflow-x: hidden;
          position: relative;
          scroll-behavior: smooth;
        }

        .comparison-screen::-webkit-scrollbar {
          width: 3px;
        }

        .comparison-screen::-webkit-scrollbar-track {
          background: transparent;
        }

        .comparison-screen::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }

        .comparison-screen::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .before-screen {
          background: #dc2626;
        }

        .after-screen {
          background: #60a5fa;
        }

        /* Status Bar */
        .status-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.25rem;
          font-size: 0.875rem;
          font-weight: 500;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
          z-index: 10;
        }

        .status-bar .time-text {
          color: #ffffff;
          font-weight: 600;
        }

        .status-bar .status-icons {
          display: flex;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .status-bar.gentle-status .time-text {
          color: rgba(255, 255, 255, 0.95);
        }

        /* Alarm UI */
        .alarm-ui {
          min-height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0;
          position: relative;
        }

        .alarm-ui.harsh {
          background: #dc2626;
          min-height: 100%;
        }

        .alarm-ui.gentle {
          background: #60a5fa;
          min-height: 100%;
        }

        .alarm-content-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem 1rem;
          margin-top: 44px;
        }

        .alarm-icon-large {
          font-size: 3rem;
          margin-bottom: 0.75rem;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
        }

        .harsh-icon {
          opacity: 1;
          animation: shake-harsh 0.5s ease-in-out infinite;
        }

        @keyframes shake-harsh {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        .gentle-icon {
          opacity: 1;
          animation: gentle-glow 2s ease-in-out infinite;
        }

        @keyframes gentle-glow {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.05); opacity: 1; }
        }

        .alarm-time-large {
          font-size: 3.5rem;
          font-weight: 200;
          letter-spacing: -0.04em;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .harsh-time {
          color: #ffffff;
        }

        .gentle-time {
          color: #ffffff;
        }

        .alarm-label-caps {
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .alarm-label-soft {
          font-size: 1.1rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          margin-bottom: 0.5rem;
        }

        .harsh-label {
          color: rgba(255, 255, 255, 0.95);
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .gentle-label {
          color: rgba(255, 255, 255, 0.9);
        }

        .volume-bars-container {
          display: flex;
          gap: 0.5rem;
          align-items: flex-end;
          height: 60px;
        }

        .volume-bar-item {
          width: 10px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 5px;
          transition: all 0.3s ease;
        }

        .volume-bar-item:nth-child(1) { height: 20%; }
        .volume-bar-item:nth-child(2) { height: 40%; }
        .volume-bar-item:nth-child(3) { height: 60%; }
        .volume-bar-item:nth-child(4) { height: 80%; }
        .volume-bar-item:nth-child(5) { height: 100%; }

        .volume-bar-item.maxed {
          background: rgba(254, 226, 226, 0.95);
          box-shadow: 0 2px 12px rgba(254, 226, 226, 0.6);
          animation: pulse-bars 0.6s ease-in-out infinite alternate;
        }

        @keyframes pulse-bars {
          0% { opacity: 0.8; }
          100% { opacity: 1; }
        }

        .volume-progress-modern {
          width: 100%;
          max-width: 200px;
        }

        .progress-track {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 100px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill-gentle {
          width: 40%;
          height: 100%;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 100px;
          transition: width 0.3s ease;
        }

        .volume-text {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.8);
          text-align: center;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        /* New Alarm UI Features */
        .weather-widget {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          background: rgba(255, 255, 255, 0.15);
          padding: 0.375rem 0.75rem;
          border-radius: 16px;
          margin-bottom: 0.75rem;
          backdrop-filter: blur(10px);
        }

        .weather-icon {
          font-size: 1.1rem;
        }

        .weather-temp {
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .alarm-subtitle {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 0.75rem;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .volume-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.375rem;
        }

        .volume-icon {
          font-size: 0.85rem;
        }

        .volume-percentage {
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .quick-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.75rem;
          justify-content: center;
        }

        .quick-action-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          background: rgba(255, 255, 255, 0.15);
          padding: 0.5rem 0.625rem;
          border-radius: 10px;
          backdrop-filter: blur(10px);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .quick-action-item:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .action-icon {
          font-size: 1.25rem;
        }

        .action-label {
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.85);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
          font-weight: 500;
        }

        .alarm-bottom-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1rem;
          padding-bottom: 1.5rem;
        }

        .alarm-stop-btn,
        .alarm-dismiss-btn {
          width: 100%;
          padding: 0.875rem;
          border: none;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .alarm-stop-btn {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          backdrop-filter: blur(10px);
        }

        .alarm-dismiss-btn {
          background: rgba(255, 255, 255, 0.95);
          color: #3b82f6;
        }

        .alarm-snooze-text {
          width: 100%;
          padding: 0.625rem;
          background: transparent;
          color: rgba(255, 255, 255, 0.7);
          border: none;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .gentle-snooze {
          color: rgba(255, 255, 255, 0.85);
        }

        /* Routine UI Styles */
        .routine-ui {
          min-height: 100%;
          display: flex;
          flex-direction: column;
          padding: 0;
          position: relative;
        }

        .routine-ui.basic {
          justify-content: flex-start;
          background: #dc2626;
          min-height: 100%;
        }

        .routine-ui.guided {
          justify-content: flex-start;
          background: #60a5fa;
          min-height: 100%;
        }

        .routine-header {
          font-size: 1.5rem;
          font-weight: 700;
          text-align: left;
          padding: 3.5rem 1rem 0.75rem;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
        }

        .harsh-text {
          color: #ffffff;
        }

        .gentle-text {
          color: #ffffff;
        }

        .routine-list-basic {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
          padding: 0 1.5rem;
        }

        .routine-item-basic {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.85);
          padding: 1.125rem 1rem;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          text-align: left;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
          font-weight: 400;
        }

        .routine-header-modern {
          font-size: 1.35rem;
          font-weight: 700;
          text-align: left;
          padding: 1.5rem 1rem 0.75rem;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
        }

        .routine-progress-modern {
          padding: 0 1rem 0rem;
        }

        .progress-bar-modern {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.25);
          border-radius: 100px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill-modern {
          width: 40%;
          height: 100%;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 100px;
          transition: width 0.3s ease;
        }

        .progress-text-modern {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.75);
          text-align: left;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
          font-weight: 500;
        }

        .routine-current-card {
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1rem 1rem;
          margin: 0 1rem 0.75rem;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        .routine-icon-large {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .routine-name-large {
          font-size: 1.15rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.375rem;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
        }

        .routine-timer-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.375rem;
          margin-bottom: 0.75rem;
        }

        .timer-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: 3px solid rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .timer-text {
          font-size: 1.5rem;
          font-weight: 300;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
          position: relative;
          z-index: 10;
        }

        .timer-label {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.75);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .routine-next-btn {
          flex: 1;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.95);
          color: #3b82f6;
          border: none;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        /* New Routine UI Features */
        .routine-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .streak-indicator {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.85);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
          font-weight: 600;
        }

        .routine-badge {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: rgba(255, 255, 255, 0.25);
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.95);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }

        .routine-description {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 0.75rem;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .timer-circle-modern {
          position: relative;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .timer-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .timer-ring-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.2);
          stroke-width: 4;
        }

        .timer-ring-progress {
          fill: none;
          stroke: rgba(255, 255, 255, 0.9);
          stroke-width: 4;
          stroke-dasharray: 339.292;
          stroke-dashoffset: 135.717;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.3s ease;
        }

        .routine-audio-playing {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem 0.75rem;
          border-radius: 10px;
          margin-top: 0.5rem;
        }

        .audio-wave {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          height: 16px;
        }

        .wave-bar {
          width: 2px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 2px;
          animation: wave-animation 1.2s ease-in-out infinite;
        }

        .wave-bar:nth-child(1) { height: 40%; animation-delay: 0s; }
        .wave-bar:nth-child(2) { height: 70%; animation-delay: 0.1s; }
        .wave-bar:nth-child(3) { height: 100%; animation-delay: 0.2s; }
        .wave-bar:nth-child(4) { height: 60%; animation-delay: 0.3s; }

        @keyframes wave-animation {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }

        .audio-title {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.85);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
          font-weight: 500;
        }

        .routine-actions {
          display: flex;
          gap: 0.5rem;
          padding: 0 1rem 1.25rem;
        }

        .routine-skip-btn {
          flex: 0.4;
          padding: 0.75rem;
          background: transparent;
          color: rgba(255, 255, 255, 0.8);
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .routine-skip-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        /* Audio UI Styles */
        .audio-ui {
          min-height: 100%;
          display: flex;
          flex-direction: column;
          padding: 0;
          position: relative;
        }

        .audio-ui.basic {
          justify-content: flex-start;
          background: #dc2626;
          min-height: 100%;
        }

        .audio-ui.custom {
          justify-content: flex-start;
          background: #60a5fa;
          min-height: 100%;
        }

        .audio-header-basic {
          font-size: 2rem;
          font-weight: 700;
          text-align: left;
          padding: 4.5rem 1.5rem 1.5rem;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
        }

        .audio-header-modern {
          font-size: 1.35rem;
          font-weight: 700;
          text-align: left;
          padding: 1.5rem 1rem 0.75rem;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
        }

        .audio-list-basic {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0 1rem;
        }

        .audio-option-basic {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.85);
          padding: 0.875rem 0.75rem;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          text-align: left;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .audio-grid-modern {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.625rem;
          padding: 0 1rem;
          margin-bottom: 0.75rem;
        }

        .audio-card-modern {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem 1rem;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          text-align: center;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .audio-card-modern:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .card-icon-large {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
        }

        .card-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.25rem;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
        }

        .card-count {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.75);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .audio-actions {
          display: flex;
          gap: 0.5rem;
          padding: 0 1rem 1.25rem;
        }

        .import-btn-modern {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.95);
          color: #3b82f6;
          border: none;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .import-btn-modern:hover {
          background: rgba(255, 255, 255, 1);
          transform: translateY(-1px);
        }

        .btn-icon {
          font-size: 1rem;
          line-height: 1;
        }

        /* New Audio UI Features */
        .audio-search-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.15);
          padding: 0.625rem 0.875rem;
          border-radius: 10px;
          margin: 0 1rem 0.75rem;
          backdrop-filter: blur(10px);
        }

        .search-icon {
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .search-placeholder {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .audio-card-modern.featured {
          background: rgba(255, 255, 255, 0.2);
          border: 1.5px solid rgba(255, 255, 255, 0.3);
        }

        .card-badge {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.9));
          padding: 0.2rem 0.45rem;
          border-radius: 8px;
          font-size: 0.55rem;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .card-meta {
          display: flex;
          gap: 0.5rem;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.7);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .card-duration {
          font-weight: 500;
        }

        .card-preview {
          width: 100%;
          margin-top: 0.5rem;
        }

        .preview-waveform {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.2rem;
          height: 20px;
          padding: 0 0.25rem;
        }

        .waveform-bar {
          flex: 1;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .waveform-bar:nth-child(1) { height: 40%; }
        .waveform-bar:nth-child(2) { height: 70%; }
        .waveform-bar:nth-child(3) { height: 55%; }
        .waveform-bar:nth-child(4) { height: 85%; }
        .waveform-bar:nth-child(5) { height: 45%; }
        .waveform-bar:nth-child(6) { height: 65%; }

        .card-tags {
          display: flex;
          gap: 0.375rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .tag {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.2rem 0.5rem;
          border-radius: 8px;
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.85);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
          font-weight: 500;
        }

        .comparison-label {
          font-size: 1.25rem;
          font-weight: 700;
          text-align: center;
        }

        .before-label {
          color: #dc2626;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .after-label {
          color: #3b82f6;
          font-weight: 700;
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
          padding: 2rem .5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .routine-header {
          font-size: 1.3rem;
          font-weight: 700;
          text-align: center;
          color: #fff;
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
          padding: 2rem .5rem;
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
          color: #fff;
        }

        .card-value {
          font-size: 0.9rem;
          color: #64748b;
        }

        @media (max-width: 768px) {
          .comparison-wrapper {
            min-height: 650px;
          }

                  /* Carousel Navigation */
        .comparison-carousel-nav {
          margin: -2rem auto 0;
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