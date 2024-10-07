// Helper function to convert File to Base64
function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject("Failed to convert file to base64");
    };
    reader.onerror = (error) => reject(error);
  });
}

export default convertFileToBase64;
