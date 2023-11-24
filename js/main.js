const updatePortions = document.getElementById('update-portions');
const recipeContainer = document.getElementById('recipe-container');
const vaniljkakaDiv = document.getElementById('vaniljkaka');
const chokladkakaDiv = document.getElementById('chokladkaka');
const kardemummabakelseDiv = document.getElementById('kardemummabakelse');
const blueberrycakeDiv = document.getElementById('blabarstarta');

updatePortions.addEventListener('click', updatePortionsFunc);

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
    instructions: "Blanda alla ingredienser och grädda i 175 grader i 20 minuter."
  }
  // Add more recipe objects here
];

function updatePortionsFunc() {
  const newPortionCount = parseInt(document.getElementById('portion-count').value);

  recipes.forEach(recipe => {
    const updatedRecipe = calculateUpdatedRecipe(recipe, newPortionCount);
    renderRecipe(updatedRecipe);
  });
}

function calculateUpdatedRecipe(recipe, newPortionCount) {
  const updatedIngredients = recipe.ingredients.map(ingredient => ({
    ...ingredient,
    updatedAmount: ingredient.baseAmount * newPortionCount
  }));

  return {
    ...recipe,
    portions: newPortionCount,
    ingredients: updatedIngredients
  };
}

function renderRecipe(recipe) {
    if (!recipe || !recipe.recipeName) {
      console.error("Invalid recipe data:", recipe);
      return;
    }
  
    let recipeElement = document.getElementById(recipe.recipeName);
  
    if (!recipeElement) {
      recipeElement = document.createElement('div');
      recipeElement.classList.add('recipes');
      recipeElement.id = recipe.recipeName.toLowerCase();
      chokladkakaDiv.appendChild(recipeElement);

  
      const ingredientList = document.createElement('ul');
      ingredientList.id = `${recipe.recipeName.toLowerCase()}-ingredients`;
      recipeElement.appendChild(ingredientList);
    }
  
    // Update portions input
    const portionInput = document.getElementById(`portion-count-${recipe.recipeName}`);
    if (portionInput) {
      portionInput.value = recipe.portions;
    }
  
    // Update ingredient list
    const ingredientList = document.getElementById(`${recipe.recipeName.toLowerCase()}-ingredients`);
    if (ingredientList) {
      ingredientList.innerHTML = ''; // Clear previous content
  
      recipe.ingredients.forEach(ingredient => {
        const ingredientListItem = document.createElement('li');
        ingredientListItem.textContent = `${ingredient.name}: ${ingredient.updatedAmount} ${ingredient.unit}`;
        ingredientList.appendChild(ingredientListItem);
      });
    } else {
      console.error("Ingredient list not found for recipe:", recipe);
    }
  }