document.body.style.border = "2px solid black";
var elem = document.getElementById('root');
elem.parentNode.removeChild(elem);


// Open Event Urls
var target = document.getElementById('objects_container');
const btn = document.createElement('button');
target.parentNode.insertBefore( btn, target.nextSibling);

btn.innerHTML = "Please wait, scrapping facebook...";
btn.style = "border:5px solid red; width:100%; height:50vh; font-Size: 32px; color:red; background-color:black;";
btn.setAttribute("id", "scrapper_events");

// Opens Group Urls
const btn_groups = document.createElement('button');
target.parentNode.insertBefore( btn_groups, btn.nextSibling);

btn_groups.innerHTML = "Facebook groups... (Waiting the process to finish)";
btn_groups.style = "border:5px solid red; width:100%; height:25vh; font-Size: 32px; color:red; background-color:cyan;";
btn_groups.setAttribute("id", "scrapper_groups");


// Opens Unresolved Urls
const btn_logs = document.createElement('button');
target.parentNode.insertBefore( btn_logs, btn_groups.nextSibling);

btn_logs.innerHTML = "Unresolved Facebook Urls... (Waiting the process to finish)";
btn_logs.style = "border:5px solid red; width:100%; height:25vh; font-Size: 32px; color:red; background-color:orange;";
btn_logs.setAttribute("id", "scrapper_logs");