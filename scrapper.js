// FINAL PHASE
function openUrlsInNewTab(url) {
        window.open(url);
        //myWin;
}

function openUrlsInNewTabWithDelay(urls) {
    var interval = 50; // how much time should the delay between two iterations be (in milliseconds)?
        var promise = Promise.resolve();
        urls.map((url) => {
            promise = promise.then(async () => {
                window.open(url, url);
                return new Promise((resolve) => {
                    setTimeout(resolve, interval);
                });
            });
        });

        promise.then(() => {
            console.log(`Openeded ${urls.length} tabs`);
        });
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

let isValidUrl = async (url) => 
    fetch(url)
    .then(x => x.text())
    .then(html => {
        console.log(html);
    const frag = document.createElement("div")
    frag.innerHTML = html;
    const link = [...frag.querySelectorAll('td > div')].find(
        container => container.textContent.includes("There are no upcoming events.")
    )
    return link ? false : true;
}).catch(e => console.log(e));

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

let fulllist = [];
async function trigger(urls) {

    let result = confirm(`We are ready to scrape ${urls.length} event page(s), Please confirm action`);
    if (result)
    {
        let index = 0;
        var interval = 9000; // how much time should the delay between two iterations be (in milliseconds)?
        var promise = Promise.resolve();
        urls.forEach((el) => {
            promise = promise.then(async () => {
                const res = await isValidUrl(el)
                if (res === false)
                {    
                    index++;
                    // Skipping
                    return true;
                }

                btn.innerHTML = `\nScanning... :\n${el}\n\n\nPosition : ${index++}/${urls.length}`;
                const test = await main(el);
                test.forEach(element => {
                    fulllist.push(element);
                });

                return new Promise((resolve) => {
                    setTimeout(resolve, interval);
                });
            });
        });

        promise.then(() => {
            console.log("then", fulllist);
            const openAll = () => fulllist.forEach(element => {
                openUrlsInNewTab(element);
            });
            btn.onclick = openAll;
            btn.innerHTML = `${fulllist.length} Urls Ready to scrappe. Click me !`;
            btn.style = "border:5px solid red; width:100%; height:100vh; font-Size: 32px; color:green; background-color:white;";
        });
    }
    else
        btn.innerHTML = `Action Stopped Please Refresh the page !`;
}

trigger(["https://m.facebook.com/VamosTodosEcotourismClubLebanon?v=events"]);

// trigger(['https://m.facebook.com/VamosTodosEcotourismClubLebanon?v=events',
// "https://m.facebook.com/tourisme.sportif?v=events",
// "https://m.facebook.com/SportTourismeBouira?v=events",
// "https://m.facebook.com/Orancity2?v=events",
// "https://m.facebook.com/ArmenianOutdoorAdventures?v=events",
// "https://m.facebook.com/Armuphiking?v=events",
// "https://m.facebook.com/bezoartravel?v=events",
// "https://m.facebook.com/VacancesArmenia?v=events",
// "https://m.facebook.com/BhutanLifeExposure?v=events",
// "https://m.facebook.com/TrekManiaBG?v=events",
// "https://m.facebook.com/Association-des-sportifs-dAlbanel-667963889991615?v=events",
// "https://m.facebook.com/aventurexquebec?v=events",
// "https://m.facebook.com/BlueCarrotAdventures?v=events",
// "https://m.facebook.com/chevresdemontagne?v=events",
// "https://m.facebook.com/OttawaCountyParks?v=events",
// "https://m.facebook.com/quebecmarchenordique?v=events",
// "https://m.facebook.com/RockyMountainRamblers?v=events",
// "https://m.facebook.com/TorontoWalking?v=events",
// "https://m.facebook.com/Woodbine-Family-Health-Team-175772149554463?v=events",
// "https://m.facebook.com/trekaventura?v=events",
// "https://m.facebook.com/hikingloversclub?v=events",
// "https://m.facebook.com/radarsederismobaq?v=events",
// "https://m.facebook.com/istarski.treking.kup?v=events",
// "https://m.facebook.com/runtrek?v=events",
// "https://m.facebook.com/srk.alba?v=events",
// "https://m.facebook.com/srkpuls?v=events",
// "https://m.facebook.com/sveticatrek?v=events",
// "https://m.facebook.com/RSPadventures?v=events",
// "https://m.facebook.com/mountainfreaksgeorgia?v=events",
// "https://m.facebook.com/moiaresaqartvelo?v=events",
// "https://m.facebook.com/club.YETI?v=events",
// "https://m.facebook.com/HikingClubPhoenix?v=events",
// "https://m.facebook.com/hikingclubronin?v=events",
// "https://m.facebook.com/HikingClubZooM?v=events",
// "https://m.facebook.com/alpinskitour?v=events",
// "https://m.facebook.com/gajavolgyiturak?v=events",
// "https://m.facebook.com/haverok.bulik.hegyek?v=events",
// "https://m.facebook.com/MagyarorszagSziklain?v=events",
// "https://m.facebook.com/kaptarko?v=events",
// "https://m.facebook.com/Magashegyek-Alpok-4000-220579637960361?v=events",
// "https://m.facebook.com/kaland.sport.hu?v=events",
// "https://m.facebook.com/ocsaitajhaz?v=events",
// "https://m.facebook.com/osvenytaposo?v=events",
// "https://m.facebook.com/szerbiamagyarul?v=events",
// "https://m.facebook.com/TeamSuccesshu-364989080563814?v=events",
// "https://m.facebook.com/toptura.hu?v=events",
// "https://m.facebook.com/TVTE1?v=events",
// "https://m.facebook.com/vasalt.utak?v=events",
// "https://m.facebook.com/Vasutas-Természetjáró-Baráti-Kör-544213435634677?v=events",
// "https://m.facebook.com/Velencei.hegyseg.tura?v=events",
// "https://m.facebook.com/widfarantours?v=events",
// "https://m.facebook.com/zarandokkaland?v=events",
// "https://m.facebook.com/zoldkero?v=events",
// "https://m.facebook.com/newagetrekking?v=events",
// "https://m.facebook.com/hikemaniak?v=events",
// "https://m.facebook.com/passionatetoursandtravel?v=events",
// "https://m.facebook.com/trekbeyondadventures?v=events",
// "https://m.facebook.com/daeguhikingchicks?v=events",
// "https://m.facebook.com/seoulhikingnature?v=events",
// "https://m.facebook.com/nomadarabia?v=events",
// "https://m.facebook.com/CoastlineTrek?v=events",
// "https://m.facebook.com/HikingInLatvia?v=events",
// "https://m.facebook.com/TrenkTuras?v=events",
// "https://m.facebook.com/ikeepthepace?v=events",
// "https://m.facebook.com/adventurebeing?v=events",
// "https://m.facebook.com/adventuretimepakistan?v=events",
// "https://m.facebook.com/alpastravels?v=events",
// "https://m.facebook.com/www.aygtours?v=events",
// "https://m.facebook.com/baltoroadventures?v=events",
// "https://m.facebook.com/caravanpakistan?v=events",
// "https://m.facebook.com/caravanadvclub?v=events",
// "https://m.facebook.com/caravantranspo?v=events",
// "https://m.facebook.com/destida.pk?v=events",
// "https://m.facebook.com/Destida.pk.bnb?v=events",
// "https://m.facebook.com/destidabnbkalash?v=events",
// "https://m.facebook.com/DiscoverPak?v=events",
// "https://m.facebook.com/groups/260635234335109?v=events",
// "https://m.facebook.com/hassoonvalley?v=events",
// "https://m.facebook.com/hitchahiketerks?v=events",
// "https://m.facebook.com/Hoper-Hillton-Inn-hoper-Pakistan-1456858271296980?v=events",
// "https://m.facebook.com/IndusTT?v=events",
// "https://m.facebook.com/groups/1296612930384357?v=events",
// "https://m.facebook.com/groups/karakoram?v=events",
// "https://m.facebook.com/geologylearn?v=events",
// "https://m.facebook.com/letstraveladventureclub?v=events",
// "https://m.facebook.com/MilestoneAdventure?v=events",
// "https://m.facebook.com/musaafir.pk?v=events",
// "https://m.facebook.com/almadinatrv?v=events",
// "https://m.facebook.com/ParadisePakistanTours?v=events",
// "https://m.facebook.com/PirPanjalAdventures?v=events",
// "https://m.facebook.com/royal.adventures?v=events",
// "https://m.facebook.com/groups/348157785577303?v=events",
// "https://m.facebook.com/THETOURISTS1?v=events",
// "https://m.facebook.com/ultraadventureclub?v=events",
// "https://m.facebook.com/TheVoin?v=events",
// "https://m.facebook.com/RafiTravelsPattoki?v=events",
// "https://m.facebook.com/wacpakistan?v=events",
// "https://m.facebook.com/hansryoko?v=events",
// "https://m.facebook.com/purposedrivenadventures?v=events",
// "https://m.facebook.com/yestoadventures?v=events",
// "https://m.facebook.com/InicjatywaZAtorami?v=events",
// "https://m.facebook.com/nordicusunia?v=events",
// "https://m.facebook.com/ZezereTrek?v=events",
// "https://m.facebook.com/21ClimbAndTour?v=events",
// "https://m.facebook.com/DiscoverArabiaQA?v=events",
// "https://m.facebook.com/Academia161?v=events",
// "https://m.facebook.com/AdventureExpressRomania?v=events",
// "https://m.facebook.com/ArianAdventures?v=events",
// "https://m.facebook.com/deceromania?v=events",
// "https://m.facebook.com/NaturaDinRomania?v=events",
// "https://m.facebook.com/asociatiaoxigen?v=events",
// "https://m.facebook.com/postavarul?v=events",
// "https://m.facebook.com/carpatbike?v=events",
// "https://m.facebook.com/CasianaConnections?v=events",
// "https://m.facebook.com/climbinbihor?v=events",
// "https://m.facebook.com/Comoara-Muntilor-trasee-montane-Mircea-Zahan-441345662645338?v=events",
// "https://m.facebook.com/evadeazacunoi?v=events",
// "https://m.facebook.com/www.greenadventure.ro?v=events",
// "https://m.facebook.com/indrumetie?v=events",
// "https://m.facebook.com/OxigenTour?v=events",
// "https://m.facebook.com/SolarisTravelsRomania?v=events",
// "https://m.facebook.com/TerraMont?v=events",
// "https://m.facebook.com/TimisoaraCityTours?v=events",
// "https://m.facebook.com/xstylemd?v=events",
// "https://m.facebook.com/hikingrussia?v=events",
// "https://m.facebook.com/theadventurevillage?v=events",
// "https://m.facebook.com/SgTrek?v=events",
// "https://m.facebook.com/trekforhope?v=events",
// "https://m.facebook.com/MA-MI-studio-108461255958431?v=events",
// "https://m.facebook.com/sanchotour?v=events",
// "https://m.facebook.com/helderbergnaturereserve?v=events",
// "https://m.facebook.com/goverticalmountaineering?v=events",
// "https://m.facebook.com/syria.eds?v=events",
// "https://m.facebook.com/syrianEds1988?v=events",
// "https://m.facebook.com/araratadventures?v=events",
// "https://m.facebook.com/dagtrek?v=events",
// "https://m.facebook.com/hikingistanbul?v=events",
// "https://m.facebook.com/MontisTripsExpeditions?v=events",
// "https://m.facebook.com/168558656559034?v=events",
// "https://m.facebook.com/clubsamar?v=events",
// "https://m.facebook.com/sledopyty.in.ua?v=events"]);