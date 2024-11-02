import { FilterMatchMode, FilterOperator } from 'primereact/api';

export const columns = [
    {field: 'courtName', header: 'Наименование суда', dataType: 'text', editingType: 'input', showFilterMenu: false},
    {field: 'courtRegion', header: 'Регион суда', dataType: 'text', editingType: 'dropdown', showFilterMenu: false},
    {field: 'courtGeneralType', header: 'Тип суда', dataType: 'text', editingType: 'dropdown', showFilterMenu: false},
    {field: 'cassRegion', header: 'Кассационный регион', dataType: 'text', editingType: 'dropdown', showFilterMenu: false},
    {field: 'courtAddress', header: 'Адрес', dataType: 'text', editingType: 'input', showFilterMenu: true},
    {field: 'courtPhone', header: 'Телефон', dataType: 'text', editingType: 'input', showFilterMenu: true},
    {field: 'courtEmail', header: 'Электронная почта', dataType: 'text', editingType: 'input', showFilterMenu: true},
    {field: 'courtSite', header: 'Сайт', dataType: 'text', editingType: 'input', showFilterMenu: true},
];

export const filters = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    courtName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    courtRegion: { value: null, matchMode: FilterMatchMode.IN },
    courtGeneralType: { value: null, matchMode: FilterMatchMode.IN },
    cassRegion: { value: null, matchMode: FilterMatchMode.IN },
    courtAddress: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    courtPhone: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    courtEmail: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    courtSite: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  }