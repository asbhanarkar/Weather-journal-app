/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=febad8f3bfc56b0ee38231b07208d6c6&units=imperial';
// Create a new date instance dynamically with JS
let today = new Date();
let date = today.getMonth()+'.'+ today.getDate()+'.'+ today.getFullYear();
let time = today.getHours() +":"+today.getMinutes() +":"+ today.getSeconds();
let newDateTime = date + " " + time;

//getting weather data from site
/* Function to GET Web API Data*/
async function weatherData(baseUrl, apiKey, zip){
    const res = await fetch(baseUrl + zip + apiKey )
    try {
        // Transform into JSON
         const siteData = res.json();
         return siteData;
    } catch (error) {
        console.log("Error!!! check weatherDAta", error)
    }
}
/* Function to POST data */
async function postData(url ="", data ={}){
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    
    try {
        // Transform into JSON
        const data1 = await res.json();
        return data1;

    } catch (error) {
        console.log('Error!!!, Please check postData', error);
    }
}
/* Function to GET Project Data */
async function retrieveData(){
    // fetch data using url
    const req = await fetch("/all")
    
    try {
        // Transform into JSON
        const inData = await req.json();
        //updated to DOM
        document.getElementById("date").innerHTML = inData.date;
        document.getElementById("temp").innerHTML = Math.round(inData.temperature)+ ' °C';
        document.getElementById("content").innerHTML = inData.content;

    } catch (error) {
        console.log("Error!!!, Please chech updateUI", error);
    }
}
// Event listener to add function to existing HTML DOM element
/* Function called by event listener */
const mainB = document.getElementById('generate');
mainB.addEventListener('click', function(e){

    e.preventDefault();

    const zip = document.getElementById('zip').value;
    let feels = document.getElementById('feelings').value;

    weatherData(baseUrl, apiKey,zip)
    .then(data=> postData("/addToUrl", { temperature : data.main.temp, date: newDateTime, content: feels}))
    .then(() => retrieveData())
    .catch(error => console.log("Error!!!: ", error))
    
    
})
// const retrieveData = async () =>{
//     const request = await fetch('/all');
//     try {
//     // Transform into JSON
//     const allData = await request.json()
//     console.log(allData)
//     // Write updated data to DOM elements
//     document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
//     document.getElementById('content').innerHTML = allData.feel;
//     document.getElementById("date").innerHTML =allData.date;
//     }
//     catch(error) {
//       console.log("error", error)
//       // appropriately handle the error
//     }
// }
