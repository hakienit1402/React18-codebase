import "@testing-library/jest-dom";

import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, expect, vi } from "vitest";

// Extend Vitest's expect with @testing-library/jest-dom matchers
expect.extend(matchers);

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver if needed
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock window.matchMedia if needed
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Reset all mocks after each test
afterEach(() => {
  vi.clearAllMocks();
});

// Mock session store
vi.mock("@/services/session/sessionStore", () => ({
  useSharedGlobal: vi.fn().mockImplementation((selector) => {
    const mockState = {
      setTypeLogout: vi.fn(),
      setTimeLimit: vi.fn(),
    };
    return selector ? selector(mockState) : mockState;
  }),
}));

// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock react-hook-form
vi.mock("react-hook-form", async () => {
  const actual = await vi.importActual("react-hook-form");
  return {
    ...actual,
  };
});

export const mockMutate = vi.fn();
export const mockMutateAsync = vi.fn();

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useMutation: () => ({
      mutate: mockMutate,
      mutateAsync: mockMutateAsync,
      isLoading: false,
      isError: {},
    }),
  };
});
