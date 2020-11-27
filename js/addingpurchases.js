const counteradd = (id) => {
  let handled = document.querySelector(`#${id}`)
  let c = parseInt(handled.innerHTML);
  handled.innerHTML = c + 1;
  return handled.innerHTML;
}

const counterdeduct = (id) => {
  let handled = document.querySelector(`#${id}`)
  let c = parseInt(handled.innerHTML);
  c <= 1 ? handled.innerHTML = 1 : handled.innerHTML = c - 1;
  return handled.innerHTML;
}

const refreshpurchases = () => {
  let targetwindow = document.querySelector('.chosen-item-list');
  targetwindow.textContent = '';
  for(let i=0; i<localStorage.length; i++) {
    targetwindow.insertAdjacentHTML('beforeend', `
      <div class="chosen-item" id="itemid_${i}">

        <div class="item-imgplaceholder">
          <img src="${localStorage.getItem(i).split(',')[4]}" alt="">
        </div>

        <div class="item-infoplaceholder">

          <div class="item-heading">
            <div class="item-name">
              <p>${localStorage.getItem(i).split(',')[0]}</p>
            </div>
            <div class="item-price">
              <p id="itemprice_${i}">${localStorage.getItem(i).split(',')[1]}</p>
            </div>
          </div>

          <div class="item-sizing">
            <p>${localStorage.getItem(i).split(',')[2]}</p>
          </div>

          <div class="item-options">
            <div class="item-moreless">
              <img id="itemminusbtn_${i}" src="img/minus-button.png" alt="">
                <p id="itemquantnum_${i}" >${localStorage.getItem(i).split(',')[3]}</p>
              <img id="itemplussbtn_${i}" src="img/plus-button.png" alt="">
            </div>
            <div class="remove">
              <button id="shpcrtrembtn_${i}" type="button" name="button">remove</button>
            </div>
          </div>

        </div>

      </div>
    `);
  }
  refreshshopqandt();
}


const carthandle = (sizebtn1_id, sizebtn2_id, sizebtn3_id, productname_id, price_class_or_id, quantity_id, productpic_id) => {
  let shoparray = [];
  let size_1 = document.querySelector(`#${sizebtn1_id}`);
  let size_2 = document.querySelector(`#${sizebtn2_id}`);
  let size_3 = document.querySelector(`#${sizebtn3_id}`);
  let size_1_lbl = document.querySelector(`#${sizebtn1_id}_lable`);
  let size_2_lbl = document.querySelector(`#${sizebtn2_id}_lable`);
  let size_3_lbl = document.querySelector(`#${sizebtn3_id}_lable`);
  const handletheprice = () => {
    let prcls = document.querySelector(`.${price_class_or_id}`);
    let prid = document.querySelector(`#${price_class_or_id}`);
    if (prcls == undefined) {
      return document.querySelector(`#${price_class_or_id}`).innerHTML;
    }
    if (prid == undefined) {
      return document.querySelector(`.${price_class_or_id}`).innerHTML;
    }
  }
  let price = handletheprice();
  let productname = document.querySelector(`#${productname_id}`).innerHTML;
  const handlethequantity = () => {
    if (quantity_id == '1') {
      return 1;
    } else {
      return document.querySelector(`#${quantity_id}`).innerHTML;
    }
  }
  let prodquantity = handlethequantity();
  let prodimg = document.querySelector(`#${productpic_id}`).src;
  function getthechecked() {
    if (size_1.checked) {
      return size_1_lbl.innerHTML;
    }
    if (size_2.checked) {
      return size_2_lbl.innerHTML;
    }
    if (size_3.checked) {
      return size_3_lbl.innerHTML;
    }
  }
  let luck = getthechecked();
  let itemobj = {
    prodname: productname,
    price: price,
    prodsize: luck,
    prodquantity: prodquantity,
    prodimg: prodimg
  }
  shoparray.push(itemobj);
  checkthearray(shoparray);
}

const checkthearray = (arr) => {
  if (arr.length > 1) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].prodname == arr[i+1].prodname) {
        arr.splice(0, 1);
        setthedata(arr, i);
      }
    }
  } else {
    setthedata(arr, 0);
  }
}
const setthedata = (arr, i) => {
  let stl = localStorage.length;
  if (stl > 0) {
      checkthestorage(arr, i, stl);
  } else {
    localStorage.setItem(0, [arr[i].prodname, arr[i].price, arr[i].prodsize, arr[i].prodquantity, arr[i].prodimg]);
    refreshpurchases();
    refreshshopqandt();
  }
}

const checkthestorage = (arr, i, stl) => {
  if (Object.prototype.toString.call(arr[i]) == '[object Object]') {
    if ((localStorage.getItem(stl - 1).split(',')[0]) !== arr[i].prodname) {
      localStorage.setItem(stl, [arr[i].prodname, arr[i].price, arr[i].prodsize, arr[i].prodquantity, arr[i].prodimg]);
      refreshpurchases();
      refreshshopqandt();
    }
    if ((localStorage.getItem(stl - 1).split(',')[0]) == arr[i].prodname) {
      localStorage.removeItem(stl - 1);
      localStorage.setItem(stl - 1, [arr[i].prodname, arr[i].price, arr[i].prodsize, arr[i].prodquantity, arr[i].prodimg]);
      refreshpurchases();
      refreshshopqandt();
    }
  } else {
      localStorage.removeItem(i);
      localStorage.setItem(i, arr);
      refreshpurchases();
      refreshshopqandt();
  }
}
const givemetheid = (str) => {
  return str.slice(str.indexOf('_')+1);
}
const refreshshopqandt = () => {
  let x = document.querySelector('.chosen-item-list').children;
  let psum = 0;
  let qsum = 0;
  for (let i = 0; i < x.length; i++) {
    let price = parseInt(document.querySelector(`#itemprice_${i}`).innerHTML.slice(1));
    let quant = parseInt(document.querySelector(`#itemquantnum_${i}`).innerHTML);
    psum += price;
    qsum += quant;
  }
  shoptotquant.innerHTML = `Quantity: ${qsum}`;
  shoptotprice.innerHTML = `Total: £${psum}`;
}

window.addEventListener("onload", refreshpurchases());

document.onclick = (event) => {
  if (event.target.id.slice(0, event.target.id.indexOf('_')) == 'shpcrtrembtn') {
    let id = givemetheid(event.target.id);
    if ((parseInt(id) + 1) == localStorage.length) {
      localStorage.removeItem(id);
    } else {
      localStorage.removeItem(id);
      for (let i = parseInt(id); i < localStorage.length; i++) {
        let x = localStorage.getItem(i+1);
        localStorage.removeItem(i+1)
        localStorage.setItem(i, x);
      }
    }
    refreshpurchases();
  }
  if (event.target.id.includes('itemminusbtn')) {
    let id = givemetheid(event.target.id);
    let newquant = counterdeduct(`itemquantnum_${id}`);
    let str = localStorage.getItem(id);
    let arr = str.split(',');
    let currprice = parseInt(document.querySelector(`#itemprice_${id}`).innerHTML.slice(1));
    let currquant = parseInt(arr[3]);
    let oneitemprice = currprice / currquant;
    if (currquant == 1) {
      return;
    } else {
      arr[3] = newquant;
      arr[1] = `£${currprice - oneitemprice}`;
      checkthestorage(arr, id, null);
      refreshshopqandt();
    }
  }
  if (event.target.id.includes('itemplussbtn')) {
    let id = givemetheid(event.target.id);
    let newquant = counteradd(`itemquantnum_${id}`);
    let str = localStorage.getItem(id);
    let arr = str.split(',');
    let currprice = parseInt(document.querySelector(`#itemprice_${id}`).innerHTML.slice(1));
    let currquant = parseInt(arr[3]);
    let oneitemprice = currprice / currquant;
    arr[3] = newquant;
    arr[1] = `£${oneitemprice * newquant}`;
    checkthestorage(arr, id, null);
    refreshshopqandt();
  }
}
