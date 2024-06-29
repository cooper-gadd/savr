import { db } from "~/server/db";

const mockRecipes = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    ingredients: [
      { name: "Spaghetti", quantity: "200g" },
      { name: "Eggs", quantity: "4" },
      { name: "Parmesan Cheese", quantity: "100g" },
      { name: "Pancetta", quantity: "150g" },
      { name: "Garlic", quantity: "2 cloves" },
      { name: "Salt", quantity: "to taste" },
      { name: "Black Pepper", quantity: "to taste" },
    ],
    instructions: [
      "Cook the spaghetti in salted boiling water until al dente.",
      "In a bowl, beat the eggs and mix in the grated Parmesan cheese.",
      "Fry the pancetta with minced garlic until crispy.",
      "Drain the spaghetti and add it to the pancetta and garlic.",
      "Remove the pan from heat and quickly mix in the egg and cheese mixture.",
      "Season with salt and black pepper to taste.",
      "Serve immediately with extra grated Parmesan on top.",
    ],
    prep_time: "10 minutes",
    cook_time: "15 minutes",
    servings: 4,
  },
  {
    id: 2,
    name: "Chicken Curry",
    ingredients: [
      { name: "Chicken Breast", quantity: "500g" },
      { name: "Onion", quantity: "1 large" },
      { name: "Garlic", quantity: "3 cloves" },
      { name: "Ginger", quantity: "1 inch piece" },
      { name: "Tomatoes", quantity: "2 medium" },
      { name: "Coconut Milk", quantity: "400ml" },
      { name: "Curry Powder", quantity: "2 tbsp" },
      { name: "Salt", quantity: "to taste" },
      { name: "Oil", quantity: "2 tbsp" },
      { name: "Fresh Cilantro", quantity: "for garnish" },
    ],
    instructions: [
      "Cut the chicken into bite-sized pieces.",
      "Chop the onion, garlic, and ginger finely.",
      "Heat oil in a pan and sauté the onion until golden brown.",
      "Add garlic and ginger and cook for another minute.",
      "Add the chicken pieces and cook until they are browned.",
      "Stir in the curry powder and cook for a couple of minutes.",
      "Add chopped tomatoes and cook until they soften.",
      "Pour in the coconut milk and bring the mixture to a simmer.",
      "Season with salt and let it cook for 20 minutes or until the chicken is cooked through.",
      "Garnish with fresh cilantro before serving.",
    ],
    prep_time: "15 minutes",
    cook_time: "30 minutes",
    servings: 4,
  },
];

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  return (
    <main className="flex flex-row items-center justify-center space-x-6 py-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="w-96 space-y-6 rounded-lg bg-slate-500 p-4 shadow-lg"
        >
          <h2 className="text-2xl font-bold">{post.name}</h2>
        </div>
      ))}

      {mockRecipes.map((recipe) => {
        return (
          <div
            key={recipe.id}
            className={"w-96 space-y-6 rounded-lg bg-slate-500 p-4 shadow-lg"}
          >
            <h2 className="text-2xl font-bold">{recipe.name}</h2>
            <ul className="mt-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.quantity} {ingredient.name}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <h3 className="text-lg font-bold">Instructions</h3>
              <ol className="mt-2 list-inside list-decimal">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
            <div className="mt-4">
              <p>
                Prep Time: {recipe.prep_time} | Cook Time: {recipe.cook_time} |
                Servings: {recipe.servings}
              </p>
            </div>
          </div>
        );
      })}
    </main>
  );
}
