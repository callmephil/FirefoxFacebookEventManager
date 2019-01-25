document.body.style.border = "5px solid red";

// @Todo U.I For Extension
// @Todo Import URL LIST
// @Todo Render Data 
// @Todo Export Data To File
// @Todo Scan Event Page to get Data
// !@Todo Split This in pieces
const parseFacebookEventsFromPages = (eventurls) => {
    let ExtractedList = [];
    eventurls.map(x => {
    return fetch(x)
    .then(content => content.text())
    .then(html => {
      const frag = document.createElement("div")
      frag.innerHTML = html;
      [...frag.querySelectorAll('table td > div')].map(
          container => 
          {
            const elements = [...container.querySelectorAll('div > span')]
            const urls = [...elements[4].querySelectorAll('a')];
            if (urls[1])
            {
                const date = elements[0].innerHTML;
                const location = elements[2].innerHTML;
                const links = {
                            "View More details": urls[0].href, 
                            "Interested": urls[1].href
                            };
                const obj = { date, location, links }
                if (obj)
                    ExtractedList.push(obj);
            }
      })
       
    })
}); return ExtractedList
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
                    const listOfAllPossibleEvents = parseFacebookEventsFromPages(newList);
                    console.log("Working Stage 1 - 2 - 3", listOfAllPossibleEvents);
                })
            }, 500);
}))

Promis(['https://m.facebook.com/VamosTodosEcotourismClubLebanon?v=events']);