const { deterministicPartitionKey, hexHash } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the input when it's bellow MAX_PARTITION_KEY_LENGTH", () => {
    const trivialKey256 = Array(256).fill("A").join("");
    const trivialKey = deterministicPartitionKey({
      partitionKey: trivialKey256,
    });
    expect(trivialKey).toBe(trivialKey256);
  });
  it("Returns the hex hash when it's above MAX_PARTITION_KEY_LENGTH", () => {
    const trivialKey257 = Array(257).fill("A").join("");
    const trivialKey = deterministicPartitionKey({
      partitionKey: trivialKey257,
    });
    expect(trivialKey).not.toBe(trivialKey257);
  });
  it("When stringification of an object has length bellow MAX_PARTITION_KEY_LENGTH, returns the stringification itself", () => {
    const partitionKey = { a: 1, b: 2 };
    const expectedKey = JSON.stringify(partitionKey);
    const trivialKey = deterministicPartitionKey({
      partitionKey,
    });
    expect(trivialKey).toBe(expectedKey);
  });
  it("When stringification of an object has length above MAX_PARTITION_KEY_LENGTH, returns the hexHash of the stringification", () => {
    const trivialKeyA = Array(257).fill("A").join("");
    const partitionKey = { trivialKeyA };
    const expectedKey = hexHash(JSON.stringify(partitionKey));
    const trivialKey = deterministicPartitionKey({
      partitionKey,
    });
    expect(trivialKey).toBe(expectedKey);
  });
});
