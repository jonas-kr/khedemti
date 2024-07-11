const uploadImage = async (image) => {
    if (!image) {
        throw Error("There is no Image to upload")
    }
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'recrutement');

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/dnnbhmypw/image/upload`, {
            method: 'POST',
            body: formData
        })
        if (response.ok) {
            const data = await response.json();
            return data.url
        }
    } catch (error) {
        return error
    }
}

export { uploadImage }