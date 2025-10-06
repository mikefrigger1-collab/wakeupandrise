import Head from 'next/head';
import Link from 'next/link';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - Wake Up & Rise</title>
        <meta name="description" content="Terms of Service for Wake Up & Rise - Smart Alarm Clock App" />
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

        {/* Terms of Service Content */}
        <section className="legal-page">
          <div className="container">
            <div className="legal-content">
              <h1>Terms of Service</h1>
              <p className="last-updated">Last updated: January 2025</p>

              <div className="legal-section">
                <h2>Acceptance of Terms</h2>
                <p>By downloading, installing, or using Wake Up & Rise, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our app.</p>
              </div>

              <div className="legal-section">
                <h2>Description of Service</h2>
                <p>Wake Up & Rise is a smart alarm clock application that provides:</p>
                <ul>
                  <li>Gradual volume ramping alarm functionality</li>
                  <li>Custom audio import capabilities</li>
                  <li>Morning routine building tools</li>
                  <li>Full-screen alarm displays</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>User Responsibilities</h2>
                <p>You are responsible for:</p>
                <ul>
                  <li>Maintaining the security of your device</li>
                  <li>Using the app in accordance with these terms</li>
                  <li>Ensuring you have the right to use any audio content you import</li>
                  <li>Having backup alarm systems for critical wake-up times</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>Disclaimer of Warranties</h2>
                <p>Wake Up & Rise is provided &quot;as is&quot; without warranties of any kind. While we strive for reliability, we cannot guarantee the app will always function perfectly. Always have a backup alarm for important appointments.</p>
              </div>

              <div className="legal-section">
                <h2>Limitation of Liability</h2>
                <p>We shall not be liable for any damages arising from your use of the app, including but not limited to missed appointments or sleep disruption.</p>
              </div>

              <div className="legal-section">
                <h2>Changes to Terms</h2>
                <p>We reserve the right to modify these terms at any time. Continued use of the app constitutes acceptance of updated terms.</p>
              </div>

              <div className="legal-section">
                <h2>Contact Information</h2>
                <p>Questions about these Terms of Service? Contact us at:</p>
                <p><a href="mailto:legal@wakeupandriseapp.com">legal@wakeupandriseapp.com</a></p>
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
