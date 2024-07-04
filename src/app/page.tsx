import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getRecipes } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Recipes() {
  const recipes = await getRecipes();

  return (
    <div className="flex flex-row space-x-6">
      {recipes.map((recipe) => {
        return (
          <Card key={recipe.id}>
            <CardHeader>
              <CardTitle>{recipe.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                className="rounded-lg"
                width={300}
                height={300}
                src="/placeholder.jpeg"
                alt="placeholder"
              />
            </CardContent>
            <CardFooter>
              <CardDescription>
                <Button variant="outline">Learn More</Button>
              </CardDescription>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="flex items-center justify-center py-6">
      <SignedOut>
        <div className="text-5xl">
          Welcome to Savr, a sleek and intuitive recipe manager.
        </div>
      </SignedOut>
      <SignedIn>
        <Recipes />
      </SignedIn>
    </main>
  );
}
