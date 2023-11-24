
const updatePortions = document.getElementById('update-portions');
const portionCount = document.getElementById('portion-count').value;

updatePortions.addEventListener('click', updatePortionsFunc)


const recipes = [
    {
    recipeName: "Chokladkaka",
    portions: 1,
    ingredients: [
        { name: "Mjöl", baseAmount: 1, unit: "kopp" },
        { name: "Socker", baseAmount: 0.5, unit: "kopp" },
        { name: "Kakao", baseAmount: 2, unit: "msk" }
    ],
    instructions: "Blanda alla ingredienser och grädda i 175 grader i 20 minuter."
},
{
    recipeName: "Vaniljkakor",
    portions: 1,
    ingredients: [
        { name: "Mjöl", baseAmount: 1, unit: "kopp" },
        { name: "Socker", baseAmount: 0.5, unit: "kopp" },
        { name: "Vanilj", baseAmount: 2, unit: "msk" }
    ],
    instructions: "..."
}
// Lägg till fler receptobjekt här
];

//Funktion för att uppdatera portionerna
function updatePortionsFunc(){
    const newPortionCount = parseInt(portionCount.value);

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          const ingredientElement = document.getElementById(`${recipe.recipeName}-${ingredient.name}`);
          const updatedAmount = ingredient.baseAmount * newPortionCount;
    
          ingredientElement.innerText = `${ingredient.name}: ${updatedAmount} ${ingredient.unit}`;
        });
      });

}