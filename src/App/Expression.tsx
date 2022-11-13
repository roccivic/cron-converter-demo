import { useDispatch } from "react-redux";
import { SET_EXPRESSION } from "../redux/slice";
import { useAppSelector } from "../redux/store";

export const Expression = () => {
  const dispatch = useDispatch();
  const value = useAppSelector((state) => state.expression);
  return (
    <div className="form-floating" style={{ marginBottom: 15 }}>
      <input
        type="email"
        className="form-control"
        id="expression"
        onChange={(e) => dispatch(SET_EXPRESSION(e.target.value))}
        value={value}
      />
      <label htmlFor="expression">Cron expression</label>
    </div>
  );
};
