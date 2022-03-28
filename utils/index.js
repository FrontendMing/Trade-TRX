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