import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "db/client";
import { recipes } from "db/schema";

export async function loader({ request }: LoaderFunctionArgs) {
  const allRecipes = await db.select().from(recipes).all();
  return json(allRecipes);
}

export default function Component() {
  const recipes = useLoaderData<typeof loader>();
  console.log(recipes);
  const recipeItems = recipes.map((recipe) => (
    <li key={recipe.name}>{recipe.name}</li>
  ));

  return (
    <>
      <h1>Recipes</h1>

      <ul>{recipeItems}</ul>
    </>
  );
}
