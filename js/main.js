
function showSection() {
  const hash = window.location.hash.substring(1);
  document.querySelectorAll('.section').forEach(div => {
    div.style.display = div.id === hash ? 'block' : 'none';
  });
}

window.addEventListener('hashchange', showSection);
window.addEventListener('DOMContentLoaded', showSection);

