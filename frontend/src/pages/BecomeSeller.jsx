import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BecomeSeller = () => {
  const { backend_url, token } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    phoneNumber: '',
    description: '',
    address: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(
        `${backend_url}/api/users/become-seller`,
        formData,
        {
          headers: { authorization: "Bearer " + token }
        }
      );

      if (response.data.success) {
        setSuccess('Your seller application has been submitted successfully. Please wait for admin approval.');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while submitting your application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-24 pt-20 px-4 bg-white">
      <div className="max-w-md mx-auto bg-primary rounded-lg shadow-lg p-7">
        <h2 className="text-3xl font-bold text-center mb-8 text-third drop-shadow-lg">Devenir Vendeur</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="phoneNumber" className="text-third font-inter font-semibold ml-1 mb-1">
              Numéro de téléphone
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-fifth shadow-sm focus:ring-primary px-4 py-3 text-base text-third"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label htmlFor="address" className="text-third font-inter font-semibold ml-1 mb-1">
              Addresse
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-fifth shadow-sm  focus:ring-primary px-4 py-3 text-base text-third"
              placeholder="Enter your address"
            />
          </div>

          <div>
            <label htmlFor="description" className="text-third font-inter font-semibold ml-1 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md bg-fifth shadow-sm focus:ring-primary px-4 py-3 text-base text-third"
              placeholder="Tell us about your shop and what you plan to sell..."
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-fifth bg-third hover:bg-second hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary drop-shadow-lg"
          >
            {loading ? 'Soumission...' : 'Soumettre une demande'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeSeller; 