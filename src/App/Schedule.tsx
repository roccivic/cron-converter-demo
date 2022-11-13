import { useAppSelector } from "../redux/store";
import { FaClock, FaExclamationCircle } from "react-icons/fa";

export const Schedule = () => {
  const error = useAppSelector((state) => state.error);
  const next = useAppSelector((state) => state.next);
  const prev = useAppSelector((state) => state.prev);
  if (error) {
    return (
      <div className="alert alert-danger">
        <FaExclamationCircle /> {error}
      </div>
    );
  } else {
    return (
      <div className="alert alert-success">
        <div>
          <FaClock /> Would execute next at {next}
        </div>
        <div>
          <FaClock /> Would have last executed at {prev}
        </div>
      </div>
    );
  }
};
