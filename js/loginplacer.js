function placeLogin() {
  let loginmodal = document.getElementById("login-placeholder");
  loginmodal.insertAdjacentHTML('afterbegin', `

  <div id='lgnBox' class="login-form-box off">
      <div class="login-button-box">
          <div id="btn"></div>
          <button type="button"  class="login-toggle-btn" onclick="login()">Log In</button>
          <button type="button"  class="login-toggle-btn" onclick="register()">Register</button>
      </div>
      <form id="login" class="input-group" action="/login" method="post" onsubmit="loginOnSubmit();return false;">
        <div id="loginBeWarned">

        </div>
          <input id="username" type="email" name="username" class="input-field" placeholder="Enter E-mail" required>
          <div id="loadlogplaceholder">
          <img id="loadingLogin" class="loading-login off" src="img/svg/waiting.svg" alt="">

          </div>
          <input id="password" type="password" name="password" class="input-field" placeholder="Enter Password" required>
          <div id="loadpassplaceholder">
          <img id="loadingPassword" class="loading-password off" src="img/svg/waiting.svg" alt="">

          </div>
          <input id='inputCheckbox' type="checkbox" class="login-checkbox">
          <span>Remember Password</span>
          <button id="login-btn" type="submit" class="submit-btn">Log in</button>
      </form>
      <form id="register"  class="input-group"  onsubmit="checkTheReg();return false;">
        <div id="usersBeWarned">

        </div>
          <input id="register_email" type="email"  class="input-field" placeholder="Enter E-mail" required>
          <input id="register_password" type="password" class="input-field" placeholder="Enter Password" required>
          <input id="register_confirm_password" type="password" class="input-field" placeholder="Confirm Password" required>
          <input id='registerCheckbox' type="checkbox" class="login-checkbox">
          <span>I agree to the Terms and Conditions</span>
          <button id="register-btn" type="submit" class="submit-btn" >Register</button>
      </form>
  </div>


  `)
}

window.addEventListener("onload", placeLogin());
