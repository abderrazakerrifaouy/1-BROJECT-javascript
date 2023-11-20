
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discocount = document.getElementById('discocount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let cmd ;
let mood = 'create'

function getTotal()
{
    if (price.value != ''){
        let result =  (+price.value  + +taxes.value + +ads.value) - +discocount.value;
        total.innerHTML = result
        total.style.background = '#040';

    }else{
        total.innerHTML = '' ;
        total.style.background = '#a00d02';
    }
}
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}
showData()
submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discocount:discocount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if (mood === 'create'){
         if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
        }
    }else{
        dataPro.push(newPro);
    }
    }else{
        dataPro[cmd]=newPro;
        mood = 'create';
        submit.innerHTML = 'create' ;
        count.style.display='block';

    }
   
    

    localStorage.setItem('product', JSON.stringify(dataPro))
    clearData()
    showData()

}
function clearData()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discocount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';

}

function showData() 
{
    getTotal()
    let tabele = '';
        for (let i = 0; i <dataPro.length ; i++) {
        tabele += `
        <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discocount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick = "updateData(${i})"  id = "update">update</button></td>
                <td><button onclick = "deleteData(${i})" id = "delete">delete</button></td>
                
        </tr>
        `
        
    }
      document.getElementById('tbody').innerHTML = tabele;
      let btnDelete = document.getElementById('deletAll')
      if (dataPro.length > 0) {
            btnDelete.innerHTML = `
            <button onclick = "deleteAll()" >delete All (${dataPro.length})</button>
            `;
        
      }else{
        btnDelete.innerHTML = ``;
      }
   
}


function deleteData(i)
{
    
        dataPro.splice(i,1);
        localStorage.product = JSON.stringify(dataPro);
        showData() 
    
}

function deleteAll()
{
    localStorage.clear()
    dataPro.splice(0)
    showData()
}


function updateData(i){
   title.value = dataPro[i].title;
   price.value = dataPro[i].price;
   taxes.value = dataPro[i].taxes;
   ads.value = dataPro[i].ads;
   discocount.value = dataPro[i].discocount;
   getTotal()
   count.style.display = 'none';

   category.value = dataPro[i].category;
   submit.innerHTML = 'update';
   mood = 'update';
   cmd = i;
   scroll({
    top:0,
    behavior:'smooth'
   })

}

let searchMode = 'title';
function getSearchMode(id){
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMode = 'title';
        search.placeholder = 'search By Title'
        
    }else{
        searchMode = 'Category'
        search.placeholder = 'search By Category'
    }
    search.focus()
    search.value = '';
    showData()

}

function searchData(value)
{
let tabele = '';
    if (searchMode == 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())){
                tabele += `
                <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discocount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick = "updateData(${i})"  id = "update">update</button></td>
                        <td><button onclick = "deleteData(${i})" id = "delete">delete</button></td>
                        
                </tr>
                `
            }
            
        }


    }else{
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())){
                tabele += `
                <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discocount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick = "updateData(${i})"  id = "update">update</button></td>
                        <td><button onclick = "deleteData(${i})" id = "delete">delete</button></td>
                        
                </tr>
                `
            }
            
        }


    }
    document.getElementById('tbody').innerHTML = tabele;

}




