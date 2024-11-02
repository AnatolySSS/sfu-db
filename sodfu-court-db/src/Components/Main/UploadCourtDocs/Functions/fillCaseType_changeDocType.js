export const fillCaseType_changeDocType = (arr) => {
  arr.map((obj) => {
    if (obj.docType.includes('(Истец потребитель)')) {
        obj.docType = obj.docType.slice(0, obj.docType.indexOf('(Истец потребитель)')).trim();
        obj.caseType = 'Истец потребитель';
    } else if (obj.docType.includes('(Истец ФО)')) {
        obj.docType = obj.docType.slice(0, obj.docType.indexOf('(Истец ФО)')).trim();
        obj.caseType = 'Истец ФО';
    } else if (obj.docType.includes('(Ответчик ФУ)')) {
        obj.docType = obj.docType.slice(0, obj.docType.indexOf('(Ответчик ФУ)')).trim();
        obj.caseType = 'Ответчик ФУ';
    } else if (obj.docType.includes('(Истец ФУ)')) {
        obj.docType = obj.docType.slice(0, obj.docType.indexOf('(Истец ФУ)')).trim();
        obj.caseType = 'Истец ФУ';
    } else {
        obj.caseType = 'Новый тип';
    }
  });
  return arr;
};
