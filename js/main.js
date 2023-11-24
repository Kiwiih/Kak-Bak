const updatePortionsButtons = document.querySelectorAll('.update-portions-btn');
const recipeContainer = document.getElementById('recipe-container');
const vaniljkakaDiv = document.getElementById('vaniljkaka');
const chokladkakaDiv = document.getElementById('chokladkaka');
const kardemummabakelseDiv = document.getElementById('kardemummabakelse');
const blueberrycakeDiv = document.getElementById('blabarstarta');

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

    const heading = document.createElement('h3');
    heading.textContent = recipe.recipeName;
    recipeElement.appendChild(heading);

    // Create portion input
    const portionInput = document.createElement('input');
    portionInput.type = 'number';
    portionInput.id = `portion-count-${recipe.recipeName}`;
    portionInput.value = recipe.portions;
    portionInput.min = 1;
    recipeElement.appendChild(portionInput);

    // Create update button
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Uppdatera portioner';
    updateButton.addEventListener('click', updatePortionsFunc);
    updateButton.dataset.recipe = recipe.recipeName;
    recipeElement}}