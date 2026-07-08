import "server-only";
import { promises as fs } from "fs";
import path from "path";

/* JSON file store for admin-editable content. Files live in <repo>/content and
   win over the baked-in defaults in code; a missing file simply means "no
   overrides yet". Designed for a VPS/Node host with a writable disk. */

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function readContent<T>(name: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, `${name}.json`), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeContent<T>(name: string, data: T): Promise<void> {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  const file = path.join(CONTENT_DIR, `${name}.json`);
  const tmp = `${file}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, file);
}
