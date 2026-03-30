import React from 'react';
import imagebgc from '../assets/bgc1.jpg';

const RefundPolicy = () => {
  return (
    <div className="refund-wrapper">
      {/* HERO SECTION */}
      <div className="refund-hero" style={{ backgroundImage: `url(${imagebgc})` }}>
        <div className="overlay">
          <h1>Stayspace Refund Policy</h1>
          <p>Learn how refunds work for your bookings with Stayspace</p>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="refund-container">
        <p className="update-date">Last updated: 28 February 2026</p>

        <h2>1. Eligibility for Refund</h2>
        <p>
          Refund requests must be submitted within <strong>14 days</strong> of booking confirmation. To be eligible, the booking must be unused and meet our standard cancellation criteria.
        </p>

        <h2>2. Non-Refundable Bookings</h2>
        <p>
          Certain bookings are non-refundable, such as last-minute reservations, special offers, or customized packages. Always check the booking terms before confirming.
        </p>

        <h2>3. How to Request a Refund</h2>
        <p>
          Contact our support team at <a href="mailto:support@stayspace.com">support@stayspace.com</a> with your booking ID and details. Our team will review your request and guide you through the process.
        </p>

        <h2>4. Refund Processing</h2>
        <p>
          Once approved, refunds are processed within <strong>5-7 business days</strong> to the original payment method. Any service or transaction fees are non-refundable.
        </p>

        <h2>5. Exchanges & Rescheduling</h2>
        <p>
          Instead of a refund, you may request to reschedule your booking subject to availability. Contact our support team to check eligibility.
        </p>

        <h2>6. Contact Us</h2>
        <p>
          For any questions regarding our Refund Policy, please reach out at <a href="mailto:support@stayspace.com">support@stayspace.com</a>.
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;