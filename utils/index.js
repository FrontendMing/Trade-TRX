// 复制文本
export const copyText = (content) => {
    return new Promise(resolve => {
        let el = document.createElement('input');
        el.setAttribute('value', content);
        document.body.appendChild(el);
        el.select();
        if (document.execCommand('copy')) {
            document.execCommand('copy');
            document.body.removeChild(el);
            resolve();
        }
    });
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
// 时间戳转换成日期
export function unixTimeToDate(unixtime) {
    if (!unixtime) return '-'
    if (isNaN(+unixtime)) return unixtime
    const date = new Date(parseInt(unixtime) * 1) // 依情况进行更改 * 1
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
