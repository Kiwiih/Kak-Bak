const updatePortionsButtons = document.querySelectorAll('.update-portions-btn');
const recipeContainer = document.getElementById('recipe-container');
const vaniljkakDiv = document.getElementById('vaniljkaka');
const chokladkakaDiv = document.getElementById('chokladkaka');
const kardemummabakelseDiv = document.getElementById('kardemummabakelse');
const blueberrycakeDiv = document.getElementById('blabarstarta');

function jumpToTarget(targetId) {
    let targetElement = document.getElementById(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }

updatePortionsButtons.forEach(button => {
  button.addEventListener('click', updatePortionsFunc);
});

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
  },
  {
    recipeName: "Kardemummabakelse",
    portions: 1,
    ingredients: [
      { name: "Mjöl", baseAmount: 1, unit: "kopp" },
      { name: "Socker", baseAmount: 0.5, unit: "kopp" },
      { name: "Kardemumma", baseAmount: 2, unit: "msk" }
    ], 
    instructions: "Blanda alla ingredienser och grädda i 175 grader i 20 minuter."
  },
  {
    recipeName: "Blåbärstårta",
    portions: 1,
    ingredients: [
      { name: "Mjöl", baseAmount: 1, unit: "kopp" },
      { name: "Socker", baseAmount: 0.5, unit: "kopp" },
      { name: "Blåbär", baseAmount: 2, unit: "msk" }
    ], 
    instructions: "Blanda alla ingredienser och grädda i 175 grader i 20 minuter."
  }
  // Add more recipe objects here
];
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

function updatePortionsFunc(event) {
    const button = event.target;
    const recipeName = button.dataset.recipe;
  
    const portionInput = document.getElementById(`portion-count-${recipeName}`);
    if (!portionInput) {
      console.error("Portion input not found for recipe:", recipeName);
      return;
    }
  
    const newPortionCount = parseInt(portionInput.value);
  
    const recipe = recipes.find(recipe => recipe.recipeName === recipeName);
    if (recipe) {
      const updatedRecipe = calculateUpdatedRecipe(recipe, newPortionCount);
      renderRecipe(updatedRecipe);
    } else {
      console.error("Recipe not found:", recipeName);
    }
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
      recipeContainer.appendChild(recipeElement);

      // Create ingredient list container
      const ingredientList = document.createElement('ul');
      ingredientList.id = `${recipe.recipeName.toLowerCase()}-ingredients`;
      recipeElement.appendChild(ingredientList);
    } else {
      // Update portions input value
      const portionInput = document.getElementById(`portion-count-${recipe.recipeName}`);
      if (portionInput) {
        portionInput.value = recipe.portions;
      }
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