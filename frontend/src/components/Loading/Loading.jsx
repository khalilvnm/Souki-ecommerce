import "./Loading.css";
import { ImSpinner9 } from "react-icons/im";

const Loading = () => {
  return (
    <div className="loading">
      <ImSpinner9 className="spin" />
    </div>
  );
};

export default Loading;
