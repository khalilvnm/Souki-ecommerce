import "./LoadingPage.css";
import { LiaSpinnerSolid } from "react-icons/lia";

const LoadingPage = () => {
  return (
    <div className="loading">
      <LiaSpinnerSolid className="spin" />
    </div>
  );
};

export default LoadingPage;
