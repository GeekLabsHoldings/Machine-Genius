import toast from "react-hot-toast";

export function formatToText(content) {
  if (!content) {
    toast.error("No content provided");
    return "";
  }

  return content
    .replace(/<\/?[^>]+(>|$)|[*#]|[`]|[’‘]|[“”]/g, (match) => {
      switch (match) {
        case "’":
        case "‘":
        case "`":
          return "'";
        case "“":
        case "”":
          return '"';
        default:
          return " ";
      }
    })
    .replace(/\s+/g, " ") // Normalize whitespace to a single space
    .trim(); // Trim leading and trailing whitespace
}
