import { Part } from "./Part";
import { getUnits } from "cron-converter";

export const Parts = () => (
  <div style={{ display: "flex" }}>
    {getUnits().map((unit, index) => (
      <Part key={unit.name} id={unit.name} index={index} min={unit.min} max={unit.max} />
    ))}
  </div>
);
