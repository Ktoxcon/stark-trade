import AppConfig from "@stark-trade/config/app.config";
import { DayInMilliseconds } from "@stark-trade/lib/constants/time";
import { db } from "@stark-trade/lib/db";
import { User } from "@stark-trade/lib/db/schema/user";
import { AuthRequestBodySchema } from "@stark-trade/lib/validators/auth.schemas";
import { hash, verify } from "argon2";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { ZodError } from "zod";

export const AuthController = {
  async signUp(request: Request, response: Response) {
    try {
      const { email, password } = AuthRequestBodySchema.parse(request.body);

      const [userExists] = await db
        .select()
        .from(User)
        .where(eq(User.email, email));

      if (userExists) {
        response.status(400).send({
          success: false,
          error: "User already exists.",
        });

        return;
      }

      const passwordHash = await hash(password);

      await db.insert(User).values({
        email,
        password: passwordHash,
      });

      response.send({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  },

  async signIn(request: Request, response: Response) {
    try {
      const { email, password } = AuthRequestBodySchema.parse(request.body);

      const [user] = await db.select().from(User).where(eq(User.email, email));

      if (!user) {
        response.status(404).send({
          success: false,
          error: "User not found.",
        });

        return;
      }

      const passwordMatches = await verify(user.password, password);

      if (!passwordMatches) {
        response.status(400).send({
          success: false,
          error: "Email or password are incorrect.",
        });

        return;
      }

      const { password: _userPassword, ...restUserProps } = user;

      const session = sign(
        {
          data: { ...restUserProps },
        },
        AppConfig.sessionSecret,
        {
          expiresIn: "24h",
        }
      );

      response.cookie("session", session, {
        sameSite: true,
        httpOnly: true,
        maxAge: DayInMilliseconds,
      });

      response.send({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  },

  async signOut(_request: Request, response: Response) {
    try {
      response.clearCookie("session");

      response.send({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).send({ success: false, error: error.message });
      }
    }
  },
};
