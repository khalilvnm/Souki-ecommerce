// changed
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Verify = () => {
  // Get backend URL from context
  const { backend_url } = useContext(AppContext);

  // Extract URL parameters (success status and orderId)
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  // Hook to navigate between pages
  const navigate = useNavigate();

  // Function to verify the order payment status
  const verifyOrderPayment = async () => {
    try {
      // Check if orderId is missing or invalid
      if (!orderId) {
        toast.error("Invalid order ID."); // Show error message
        navigate("/"); // Redirect to home page
        return; // Stop function execution
      }

      // Send request to backend to verify payment
      const response = await axios.post(backend_url + "/api/order/order-verify", {
        success: success,
        orderId: orderId
      });

      // If verification is successful
      if (response.data.success) {
        toast.success(response.data.message); // Show success message
        navigate("/my-orders"); // Redirect to orders page
      }
    } catch (error) {
      console.log(error);
      // Show error message (handling API or network errors)
      toast.error(error.response?.data?.message || "An error occurred while verifying payment.");
    }
  };

  // Run the verification function when the component loads
  useEffect(() => {
    verifyOrderPayment();
  }, [orderId]); // Re-run if orderId changes

  return (
    <div className='py-20 min-h-[70vh]'>
      {/* Display loading animation while verification is in progress */}
      <Loading />
    </div>
  );
};

export default Verify;
