function placeCart() {
  let cartmodal = document.getElementById("cart-placeholder");
  cartmodal.insertAdjacentHTML('afterbegin', `

  <div class="card-t off">
    <div class="heading">
      <h1>SHOPPING BAG</h1>
    </div>
    <div class="chosen-item-list">


    </div>
    <div class="the-summing-up">
        <p id='shoptotquant'>Quantity: </p>
        <p id='shoptotprice'>Total: £</p>
    </div>
    <div class="shopping-button-nest">
      <button type="button" name="button">Check-out</button>
    </div>
  </div>


  `)
}

window.addEventListener("onload", placeCart());

let shoppingcart = document.querySelector('.nav-shop-cart');
let shoppingcartmodal = document.querySelector('.card-t');
let indexUI = document.querySelector('.index-ui');
const falseswitcher = () => {
  let x = shoppingcartmodal.classList.contains('off');
  return x;
}
const scclasstoggle = () => {
  shoppingcartmodal.classList.toggle('off');
  shoppingcartmodal.classList.toggle('flex');
}
shoppingcart.onclick = () => {
  scclasstoggle();
}
indexUI.onclick = (event) => {
  if (falseswitcher() == false) {
    if (event.target.className != 'card-t' || event.target.className != 'nav-shop-cart') {
      scclasstoggle();
    }
  }
}
