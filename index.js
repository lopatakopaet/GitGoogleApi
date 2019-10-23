// let userRequestInput = document.querySelector('.search_input');
let buttonElem = document.querySelector('.search_button');
let booksSectionElem = document.querySelector('.books_section_wrap');

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
    }
}
buttonElem.addEventListener('click', (e) => {
    e.preventDefault();
    booksSectionElem.innerHTML = `
        <div class="loading-window">
        <div class="car">
        <div class="strike"></div>
        <div class="strike strike2"></div>
        <div class="strike strike3"></div>
        <div class="strike strike4"></div>
        <div class="strike strike5"></div>
        <div class="car-detail spoiler"></div>
        <div class="car-detail back"></div>
        <div class="car-detail center"></div>
        <div class="car-detail center1"></div>
        <div class="car-detail front"></div>
        <div class="car-detail wheel"></div>
        <div class="car-detail wheel wheel2"></div>
        </div>

        <div class="text">
            <span>Loading</span><span class = "dots">...</span>
        </div>
    `;
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
    newQuery.getRequest().then(console.log);//////////////удалить
    newQuery.getRequest()
        .then((res) => {
            let tempNode = document.createElement('div');
            res.items.map(elem => {
                let node = document.createElement('div');
                node.classList.add('book_block_wrap');
                node.innerHTML = `
                    <div class="img_wrap">
                        <img src="${elem.volumeInfo.imageLinks.smallThumbnail}" alt="книга ${elem.volumeInfo.title}">
                    </div>
                    <div class="book_info_wrap">
                        <p><span class="bold">Название книги: </span><span class="cursive">${elem.volumeInfo.title}</span></p>
                        <p><span class="bold">Автор(ы):</span> ${elem.volumeInfo.authors ? elem.volumeInfo.authors : "Автор не найден"}</p>
                        <p> <span class="bold">Опубликованно:</span> ${elem.volumeInfo.publishedDate ? elem.volumeInfo.publishedDate : 'Дата публикации не найдена'}</p>
                         <p><span class="bold">Цена:</span> ${elem.saleInfo.saleability == "FOR_SALE" ? elem.saleInfo.listPrice.amount: `<span class="green">FREE</span>`}</p>
                    </div>
            `;
                tempNode.appendChild(node);
            })
            booksSectionElem.innerHTML = tempNode.innerHTML;
        })
})

