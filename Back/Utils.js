//#region Utils
const openUrlsInNewTab = (url) => {
    try {
        window.open(url);
    } catch (e) {
        console.log(`openUrlsInNewTab : ${e}`)
    }
}

const sleep = () => (x) => new Promise(resolve => setTimeout(() => resolve(x), _ConfigTimer));
//#endregion