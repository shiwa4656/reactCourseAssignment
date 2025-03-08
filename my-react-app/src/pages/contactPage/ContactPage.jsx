import { useState } from 'react';
import ContactForm from '../../components/ContactForm/ContactForm';
import './ContactPage.css';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (formData) => {
    // In a real application, you would send this data to a server
    console.log('Form submitted:', formData);
    
    // Simulate a successful submission
    setSubmitted(true);
    
    // Reset form status after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Have questions or need assistance? We're here to help!</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-form-container">
          {submitted ? (
            <div className="submit-success">
              <div className="success-icon">✓</div>
              <h2>Thank You!</h2>
              <p>Your message has been sent successfully. We'll get back to you shortly.</p>
            </div>
          ) : (
            <ContactForm onSubmit={handleSubmit} />
          )}
        </div>
        
        <div className="contact-info">
          <h2>Get in Touch</h2>
          
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">support@example.com</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Phone:</span>
            <span className="info-value">+1 (555) 123-4567</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Hours:</span>
            <span className="info-value">Monday - Friday: 9am - 5pm</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Address:</span>
            <span className="info-value">
              123 E-Commerce St.<br />
              Shopping City, SC 12345<br />
              United States
            </span>
          </div>
          
          <div className="social-links">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon">Facebook</a>
              <a href="#" className="social-icon">Twitter</a>
              <a href="#" className="social-icon">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;