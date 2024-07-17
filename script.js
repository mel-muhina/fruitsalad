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
    const li = document.createElement("li") //creates a list element 
    fruitList.appendChild(li) 
    fruitNutrition.textContent = calories

    
}

async function fetchFruitData(fruit) {
    try {
    const response = await fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
    const imageResponse = await fetch(`https://pixabay.com/api/?key={api}&q=${fruit}+fruit&image_type=photo`)
   
    if (response.ok && imageResponse.ok) {
        const data = await response.json() //takes the json data file and converts it into readable js code
        const imageData = await imageResponse.json()
        let calorieValue = data.nutritions.calories
        addFruit(data) // Sending 'data' to the addFruit function 
        addImage(imageData.hits[0].previewURL, calorieValue) // Sending the url to the addImage function
        addCalorie(calorieValue)
    

    } else {
        throw "Error: http status code = " + response.status
    } 
 }
catch (err) {
    console.log(err)
    }
}


const addCalorie = (cal) => {
    // const cal = c
    
    calories += cal
    fruitNutrition.textContent = calories
    // addImage.dataset.calories = cal
    
    

}



const addImage = (url, c) => {
    const img = document.createElement("img")
    img.src = url
    cals = c
    
    img.dataset.calories = cals;
    

      fruitList.appendChild(img) // Add img to the fruit list
   
      img.addEventListener("click", () => {
        img.remove();
        calories -= img.dataset.calories
        fruitNutrition.textContent = calories
        
    })
  
}