import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
import esbuild from "esbuild";

// Every other consolecheat tool, at its own public project URL.
const others = [
  {
    "de": "Title-ID-Finder",
    "en": "Title-ID-Finder",
    "href": "https://robfreak.github.io/consolecheat-ex1/"
  },
  {
    "de": "PS-Plus-Archiv",
    "en": "PS Plus archive",
    "href": "https://robfreak.github.io/consolecheat-ex2/"
  },
  {
    "de": "Controller-Tester",
    "en": "Controller tester",
    "href": "https://robfreak.github.io/consolecheat-ex3/"
  },
  {
    "de": "Save-Info-Leser",
    "en": "Save info reader",
    "href": "https://robfreak.github.io/consolecheat-ex4/"
  },
  {
    "de": "Fehlercode-Nachschlager",
    "en": "Error code lookup",
    "href": "https://robfreak.github.io/consolecheat-ex5/"
  },
  {
    "de": "Spiele-Merkliste",
    "en": "Spiele-Merkliste",
    "href": "https://robfreak.github.io/consolecheat-ex6/"
  },
  {
    "de": "Bildschirm-Test",
    "en": "Screen test",
    "href": "https://robfreak.github.io/consolecheat-ex7/"
  },
  {
    "de": "Download-Zeit-Rechner",
    "en": "Download time calculator",
    "href": "https://robfreak.github.io/consolecheat-ex8/"
  },
  {
    "de": "HDR/Helligkeit",
    "en": "HDR / brightness",
    "href": "https://robfreak.github.io/consolecheat-ex10/"
  },
  {
    "de": "Audio-Kanal-Test",
    "en": "Audio channel test",
    "href": "https://robfreak.github.io/consolecheat-ex11/"
  },
  {
    "de": "USB-Stick-Checkliste",
    "en": "USB stick checklist",
    "href": "https://robfreak.github.io/consolecheat-ex12/"
  },
  {
    "de": "Combo-Trainer",
    "en": "Combo trainer",
    "href": "https://robfreak.github.io/consolecheat-ex13/"
  },
  {
    "de": "Sprite-Animator",
    "en": "Sprite animator",
    "href": "https://robfreak.github.io/consolecheat-ex14/"
  }
];

test("the footer links to every other consolecheat tool at its public URL and omits itself", async () => {
  const app = readFileSync(new URL("./App.tsx", import.meta.url), "utf8");
  assert.match(app, /footerTools\("buttons", lang\)/);
  assert.match(app, /merklisteHref = "https:\/\/robfreak\.github\.io\/consolecheat-ex6\/"/);
  assert.doesNotMatch(app, /consolecheat-ex6\/[a-z]/);
  assert.doesNotMatch(app, /webmail/i);
  assert.doesNotMatch(app, /fetch\(/);

  const dir = mkdtempSync(join(fileURLToPath(new URL("../../node_modules/", import.meta.url)), "tasten-footer-"));
  const outfile = join(dir, "render.mjs");
  try {
    await esbuild.build({
      stdin: {
        contents: `
          import { createElement } from "react";
          import { renderToStaticMarkup } from "react-dom/server";
          import { SiteFooter } from "./chrome.tsx";
          import { copy } from "./messages.ts";
          import { footerTools } from "./tools.ts";
          export function render(lang) {
            return renderToStaticMarkup(createElement(SiteFooter, {
              text: copy[lang],
              merklisteHref: "https://robfreak.github.io/consolecheat-ex6/",
              tools: footerTools("buttons", lang),
              onLegal() {},
            }));
          }
        `,
        resolveDir: fileURLToPath(new URL(".", import.meta.url)),
        sourcefile: "tasten-footer-render.tsx",
        loader: "tsx",
      },
      bundle: true,
      packages: "external",
      format: "esm",
      platform: "node",
      outfile,
      jsx: "automatic",
      logLevel: "silent",
    });
    const rendered = (await import(pathToFileURL(outfile).href)) as {
      render: (lang: "de" | "en") => string;
    };
    const de = rendered.render("de");
    const en = rendered.render("en");

    assert.match(de, /Weitere Werkzeuge/);
    assert.match(de, /Impressum/);
    assert.match(de, /Datenschutz/);
    assert.match(en, /Other tools/);
    for (const tool of others) {
      const link = (label: string) => new RegExp(`href="${tool.href}"[^>]*>${label}<`);
      assert.match(de, link(tool.de), tool.de);
      assert.match(en, link(tool.en), tool.en);
    }
    assert.equal(de.includes(">Tastenbelegung<"), false);
    assert.equal(en.includes(">Button layout<"), false);
    assert.doesNotMatch(`${de}${en}`, /consolecheat-ex9\//);
    assert.doesNotMatch(`${de}${en}`, /consolecheat-ex6\/[a-z]/);
    assert.equal(en.match(/<a /g)?.length, 3 + others.length);
    assert.doesNotMatch(`${de}${en}`, /fonts\.googleapis|cdn\.jsdelivr|unpkg\.com|webmail|target=/i);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
