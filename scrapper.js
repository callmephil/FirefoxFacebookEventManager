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
let  getAllSubUrls = async (url, arr=[]) => 
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


const Phase_1 = async (url) => {
    const urlMap = getAllSubUrls(url, [url]);
    return urlMap;
}

const Phase_2 = async (urlList) => {
    const NewMap = await Promise.all(urlList.map(url => {
        return getFacebookEventsUrls(url);
    }));
    return NewMap;
}

const main = async (singleurl) => {
    try {
        let urlList = [];
        const urlMap = await Phase_1(singleurl);
        await urlMap.map(x => urlList.push(x));

        const NewMap = await Phase_2(urlList);
        let eventPages = [];
        await NewMap.map(blah => blah.map(y => eventPages.push(y)));

        return eventPages;
    } catch (e) {
        console.log(e)
    };
}

async function trigger(urls) {
    let fulllist = [];

    var interval = 1000; // how much time should the delay between two iterations be (in milliseconds)?
    var promise = Promise.resolve();
    urls.forEach((el) => {
        promise = promise.then(async () => {
            const blah = await main(el);
            fulllist.push(blah);

            return new Promise((resolve) => {
                setTimeout(resolve, interval);
            });
        });
    });

    promise.then(() => {
        fulllist.forEach(element => {
            openUrlsInNewTab(element);
        });
    });
}

trigger(['https://m.facebook.com/VamosTodosEcotourismClubLebanon?v=events']);