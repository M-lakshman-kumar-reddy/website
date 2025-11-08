import React, { useState } from 'react';
import $ from 'jquery';
import { submitContactForm } from '../utils/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field using jQuery
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
      $(`input[name="${name}"], textarea[name="${name}"]`).removeClass('error');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Using jQuery for validation
    if (!$.trim(formData.name)) {
      newErrors.name = 'Name is required';
      $('input[name="name"]').addClass('error');
    }

    if (!$.trim(formData.email)) {
      newErrors.email = 'Email is required';
      $('input[name="email"]').addClass('error');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      $('input[name="email"]').addClass('error');
    }

    if (!$.trim(formData.phone)) {
      newErrors.phone = 'Phone is required';
      $('input[name="phone"]').addClass('error');
    }

    if (!$.trim(formData.subject)) {
      newErrors.subject = 'Subject is required';
      $('input[name="subject"]').addClass('error');
    }

    if (!$.trim(formData.message)) {
      newErrors.message = 'Message is required';
      $('textarea[name="message"]').addClass('error');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error using jQuery
      $('.error').first().focus();
      return;
    }

    setSubmitting(true);
    setSubmitMessage('');

    try {
      await submitContactForm(formData);
      
      // Success message
      setSubmitMessage('success');
      
      // Reset form using jQuery
      $('#contactForm')[0].reset();
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Scroll to top using jQuery
      $('html, body').animate({ scrollTop: 0 }, 500);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="page-title">Contact Us</h1>

        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>Have a question or need assistance? We're here to help!</p>

            <div className="info-items">
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-details">
                  <h3>Address</h3>
                  <p>123 Main Street<br />City, State 12345<br />Country</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📧</div>
                <div className="info-details">
                  <h3>Email</h3>
                  <p>info@eshop.com<br />support@eshop.com</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📞</div>
                <div className="info-details">
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567<br />+1 (555) 987-6543</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">🕒</div>
                <div className="info-details">
                  <h3>Business Hours</h3>
                  <p>Monday - Friday: 9am - 6pm<br />Saturday: 10am - 4pm<br />Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Send Us a Message</h2>

            {submitMessage === 'success' && (
              <div className="alert alert-success">
                Thank you for contacting us! We'll get back to you soon.
              </div>
            )}

            {submitMessage === 'error' && (
              <div className="alert alert-error">
                There was an error submitting your message. Please try again.
              </div>
            )}

            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && <span className="error-msg">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="How can we help?"
                />
                {errors.subject && <span className="error-msg">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Your message here..."
                ></textarea>
                {errors.message && <span className="error-msg">{errors.message}</span>}
              </div>

              <button type="submit" className="btn-submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
