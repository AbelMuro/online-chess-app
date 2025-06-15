const convertBase64ToBlobURL = (base64, contentType) => {
    const binaryData = atob(base64);                             //decode base64 into binary string
    const byteArray = new Uint8Array(binaryData.length);

    for(let i = 0; i < binaryData.length; i++){
        byteArray[i] = binaryData.charCodeAt(i)
    }

    const blob = new Blob([byteArray], {type: contentType});
    return URL.createObjectURL(blob);
}   



export default convertBase64ToBlobURL;