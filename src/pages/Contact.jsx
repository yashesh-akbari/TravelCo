import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !email || !phone || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Format the message for WhatsApp
    const whatsappMessage = `*New Contact Query*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n\n*Message:*\n${message}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // WhatsApp number: +918849740889
    const whatsappNumber = "918849740889";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, "_blank");

    // Reset form after sending
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-orange-600">Contact Us</h1>

      <p className="text-gray-600 text-sm">
        Have questions? Want a custom trip plan? Fill the form below and we'll get back to you via WhatsApp.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 border p-5 rounded-xl bg-white shadow-sm">

        <div>
          <label className="text-sm font-medium">Name *</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mt-1 text-sm"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email *</label>
          <input
            type="email"
            className="w-full border rounded-lg p-2 mt-1 text-sm"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Phone Number *</label>
          <input
            type="tel"
            className="w-full border rounded-lg p-2 mt-1 text-sm"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Message *</label>
          <textarea
            rows={4}
            className="w-full border rounded-lg p-2 mt-1 text-sm"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <button 
          type="submit"
          className="bg-orange-600 text-white w-full py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition"
        >
          Send Message via WhatsApp
        </button>
      </form>
    </div>
  );
}
