import "server-only";
import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { and, eq } from "drizzle-orm";
import {
  type CreateIngredient,
  type CreateInstruction,
  type CreateRecipe,
  ingredient,
  instruction,
  recipe,
  type UpdateIngredient,
  type UpdateInstruction,
  type UpdateRecipe,
} from "./db/schema";

export const getRecipes = async () => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const recipes = await db.query.recipe.findMany({
    where: (recipes) => eq(recipes.userId, user.userId),
    with: {
      ingredients: true,
      instructions: true,
    },
  });

  return recipes;
};

export const getRecipe = async (id: number) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const recipe = await db.query.recipe.findFirst({
    where: (recipe) => and(eq(recipe.userId, user.userId), eq(recipe.id, id)),
    with: {
      ingredients: true,
      instructions: true,
    },
  });

  return recipe;
};

export const createRecipe = async (recipeData: CreateRecipe) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const newRecipe = await db.insert(recipe).values({
    ...recipeData,
    userId: user.userId,
  });

  return newRecipe;
};

export const createIngredient = async (ingredientData: CreateIngredient) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const newIngredient = await db.insert(ingredient).values({
    ...ingredientData,
  });

  return newIngredient;
};

export const createInstruction = async (instructionData: CreateInstruction) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const newInstruction = await db.insert(instruction).values({
    ...instructionData,
  });
  return newInstruction;
};

export const updateRecipe = async (recipeData: UpdateRecipe) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  if (!recipeData.id) throw new Error("ID is required");

  const { id, ...rest } = recipeData;

  const updatedRecipe = await db
    .update(recipe)
    .set({
      ...rest,
    })
    .where(eq(recipe.id, id));

  return updatedRecipe;
};

export const updateInstruction = async (instructionData: UpdateInstruction) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  if (!instructionData.id) throw new Error("ID is required");

  const { id, ...rest } = instructionData;

  const updatedInstruction = await db
    .update(instruction)
    .set({
      ...rest,
    })
    .where(eq(instruction.id, id));

  return updatedInstruction;
};

export const updateIngredient = async (ingredientData: UpdateIngredient) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  if (!ingredientData.id) throw new Error("ID is required");

  const { id, ...rest } = ingredientData;

  const updatedIngredient = await db
    .update(ingredient)
    .set({
      ...rest,
    })
    .where(eq(ingredient.id, id));

  return updatedIngredient;
};

export const deleteRecipe = async (id: number) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db.delete(recipe).where(eq(recipe.id, id));

  return recipe;
};

export const deleteInstruction = async (id: number) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db.delete(instruction).where(eq(instruction.id, id));

  return instruction;
};

export const deleteIngredient = async (id: number) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db.delete(ingredient).where(eq(ingredient.id, id));

  return ingredient;
};
