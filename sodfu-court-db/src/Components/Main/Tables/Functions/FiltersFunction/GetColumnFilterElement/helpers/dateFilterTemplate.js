import { Calendar } from "primereact/calendar";

export const dateFilterTemplate = (options) => {
  return (
    <Calendar
      value={options.value}
      onChange={(e) => options.filterCallback(e.value, options.index)}
      dateFormat="dd.mm.yy"
      placeholder="dd.mm.yyyy"
      mask="99.99.9999"
    />
  );
};
