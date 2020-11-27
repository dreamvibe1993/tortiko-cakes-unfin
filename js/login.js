const loginEmail = document.getElementById('username');
const loginPassword = document.getElementById("password")
const loginSubmitButton = document.getElementById('login-btn');

const emailInput = document.getElementById('register_email');
const passwordInput = document.getElementById("register_password")
const passwordInputConfirm = document.getElementById("register_confirm_password")
const registerSubmitButton = document.getElementById('register-btn');

//test case start
const logoutNav = document.querySelector('.logout-nav');
const loginNav = document.querySelector('.login-nav');



//this logic send user credits to validation


function loginOnSubmit() {

  let logloginicon = document.querySelector('#loadingLogin');
  let passloginicon = document.querySelector('#loadingPassword');
  if (logloginicon.classList.contains('off')) {
    logloginicon.classList.toggle('off');
    passloginicon.classList.toggle('off');
  }

  var formData = new FormData();
  let usernamevalue = username.value;
  let passwordvalue = password.value;
  formData.append('username', usernamevalue);
  formData.append('password', passwordvalue);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/login");
  xhr.send(formData);

  let c = 0;
  let timerId = setInterval(() => {
    c++;
    if (c >= 2) {
      logloginicon.classList.toggle('off');
      passloginicon.classList.toggle('off');
      fetch('http://localhost:8080/username',{
            method: 'GET'
      })
        .then(response => responseFromPromiseHandle(response))
        .then(res => res.text())
        .then(function(username) {
          console.log(username);
          if (username != null && username != "") {
            let loginWindow = document.getElementById("loginBeWarned");
            loginWindow.insertAdjacentHTML('afterbegin', `
            <div id="loginWarningModal" class="login-warning-modal">
            <p>Welcome to Tortiko!</p>
            </div>
            `);
            setTimeout(() => {
              lgnBox.classList.add('anim');
              setTimeout(removeLoginModal, 500);
            }, 1500);
            setTimeout(() => {
              loginEmail.value = '';
              loginPassword.value = '';
              inputCheckbox.checked = false;
              loginWarningModal.remove();
              location.reload();
            }, 2200);
          } else {
            let loginWindow = document.getElementById("loginBeWarned");
            loginWindow.insertAdjacentHTML('afterbegin', `
            <div id="loginWarningModal" class="users-warning-modal">
            <p>Invalid credentials, please try again</p>
            <img id="loginExistsCross" src="img/svg/cancel.svg" alt="">
            </div>
            `);
            setTimeout(() => {
              loginWarningModal.remove();
            }, 1600);
          }

      })
      .catch(function(error) {
      console.log(error);
      });
      clearInterval(timerId);
    }
  }, 1000)
}



function responseFromPromiseHandle(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }




function checkIfLogged() {
    fetch('http://localhost:8080/username',{
        method: 'GET'
    })
        .then(response => responseFromPromiseHandle(response))
        .then(res => res.text())
        .then(username => usernameCheck(username))
        .catch(logoutHandle())
}
checkIfLogged();

function usernameCheck(username) {
    if(username != null && username != ""){
        logoutNav.classList.remove('hide');
        loginNav.classList.add('hide');
    }
}
function logoutHandle() {
    loginNav.classList.remove('hide');
    logoutNav.classList.add('hide');
}

//test case end

function validateRegistration(){
    if (passwordInput.value != passwordInputConfirm.value) {
      register_confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        register_confirm_password.setCustomValidity('');
    }

    if (!registerCheckbox.checked) {
      registerCheckbox.setCustomValidity("The checkbox's nescessary");
    } else {
        registerCheckbox.setCustomValidity('');
    }
}
register_password.onchange = validateRegistration;
register_confirm_password.onkeyup = validateRegistration;

function checkTheReg() {
  if ((passwordInput.value == passwordInputConfirm.value) && (registerCheckbox.checked == true)) {

  const bodyRegister = {
      username: emailInput.value,
      password: passwordInput.value,
  };
  fetch('http://localhost:8080/api/users/create-user', {
      method: 'POST',
      body: JSON.stringify(bodyRegister),
      headers: {
          'Content-Type': 'application/json',
      }
  }).then(response => response.json()).then(text => {
    if (text.text == "User already exist, please log in") {
      let warningWindow = document.getElementById("usersBeWarned");
      warningWindow.insertAdjacentHTML('afterbegin', `
      <div id="usersWarningModal" class="users-warning-modal">
      <p>${text.text}</p>
      <img id="userExistsCross" src="img/svg/cancel.svg" alt="">
      </div>
      `);
      userExistsCross.onclick = () => {
        usersWarningModal.remove();
      }
      setTimeout(() => {
        login();
      }, 1500);
    } else {
      let warningWindow = document.getElementById("usersBeWarned");
      warningWindow.insertAdjacentHTML('afterbegin', `
      <div id="usersWarningModal" class="login-warning-modal">
      <p>Thank you for the registration!</p>
      <img id="userExistsCross" src="img/svg/cancel.svg" alt="">
      </div>
      `);
      userExistsCross.onclick = () => {
        usersWarningModal.remove();
      }
      loginEmail.value = '';
      loginPassword.value = '';
      inputCheckbox.checked = false;
      setTimeout(() => {
        login();
      }, 1500);
      setTimeout(() => {
        emailInput.value = '';
        passwordInput.value = '';
        passwordInputConfirm.value = '';
        registerCheckbox.checked = false;
        usersWarningModal.remove();
      }, 1700);

    }
  });
 }
}


registerCheckbox.onclick = () => {
    registerCheckbox.setCustomValidity('');
}


// TODO: login tips!!! emailchanging-bug

//cookies
inputCheckbox.onchange = () => {

  if (inputCheckbox.checked && loginEmail.value) {
      if (loginPassword.value && username.validity.valid) {
        setCookie(loginEmail.value, loginPassword.value, 365);
        return;
      } else {
        inputCheckbox.checked = false;
        return;
      }
      if (!username.validity.valid) {
        inputCheckbox.checked = false;
        return;
      }
      if (!loginPassword.value) {
        inputCheckbox.checked = false;
        return;
      }
  }
  if(!inputCheckbox.checked && loginEmail.value) {
      deleteCookieEntry(loginEmail.value);
      return;
  } else {
      inputCheckbox.checked = false;
      return;
  }
}

function pastePassword() {
    let c = document.cookie;
    let d = loginEmail.value;
    let ans = ''
    for (let i = 0; i<c.length; i++) {
        if (c[i] == '=' || c[i] == ';') {
            if (c[i] == '=') {
              ans += ' ';
            }
            if (c[i] == ';') {
              ans += '';
            }
        } else {
            ans += c[i];
        }
    }
    let j = ans.split(' ');
    let p = j[j.indexOf(d) + 1];
    loginPassword.value = p;
    inputCheckbox.checked = true;
}

loginPassword.onclick = () => {
    let x = checkCookie();
    x == true ? pastePassword() : console.log('failed');
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function deleteCookieEntry(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          var cvalue = 'todelete'
          var d = new Date(0);
          var expires = "expires=" + d;
          document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
      }
}

function checkCookie() {
  if (loginEmail.value) {
    var user = getCookie(`${loginEmail.value}`);
    if (user != "") {
      return true;
    } else {
      user = loginEmail.value;
      if (loginPassword.value) {
          if (user != "" && user != null) {
            setCookie(user, loginPassword.value, 30);
          }
      } else {
        return;
      }
    }
  } else {
    return;
  }
}

//cookies ends here


var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

function register(){
    x.style.left = "-450px";
    y.style.left = "50px";
    z.style.left = "110px";
     }
function login(){
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
}
