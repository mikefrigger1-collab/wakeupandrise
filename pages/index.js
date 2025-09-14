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

  return (
    <>
      <Head>
        <title>Wake Up & Rise - Smart Alarm Clock App</title>
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
              <li><a href="#testimonials">Reviews</a></li>
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
          <p className="section-subtitle">See how Wake Up & Rise changes your morning experience</p>
          <div className="comparison">
            <div className="comparison-card before fade-in">
              <h3>😫 Regular Alarm Apps</h3>
              <ul>
                <li>Sudden, jarring wake-ups</li>
                <li>Hit snooze 5+ times</li>
                <li>Feel groggy and irritated</li>
                <li>Miss alarms when phone is locked</li>
                <li>Same boring alarm sounds</li>
                <li>No motivation for morning routine</li>
              </ul>
            </div>
            <div className="comparison-card after fade-in">
              <h3>😊 Wake Up & Rise</h3>
              <ul>
                <li>Gentle, gradual volume ramping</li>
                <li>Wake up naturally and refreshed</li>
                <li>Excited to start your day</li>
                <li>Full-screen alarms that never fail</li>
                <li>Custom music and smart audio processing</li>
                <li>Guided morning routines for better habits</li>
              </ul>
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
          
          <div className="screenshot-carousel">
            <div className="screenshot">
              <div className="screenshot-content">
                Main Alarm<br />Interface
              </div>
            </div>
            <div className="screenshot">
              <div className="screenshot-content">
                Audio Selection<br />& Settings
              </div>
            </div>
            <div className="screenshot">
              <div className="screenshot-content">
                Morning Routine<br />Builder
              </div>
            </div>
            <div className="screenshot">
              <div className="screenshot-content">
                Full-Screen<br />Alarm Display
              </div>
            </div>
            <div className="screenshot">
              <div className="screenshot-content">
                Progress<br />Tracking
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="social-proof" id="testimonials">
        <div className="container">
          <h2 className="section-title">Join Thousands of Happy Morning People</h2>
          
          <div className="stats">
            <div className="stat fade-in">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Users transformed their mornings</div>
            </div>
            <div className="stat fade-in">
              <div className="stat-number">94%</div>
              <div className="stat-label">Report better morning mood</div>
            </div>
            <div className="stat fade-in">
              <div className="stat-number">15min</div>
              <div className="stat-label">Average earlier wake-up time</div>
            </div>
            <div className="stat fade-in">
              <div className="stat-number">4.8★</div>
              <div className="stat-label">App store rating</div>
            </div>
          </div>

<div className="testimonial fade-in">
  <p className="testimonial-text">&ldquo;This app transformed my mornings completely! I actually look forward to waking up now.&rdquo;</p>
  <p className="testimonial-author">- Sarah M.</p>
</div>
<div className="testimonial fade-in">
  <p className="testimonial-text">&ldquo;Finally, an alarm that doesn&rsquo;t ruin my day. The volume ramping is genius!&rdquo;</p>
  <p className="testimonial-author">- Mike D.</p>
</div>
<div className="testimonial fade-in">
  <p className="testimonial-text">&ldquo;The routine feature is a game-changer. I&rsquo;ve built habits I never thought possible.&rdquo;</p>
  <p className="testimonial-author">- Jessica L.</p>
</div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Transform your mornings in 3 simple steps</p>
          
          <div className="steps">
            <div className="step fade-in">
              <div className="step-number">1</div>
              <h3 className="step-title">Download & Set Your First Alarm</h3>
              <p className="step-description">Install Wake Up & Rise and set your first smart alarm. Choose your wake-up time and enable gentle volume ramping.</p>
            </div>
            <div className="step fade-in">
              <div className="step-number">2</div>
              <h3 className="step-title">Customize Your Audio & Style</h3>
              <p className="step-description">Import your favorite songs or choose from our premium sounds. Set up random start points and custom wallpapers.</p>
            </div>
            <div className="step fade-in">
              <div className="step-number">3</div>
              <h3 className="step-title">Add Morning Routines</h3>
              <p className="step-description">Build your perfect morning routine from our library of activities. Track your progress and build lasting habits.</p>
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
            <a href="#" className="app-store-btn">
              <div>📱 Download for iPhone</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>App Store</div>
            </a>
            <a href="#" className="app-store-btn">
              <div>🤖 Download for Android</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Google Play</div>
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
          color: #374151;
          background: #ffffff;
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
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #E0E7FF;
          transition: all 0.3s ease;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: #1E3A8A;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
        }

        .nav-links a {
          color: #374151;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .nav-links a:hover {
          color: #1E3A8A;
        }

        .download-nav-btn {
          background: #1E3A8A;
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.3s ease;
        }

        .download-nav-btn:hover {
          background: #3B82F6;
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 80px;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          width: 100%;
        }

        .hero-text h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          color: #1E3A8A;
          line-height: 1.2;
        }

        .hero-text p {
          font-size: 1.3rem;
          margin-bottom: 2rem;
          color: #6B7280;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: #1E3A8A;
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 6px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary:hover {
          background: #3B82F6;
        }

        .btn-secondary {
          background: transparent;
          color: #1E3A8A;
          padding: 1rem 2rem;
          border: 2px solid #1E3A8A;
          border-radius: 6px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-secondary:hover {
          background: #1E3A8A;
          color: white;
        }

        .phone-mockup {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .phone {
          width: 300px;
          height: 600px;
          background: #F9FAFB;
          border: 8px solid #1F2937;
          border-radius: 30px;
          padding: 20px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .phone-screen {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #E0E7FF 0%, #F0F4FF 100%);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .alarm-display {
          text-align: center;
          color: #1E3A8A;
        }

        .alarm-time {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .alarm-label {
          font-size: 1rem;
          opacity: 0.8;
        }

        /* Problem/Solution Section */
        .problem-solution {
          padding: 6rem 0;
          background: #F9FAFB;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #1E3A8A;
        }

        .section-subtitle {
          text-align: center;
          font-size: 1.2rem;
          color: #6B7280;
          margin-bottom: 3rem;
        }

        .comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-top: 3rem;
        }

        .comparison-card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #E5E7EB;
        }

        .comparison-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          font-weight: bold;
        }

        .before {
          border-left: 4px solid #EF4444;
        }

        .before h3 {
          color: #EF4444;
        }

        .after {
          border-left: 4px solid #10B981;
        }

        .after h3 {
          color: #10B981;
        }

        .comparison-card ul {
          list-style: none;
        }

        .comparison-card li {
          margin-bottom: 0.5rem;
          padding-left: 1.5rem;
          position: relative;
        }

        .before li::before {
          content: "✗";
          position: absolute;
          left: 0;
          color: #EF4444;
          font-weight: bold;
        }

        .feature-icon svg {
  width: 3rem;
  height: 3rem;
  color: #1E3A8A;
}

        .after li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #10B981;
          font-weight: bold;
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
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #E5E7EB;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(30, 58, 138, 0.1);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #1E3A8A;
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #1E3A8A;
        }

        .feature-description {
          color: #6B7280;
          line-height: 1.6;
        }

        /* Screenshots Section */
        .screenshots {
          padding: 6rem 0;
          background: #F9FAFB;
        }

        .screenshot-carousel {
          display: flex;
          gap: 2rem;
          margin-top: 3rem;
          overflow-x: auto;
          padding: 1rem 0;
        }

        .screenshot {
          min-width: 250px;
          height: 500px;
          background: #F9FAFB;
          border: 6px solid #1F2937;
          border-radius: 20px;
          padding: 15px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .screenshot:hover {
          transform: scale(1.02);
        }

        .screenshot-content {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #E0E7FF 0%, #F0F4FF 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1E3A8A;
          font-weight: bold;
          text-align: center;
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
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #E5E7EB;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          color: #1E3A8A;
        }

        .stat-label {
          color: #6B7280;
          margin-top: 0.5rem;
        }

        .testimonials {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .testimonial {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #E5E7EB;
          text-align: center;
        }

        .testimonial-text {
          font-style: italic;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          color: #374151;
        }

        .testimonial-author {
          font-weight: bold;
          color: #1E3A8A;
        }

        /* How It Works Section */
        .how-it-works {
          padding: 6rem 0;
          background: #F9FAFB;
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
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #E5E7EB;
        }

        .step-number {
          width: 60px;
          height: 60px;
          background: #1E3A8A;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0 auto 1rem;
          color: white;
        }

        .step-title {
          font-size: 1.3rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #1E3A8A;
        }

        .step-description {
          color: #6B7280;
          line-height: 1.6;
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
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .app-store-btn {
          display: inline-block;
          background: #1E3A8A;
          color: white;
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.3s ease;
          min-width: 200px;
        }

        .app-store-btn:hover {
          background: #3B82F6;
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
          background: #F9FAFB;
          padding: 3rem 0 1rem;
          border-top: 1px solid #E5E7EB;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-section h3 {
          color: #1E3A8A;
          margin-bottom: 1rem;
          font-weight: bold;
        }

        .footer-section a {
          color: #6B7280;
          text-decoration: none;
          display: block;
          margin-bottom: 0.5rem;
          transition: color 0.3s ease;
        }

        .footer-section a:hover {
          color: #1E3A8A;
        }

        .footer-section p {
          color: #6B7280;
          line-height: 1.6;
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

          .comparison {
            grid-template-columns: 1fr;
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