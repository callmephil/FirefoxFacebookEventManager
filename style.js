document.body.style.border = "5px solid red";
var elem = document.getElementById('root');
elem.parentNode.removeChild(elem);


var target = document.getElementById('objects_container');
const btn = document.createElement('button');
target.parentNode.insertBefore( btn, target.nextSibling);

btn.innerHTML = "Please wait, scrapping facebook...";
btn.style = "border:5px solid red; width:100%; height:100vh; font-Size: 60px; color:red; background-color:black;";
btn.setAttribute("id", "scrapper");