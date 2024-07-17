const fruitForm = document.querySelector("#inputSection form")
const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritonSection p")
 
 
fruitForm.addEventListener("submit", extractFruit)
 
function extractFruit(e) {
e.preventDefault() //Stops the default behaviour of forms aka refreshing
fetchFruitData(e.target[0].value) // Shows what user typed in, in console
//  fetchFruitImage(e.target[0].value)
e.target[0].value = "" // Deletes the value typed in after submit
}
 
let calories = 0
 
const fruitCalories = {
    // calories += 
}
 
function addFruit(fruit) {
    // Define key on fruitCalories object with value of calories
    fruitCalories[fruit.name] = fruit["nutritions"]["calories"]
 
    const li = document.createElement("li")
    // li.textContent = fruit.name
    console.log('add fruit - fruit info', fruitCalories);
    fruitList.appendChild(li)
    img.dataset.calories = fruit.nutritions.calories
    fruitNutrition.textContent = calories
    calories +=  img.dataset.calories
}
 
// function fetchFruitData(fruit) {
//     fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
//         .then(processResponse)
//         .then(data => addFruit(data))
//         .catch(err => console.log(err))
// }
 
function removeCalories() {
}
 
async function fetchFruitData(fruit) {
    try {
        const response = await fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
        const imageResponse = await fetch(`https://pixabay.com/api/?q=${fruit}+fruit&key=16367689-427eb3d1dc7a2e4a071626711`)
        if (response.ok & imageResponse.ok) {
            const data = await response.json() // transfering from json to javascript
            const imageData = await imageResponse.json()
            addFruit(data) // we can use data in js now
            console.log("FetchFruitData image response", imageData.hits[0].previewURL)
            console.log("FetchFruitData calorie response", data.nutritions.calories)
            addImage(imageData.hits[0].previewURL)
            removeCalories(data.nutritions.calories)
        } else {
            throw "Error: http status code = " + response.status
        }
    } catch (err) {
        console.log(err);
    }
}
 
function addImage(imageLink) {
    //create image element
    const img = document.createElement("img")
    img.src = imageLink
    fruitList.appendChild(img)
    img.dataset.calories = fruit.nutritions.calories
    img.addEventListener("click", removeImage)
}
 
function removeImage(e) {
    e.target.remove()
    // e.target.remove().removeCalories
    console.log(fetchFruitData.removeCalories);
    calories -= e.dataset.calories
}
 
// async function fetchFruitImage(fruit){
//     // console.log("hit");
//     try {
//         const response = await fetch(`https://pixabay.com/api/?q=${fruit}+fruit&key=16367689-427eb3d1dc7a2e4a071626711`)
//         console.log('fetchFruitImage - post fetch', response );
//         if (response.ok) {
//             // console.log('fetchFruitImage if - hit');
//             const data = await response.json() // transfering from json to javascript
//             addFruit(data) // we can use data in js now
//         } else {
//             throw "Error: http status code = " + response.status
//         }
//     } catch (err) {
//         console.log(err);
//     }
// }
 
// function processResponse(resp) {
//     if(resp.ok){
//         return resp.json()
//     } else {
//         throw "Error: http status code = " + resp.status
//     }
// }