import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      question: "How does gradual volume ramping work?",
      answer: "Our smart volume ramping gradually increases your alarm volume from a gentle whisper to your preferred level over 30 seconds to 5 minutes. This creates a natural wake-up experience that won't startle you awake."
    },
    {
      question: "Can I use my own music as alarm sounds?",
      answer: "Yes! Wake Up & Rise supports importing your own audio files including music, podcasts, or nature sounds. Our smart audio processing handles multiple formats and optimizes them for the best wake-up experience."
    },
    {
      question: "Will the alarm work if my phone is locked or in Do Not Disturb mode?",
      answer: "Yes, our advanced full-screen alarm system is designed to work even when your phone is locked, in Do Not Disturb mode, or running other apps. However, you may need to grant specific permissions for optimal functionality."
    },
    {
      question: "What are random start points?",
      answer: "Random start points let your alarm begin at different positions in your audio files each day, perfect for long tracks, DJ mixes, or extended audio content. This adds variety to your wake-up experience."
    },
    {
      question: "How do morning routines work?",
      answer: "Our morning routine builder includes a library of 100+ guided activities across categories like exercise, meditation, and productivity. You can create custom routines, track your progress, and build lasting morning habits."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. All your personal data including audio files and preferences are stored locally on your device. We don't upload your audio files to our servers, and we don't sell or share your personal information."
    },
    {
      question: "Which devices are supported?",
      answer: "Wake Up & Rise is available for both iPhone and Android devices. We support iOS 13+ and Android 7.0+ for optimal performance and access to the latest features."
    },
    {
      question: "What if the app doesn't wake me up?",
      answer: "While our app is highly reliable, we recommend having a backup alarm for critical wake-up times. Make sure you've granted all necessary permissions and that your device volume is adequate. Check our troubleshooting guide in the app for optimization tips."
    },
    {
      question: "Can I customize the alarm wallpapers?",
      answer: "Yes! You can personalize your wake-up experience with custom wallpapers that appear during your alarm. Choose from our collection or use your own photos to make mornings more pleasant."
    },
    {
      question: "How much storage does the app use?",
      answer: "The app itself is lightweight, but storage usage will depend on the number and size of custom audio files you import. We recommend managing your audio library periodically to optimize storage."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>FAQ - Wake Up & Rise</title>
        <meta name="description" content="Frequently Asked Questions for Wake Up & Rise - Smart Alarm Clock App" />
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

        {/* FAQ Content */}
        <section className="faq-page">
          <div className="container">
            <div className="faq-content">
              <h1>Frequently Asked Questions</h1>
              <p className="faq-intro">Find answers to common questions about Wake Up & Rise</p>

              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <button
                      className="faq-question"
                      onClick={() => toggleQuestion(index)}
                      aria-expanded={openQuestion === index}
                    >
                      <span>{faq.question}</span>
                      <span className={`faq-icon ${openQuestion === index ? 'open' : ''}`}>
                        +
                      </span>
                    </button>
                    <div className={`faq-answer ${openQuestion === index ? 'open' : ''}`}>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-section">
                <h2>Still have questions?</h2>
                <p>Can&rsquo;t find what you&rsquo;re looking for? We&rsquo;re here to help!</p>
                <a href="mailto:support@wakeupandriseapp.com" className="contact-btn">
                  Contact Support
                </a>
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

        /* FAQ Page Styles */
        .faq-page {
          padding: 8rem 0 4rem;
          min-height: 100vh;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        }

        .faq-content {
          max-width: 900px;
          margin: 0 auto;
        }

        .faq-content h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
          text-align: center;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }

        .faq-intro {
          text-align: center;
          font-size: 1.25rem;
          color: #64748b;
          margin-bottom: 4rem;
          font-weight: 400;
        }

        .faq-list {
          margin-bottom: 4rem;
        }

        .faq-item {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(226, 232, 240, 0.8);
          margin-bottom: 1rem;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }

        .faq-question {
          width: 100%;
          padding: 1.75rem 2rem;
          background: none;
          border: none;
          text-align: left;
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e293b;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Inter', sans-serif;
        }

        .faq-question:hover {
          background: rgba(30, 64, 175, 0.02);
        }

        .faq-icon {
          font-size: 1.75rem;
          font-weight: 300;
          color: #1e40af;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          line-height: 1;
        }

        .faq-icon.open {
          transform: rotate(45deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-answer.open {
          max-height: 300px;
        }

        .faq-answer p {
          padding: 0 2rem 1.75rem 2rem;
          line-height: 1.7;
          color: #64748b;
          font-size: 1.05rem;
        }

        .contact-section {
          text-align: center;
          background: white;
          padding: 3rem;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .contact-section h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .contact-section p {
          color: #64748b;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .contact-btn {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          color: white;
          padding: 1rem 2.25rem;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.05rem;
          display: inline-block;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 30px rgba(30, 64, 175, 0.2);
        }

        .contact-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(30, 64, 175, 0.4);
        }

        @media (max-width: 768px) {
          .faq-content {
            margin: 0 20px;
          }

          .faq-content h1 {
            font-size: 2.5rem;
          }

          .faq-question {
            padding: 1.5rem;
          }

          .faq-answer p {
            padding: 1.5rem 1.5rem 1.5rem 1.5rem;
          }

          .contact-section {
            padding: 2rem;
          }
        }
      `}</style>
    </>
  );
}
