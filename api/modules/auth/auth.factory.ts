import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export const authFactory = () => {
  const authService = new AuthService();
  const authController = new AuthController(authService);
  return authController;
};
