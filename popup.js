// When the button is clicked, inject setPageBackgroundColor into current page

// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");
const snipitList = document.querySelector('#snipit-list');

// ****************************************************************
// Second half of page deals with the storing and creation of notes
// ****************************************************************

// document.addEventListener('keydown',)
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getcurrentPageBody,
  });
});

function getcurrentPageBody() {
  const selection = window.getSelection();
  const data = selection.anchorNode.data;
  const quote = document.createElement('p');
  quote.innerText = data;
  console.log('button pressed')
  // use date object to create timestamp and store to new variable
  const newDate = new Date().toDateString();
  // create object with properties of created_at, created_by, message
  const postData = {
    message: data,
    created_at: newDate,
    created_by: 'SnipIt Extension'
  }
  // clear text field

  fetch('https://curriculum-api.codesmith.io/messages', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': 'https://curriculum-api.codesmith.io/messages'
    }
  })
    .then(data => data.json())
    .then(data => {
      console.log(data)
    });
    console.log('request completed');

    
  // document.getElementById('content').appendChild(quote);
}

// ****************************************************************
// First half of page deals with displaying list of notes on popup
// ****************************************************************

//GET request from URI, store response in response variable
//iterate through response variable
  //declare message init to document.createElement('li')
  //declare createdAt init to document.createElement('li')
  //declare createdBy init to document.createElement('li')
  //set list.innerText to current ele in array at message
  //set list.innerText to current ele in array at created_at
  //set list.innerText to current ele in array at created_by
  //append list to message
  //append message to contentContainer
(function getSnipits() {
  fetch('https://curriculum-api.codesmith.io/messages') // replace uri
    .then(data => data.json())
    .then(data => {
      // console.log(data)
      // iterate over data in reverse
      // for each item in data
      for (let i = 5; i >= 0; i--) {
        // create a new li each iteration of the loop
        const listItem = document.createElement('li');
        const userName = document.createElement('h5');
        const message = document.createElement('p');


        listItem.classList.add('has-background-link-light');
        listItem.classList.add('card');
        listItem.classList.add('my-3');
        listItem.classList.add('p-4');

        userName.classList.add('is-size-6');
        userName.classList.add('has-text-weight-bold');

        message.classList.add('is-size-6');

        userName.innerText = data[i].created_by;
        message.innerText = data[i].message;
        
        listItem.appendChild(userName);
        listItem.appendChild(message);
        // console.log(userName, message);
        snipitList.appendChild(listItem);
      }
  });
})();



// 

//iterate thorugh data array
    //declare list init to document.createElement('li')
    //set list.innerText to current ele in array
    //append list to querySelector #container



//addEventListener, keydown -> 
// document.addEventListener('keydown', (event) => {
//     event.preventDefault();
//     //if keypress is command and j
//         //declare obj
//         //add prop date_created with Date.toString()
//         //add prop href with window.location to access url
//         //add prop snippet with window.selection at data
//         //push obj to data
// })