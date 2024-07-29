import { PluggyClient } from "pluggy-sdk";
import { prisma } from "./prisma";

export const syncCategories = async (client: PluggyClient) => {
  const categories: any = await client.fetchCategories();
  const prismaCategories = await prisma.category.findMany();

  if (categories.total == prismaCategories.length) return;

  if (categories.total > 0) {
    for (const category of categories.results) {
      const foundCategory = await prisma.category.findUnique({
        where: { id: category.id },
      });

      if (!foundCategory) {
        await prisma.category.create({
          data: {
            description: category.description,
            id: category.id,
            descriptionTranslated: category.descriptionTranslated,
            parentDescription: category.parentDescription,
            parentId: category.parentId,
          },
        });
      }
    }
  }
};
