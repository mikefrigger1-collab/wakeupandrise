import Head from 'next/head';
import Link from 'next/link';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Wake Up & Rise</title>
        <meta name="description" content="Privacy Policy for Wake Up & Rise - Smart Alarm Clock App" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div className="app-wrapper">
        {/* Navigation */}
        <nav className="nav">
          <div className="container">
            <div className="nav-container">
              <div className="logo">
                <Link href="/">Wake Up & Rise</Link>
              </div>
              <Link href="/" className="download-nav-btn">Back to Home</Link>
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

        .logo a {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
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

        /* Legal Page Styles */
        .legal-page {
          padding: 8rem 0 4rem;
          min-height: 100vh;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        }

        .legal-content {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          padding: 3.5rem;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .legal-content h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }

        .last-updated {
          color: #64748b;
          font-size: 0.95rem;
          margin-bottom: 3rem;
          font-style: italic;
        }

        .legal-section {
          margin-bottom: 2.5rem;
        }

        .legal-section:last-child {
          margin-bottom: 0;
        }

        .legal-section h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }

        .legal-section p {
          margin-bottom: 1rem;
          line-height: 1.7;
          color: #64748b;
          font-size: 1.05rem;
        }

        .legal-section ul {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .legal-section li {
          margin-bottom: 0.75rem;
          line-height: 1.7;
          color: #64748b;
          font-size: 1.05rem;
        }

        .legal-section strong {
          color: #1e293b;
          font-weight: 600;
        }

        .legal-section a {
          color: #1e40af;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .legal-section a:hover {
          color: #1e3a8a;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .legal-content {
            margin: 0 20px;
            padding: 2.5rem 2rem;
          }

          .legal-content h1 {
            font-size: 2.5rem;
          }

          .legal-section h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
