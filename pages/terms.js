import Head from 'next/head';
import Link from 'next/link';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - Wake Up & Rise</title>
        <meta name="description" content="Terms of Service for Wake Up & Rise - Smart Alarm Clock App" />
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
<p>Wake Up & Rise is provided &quot;as is&quot; without warranties of any kind. While we strive for reliability, we cannot guarantee the app will always function perfectly. Always have a backup alarm for important appointments.</p>              </div>

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