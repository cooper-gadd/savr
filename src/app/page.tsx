import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const recipes = await db.query.recipe.findMany({
    with: {
      ingredients: true,
      instructions: true,
    },
  });

  return (
    <main className="flex flex-row items-center justify-center space-x-6 py-6">
      {recipes.map((recipe) => {
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
                {recipe.instructions.map((instruction) => (
                  <li key={instruction.id}>{instruction.step}</li>
                ))}
              </ol>
            </div>
            <div className="mt-4">
              <p>
                Prep Time: {recipe.prepTime} | Cook Time: {recipe.cookTime} |
                Servings: {recipe.servings}
              </p>
            </div>
          </div>
        );
      })}
    </main>
  );
}
