import { describe, expect } from "vitest";
interface LocalStorageMock {
  store: { [key: string]: unknown };
  getItem: (key: string) => unknown;
  setItem: (key: string, value: unknown) => void;
  clear: () => void;
  removeItem: (key: string) => void;
  getAll: () => { [key: string]: unknown };
}
const localStorageMock: LocalStorageMock = {
  store: {},
  getItem(key: string) {
    return this.store[key];
  },
  setItem(key: string, value: unknown) {
    this.store[key] = value;
  },
  clear() {
    this.store = {};
  },
  removeItem(key: string) {
    delete this.store[key];
  },
  getAll() {
    return this.store;
  },
};

Object.defineProperty(window, "localStorage", { value: localStorageMock });

const setLocalStorage = (id: string, data: { data: string }) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

describe("Search Component", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  it("data is added into local storage", () => {
    const mockId = "1";
    const mockJson = { data: "json data" };
    setLocalStorage(mockId, mockJson);
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
  });
  it("data in local storage which is overwritten", () => {
    const mockId = "222";
    const mockOldData = { data: "json data" };
    const mockNewData = { data: " new data" };

    window.localStorage.setItem(mockId, JSON.stringify(mockOldData));
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockOldData));

    setLocalStorage(mockId, mockNewData);
    window.localStorage.setItem(mockId, JSON.stringify(mockNewData));
  });
  test("only one ID is in localStorage", () => {
    const mockId = "333";
    const mockOldData = { data: "json data" };
    const mockNewData = { data: " new data" };

    window.localStorage.setItem(mockId, JSON.stringify(mockOldData));
    setLocalStorage(mockId, mockNewData);

    const allItems = window.localStorage.getAll();

    expect(Object.keys(allItems).length).toBe(1);
  });
});


