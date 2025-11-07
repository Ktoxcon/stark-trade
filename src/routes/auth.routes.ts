import { AuthController } from "@stark-trade/controllers/auth.controller";
import { UrlEncodedMiddleware } from "@stark-trade/middleware/url-encoded.middleware";
import { Router } from "express";

export const AuthRouter = Router();

AuthRouter.use(UrlEncodedMiddleware);

AuthRouter.post("/signin", AuthController.signIn);
AuthRouter.post("/signup", AuthController.signUp);
AuthRouter.post("/signout", AuthController.signOut);
