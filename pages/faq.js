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

        /* FAQ Page Styles */
        .faq-page {
          padding: 8rem 0 4rem;
          min-height: 100vh;
        }

        .faq-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-content h1 {
          font-size: 2.5rem;
          font-weight: bold;
          color: #1E3A8A;
          margin-bottom: 1rem;
          text-align: center;
        }

        .faq-intro {
          text-align: center;
          color: #6B7280;
          font-size: 1.2rem;
          margin-bottom: 3rem;
        }

        .faq-list {
          margin-bottom: 3rem;
        }

        .faq-item {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #E5E7EB;
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .faq-question {
          width: 100%;
          padding: 1.5rem;
          background: none;
          border: none;
          text-align: left;
          font-size: 1.1rem;
          font-weight: 600;
          color: #1E3A8A;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.3s ease;
        }

        .faq-question:hover {
          background: #F9FAFB;
        }

        .faq-icon {
          font-size: 1.5rem;
          font-weight: bold;
          transition: transform 0.3s ease;
        }

        .faq-icon.open {
          transform: rotate(45deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          background: #F9FAFB;
        }

        .faq-answer.open {
          max-height: 200px;
        }

        .faq-answer p {
          padding: 1.5rem;
          line-height: 1.6;
          color: #6B7280;
        }

        .contact-section {
          text-align: center;
          background: white;
          padding: 3rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #E5E7EB;
        }

        .contact-section h2 {
          font-size: 1.8rem;
          font-weight: bold;
          color: #1E3A8A;
          margin-bottom: 1rem;
        }

        .contact-section p {
          color: #6B7280;
          margin-bottom: 2rem;
        }

        .contact-btn {
          background: #1E3A8A;
          color: white;
          padding: 1rem 2rem;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          display: inline-block;
          transition: background 0.3s ease;
        }

        .contact-btn:hover {
          background: #3B82F6;
        }

        @media (max-width: 768px) {
          .faq-content {
            margin: 0 20px;
          }

          .faq-content h1 {
            font-size: 2rem;
          }

          .contact-section {
            padding: 2rem;
          }
        }
      `}</style>
    </>
  );
}