import React, { useState } from 'react';
import imgi12 from "../assets/imgi_12_homebanner1.jpg"; // background image

const SupportForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !message) {
      setStatus('❌ Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/send-email', { // <-- updated URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('✅ Your message has been sent successfully!');
        setEmail('');
        setMessage('');
      } else {
        setStatus(`❌ ${data.message || 'Failed to send message'}`);
      }
    } catch (error) {
      setStatus(`❌ Network error: ${error.message}`);
    }
  };

  return (
    <div
      className="support-container"
      style={{
        backgroundImage: `url(${imgi12})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '100px', // so it won't hide under navbar
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <div
        className="support-card"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '40px',
          borderRadius: '15px',
          maxWidth: '600px',
          width: '100%',
          boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
        }}
      >
        <h1 style={{ marginBottom: '10px', color: '#1a1a1a' }}>Support / Contact Us</h1>
        <p style={{ marginBottom: '30px', color: '#555' }}>
          Have a question? Send us a message and we'll get back to you ASAP!
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              transition: 'all 0.2s ease',
            }}
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            required
            style={{
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              transition: 'all 0.2s ease',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '12px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Send Message
          </button>
        </form>

        {status && (
          <p
            style={{
              marginTop: '20px',
              fontWeight: 'bold',
              color: status.includes('✅') ? 'green' : 'red',
            }}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default SupportForm;
