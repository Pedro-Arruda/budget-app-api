import { FastifyReply, FastifyRequest } from "fastify";
import { ItemService } from "./item.service";

class ItemController {
  private invoicesService: ItemService;

  constructor(invoicesService: ItemService) {
    this.invoicesService = invoicesService;
  }

  async updateItem(
    req: FastifyRequest<{ Body: { itemId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const { itemId } = req.body;

    try {
      const data = await this.invoicesService.updateItem(itemId);

      reply.status(200).send(data);
    } catch (error) {
      reply.send(error);
    }
  }
}

export { ItemController };
