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
    <div className="max-w-3xl mx-auto p-8 bg-primary shadow-lg rounded-lg my-10 transform hover:scale-105 transition-all duration-300">
      <h2 className="text-3xl font-extrabold font-inter text-third mb-6 text-center drop-shadow-lg">Contactez-nous</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-third font-semibold font-inter mb-1 ml-1">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border font-inter text-second border-second rounded-lg focus:ring focus:ring-second"
            placeholder="Votre Nom"
          />
        </div>

        <div>
          <label className="block text-third font-semibold font-inter mb-1 ml-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border font-inter text-second border-second rounded-lg focus:ring focus:ring-second"
            placeholder="Votre Email"
          />
        </div>

        <div>
          <label className="block text-third font-semibold font-inter mb-1 ml-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full p-3 border font-inter text-second border-second rounded-lg focus:ring focus:ring-second"
            placeholder="Votre Message"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-third text-primary py-3 rounded-lg text-lg font-bold font-inter transition drop-shadow-lg ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-second hover:text-fifth'
          }`}
        >
          {loading ? 'Envoi...' : 'Envoyer un message'}
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
