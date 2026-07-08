import type { BlogBlock } from "@/lib/blog";

/* Converts between the structured blocks stored in blog content and the
   plain-text convention edited in the admin textarea:
   - "## Heading"  -> h2 block
   - "- item"      -> consecutive lines group into one ul block
   - other text    -> paragraph (blank line separates paragraphs) */

export function blocksToText(blocks: BlogBlock[]): string {
  return blocks
    .map((b) => {
      if (b.type === "h2") return `## ${b.text}`;
      if (b.type === "ul") return b.items.map((i) => `- ${i}`).join("\n");
      return b.text;
    })
    .join("\n\n");
}

export function textToBlocks(text: string): BlogBlock[] {
  const blocks: BlogBlock[] = [];
  const chunks = text.replace(/\r\n/g, "\n").split(/\n{2,}/);

  for (const chunk of chunks) {
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    let list: string[] = [];
    const flushList = () => {
      if (list.length) {
        blocks.push({ type: "ul", items: list });
        list = [];
      }
    };
    let paragraph: string[] = [];
    const flushParagraph = () => {
      if (paragraph.length) {
        blocks.push({ type: "p", text: paragraph.join(" ") });
        paragraph = [];
      }
    };

    for (const line of lines) {
      if (line.startsWith("## ")) {
        flushList();
        flushParagraph();
        blocks.push({ type: "h2", text: line.slice(3).trim() });
      } else if (line.startsWith("- ")) {
        flushParagraph();
        list.push(line.slice(2).trim());
      } else {
        flushList();
        paragraph.push(line);
      }
    }
    flushList();
    flushParagraph();
  }
  return blocks;
}
