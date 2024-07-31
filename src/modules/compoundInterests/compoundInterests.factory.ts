import { CompoundInterestsController } from "./compoundInterests.controller";
import { CompoundInterestsService } from "./compoundInterests.service";

export const compoundInterestsFactory = () => {
  const compoundInterestsService = new CompoundInterestsService();
  const compoundInterestsController = new CompoundInterestsController(
    compoundInterestsService
  );
  return compoundInterestsController;
};
