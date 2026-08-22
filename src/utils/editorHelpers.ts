import { Extension } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";

export function getLanguageExtension(lang: string): Extension {
  switch (lang) {
    case "javascript":
      return javascript();
    case "python":
      return python();
    case "html":
      return html();
    default:
      return [];
  }
}
