function onError(error) {
    console.log(`Error: ${error}`);
}

function onGot(item) {
    var color = "blue";
    if (item.color) {
        color = item.color;
    }
    document.body.style.border = "2px solid " + color;
}

var getting = browser.storage.sync.get("color");
getting.then(onGot, onError);


var elem = document.getElementById('root');
var target = document.getElementById('objects_container');
const btn = document.createElement('button');
const btn_groups = document.createElement('button');
const btn_logs = document.createElement('button');

if (window.location.href === "https://m.facebook.com/") {
    elem.parentNode.removeChild(elem);
    // Open Event Urls
    target.parentNode.insertBefore(btn, target.nextSibling);

    btn.innerHTML = "Please wait, scrapping facebook...";
    btn.style = "border:5px solid red; width:100%; height:50vh; font-Size: 32px; color:red; background-color:black;";
    btn.setAttribute("id", "scrapper_events");

    // Opens Group Urls
    target.parentNode.insertBefore(btn_groups, btn.nextSibling);

    btn_groups.innerHTML = "Facebook groups... (Waiting the process to finish)";
    btn_groups.style = "border:5px solid red; width:100%; height:25vh; font-Size: 32px; color:red; background-color:cyan;";
    btn_groups.setAttribute("id", "scrapper_groups");


    // Opens Unresolved Urls
    target.parentNode.insertBefore(btn_logs, btn_groups.nextSibling);

    btn_logs.innerHTML = "Unresolved Facebook Urls... (Waiting the process to finish)";
    btn_logs.style = "border:5px solid red; width:100%; height:25vh; font-Size: 32px; color:red; background-color:orange;";
    btn_logs.setAttribute("id", "scrapper_logs");
}