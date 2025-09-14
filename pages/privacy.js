import Head from 'next/head';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Wake Up & Rise</title>
        <meta name="description" content="Privacy Policy for Wake Up & Rise - Smart Alarm Clock App" />
      </Head>

      <div className="app-wrapper">
        {/* Navigation */}
        <nav className="nav">
          <div className="container">
            <div className="nav-container">
              <div className="logo">
                <a href="/">Wake Up & Rise</a>
              </div>
              <a href="/" className="download-nav-btn">Back to Home</a>
            </div>
          </div>
        </nav>

        {/* Privacy Policy Content */}
        <section className="legal-page">
          <div className="container">
            <div className="legal-content">
              <h1>Privacy Policy</h1>
              <p className="last-updated">Last updated: January 2025</p>

              <div className="legal-section">
                <h2>Information We Collect</h2>
                <p>Wake Up & Rise collects minimal information to provide you with the best alarm experience:</p>
                <ul>
                  <li><strong>Audio Files:</strong> Custom audio files you choose to import are stored locally on your device</li>
                  <li><strong>App Settings:</strong> Your alarm preferences, volume settings, and routine configurations</li>
                  <li><strong>Usage Data:</strong> Anonymous analytics to improve app performance and features</li>
                  <li><strong>Email Address:</strong> Only if you subscribe to updates (optional)</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>How We Use Your Information</h2>
                <p>Your information is used exclusively to:</p>
                <ul>
                  <li>Provide reliable alarm and routine functionality</li>
                  <li>Store your custom audio files and preferences locally</li>
                  <li>Improve app performance and add new features</li>
                  <li>Send occasional updates if you&rsquo;ve subscribed</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>Data Security</h2>
                <p>We take your privacy seriously:</p>
                <ul>
                  <li>All personal data is stored locally on your device</li>
                  <li>We don&rsquo;t sell or share your personal information</li>
                  <li>Audio files never leave your device</li>
                  <li>Communications are encrypted</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>Your Rights</h2>
                <p>You have complete control over your data:</p>
                <ul>
                  <li>Delete the app to remove all stored data</li>
                  <li>Unsubscribe from emails at any time</li>
                  <li>Contact us to request data deletion</li>
                  <li>Opt out of analytics in app settings</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>Contact Us</h2>
                <p>Questions about this Privacy Policy? Contact us at:</p>
                <p><a href="mailto:privacy@wakeupandriseapp.com">privacy@wakeupandriseapp.com</a></p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .app-wrapper {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
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

        .logo a {
          color: inherit;
          text-decoration: none;
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

        /* Legal Page Styles */
        .legal-page {
          padding: 8rem 0 4rem;
          min-height: 100vh;
        }

        .legal-content {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 3rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #E5E7EB;
        }

        .legal-content h1 {
          font-size: 2.5rem;
          font-weight: bold;
          color: #1E3A8A;
          margin-bottom: 0.5rem;
        }

        .last-updated {
          color: #6B7280;
          font-size: 0.9rem;
          margin-bottom: 2rem;
          font-style: italic;
        }

        .legal-section {
          margin-bottom: 2rem;
        }

        .legal-section h2 {
          font-size: 1.5rem;
          font-weight: bold;
          color: #1E3A8A;
          margin-bottom: 1rem;
        }

        .legal-section p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .legal-section ul {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .legal-section li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }

        .legal-section a {
          color: #1E3A8A;
          text-decoration: none;
        }

        .legal-section a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .legal-content {
            margin: 0 20px;
            padding: 2rem;
          }

          .legal-content h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
}