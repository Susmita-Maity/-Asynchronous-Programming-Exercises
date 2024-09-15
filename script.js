/*The provided code fetches data from the DummyJSON API and displays it in different divs based on the button clicked.*/ 
const mainURL = "https://dummyjson.com/posts"

const btns = document.querySelectorAll(".button");/*Selects all elements with the class "button".*/
const divs = document.querySelectorAll(".content");/*Selects all elements with the class "content".*/
const mainDiv = document.querySelectorAll(".fetching");/*Selects all elements with the class "fetching"*/
//Call back function
/*This function takes a div element as input.
It adds a message "Data loaded..." to the div.
It uses fetch to get data from the mainURL.*/
const fetchingData = (div) =>{
    div.innerText+= "\nData loaded...";
    fetch(mainURL)
    .then(response=>{
        return response.json()
    })
    //On successful response
    .then(data=>{
        div.innerText="";
        for (let i=0;i<data["posts"].length;i++) {//Loops through the "posts" array in the response data.
            let title = data["posts"][i].title;
            let body = data["posts"][i].body;
            div.innerHTML+=`<div class="para"><h4>${title}</h4><p>${body}</p></div>`
        }
    })
    //On error
    .catch(error =>{
        div.innerText = error;
    })
};
//Promise Function-It returns a Promise.

const fetchDataWithPromise = (div) => {
    return new Promise((resolve, reject) => {
        //SetTime out() method - It simulates a delay
        setTimeout(() => {
            fetch(mainURL) //Fetches data from the mainURL.
            .then(response => {
                return response.json();
            })
            //On successful response
            .then(
                data => {
                    div.innerText = "";
                    for (let i = 0; i < data["posts"].length; i++) {
                        let title = data["posts"][i].title;
                        let body = data["posts"][i].body;
                        div.innerHTML += `<div class="para"><h4>${title}</h4><p>${body}</p></div>`;
                    }
                }
            )
            //On error
            .catch(error => {
                //Rejects the Promise, setting the div's text to "Operation timed out!!"
                reject(div.innerText = "Operation timmed out!!");
            });
       }, 5000); // 5 seconds delay
    });
};

//delay(data)-This function takes a delay time (data) in milliseconds.
//It returns a Promise that resolves after the specified delay using setTimeout.
function delay(data){
    return new Promise(resolve =>setTimeout(resolve,data));
};
//AsyncAwait Function
async function fetchingDataWithAsyncAwait(div){
    div.innerText = "Loading......";
    await delay(5000);  //5 seconds delay
        fetchingData(div);
};
//Button click event listener
btns.forEach(btn => {
    btn.addEventListener("click", (event) => {
        const idName = event.target.getAttribute("id"); 
        divs.forEach(div=>{
            //call back function
            if (idName==="callbackId" && div.id==="c1"){
                div.innerText = "callback will be execute after 5sec";
                setTimeout(()=>{
                    div.innerText = "callback executed after 5sec";
                    fetchingData(div);
                },5000);

            }
            //Promise function
            else if (idName==="promiseId" && div.id==="c2"){
                div.innerText += "Loading.......";
                fetchDataWithPromise(div);
            }
            //AsyncAwait function
            else if (idName==="asyncId" && div.id==="c3"){
                fetchingDataWithAsyncAwait(div);
            };
        });
    });
});