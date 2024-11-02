import { TriStateCheckbox } from 'primereact/tristatecheckbox';
        
export const checkboxFilterTemplate = (field) => (options) => {
  return (
    <div className="flex align-items-center gap-2">
      <label htmlFor="checkbox-filter" className="font-bold">
        {getLabelText(field)}
      </label>
      <TriStateCheckbox
        value={options.value}
        onChange={(e) => options.filterCallback(e.value)}
      />
    </div>
  );
};

const getLabelText = (field) => {
  switch (field) {
    case "hasNegative":
      return "Содержит негатив";
    case "hasRequest":
      return "Содержит запрос";
    case "isAnalized":
      return "Документ проанализирован";
    default:
      break;
  }
}