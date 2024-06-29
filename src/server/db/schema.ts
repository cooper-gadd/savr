// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `savr_${name}`);

export const recipe = createTable(
  "recipe",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    prepTime: varchar("prep_time", { length: 256 }),
    cookTime: varchar("cook_time", { length: 256 }),
    servings: varchar("servings", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const recipeRelations = relations(recipe, ({ many }) => ({
  ingredients: many(ingredient),
  instructions: many(instruction),
}));

export const ingredient = createTable("ingredient", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  recipeId: integer("recipe_id")
    .references(() => recipe.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
  quantity: varchar("quantity", { length: 256 }),
});

export const ingredientRelations = relations(ingredient, ({ one }) => ({
  recipe: one(recipe, {
    fields: [ingredient.recipeId],
    references: [recipe.id],
  }),
}));

export const instruction = createTable("instruction", {
  id: serial("id").primaryKey(),
  step: text("step").notNull(),
  stepNumber: integer("step_number").notNull(),
  recipeId: integer("recipe_id")
    .references(() => recipe.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const instructionRelations = relations(instruction, ({ one }) => ({
  recipe: one(recipe, {
    fields: [instruction.recipeId],
    references: [recipe.id],
  }),
}));
