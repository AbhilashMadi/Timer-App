import { describe, expect, it } from "vitest";
import { tw } from "../src/utils/lib";

describe("tw function", () => {
  it("merges multiple class names correctly", () => {
    const result = tw("bg-red-500", "text-white", "p-4");
    expect(result).toBe("bg-red-500 text-white p-4");
  });

  it("handles conditional class names correctly", () => {
    const isActive = true;
    const result = tw("bg-red-500", isActive && "text-white", "p-4");
    expect(result).toBe("bg-red-500 text-white p-4");

    const isInactive = false;
    const resultInactive = tw("bg-red-500", isInactive && "text-white", "p-4");
    expect(resultInactive).toBe("bg-red-500 p-4");
  });

  it("ignores falsy values in class names", () => {
    const result = tw("bg-red-500", null, undefined, "p-4");
    expect(result).toBe("bg-red-500 p-4");
  });

  it("handles class name conflicts and uses tailwind-merge", () => {
    const result = tw("bg-red-500", "bg-blue-500", "text-white");
    // tailwind-merge resolves conflicts
    expect(result).toBe("bg-blue-500 text-white");
  });

  it("handles classes with variations correctly", () => {
    const result = tw("text-sm", "lg:text-lg", "md:text-base");
    expect(result).toBe("text-sm lg:text-lg md:text-base");
  });

  it("returns an empty string if no classes are passed", () => {
    const result = tw();
    expect(result).toBe("");
  });

  it("removes duplicate classes", () => {
    const result = tw("bg-red-500", "bg-red-500", "text-white");
    expect(result).toBe("bg-red-500 text-white");
  });
});
