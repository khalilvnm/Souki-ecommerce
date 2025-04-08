import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full shadow-sm transition duration-200"

    >
      <ArrowLeft size={20} />
    </button>
  );
}

export default BackButton;
