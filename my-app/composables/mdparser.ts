import markdownParser from "@nuxt/content/transformers/markdown";

export async function mdparser(tag) {
  const { t } = useI18n();
  return await markdownParser.parse("content:dummy.md", t(tag));
}
