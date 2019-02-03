//#region HTML PARSER TO RECODE...
// !TO-RECODE
const getEventPages = async (html, url) => {
    try {
        const frag = document.createElement("div")
        frag.innerHTML = html;
        const urls = [];
        [...frag.querySelectorAll('table td > div')].forEach(
            container => {
                const elements = [...container.querySelectorAll('a')];
                let url = "";
                elements.map(el => {
                    if (el.innerHTML.includes("View Event Details"))
                        url = el.href;
                    if (el.innerHTML.includes("Interested"))
                        urls.push(url);
                });
            }
        )
        if (urls)
            return urls;
    } catch (e) {
        const frag = document.createElement("div")
        frag.innerHTML = html;
        const map = [];
        [...frag.querySelectorAll('table td > div')].forEach(el => {
            map.push(el.innerHTML)
        });
        const elem = {
            error: e.message,
            url: url,
            html: map
        }
        errorLog.push(elem);
    }
}

// !TO-RECODE
const getNextEventPage = async (html) => {
    try {
        const frag = document.createElement("div")
        frag.innerHTML = html;
        const link = [...frag.querySelectorAll('div > div > a')].find(
            container => container.innerHTML.includes("See More Events")
        )
        return link ? link.href : null;
    } catch (e) {
        console.log(`Unhandled error in getNextEventPage: ${e.message}`)
    }
}
//#endregion 

// !WORKING
const hasUpcomingEvent = (html) => {
    try {
        const frag = document.createElement("div")
        frag.innerHTML = html;
        const link = [...frag.querySelectorAll('td > div')].find(
            container => (container.textContent.includes("There are no upcoming events.") || container.textContent.includes("Currently No Events"))
        )
        return link ? false : true; // Wait What ? Why ?
    } catch (e) {
        console.log(`Unhandled error in hasUpcomingEvent: ${e.message}`);
    }
}