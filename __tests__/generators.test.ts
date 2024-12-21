// utils/generators.test.ts
import { describe, it, expect, vi } from "vitest";
import { generateId } from "../src/utils/generators";

describe("generateId", () => {
  it("should generate a unique id using randomUUID", () => {
    // Mock crypto.randomUUID to return a fixed value
    const mockUUID = "123e4567-e89b-12d3-a456-426614174000";
    vi.spyOn(crypto, "randomUUID").mockReturnValue(mockUUID);

    // Call generateId
    const id = generateId();

    // Check that the result matches the mock value
    expect(id).toBe(mockUUID);

    // Optionally, check if crypto.randomUUID was called
    expect(crypto.randomUUID).toHaveBeenCalledOnce();
  });

  it("should generate different ids for different calls", () => {
    const mockUUID1 = "123e4567-e89b-12d3-a456-426614174001";
    const mockUUID2 = "123e4567-e89b-12d3-a456-426614174002";

    // Mocking randomUUID to return different values for consecutive calls
    vi.spyOn(crypto, "randomUUID")
      .mockReturnValueOnce(mockUUID1)
      .mockReturnValueOnce(mockUUID2);

    // Call generateId twice and check for different values
    const id1 = generateId();
    const id2 = generateId();

    expect(id1).toBe(mockUUID1);
    expect(id2).toBe(mockUUID2);

    // Check that randomUUID was called twice
    expect(crypto.randomUUID).toHaveBeenCalledTimes(2);
  });
});
