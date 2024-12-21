import { toast } from "sonner";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TimerFormData, validateTimerForm } from "../src/utils/validation";

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("validateTimerForm", () => {
  const validData: TimerFormData = {
    title: "Valid Timer",
    description: "This is a valid timer",
    hours: 1,
    minutes: 30,
    seconds: 0,
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return true for valid data", () => {
    expect(validateTimerForm(validData)).toBe(true);
  });

  it("should return false and show error for empty title", () => {
    const data = { ...validData, title: "" };
    expect(validateTimerForm(data)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Title is required");
  });

  it("should return false and show error for title longer than 50 characters", () => {
    const data = { ...validData, title: "a".repeat(51) };
    expect(validateTimerForm(data)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Title must be less than 50 characters");
  });

  it("should return false and show error for negative time values", () => {
    const data = { ...validData, hours: -1 };
    expect(validateTimerForm(data)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Time values cannot be negative");
  });

  it("should return false and show error for minutes greater than 59", () => {
    const data = { ...validData, minutes: 60 };
    expect(validateTimerForm(data)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Minutes and seconds must be between 0 and 59");
  });

  it("should return false and show error for seconds greater than 59", () => {
    const data = { ...validData, seconds: 60 };
    expect(validateTimerForm(data)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Minutes and seconds must be between 0 and 59");
  });

  it("should return false and show error for total time of 0 seconds", () => {
    const data = { ...validData, hours: 0, minutes: 0, seconds: 0 };
    expect(validateTimerForm(data)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Please set a time greater than 0");
  });

  it("should return false and show error for total time exceeding 24 hours", () => {
    const data = { ...validData, hours: 25 };
    expect(validateTimerForm(data)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Timer cannot exceed 24 hours");
  });
});