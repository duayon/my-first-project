//vars
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let title=document.getElementById('title-product')
let countOf=document.getElementById('count')
let category=document.getElementById('category')
let create=document.getElementById('create')
 let result =document.getElementById('result')
 let searchByTitle=document.getElementById('by-title')
 let searchByCategory=document.getElementById('by-category')
 let inpSearch=document.getElementById('search')
 let deleteAllbtn =document.getElementById('delete-all')
 let updatebtn=document.getElementById('update-btn')
 let deletebtn=document.getElementById('delete')
 //calc total price
  
discount.onkeyup=()=>{

  result.innerHTML=(calcTotal(+price.value,+taxes.value,+ads.value,+discount.value)) 
}
function calcTotal(price,taxes,ads,discount){return (price+taxes+ads-discount);}
//create and show items 
//Create     
    let p;
    if(localStorage.prod != null){
        p=JSON.parse(localStorage.prod)
    } 
    else{
        p=[];
    }
    
    create.onclick=()=>{
         createProduct();
         showProduct();
         clearInputs()
    }
    function createProduct(){
        product={
            
            titleProduct:title.value,
            priceProduct:price.value,
            taxesProduct:taxes.value,
            adsProduct:ads.value,
            discountProduct:discount.value,
            totalProduct:result.innerHTML,
            categoryProduct:category.value,}


        if(price.value!=undefined)
            {
             if(title.value!=undefined){
                 if(taxes.value!=undefined){
                     if(ads.value!=undefined){
                         if(discount.value!=undefined){
                             if(category.value!=undefined){
                                 if(countOf.value!=undefined){
                                     for(let j=0;j<countOf.value;j++){
                                           p.push(product)
                                            localStorage.prod=JSON.stringify(p);
                                           console.log(p)
                                     }
                                 }
                                 else{
                                   
                                    p.push(product)
                                    localStorage.prod=JSON.stringify(p);
                                    console.log(p)
                                 }
                             }
                             else{
                                alert("Can't create the product without category value")
                             }
                         }
                         else{
                            alert("Can't create the product without discount value")
                         }
                     }
                     else{
                        alert("Can't create the product without ads value")
                     }
                 }
                 else{
                    alert("Can't create the product without taxes value")
                 }
                 
         
             }
             else{
                alert("Can't create the product without title value")
             }
            }
            else{
                alert("Can't create the product without price value")
             }
    }
//Read
    function showProduct(){
      
      let table ='';
       for(let k=0;k<p.length;k++){
        table +=
               `<tr>
                <td>${k+1}</td>
                <td>${p[k].titleProduct}</td>
                <td>${p[k].priceProduct}</td>
                <td>${p[k].taxesProduct}</td>
                <td>${p[k].adsProduct}</td>
                <td>${p[k].discountProduct}</td>
                <td>${p[k].totalProduct}</td>
                <td>${p[k].categoryProduct}</td>
                <td> <button id="update" onclick="updateItem(${k})">update</button></td>
                <td><button id="delete" onclick="deleteItem(${k})">delete</button></td>
            </tr>`
      }

      document.getElementById('tbody').innerHTML =table;
      
    }
    showProduct()
    //clear inputs after creating data
    function clearInputs(){
        price.value=undefined
        taxes.value=undefined
        ads.value=undefined
        discount.value=undefined
        title.value=null
        countOf.value=undefined
        category.value=null
        result.innerHTML=0
    }
    //searching     
    searchByTitle.onclick=()=>{
        searchTitle()
    }
    function searchTitle(){
        let table ='';
        
            for(let k=0;k<p.length;k++){
                if(p[k].titleProduct==inpSearch.value){
                    table +=
                    `<tr>
                     <td>${k+1}</td>
                     <td>${p[k].titleProduct}</td>
                     <td>${p[k].priceProduct}</td>
                     <td>${p[k].taxesProduct}</td>
                     <td>${p[k].adsProduct}</td>
                     <td>${p[k].discountProduct}</td>
                     <td>${p[k].totalProduct}</td>
                     <td>${p[k].categoryProduct}</td>
                     <td> <button id="update" onclick="updateItem(${k})">update</button></td>
                     <td><button id="delete"  onclick="deleteItem(${k})">delete</button></td>
                 </tr>`
           }
     else{ continue}
           document.getElementById('tbody').innerHTML =table;
                }
        
       
   
    }
    searchByCategory.onclick=()=>{
        searchCategory()
    }
    function searchCategory(){
        let table ='';
        
            for(let k=0;k<p.length;k++){
                if(p[k].categoryProduct==inpSearch.value){
                    table +=
                    `<tr>
                     <td>${k+1}</td>
                     <td>${p[k].titleProduct}</td>
                     <td>${p[k].priceProduct}</td>
                     <td>${p[k].taxesProduct}</td>
                     <td>${p[k].adsProduct}</td>
                     <td>${p[k].discountProduct}</td>
                     <td>${p[k].totalProduct}</td>
                     <td>${p[k].categoryProduct}</td>
                     <td> <button id="update" onclick="updateItem(${k})">update</button></td>
                     <td><button id="delete"  onclick="deleteItem(${k})">delete</button></td>
                 </tr>`
           }
     else{ continue}
           document.getElementById('tbody').innerHTML =table;
                }
        
       
   
    }
    //delete all
    deleteAllbtn.onclick=()=>{
        deleteAll()
    }
    
    function deleteAll(){
        localStorage.clear()
        location.reload()
    }
   //delete one item
    function deleteItem(num)
  {     p.splice(num,1)
        localStorage.prod=JSON.stringify(p)
        location.reload()
  }
  //update one item
  function updateItem(num){
    result.innerHTML=p[num].totalProduct
     title.value=p[num].titleProduct
     price.value=p[num].priceProduct
     taxes.value=p[num].taxesProduct
     ads.value=p[num].adsProduct
     discount.value=p[num].discountProduct
     category.value=p[num].categoryProduct
     updatebtn.classList.remove('hide')
     create.classList.add('hide')
     updatebtn.onclick=()=>{ 
    changeData(num)
        localStorage.prod=JSON.stringify(p)
        location.reload()
        create.classList.remove('hide')
        updatebtn.classList.add('hide')
      }
     
  }

  function changeData(num){
    p[num].priceProduct=price.value
    p[num].taxesProduct=taxes.value
    p[num].adsProduct=ads.value
    p[num].discountProduct=discount.value
    p[num].categoryProduct=category.value
    p[num].titleProduct=title.value
   p[num].totalProduct=result.innerHTML
  }
  let ok=document.getElementById('calc')
  ok.onclick=()=>{
    result.innerHTML=(calcTotal(+price.value,+taxes.value,+ads.value,+discount.value))
  }