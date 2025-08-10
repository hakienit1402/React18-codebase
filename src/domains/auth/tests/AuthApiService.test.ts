import { describe, expect, it } from "vitest";

import { AuthApiService } from "@/domains/auth/services/api";

describe("AuthApiService", () => {
  it("returns the same singleton instance", () => {
    const a = AuthApiService.getInstance();
    const b = AuthApiService.getInstance();
    expect(a).toBe(b);
  });
});
