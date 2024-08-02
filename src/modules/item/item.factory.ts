import { ItemController } from "./item.controller";
import { ItemService } from "./item.service";

export const itemsFactory = () => {
  const itemService = new ItemService();
  const itemController = new ItemController(itemService);
  return itemController;
};
