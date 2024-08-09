import './ImageUpload.css'

const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

const ImageUpload = ({ name, label, image, handleImageUpload }) => {

    const handleSelectImage = async (evt) => {
        const formData = new FormData()
        const file = (evt.target.files[0])

        formData.append('file', file)
        formData.append('upload_preset', uploadPreset)

        const res = await fetch(uploadUrl, {
            method: 'POST',
            body: formData
        })

        const imageData = await res.json()
        handleImageUpload(imageData.secure_url)

    }

    return (
    <>
    {image ?
    <div className="upload-image" style={{backgroundImage: `url(${image})`}}> </div>
    :
    <>
    <label htmlFor={name}>{label}</label>
    <input
        type="file"
        name={name}
        id={name}
        accept='image/*'
        onChange={handleSelectImage}
        />
        </>
        }
        </>
    )
}

export default ImageUpload