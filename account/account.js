// account heightchanger code
function transformAccField() {
  let status = false;
  accAccount.onclick = () => {
    if (!status) {
      accAccount.classList.remove('acc-height-changer-up');
      accAccount.classList.add('acc-height-changer-down');
      setTimeout(function() {
        accSettings.classList.add('settings-display-flex');
        accSettings.classList.remove('settings-display-none');
        accSettings.classList.toggle('settings-off');
        accSettings.classList.toggle('settings-on');
        return status = true;
      }, 500);
    }
    if (status) {
      accSettings.classList.toggle('settings-off');
      accSettings.classList.toggle('settings-on');
      setTimeout(function() {
        accSettings.classList.remove('settings-display-flex');
        accSettings.classList.add('settings-display-none');
        accAccount.classList.remove('acc-height-changer-down');
        accAccount.classList.add('acc-height-changer-up');
        return status = false;
      }, 150);
    }
    return status;
  }
}
transformAccField();
// account heightchanger code ends here

// tips account frame code
//
let tooltip;

document.onmouseover = function(event) {

  let anchorElem = event.target.closest('[data-tip]');

  if (!anchorElem) return;

  tooltip = showTooltip(anchorElem, anchorElem.dataset.tip);
}

document.onmouseout = function() {

  if (tooltip) {
    tooltip.remove();
    tooltip = false;
  }

}


function showTooltip(anchorElem, data) {


  let tooltipElem = document.createElement('div');
  tooltipElem.className = 'tooltip';
  tooltipElem.innerHTML = data;

  document.body.append(tooltipElem);

  let coords = anchorElem.getBoundingClientRect();

  let left = coords.left + (anchorElem.offsetWidth - tooltipElem.offsetWidth) / 2;
  if (left < 0) left = 0;

  let top = coords.top + anchorElem.offsetHeight + 5;
  if (top < 0) {
    top = coords.top + anchorElem.offsetHeight + 5;
  }

  tooltipElem.style.left = left + 'px';
  tooltipElem.style.top = top + 'px';

  return tooltipElem;
}

// tips account frame code ends here
