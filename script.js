const fruitForm = document.querySelector("#inputSection form")
const fruitList = document.querySelector('#fruitSection ul')
const fruitNutrition = document.querySelector('#nutritionSection p')


// Add a submit event on the form, when triggered execute 'extractFruit'
const extractFruit = (e) => {
    e.preventDefault() // Prevents the page from auto refreshing when submit is pressed
    fetchFruitData(e.target[0].value) //shows what the user has typed in
    e.target[0].value = "" // clears the written form to allow the user to reenter a new fruit
}

//Event listener that executes a function when submit is hit
fruitForm.addEventListener("submit", extractFruit);

let calories = 0
const fruitCalories = {

}

const addFruit = (fruit) => {
    // fruitCalories[fruit.name] = fruit.nutritions.calories

    const li = document.createElement("li")

    console.log('add fruit - fruit info', fruit.name, fruitCalories);
    fruitList.appendChild(li)
    // calories += fruit.nutritions.calories
    // fruitNutrition.textContent = calories

    
}

async function fetchFruitData(fruit) {
    try {
    const response = await fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
    const imageResponse = await fetch(`https://pixabay.com/api/?key={APIKEY}=${fruit}+fruit&image_type=photo`)
   
    if (response.ok && imageResponse.ok) {
        const data = await response.json() //takes the json data file and converts it into readable js code
        const imageData = await imageResponse.json()
        console.log('fetchFruitData - img', imageData.hits[0].previewURL)
        addFruit(data)
        addImage(imageData.hits[0].previewURL)
        addCalorie(data.nutritions.calories)
    } else {
        throw "Error: http status code = " + response.status
    } 
 }
catch (err) {
    console.log(err)
    }
}


const addCalorie = (c) => {
    const cal = c
    console.log(cal)
    calories += cal
    fruitNutrition.textContent = calories
}



const addImage = (url) => {
    const img = document.createElement("img")
    img.src = url
    fruitList.appendChild(img)
    img.addEventListener("click", () => {
        img.remove();
    })
  
}


// const removeImage = (url) => {
//     const img = document.removeChild("img")
// }

// const addFruitNutrition = (fruit) => {
//     fruitCalories.fruit.name = fruit.nutritions.calories
//     calories += fruit.nutritions.calories
//     fruitNutrition.textContent = calories
// }