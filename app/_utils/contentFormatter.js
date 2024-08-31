import toast from "react-hot-toast";

export function formatToText(content) {
  if (!content) {
    toast.error("No content provided");
    return "";
  }
  return content
    .replace(/[*#]/g, "") // Remove asterisks and hash symbols
    .replace(/[’]/g, "'") // Replace right single quotes with regular single quotes
    .replace(/[‘]/g, "'") // Replace left single quotes with regular single quotes
    .replace(/[“]/g, '"') // Replace left double quotes with regular double quotes
    .replace(/[”]/g, '"') // Replace right double quotes with regular double quotes
    .replace(/\s+/g, " ") // Normalize whitespace to a single space
    .replace(/<\/?[^>]+(>|$)/g, "") // Remove all HTML tags
    .replace(/[`]/g, "'")
    .replace(/\n/g, "")
    .trim(); // Trim leading and trailing whitespace;
}
