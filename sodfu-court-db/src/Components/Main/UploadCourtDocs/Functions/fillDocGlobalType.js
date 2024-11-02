const courtRulings = [
    "Определение о принятии иска/назначении с/з",
    "Определение о возобновлении производства",
    "Определение суда",
    "Определение о приостановлении производства",
    "Определение о прекращении производства",
    "Определение об исправлении описки",
    "Определение об оставлении иска без рассмотрения",
    "Определение о передаче дела по подсудности",
    "Иной судебный документ",
]

const courtDecisions = [
    "Решение суда",
    "Апелляц./кассац. определение/постановление суда",
]

const courtRequests = [
    "Просроченный запрос",
    "Судебный запрос",
]

export const fillDocGlobalType = (arr) => {
    arr.map((obj) => {
        if (courtRulings.includes(obj.docType)) {
            obj.docGlobalType = 'Определение'
        } else if (courtDecisions.includes(obj.docType)) {
            obj.docGlobalType = 'Решение'
        } else if (courtRequests.includes(obj.docType)) {
            obj.docGlobalType = 'Запрос'
        } else {
            obj.docGlobalType = 'Иной'
        }
    })
    return arr;
}