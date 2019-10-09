let userRequestInput = document.querySelector('.search_input');
let buttonElem = document.querySelector('.search_button');

// https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor

class getBooks {
    constructor(url, request) {
        this.urlApi = 'https://www.googleapis.com/books/v1/';
        this.url = url;
        this.request = request;
        this.getRequest = this.getRequest.bind(this);
    }

    // getRequest = () =>{
    //     const{url,request,urlApi,myResult} = this;
    //     let test;
    //     fetch(`${urlApi}${url}${request}`)
    //         .then((res)=>  res.json())
    //         .then((res) => console.log(res))
    // }

    getRequest = async () => {
        const {url, request, urlApi, myResult} = this;
        let test = await fetch(`${urlApi}${url}${request}`);
        let data = await test.json();
        return data;
        // this.testArr = data;
    }
}

// new getBooks('volumes','?q=Сапковски+inauthor&').getRequest();
let a = new getBooks('volumes', '?q=Сапковски');

buttonElem.addEventListener('click', (e) => {
    e.preventDefault();
    let paramsString = 'q=flowers';
    // let paramsString = 'https://www.googleapis.com/books/v1/volumes?q=test';
    let searchParams = new URLSearchParams(paramsString);
    let formElements = document.forms.searchBooksForm.elements;
    for (let elem in formElements) {
        if (formElements[elem].value) {
            searchParams.set(`${formElements[elem].name}`, `${formElements[elem].value}`);
        }
    }
    let newQuery = new getBooks('volumes?', `${searchParams.toString()}`);
    newQuery.getRequest().then(console.log);
    newQuery.getRequest()
        .then((res) => {

            res.items.map(elem => {
                let node = document.createElement('div');
                node.innerHTML = `
                <img src="${elem.volumeInfo.imageLinks.smallThumbnail}" alt="">
                
            `;
                test.appendChild(node);
                if (elem.saleInfo.saleability == "FOR_SALE" ){
                    console.log(elem.saleInfo.listPrice.amount)
                }
                else console.log('FREE')
            })
        });
})
/**
 * ${elem.volumeInfo.publishedDate}  опубликовано
 * ${elem.volumeInfo.title} название книги
 * ${elem.volumeInfo.authors} авторы
 * ${elem.volumeInfo.language} язык
 * ${elem.saleInfo.listPrice.amount} цена книги
 * ${elem.saleInfo.saleability}   "FOR_SALE"  "FREE" - платная и бесплатная книги
 * ${elem.volumeInfo.imageLinks.smallThumbnail}
 * ${elem.volumeInfo.imageLinks.smallThumbnail}
 */


// https://www.googleapis.com/books/v1/volumes?q=${autor}&filter=${filter)
// let newTest = fetch('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor')
//     .then((res)=>res.json())

///////test API/////


// let test =()=>{
// }
// // fetch('https://api.spoonacular.com/recipes/search?query=cheese&number=2&key=81f3c567351544b2a155e694c7f00b76')
// fetch('http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3',
//     {mode:'no-cors'})
//     // .then((res) => res.json())
//     .then((res) => console.log(res))
//
// test()

