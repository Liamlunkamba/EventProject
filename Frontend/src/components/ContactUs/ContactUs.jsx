import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactUs.css";

const ContactUs = () => {
  const form = useRef();
  const [messageSent, setMessageSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_t9c6rjd", "template_qswwf1j", form.current, {
        publicKey: "iHi5bKudKtX9MROMC",
      })
      .then(
        (result) => {
          console.log(result.text);
          setMessageSent(true);
          setTimeout(() => setMessageSent(false), 3000); // Auto-hide after 3 seconds
        },
        (error) => {
          console.log(error.text);
          setMessageSent(false);
        }
      );
    e.target.reset();
  };

  return (
    <section className="contact-us-section">
      <div className="container">
        <h2 className="--text-center">Contact Us</h2>
        <form
          ref={form}
          onSubmit={sendEmail}
          className="form-container --form-control --card --flex-center --dir-column"
        >
          <label>
            Full Name
            <input type="text" placeholder="Full Name" name="user_name" required />
          </label>
          <label>
            Email
            <input type="email" placeholder="Email" name="user_email" required />
          </label>
          <label>
            Subject
            <input type="text" placeholder="Subject" name="subject" required />
          </label>
          <label>
            Message
            <textarea name="message" cols="30" rows="10" placeholder="Your message..."></textarea>
          </label>
          <button type="submit" className="--btn --btn-primary">
            Send Message
          </button>
        </form>

        {messageSent && (
          <div className="pop-up">
            <p>Message sent successfully!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactUs;
