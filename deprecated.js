document.body.style.border = "5px solid red";

// @Todo U.I For Extension
// @Todo Import URL LIST
// @Todo Render Data 
// @Todo Export Data To File
// @Todo Scan Event Page to get Data

function openInNewTab(url, pageID) {
    var myWin = window.open(url, pageID.toString());
    myWin.onclick();
}

const parseFacebookEventsPage = (html, i) => {
    const frag = document.createElement("div")
    frag.innerHTML = html;
    const eventList = [];
    [...frag.querySelectorAll('table td > div')].map(
        container => {
            const elements = [...container.querySelectorAll('div > span')];

            // ! Todo Split this so we can extra checks later
            const isNotYetInterrested = [...elements[4].querySelectorAll('a')].find(
                event => event.innerHTML.includes("Interested") // Can Add Extra Checks here
            )

            if (isNotYetInterrested) {
                const date = elements[0].innerHTML;
                const location = elements[2].innerHTML;
                const urls = [...elements[4].querySelectorAll('a')];
                // openInNewTab(urls[0].href);
                

                const links = {
                    "Details": urls[0].href, // !@TODO SCAN THIS LINK
                    "Interested": urls[1].href
                };
                const obj = {
                    date,
                    location,
                    links
                }
                eventList.push(obj);
            }
        }
    )

    return eventList ? eventList : null;
}

const getFacebookEventsUrls = (eventurls) => {
    let ExtractedList = [];
    Promise.all(eventurls.map((x, i) => {
    return fetch(x)
    .then(content => content.text())
    .then(html => parseFacebookEventsPage(html, i)
    )
})).then(result => ExtractedList.push(result))
    return ExtractedList;   
}

let parseFacebookEventPageForMore = html => {
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
    const newUrl = parseFacebookEventPageForMore(html);
    if(newUrl !== null) {
        arr.push(newUrl)
        return getAllSubUrls(newUrl, arr)
    }
    return arr
})

// !WORKING
const Promis = (urls) => Promise.all(
    urls
        .map(url => {
            setTimeout(function () {
                return getAllSubUrls(url, [url])
                .then(newList => {
                    const listOfAllPossibleEvents = getFacebookEventsUrls(newList);
                    console.log("Working Stage", listOfAllPossibleEvents);
                })
            }, 500);
}))

Promis(['https://m.facebook.com/VamosTodosEcotourismClubLebanon?v=events']);