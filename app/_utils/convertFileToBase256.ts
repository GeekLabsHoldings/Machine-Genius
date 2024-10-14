// Helper function to convert File to Base256
function convertFileToBase256(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (event) => {
      if (event.target && event.target.result instanceof ArrayBuffer) {
        const uint8Array = new Uint8Array(event.target.result);
        console.log("Base256 Data:", uint8Array);
        resolve(uint8Array);
      } else {
        reject("Failed to convert file to Base256");
      }
    };

    reader.onerror = (error) => reject(error);
  });
}

export default convertFileToBase256;