export function contentCleaner(content) {
  if (!content) {
    return "";
  }
  // Remove script, svg, form, iframe, and blockquote tags, then, Remove empty lines
  const regex = /<(script|svg|form|iframe|blockquote)[\s\S]*?<\/\1>/gi;
  let cleanedContent = content.replace(regex, "").replace(/^\s*[\r\n]/gm, "");
  return cleanedContent;
}
