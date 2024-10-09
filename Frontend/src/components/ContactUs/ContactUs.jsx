import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

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
    <section className="flex justify-center items-center h-screen bg-gray-100 p-5">
      <div className="max-w-md w-full">
        <h2 className="text-center text-2xl font-semibold mb-6">Contact Us</h2>
        <form
          ref={form}
          onSubmit={sendEmail}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <label className="block mb-4 text-lg text-gray-700">
            Full Name
            <input
              type="text"
              placeholder="Full Name"
              name="user_name"
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-4 text-lg text-gray-700">
            Email
            <input
              type="email"
              placeholder="Email"
              name="user_email"
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-4 text-lg text-gray-700">
            Subject
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-4 text-lg text-gray-700">
            Message
            <textarea
              name="message"
              cols="30"
              rows="5"
              placeholder="Your message..."
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            ></textarea>
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
          >
            Send Message
          </button>
        </form>

        {messageSent && (
          <div className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg">
            <p>Message sent successfully!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactUs;

