import { describe, expect, it } from "vitest";

import AuthRoutes from "@/domains/auth/router/AuthRoutes";

describe("AuthRoutes", () => {
  it("returns an array of route objects", () => {
    const routes = AuthRoutes();
    expect(Array.isArray(routes)).toBe(true);
  });
});
