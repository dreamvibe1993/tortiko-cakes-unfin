// techsupport modal summoner code

techSummon.onclick = () => {
  techSummon.classList.add('tech-anim-out');
  setTimeout(function() {
      techSummon.classList.remove('tech-anim-out');
      techSummon.classList.toggle("techquest-off");
      techsupportModal.classList.remove('tech-modal-off');
      techsupportModal.classList.add('tech-modal-on');
  }, 800);
};

techCross.onclick = () => {
  techsupportModal.classList.add('tech-anim-out');
  setTimeout(function() {
      techsupportModal.classList.remove('tech-anim-out');
      techsupportModal.classList.remove('tech-modal-on');
      techsupportModal.classList.add('tech-modal-off');
      techSummon.classList.remove("techquest-off");
      techSummon.classList.add('techquest-on');
      setTimeout(function() { techSummon.classList.remove('techquest-on') }, 200);
  }, 800);
}

// techsupport modal summoner code

// techsupport modal chatwindow - inputfield interaction code
inptContainer.onclick = () => {
  if (inptContainer.innerHTML == 'Type here') {
    inptContainer.innerHTML = '';
    inptContainer.addEventListener('keydown', function(e) {
      if (!e.shiftKey && e.keyCode === 13) {
        e.preventDefault();
        sendTheMessage();
      }
    });
    inptContainer.addEventListener('keyup', function(e) {
      finale = false;
    });
    sendPlane.addEventListener('click', sendTheMessage);

    inptContainer.addEventListener('paste', handlePaste);

    function handlePaste (e) {
        var clipboardData, pastedData;

        e.stopPropagation();
        e.preventDefault();

        clipboardData = e.clipboardData || window.clipboardData;
        pastedData = clipboardData.getData('Text');

        inptContainer.innerText = pastedData;
    }


  }
};

window.onclick = function(event) {
  if (event.target.id != 'inptContainer' && inptContainer.innerHTML == '') {
    inptContainer.innerHTML = 'Type here';
  }
};


// techsupport modal chatwindow - inputfield interaction code


function sendTheMessage() {
      let finale = false;
      var str = inptContainer.innerText;
      var msgwidth = document.getElementById('suppMsg').offsetWidth;
      let n = Math.round(msgwidth / 8.6);
      var ans = '';
      let arr = str.split(' ');
      if (str.length <= n) {
        ans += str;
        finale = ans;
      } else {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].length > n) {
            let o = `${arr[i].slice(0, n)}`
            arr.splice(i, 0, o);
            arr[i+1] = `${arr[i+1].slice(n)}`;
          }
        }
        let i = 0;
        if (arr[i].length <= n) {

          while (arr[i].length != 0) {
            if (arr[i].length < n) {
              if (arr[i + 1] == undefined) {
                ans += `${arr[i]}\n`;
                arr[i] = '';
              } else {
                arr[i+1] = `${arr[i]} ${arr[i + 1]}`;
                arr.splice(i, 1);
              }
            }
            if (arr[i].length == n) {
              ans += `${arr[i]}\n`;
              arr.splice(i, 1);
            }
            if (arr[i] == undefined) {
              arr[i] = '';
            }
            if (arr[i].length > n) {
              if (arr[i + 1] == undefined) {
                let lastspace = arr[i].lastIndexOf(' ');
                ans += `${arr[i].slice(0, lastspace)}\n${arr[i].slice(lastspace+1)}`;
                arr[i] = '';
              } else {
                let lastspace = arr[i].lastIndexOf(' ');
                ans += `${arr[i].slice(0, lastspace)}\n`;
                arr[i+1] = `${arr[i].slice(lastspace+1)} ${arr[i + 1]}`;
                arr.splice(i, 1);
              }
            }
          }
        }
        finale = ans;
    }

      if (finale && inptContainer.innerHTML != "Type here") {
      console.log('sending a message');
      chatMsgWindow.insertAdjacentHTML('beforeend', `<div class="chat-second-line"><div id="clientMsg" class="message">${finale}</div></div>`);
      inptContainer.innerHTML = '';
      chatMsgWindow.scrollTop += chatMsgWindow.clientHeight;
    }

};

sendPlane.onmouseup = () => {
  finale = false;
}
