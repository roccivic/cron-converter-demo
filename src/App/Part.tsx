import { SET_VALUE } from "../redux/slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/store";

type PartProps = {
  id: string;
  min: number;
  max: number;
  index: number;
};

const range = (min: number, max: number) => {
  const arr: number[] = [];
  for (let i = min; i <= max; i++) {
    arr.push(i);
  }
  return arr;
};

export const Part = ({ id, min, max, index }: PartProps) => {
  const dispatch = useDispatch();
  const options = range(min, max);
  const value = useAppSelector((state) => state.array[index].map(String));
  return (
    <div style={{ width: "18%", marginLeft: "1%", marginRight: "1%" }}>
      <label htmlFor={id} style={{ textTransform: "capitalize" }}>
        <strong>{id}</strong>
      </label>
      <select
        id={id}
        className="form-control"
        multiple={true}
        value={value}
        size={60}
        onChange={(e) =>
          dispatch(
            SET_VALUE({
              index,
              values: [...e.target.options].filter((o) => o.selected).map((o) => Number(o.value)),
            })
          )
        }
      >
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};
