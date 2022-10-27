const toCurrency = (number, currency, lang = undefined) =>
    Intl.NumberFormat(lang, {style : 'currency', currency}).format(number);

monto     = getValue({{Depto.Value}})

const result = toCurrency(monto, 'CLP', 'span');

console.log(result)