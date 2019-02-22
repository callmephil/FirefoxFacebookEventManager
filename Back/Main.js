const _ConfigTimer = 1;
const _IncludeMoreEvents = false;
const _HandleSkip = {};
const _PrintErrorLog = true;
const _ErrorLog = [];
let _EmptyPageCount = 0;

const scrapper = async (url, results = []) =>
    fetch(url)
    .then(result => result.text())
    .then(html => {
        const hasEvent = hasUpcomingEvent(html);
        if (!hasEvent) {
            _EmptyPageCount++;
            throw _HandleSkip;
        } else
            return html;
    }).then(async next => {
        if (!_IncludeMoreEvents)
            nextPageUrl = null;
        else {
            const newUrl = await getNextEventPage(next);
            nextPageUrl = newUrl;
        }
        return {
            next,
            nextPageUrl
        };
    }).then(sleep()).then(async props => {
        const {
            next,
            nextPageUrl
        } = props;
        const eventPageResults = await getEventPages(next, url);
        if (!eventPageResults)
            throw _HandleSkip;

        // Deconstruct Urls
        eventPageResults.forEach(element => {
            results.push(element);
        });

        if (_IncludeMoreEvents && nextPageUrl !== null)
            return scrapper(nextPageUrl, results);
        else
            return results;
    })
    .catch(e => {
        if (e === _HandleSkip)
            return _HandleSkip;
        else {
            _ErrorLog.push({
                error: e.message,
                url: url
            })
            return _HandleSkip;
        }
    });

const getUnwantedUrls = () => {
    console.log(StoredList);
}
      
const main = async (urls) => {
    try {
    const getTabUrl = window.location.href;
        if(getTabUrl === "https://m.facebook.com/")
        {
        let result = confirm(`We are ready to scrape ${urls.length} event page(s), Please confirm action`);
        if (result) {
            let index = 0;
            const urlsList = [];
            let promise = Promise.resolve();

            urls.forEach((url) => {
                promise = promise.then(async () => {
                    btn.innerHTML = `\nScanning... :\n${url}\n\n\nPosition : ${index}/${urls.length}`;
                    const pageResult = await scrapper(url);
                    index++;
                    if (pageResult === _HandleSkip)
                        return true; // Skip

                    pageResult.forEach(el => {
                        urlsList.push(el);
                    });

                    return new Promise((resolve) => {
                        setTimeout(resolve, _ConfigTimer);
                    });
                });
            });

            // !@Todo SPLIT/CLEANUP this
            promise.then(async () => {
                const newList = [];
                let count = 0;
                await getLocalStorage().then(result => {
                    count = result.length;
                    urlsList.forEach(eventpage => {
                        const evID = formatLink(eventpage);
                        const res = result.find(xID => xID === evID);
                        if (res === undefined)
                            newList.push(eventpage);
                        else
                            console.log(evID, res, eventpage);
                    });
                }).then( () => {
                    btn.innerHTML = `${newList.length} Event Urls Ready to open. Click me !`;
                    btn.style = "border:5px solid green; width:100%; height:50vh; font-Size: 32px; color:green; background-color:white;";
                    btn_groups.innerHTML = `Skipped ${count} urls, Press 'u' in any event url to clear the list`;
                })

                const openEventPages = () => {
                    newList.forEach(element => {
                        openUrlsInNewTab(element);
                    });
                }
                btn.onclick = openEventPages;
                
                // !@Todo handle more exceptions in selector
                if (_PrintErrorLog) {
                    printErrorLog();
                } else {
                    btn_groups.innerHTML = `Errorlog is off, Group option is disabled`;
                    btn_logs.innerHTML = `Errorlog is off, Unresolved Urls option is disabled`;
                }
                alert(`Done ! ${_EmptyPageCount} Page(s) has no active events`);
            }).catch(e => console.log(e));
        } else
            btn.innerHTML = `Action Stopped Please Refresh the page !`;
        } 
        else if (getTabUrl.includes("https://m.facebook.com/events") || getTabUrl.includes("https://m.facebook.com/groups"))
        {
            const logKey = (e) => {
                switch (e.key)
                {
                    case 'g':
                    {
                        getLocalStorage().then(result => console.log(result));
                    }
                    break;
                    case 'z':
                        setStorage(window.location.href);
                        window.close();
                    break;
                    case 'u':
                        clearStorage();
                    break;
                    case 'v':
                        // Set Interrested And Close the Tab
                    break;
                    default: 
                        console.log(e.key);
                    break;
                }
            }
            const input = document.querySelector('html');
            input.addEventListener('keypress', logKey);
        }
    else
        console.log("not at the good place");
    } catch (e){
    console.log(e);
    }
}

const printErrorLog = () => {
    const _Group_Pages_Url = [];
    const _Unresolved_Url = [];

    _ErrorLog.forEach(element => {
        if (element.url.includes("https://m.facebook.com/groups/"))
            _Group_Pages_Url.push(element.url);
        else
            _Unresolved_Url.push(element.url);
    });

    const OpenGroupPages = () => {
        _Group_Pages_Url.forEach(element => {
            openUrlsInNewTab(element);
        });
    }
    btn_groups.onclick = OpenGroupPages;
    //btn_groups.innerHTML = `${_Group_Pages_Url.length} Group Urls Ready to open. Click me !`;

    const OpenUnresolvedUrls = () => {
        _Unresolved_Url.forEach(element => {
            openUrlsInNewTab(element);
        });
    }
    btn_logs.onclick = OpenUnresolvedUrls;
    btn_logs.innerHTML = `${_Unresolved_Url.length} Unknown Urls Ready to open. Click me !`;

    console.log(_ErrorLog);
}

main(Config_Urls);