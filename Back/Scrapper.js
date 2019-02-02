const _ConfigTimer = 300;
const _HandleSkip = "SKIP";
const _IncludeMoreEvents = true;
const _PrintErrorLog = true;
let errorLog = [];
let _EmptyPageCount = 0;

//#region HTML PARSER TO RECODE...
// !TO-RECODE
const parseFacebookEventsPage = async (html, url) => {
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
const parseFacebookEventPageForMore = async (html) => {
    try {
        const frag = document.createElement("div")
        frag.innerHTML = html;
        const link = [...frag.querySelectorAll('div > div > a')].find(
            container => container.innerHTML.includes("See More Events")
        )
        if (link)
            return link.href;
        return null
    } catch (e) {
        console.log(`parseFacebookEventPageForMore ${e}`)
    }
}
//#endregion 

// !WORKING
const hasUpcomingEvent = (html) => {
    try {
        const frag = document.createElement("div")
        frag.innerHTML = html;
        const link = [...frag.querySelectorAll('td > div')].find(
            container => {
                if (container.textContent.includes("There are no upcoming events.") || container.textContent.includes("Currently No Events")) 
                    return true;
                else 
                    return false;
            }
        )
        return link ? false : true; // Wait What ? Why ?
    } catch (e) {
        console.log(e);
    }
}

// !WORKING
const scrapper = async (url, eventPageUrls = []) =>
    fetch(url)
    .then(result => result.text())
    .then(html => {
        const hasEvent = hasUpcomingEvent(html);
        if (!hasEvent)
        {
            _EmptyPageCount++;
            return _HandleSkip;
        }

        return html;
    }).then(async next => {
        if (_IncludeMoreEvents)
        {
            const newUrl = await parseFacebookEventPageForMore(next);
            nextPageUrl = newUrl;
        }
        else 
            nextPageUrl = null;
        
        return {
            next,
            nextPageUrl
        }
    }).then(sleep()).then(async props => {
        const {
            next,
            nextPageUrl
        } = props;
        const eventsUrl = await parseFacebookEventsPage(next, url);
        if (!eventsUrl)
            return _HandleSkip;

        // Deconstruct Urls
        eventsUrl.forEach(element => {
            eventPageUrls.push(element);
        });
        
        if (_IncludeMoreEvents && nextPageUrl !== null)
            return scrapper(nextPageUrl, eventPageUrls);
        else
            return eventPageUrls;
    })
    .catch(
        e => {
            console.log(e, url);
            errorLog.push({
                error: e.message,
                url: url
            })
            return _HandleSkip;
        }
    );