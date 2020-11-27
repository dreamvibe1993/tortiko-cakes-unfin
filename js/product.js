let gridrowthree = document.querySelector('.grid-row-3');
let t_one = document.querySelector('#uno');
let t_two = document.querySelector('#dos');
let t_three = document.querySelector('#tres');
let p_small = t_one.innerText;
let p_med = t_two.innerText;
let p_large = t_three.innerText;
t_one.id = '1';
t_one.innerText = '£' + p_small;
t_two.remove();
t_three.remove();

const gettheprightprice = (int) => {
  let i;
  if (int == 1) {
    i = p_small;
    return i;
  }
  if (int == 2) {
    i = p_med;
    return i;
  }
  if (int == 3) {
    i = p_large;
    return i;
  }
}

const updatethepricedivide = (str, int) => {
  let todelete = document.querySelector('.placeofinterest_1') || document.querySelector('.placeofinterest');
  let i = gettheprightprice(int);
  let x = str - parseInt(i);
  if (x <= 0) {
    placetopaste.insertAdjacentHTML('afterbegin', `
    <p id='${int}' class='placeofinterest'>£${i}</p>
    `)
    todelete.remove();
    return
  }
  placetopaste.insertAdjacentHTML('afterbegin', `
  <p id='${int}' class='placeofinterest'>£${x}</p>
  `)
  todelete.remove();
}

const updatethepricemult = (str, int) => {
  let todelete = document.querySelector('.placeofinterest_1') || document.querySelector('.placeofinterest');
  let i = gettheprightprice(int);
  todelete.remove();
  let x = str + parseInt(i);
  placetopaste.insertAdjacentHTML('afterbegin', `
  <p id='${int}' class='placeofinterest'>£${x}</p>
  `)
}

const updatetheprice = (str, int) => {
  imgnumber.innerHTML = '1';
  let todelete = document.querySelector('.placeofinterest_1') || document.querySelector('.placeofinterest');
  todelete.remove();
  placetopaste.insertAdjacentHTML('afterbegin', `
  <p id='${int}' class='placeofinterest'>£${str}</p>
  `)
}

const mutatethesubj = () => {
  let subj = parseInt(document.querySelector('.placeofinterest').innerText.slice(1));
  return subj;
}

const mutatetheobj = () => {
  let obj = parseInt(document.querySelector('.placeofinterest').id);
  return obj;
}

imgplus.onclick = () => {
  counteradd('imgnumber');
  updatethepricemult(mutatethesubj(), mutatetheobj());
};

imgminus.onclick = () => {
  counterdeduct('imgnumber');
  updatethepricedivide(mutatethesubj(), mutatetheobj());
};


gridrowthree.onclick = (event) => {
  let todelete = document.querySelector('.placeofinterest') || document.querySelector('.placeofinterest_1');
  if (placetopaste.childNodes) {
    if (prodcontbtnsml_1.checked) {
      updatetheprice(parseInt(p_small), 1);
    }
    if (prodcontbtnmed_2.checked) {
      updatetheprice(parseInt(p_med), 2);
    }
    if (prodcontbtnlrg_3.checked) {
      updatetheprice(parseInt(p_large), 3);
    }
  }
}

addtocart.onclick = () => {
  carthandle('prodcontbtnsml_1', 'prodcontbtnmed_2', 'prodcontbtnlrg_3', 'productname_prod', 'placeofinterest', 'imgnumber', 'productpic_prod');
}
