import { PluggyClient } from "pluggy-sdk";
import { prisma } from "./prisma";

export const syncCategories = async (client: PluggyClient) => {
  console.log("ADICIONANDO CATEGORIAS ");

  const categories: any = await client.fetchCategories();
  const prismaCategories = await prisma.category.findMany();

  console.log(categories.total);
  console.log(prismaCategories.length);

  if (categories.total == prismaCategories.length) {
    console.log("NENHUMA CATEGORIA ADICIONADA");
    return;
  }

  if (categories.total > 0) {
    for (const category of categories.results) {
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

  console.log(" CATEGORIAS ADICIONADAS");
};
