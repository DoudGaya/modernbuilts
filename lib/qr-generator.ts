// This would typically use the 'qrcode' library

export async function generateQRCode(verificationToken: string) {
  // In a real implementation, you would use the qrcode library:
  // import QRCode from 'qrcode'
  // const url = `https://stablebricks.com/user-investment/${verificationToken}`
  // return await QRCode.toDataURL(url)

  const url = `https://stablebricks.com/user-investment/${verificationToken}`
  console.log("Generating QR code for:", url)

  // Return mock QR code data that points to the verification URL
  return `data:image/png;base64,mock-qr-code-data-for-${encodeURIComponent(url)}`
}


// // This would typically use the 'qrcode' library

// export async function generateQRCode(url: string) {
//   // In a real implementation, you would use the qrcode library:
//   // import QRCode from 'qrcode'
//   // return await QRCode.toDataURL(url)

//   console.log("Generating QR code for:", url)

//   // Return mock QR code data
//   return `data:image/png;base64,mock-qr-code-data-for-${encodeURIComponent(url)}`
// }
