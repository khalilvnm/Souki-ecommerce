import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ContactUs = () => {
  const { backend_url } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Sending message to:', `${backend_url}/api/message/send`);
      console.log('Message data:', formData);
      
      const response = await axios.post(
        `${backend_url}/api/message/send`,
        formData
      );

      console.log('Server response:', response.data);

      if (response.data.success) {
        toast.success("Message envoyé avec succès!");
        setFormData({ name: "", email: "", message: "" }); // Clear form
      } else {
        toast.error(response.data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error details:", error.response || error);
      toast.error(
        error.response?.data?.message || 
        error.message || 
        "Failed to send message"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Contactez-nous</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            placeholder="Your Email"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            placeholder="Your Message"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold transition ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-800'
          }`}
        >
          {loading ? 'Envoi...' : 'Envoyer un message'}
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
