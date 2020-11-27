let shopUI = document.querySelector('#shop-container-main');
let storage;
const bringmethefood = () => {
  fetch('http://localhost:8080/products/getAll',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(response => response.json())
      .then(productList => {storage = productList});
}
bringmethefood();

const pricesizeshophander = (event) => {
  if (event.target.id.includes("smallbtn") || event.target.id.includes("mediumbtn") || event.target.id.includes("largebtn")) {
    let c = event.target.id;
    let uniqueid = c.slice(c.indexOf('_')+1);
    for (let i = 0; i < storage.length; i++) {
      if (storage[i].id == uniqueid) {
        let price = document.querySelector(`#p-price_${parseInt(uniqueid)}`)
        if (event.target.id.includes("smallbtn")) {
        price.innerHTML = "£" + storage[i].productPrices[0];
        }
        if (event.target.id.includes("mediumbtn")) {
        price.innerHTML = "£" + storage[i].productPrices[1];
        }
        if (event.target.id.includes("largebtn")) {
        price.innerHTML = "£" + storage[i].productPrices[2];
        }
      }
    }
  }
}
shopUI.onclick = (event) => {
  pricesizeshophander(event);
  if (event.target.id.includes("shopaddtocart")) {
    let c = event.target.id;
    let x = c.slice(c.indexOf('_')+1);
    carthandle(`smallbtn_${x}`, `mediumbtn_${x}`, `largebtn_${x}`, `shoppingcardname_${x}`, `p-price_${x}`, `1`, `shopprodpic_${x}`);
  }
}
