/*格式化日期 */
export function timeFormater(value) {
    if (value !== "" && value !== null && value !== undefined) {
        var value = new Date(value);
        return `${value.getFullYear()}年${
            value.getMonth() + 1 > 9
                ? value.getMonth() + 1
                : "0" + (value.getMonth() + 1)
            }月${value.getDate() > 9 ? value.getDate() : "0" + value.getDate()}日  ${
            value.getHours() > 9 ? value.getHours() : "0" + value.getHours()
            }:${
            value.getMinutes() > 9 ? value.getMinutes() : "0" + value.getMinutes()
            }:${
            value.getSeconds() > 9 ? value.getSeconds() : "0" + value.getSeconds()
            }`;
    }
    return value;
}