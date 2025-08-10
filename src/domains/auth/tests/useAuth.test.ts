import { describe, expect, it, vi } from "vitest";

import { useAuth } from "@/domains/auth/hooks/useAuth";
import { AuthApiService } from "@/domains/auth/services/api";

vi.mock("@/domains/auth/services/api", () => {
  class MockAuthApiService {
    static instance: MockAuthApiService;
    static getInstance() {
      if (!MockAuthApiService.instance) MockAuthApiService.instance = new MockAuthApiService();
      return MockAuthApiService.instance;
    }
  }
  return {
    AuthApiService: MockAuthApiService as unknown as typeof AuthApiService,
  };
});

describe("useAuth", () => {
  it("returns AuthInstance from AuthApiService singleton", () => {
    const { AuthInstance } = useAuth();
    expect(AuthInstance).toBeDefined();
  });
});
