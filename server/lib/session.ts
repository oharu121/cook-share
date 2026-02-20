import "server-only";

import { cache } from "react";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

type SessionPayload = {
  email: string;
  id: string;
};

function getEncodedKey() {
  const secretKey = process.env.SESSION_SECRET;
  if (!secretKey) {
    throw new Error("SESSION_SECRET environment variable is required");
  }
  return new TextEncoder().encode(secretKey);
}

/**
 * Encrypts the session payload into a JWT.
 * @param payload - The session payload (email, id).
 */
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getEncodedKey());
}

/**
 * Decrypts and verifies a session JWT.
 * @param session - The session token.
 */
export async function decrypt(session: string | undefined = "") {
  try {
    if (!session) {
      throw new Error("Session is empty or undefined");
    }

    const { payload } = await jwtVerify(session, getEncodedKey(), {
      algorithms: ["HS256"],
    });

    return payload as SessionPayload;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to verify session:", error.message);
    } else {
      console.error("Failed to verify session:", error);
    }
    return null;
  }
}

/**
 * Creates a session and sets it in the cookies.
 * @param payload - The session payload (email, id).
 */
export async function createSession(payload: SessionPayload) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const session = await encrypt(payload);
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only secure in production
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

/**
 * Updates the expiration of an existing session.
 */
export async function updateSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    console.warn("No session found to update");
    return null;
  }

  const payload = await decrypt(session);

  if (!payload) {
    console.warn("Invalid session payload during update");
    return null;
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

/**
 * Verifies the session by decrypting the session cookie.
 * If the session is invalid or missing, returns null.
 */
export const verifySession = cache(async () => {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;

    if (!cookie) {
      return null;
    }

    const session = await decrypt(cookie);
    if (!session?.id) {
      return null;
    }

    return { isAuth: true, id: session.id };
  } catch (error) {
    console.error("Session verification failed:", error);
    return null;
  }
});

/**
 * Deletes the session cookie.
 */
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
