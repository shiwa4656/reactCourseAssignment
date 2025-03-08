// src/pages/ContactPage/ContactPage.jsx
import { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    email: '',
    body: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validate full name (minimum 3 characters)
    if (!formData.fullName || formData.fullName.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }
    
    // Validate subject (minimum 3 characters)
    if (!formData.subject || formData.subject.length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }
    
    // Validate email (must be valid email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate body (minimum 3 characters)
    if (!formData.body || formData.body.length < 3) {
      newErrors.body = 'Message must be at least 3 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, log the data and reset form
      console.log('Form data:', formData);
      setSubmitted(true);
      
      // Reset form after submission
      setFormData({
        fullName: '',
        subject: '',
        email: '',
        body: ''
      });
    }
  };
  
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      
      {submitted && (
        <div className="success-message">
          <p>Thank you for your message! We'll get back to you soon.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="new-message-btn"
          >
            Send Another Message
          </button>
        </div>
      )}
      
      {!submitted && (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && <p className="error-message">{errors.fullName}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={errors.subject ? 'error' : ''}
            />
            {errors.subject && <p className="error-message">{errors.subject}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="body">Message *</label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              rows="5"
              className={errors.body ? 'error' : ''}
            ></textarea>
            {errors.body && <p className="error-message">{errors.body}</p>}
          </div>
          
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      )}
    </div>
  );
};

export default ContactPage;