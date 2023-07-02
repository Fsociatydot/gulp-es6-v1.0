export function isWebp() {
    //проверка поддержки webp
    function testWebP(callback: Function) {
        let webP = new Image()
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2)
        }
        webP.src = "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoBAAEAAQAcJaACdLoB+AAETAAA/vW4f/6aR40jxpHxcP/ugT90CfugT/3NoAAA"
        //добавления класса _webp или _no-webp для HTML
        testWebP(function (support: boolean) {
            let className = support === true ? 'webp' : 'no-webp'
            document.documentElement.classList.add(className)
        })
    }
}