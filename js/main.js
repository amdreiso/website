
function showSection() {
  const hash = window.location.hash.substring(1);
  document.querySelectorAll('.section').forEach(div => {
    div.style.display = div.id === hash ? 'block' : 'none';
  });
}

window.addEventListener('hashchange', showSection);
window.addEventListener('DOMContentLoaded', showSection);


function getRandomColor() {
  const max = 60;
  var r = Math.floor(Math.random() * max);
  var g = Math.floor(Math.random() * max);
  var b = Math.floor(Math.random() * max);

  return {
    r: r,
    g: g,
    b: b,
  }
}

var sections = document.querySelectorAll("section");

sections.forEach(e => {
  var color = getRandomColor();
  //e.style = `background: rgb(${color.r}, ${color.g}, ${color.b});`;
});



