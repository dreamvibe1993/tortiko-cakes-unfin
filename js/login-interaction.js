// pop-up login form animation

function removeLoginModal() {
  lgnBox.classList.add('off');
  lgnBox.classList.remove('on');
  lgnBox.classList.remove('anim');
  darken.classList.toggle('off');
}

function addLoginModal() {
  lgnBox.classList.remove('off');
  lgnBox.classList.add('on');
  darken.classList.toggle('off');
}

lgnButton.onclick = addLoginModal;
darken.onclick = () => {
  lgnBox.classList.add('anim');
  setTimeout(removeLoginModal, 500);

}
window.addEventListener("keydown", function (evt) {
  if (lgnBox.classList.contains('on')) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      lgnBox.classList.add('anim');
      setTimeout(removeLoginModal, 500);
    }
  }
});

let targid;
let anchorcoords;

function prepositiontheline() {
  let title = document.title.toLowerCase();
  let home;
  function gogoline(v) {
    let homecoords = v.getBoundingClientRect();
    line.style.width = v.clientWidth + 'px';
    line.style.height = '2px';
    line.style.left = homecoords.left + 'px';
    line.style.top = homecoords.y + homecoords.height - 2 + 'px';
  }
  if (title == 'tortiko') {
    home = document.querySelector('#home');
    gogoline(home);
  } else if (title == 'item') {
    home = document.querySelector(`#shop`);
    gogoline(home);
  } else {
    home = document.querySelector(`#${title}`);
    gogoline(home);
  }


  targid = home.id;
}
prepositiontheline();



navigationbar.addEventListener('mouseover', (e) => {
    if (e.target.tagName == 'LI' && e.target.innerHTML) {
      let tgclientrect = e.target.getBoundingClientRect();
      line.style.width = e.target.clientWidth + 'px';
      line.style.height = '2px';
      line.style.left = tgclientrect.left + 'px';
      line.style.top = tgclientrect.y + tgclientrect.height - 2 + 'px';
      targid = e.target.id;
    }
    if (e.target.tagName == 'A' && e.target.innerHTML) {
      let tgclientrect = e.target.parentElement.getBoundingClientRect();
      line.style.width = e.target.parentElement.clientWidth + 'px';
      line.style.height = '2px';
      line.style.left = tgclientrect.left + 'px';
      line.style.top = tgclientrect.y + tgclientrect.height - 2 + 'px';
      targid = e.target.parentElement.id;
    }
});

navigationbar.addEventListener('mouseleave', (e) => {
  setTimeout(() => {prepositiontheline()}, 1000)
});

document.addEventListener('mouseover', function(event) {
  anchorcoords = event.target.closest('[data-anchor]');
});


window.onresize = function(event) {
  line.style.top = navigationbar.offsetHeight - 2 + 'px';
  let currelem = document.querySelector(`#${targid}`);
  let elempos = currelem.getBoundingClientRect();
  line.style.left = elempos.left + 'px';
  anchorcoords.scrollIntoView(top);
};
