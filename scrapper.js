// FINAL PHASE
function openUrlsInNewTab(urls) {
    Promise.all(urls.map((url, pageID) => {
        window.open(url, pageID);
        //myWin;
    })).then(alert("Ok"))
}

const parseFacebookEventsPage = (html, i) => {
    const frag = document.createElement("div")
    frag.innerHTML = html;
    let newList = [];
    [...frag.querySelectorAll('table td > div')].map(
        container => {
            const elements = [...container.querySelectorAll('div > span')];

            // ! Todo Split this so we can extra checks later
            const isNotYetInterrested = [...elements[4].querySelectorAll('a')].find(
                event => event.innerHTML.includes("Interested") // Can Add Extra Checks here
            )

            if (isNotYetInterrested) {
                const urls = [...elements[4].querySelectorAll('a')];
                newList.push(urls[0].href);
            }
        }
    )
    if (newList)
        return newList;
    else
        console.log("Null");
}

const getFacebookEventsUrls = (url) =>
    fetch(url)
    .then(content => content.text())
    .then(html => {
        //  console.log(html);
        const newUrl = parseFacebookEventsPage(html);
        if (newUrl)
            return newUrl;
        else { console.log("Null") }
})


// !WORKING
let parseFacebookEventPageForMore = (html) => {
    const frag = document.createElement("div")
    frag.innerHTML = html;
    const link = [...frag.querySelectorAll('div > div > a')].find(
        container => container.innerHTML.includes("See More Events")
    )
    if(link)
        return link.href;
    return null
}

// !WORKING
let getAllSubUrls = (url, arr=[]) => 
    fetch(url)
    .then(x => x.text())
    .then(html =>
    {
      //  console.log(html);
    const newUrl = parseFacebookEventPageForMore(html);
    if(newUrl !== null) {
        arr.push(newUrl)
        return getAllSubUrls(newUrl, arr)
    }
    return arr
})

const main = async (urls) => {
    const urlList = [];

    const urlMap = await Promise.all(urls.map(url => {
        return getAllSubUrls(url, [url]);
    }));

    await urlMap.map(x => 
        x.map(y => {
            urlList.push(y);
        }
    ));

    const NewMap = await Promise.all(urlList.map(url => {
        return getFacebookEventsUrls(url);
    }));

    let eventPages = [];
    await NewMap.map(x =>
        x.map(y => {
            eventPages.push(y);
        })
    );

    openUrlsInNewTab(eventPages);
}

main(['https://m.facebook.com/VamosTodosEcotourismClubLebanon?v=events'])