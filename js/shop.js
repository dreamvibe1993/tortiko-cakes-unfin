const selectedProduct = document.querySelector('.grid-subdiv-3');

function updateProductsInDom(productList) {
    selectedProduct.innerHTML = '';
    productList.forEach(({id, productName, productDescription, productPhotoUrl, productPrices }) => selectedProduct.innerHTML += productTemplate({id, productName, productDescription, productPhotoUrl, productPrices }))
}


function productTemplate({id, productName, productDescription, productPhotoUrl, productPrices }) {
    return `<section id="shop-container-secondary_${id}" class="shopping-card-container">
            <a class="shoplink" href="/shop/${id}">
            <img class="prodpic" id="shopprodpic_${id}" src=${productPhotoUrl} alt="">
            </a>
              <section class="shopping-card-info">

                  <div class="shopping-card-header">
                  <a class="shoplink" href="/shop/${id}">
                  <h2 id="shoppingcardname_${id}">${productName}</h2>
                  </a>
                  </div>

                  <div class="shopping-card-price-section_one">
                  <input id=${"smallbtn_" + id} type="radio" name=${"card_" + id} checked>
                  <label id=${"smallbtn_" + id + "_lable"} for=${"smallbtn_" + id}>small</label>
                  <input id=${"mediumbtn_" + id} type="radio" name=${"card_" + id} >
                  <label id=${"mediumbtn_" + id + "_lable"} for=${"mediumbtn_" + id}>medium</label>
                  <input id=${"largebtn_" + id} type="radio" name=${"card_" + id} >
                  <label id=${"largebtn_" + id + "_lable"} for=${"largebtn_" + id}>large</label>
                  </div>

                  <div class="shopping-card-price-section_two">
                  <button id="shopaddtocart_${id}" type="button" name="button">Add to cart</button>
                  <p id=${"p-price_" + id} class="p-price">£${productPrices[0]}</p>
                  </div>

              </section>
          </section>`
    }
function getProducts() {
    fetch('http://localhost:8080/products/getAll',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
        })
        .then(response => response.json())
        .then(productList => updateProductsInDom(productList));


}
getProducts();
