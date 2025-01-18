import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker"; // Optional for fake data generation
import { Ingredient, Step } from "@/types/recipe";
import { InputJsonValue } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

// Generate fake ingredients and steps
const generateIngredients = (): Ingredient[] =>
  Array.from({ length: 5 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    amount: faker.number.int({ min: 1, max: 500 }),
    unit: faker.helpers.arrayElement(["g", "ml", "cup", "tbsp", "tsp"]),
  }));

const generateSteps = (): Step[] =>
  Array.from({ length: 5 }).map((_, index) => ({
    id: faker.string.uuid(),
    order: index + 1,
    description: faker.lorem.sentence(),
  }));

async function main() {
  // Create users
  const users = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          bio: faker.lorem.sentence(),
          defaultPublic: faker.datatype.boolean(),
          emailNotifications: faker.datatype.boolean(),
          darkMode: faker.datatype.boolean(),
        },
      })
    )
  );

  console.log("Users created:", users);

  // Create recipes for each user
  for (const user of users) {
    const recipes = await Promise.all(
      Array.from({ length: 3 }).map(() => {
        const ingredients = generateIngredients();
        const steps = generateSteps();

        return prisma.recipe.create({
          data: {
            title: faker.lorem.words(3),
            description: faker.lorem.paragraph(),
            ingredients: ingredients as unknown as InputJsonValue,
            steps: steps as unknown as InputJsonValue,
            cookingTime: faker.number.int({ min: 10, max: 120 }),
            servings: faker.number.int({ min: 1, max: 10 }),
            difficulty: faker.helpers.arrayElement(["easy", "medium", "hard"]),
            category: faker.helpers.arrayElement([
              "Dessert",
              "Main Course",
              "Appetizer",
            ]),
            isPublic: faker.datatype.boolean(),
            template: faker.datatype.boolean(),
            createdBy: user.id, // Link recipe to user
          },
        });
      })
    );

    console.log(`Recipes created for user ${user.id}:`, recipes);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
