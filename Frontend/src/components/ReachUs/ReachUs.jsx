import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ReachUs = () => {
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
          setMessageSent(true); // Show message sent confirmation
        },
        (error) => {
          console.log(error.text);
          setMessageSent(false); // Show error message if needed
        }
      );
    e.target.reset();
  };

  return (
    <section className="reach-us-section">
      <div className="container">
        <h2 className="--text-center">Reach Us</h2>
        <form
          ref={form}
          onSubmit={sendEmail}
          className="form-container --form-control --card --flex-center --dir-column"
        >
          <input type="text" placeholder="Full Name" name="user_name" required />
          <input type="email" placeholder="Email" name="user_email" required />
          <input type="text" placeholder="Subject" name="subject" required />
          <textarea name="message" cols="30" rows="10"></textarea>
          <button type="submit" className="--btn --btn-primary">
            Send Message
          </button>
        </form>

        {messageSent && <p className="message-sent">Message sent successfully!</p>}
      </div>
    </section>
  );
};

export default ReachUs;
