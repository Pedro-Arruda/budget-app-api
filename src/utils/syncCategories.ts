import { PluggyClient } from "pluggy-sdk";
import { prisma } from "./prisma";

export const syncCategories = async (client: PluggyClient) => {
  console.log("ADICIONANDO CATEGORIAS ");

  const categories: any = await client.fetchCategories();
  const prismaCategories = await prisma.category.findMany();

  if (categories.total == prismaCategories.length) {
    console.log("NENHUMA CATEGORIA ADICIONADA");
    return;
  }

  const prismaCategoryIds = new Set(
    prismaCategories.map((category) => category.id)
  );
  const newCategories = categories.results.filter(
    (category: any) => !prismaCategoryIds.has(category.id)
  );

  if (newCategories.total > 0) {
    for (const category of newCategories) {
      await prisma.category.create({
        data: {
          description: category.description,
          id: category.id,
          descriptionTranslated: category.descriptionTranslated,
          parentDescription: category.parentDescription,
          parentId: category.parentId,
        },
      });

      console.log("CATEGORIA ADICIONADA - ", category.description);
    }
  }

  console.log(" CATEGORIAS ADICIONADAS");
};
