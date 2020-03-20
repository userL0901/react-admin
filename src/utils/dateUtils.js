/*格式化日期 */
export function timeFormater (value) {
    if (value !== "" && value !== null && value !== undefined) {
        var valueDate = new Date(value);
        return `${valueDate.getFullYear()}-${
            valueDate.getMonth() + 1 > 9
                ? valueDate.getMonth() + 1
                : "0" + (valueDate.getMonth() + 1)
            }-${valueDate.getDate() > 9 ? valueDate.getDate() : "0" + valueDate.getDate()}  ${
            valueDate.getHours() > 9 ? valueDate.getHours() : "0" + valueDate.getHours()
            }:${
            valueDate.getMinutes() > 9 ? valueDate.getMinutes() : "0" + valueDate.getMinutes()
            }:${
            valueDate.getSeconds() > 9 ? valueDate.getSeconds() : "0" + valueDate.getSeconds()
            }`;
    }
    return valueDate;
}