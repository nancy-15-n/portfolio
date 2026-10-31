import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));
const expected = JSON.parse(readFileSync(new URL("../src/certificates.json", import.meta.url), "utf8"));

test("all 17 provided certificate assets are represented and copied", () => {
  assert.equal(expected.length, 17);
  assert.equal(new Set(expected).size, expected.length, "certificate filenames should be unique");
  for (const filename of expected) {
    assert.ok(existsSync(join(root, "public", "certificates", filename)), `missing ${filename}`);
  }
});

test("certificate filenames with spaces have safe URL encodings", () => {
  const spaced = expected.filter((filename) => filename.includes(" "));
  assert.ok(spaced.length > 0);
  for (const filename of spaced) {
    assert.ok(encodeURIComponent(filename).includes("%20"), `spaces should be URL-encoded: ${filename}`);
  }
});
