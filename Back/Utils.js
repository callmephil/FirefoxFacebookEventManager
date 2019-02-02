//#region Utils
const openUrlsInNewTab = (url) => {
    try {
        window.open(url);
    } catch (e) {
        console.log(`openUrlsInNewTab : ${e}`)
    }
}

const sleep = () => {
    return function (x) {
        return new Promise(resolve => setTimeout(() => resolve(x), _ConfigTimer));
    }
}
//#endregion