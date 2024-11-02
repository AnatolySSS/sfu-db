import { MultiSelect } from "primereact/multiselect";
import { getSeverity } from "../../../getSeverity";
import { Tag } from "primereact/tag";

export const dropdownFilterTemplate = (valuesList) => {
  return (options) => {
    return (
      <MultiSelect
        value={options.value}
        options={valuesList}
        itemTemplate={dropdownItemTemplate(options.field)}
        onChange={(e) => options.filterCallback(e.value)}
        placeholder="Выбрать из списка"
        className="p-column-filter"
        filter
        showClear
        panelFooterTemplate={dropdownFilterFooterTemplate(options.value)}
      />
    );
  };
};

export const docNegativesFilterTemplate = (valuesList) => {
  let negatives = [];
  valuesList && valuesList.map(value => value.split(',').length == 1 ? negatives.push(value) : negatives.push(...value.split(',')));
  negatives = [...new Set(negatives)];
  return (options) => {
    return (
      <MultiSelect
        value={options.value}
        options={negatives}
        itemTemplate={dropdownItemTemplate(options.field)}
        onChange={(e) => options.filterCallback(e.value)}
        placeholder="Выбрать из списка"
        className="p-column-filter"
        filter
        showClear
        panelFooterTemplate={dropdownFilterFooterTemplate(options.value)}
      />
    );
  };
};

const dropdownItemTemplate = (field) => (option) => {
  switch (field) {
    case "taskStatus":
      return <Tag value={option} severity={getSeverity(option, field)} />
    case "docAvailability":
      return <Tag value={option} severity={getSeverity(option, field)} />
    default:
      return option;
  }
};

const dropdownFilterFooterTemplate = (selectedCountries) => () => {
  const length = selectedCountries ? selectedCountries.length : 0;

  return (
      <div className="py-2 px-3">
          <b>{length}</b> пункт{length > 1 ? 'ов' : ''} выбрано.
      </div>
  );
};