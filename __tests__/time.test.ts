// utils/time.test.ts
import { describe, it, expect } from "vitest";
import { formatTime, convertSeconds } from "../src/utils/time";

describe("formatTime", () => {
  it("should format seconds to mm:ss correctly", () => {
    expect(formatTime(59)).toBe("00:59");
    expect(formatTime(120)).toBe("02:00");
    expect(formatTime(3600)).toBe("01:00:00");
  });

  it("should format seconds to HH:mm:ss correctly", () => {
    expect(formatTime(3600)).toBe("01:00:00");
    expect(formatTime(3661)).toBe("01:01:01");
    expect(formatTime(7201)).toBe("02:00:01");
  });

  it("should handle 0 seconds correctly", () => {
    expect(formatTime(0)).toBe("00:00");
  });

  it("should format times under 1 minute as mm:ss", () => {
    expect(formatTime(45)).toBe("00:45");
  });

  it("should format times between 1 hour and 2 hours as HH:mm:ss", () => {
    expect(formatTime(5000)).toBe("01:23:20");
  });
});

describe("convertSeconds", () => {
  it("should convert seconds to hours, minutes, and seconds", () => {
    expect(convertSeconds(3661)).toEqual({ hours: 1, minutes: 1, seconds: 1 });
    expect(convertSeconds(59)).toEqual({ hours: 0, minutes: 0, seconds: 59 });
    expect(convertSeconds(3600)).toEqual({ hours: 1, minutes: 0, seconds: 0 });
    expect(convertSeconds(125)).toEqual({ hours: 0, minutes: 2, seconds: 5 });
  });

  it("should handle edge cases correctly", () => {
    expect(convertSeconds(0)).toEqual({ hours: 0, minutes: 0, seconds: 0 });
    expect(convertSeconds(7200)).toEqual({ hours: 2, minutes: 0, seconds: 0 });
    expect(convertSeconds(3660)).toEqual({ hours: 1, minutes: 1, seconds: 0 });
  });

  it("should convert large numbers correctly", () => {
    expect(convertSeconds(10000)).toEqual({ hours: 2, minutes: 46, seconds: 40 });
  });
});
