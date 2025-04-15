import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope, FaEnvelopeOpen, FaTrash } from 'react-icons/fa';

const Messages = () => {
  const { backend_url, token } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await axios.post(
        `${backend_url}/api/message/list`,
        { userDetails: { id: localStorage.getItem('userId') } },
        {
          headers: { authorization: "Bearer " + token }
        }
      );

      if (response.data.success) {
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      const response = await axios.put(
        `${backend_url}/api/message/mark-read/${messageId}`,
        { userDetails: { id: localStorage.getItem('userId') } },
        {
          headers: { authorization: "Bearer " + token }
        }
      );

      if (response.data.success) {
        setMessages(messages.map(msg => 
          msg._id === messageId ? { ...msg, status: 'read' } : msg
        ));
        toast.success('Message marked as read');
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast.error('Failed to mark message as read');
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const response = await axios.delete(
          `${backend_url}/api/message/delete/${messageId}`,
          {
            headers: { authorization: "Bearer " + token },
            data: { userDetails: { id: localStorage.getItem('userId') } }
          }
        );

        if (response.data.success) {
          setMessages(messages.filter(msg => msg._id !== messageId));
          toast.success('Message deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting message:', error);
        toast.error('Failed to delete message');
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [backend_url, token]);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Messages</h2>
      {messages.length === 0 ? (
        <p className="text-gray-500 text-center">No messages yet</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message._id} 
              className={`border p-4 rounded-lg shadow relative ${
                message.status === 'unread' ? 'bg-blue-50' : 'bg-white'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Sender Information</h3>
                  <p><span className="font-medium">Name:</span> {message.name}</p>
                  <p><span className="font-medium">Email:</span> {message.email}</p>
                  <p><span className="font-medium">Date:</span> {new Date(message.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Message</h3>
                  <p className="whitespace-pre-wrap">{message.message}</p>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 flex gap-2">
                {message.status === 'unread' ? (
                  <button
                    onClick={() => handleMarkAsRead(message._id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Mark as Read"
                  >
                    <FaEnvelope className="text-xl" />
                  </button>
                ) : (
                  <div className="text-gray-400">
                    <FaEnvelopeOpen className="text-xl" />
                  </div>
                )}
                <button
                  onClick={() => handleDeleteMessage(message._id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Message"
                >
                  <FaTrash className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages; 