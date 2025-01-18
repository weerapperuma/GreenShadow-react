import { toast } from "react-toastify";

const validateCrop = (
    cropName: string,
    cropScientificName: string,
    cropSeason: string,
    cropType: string,
    image: File | null
) => {
    const alphaRegex = /^[a-zA-Z\s]+$/;
    const alphaNumericRegex = /^[a-zA-Z0-9\s]+$/;

    function validateField(field: string, fieldName: string, regex: RegExp) {
        if (!field || field.trim() === "") {
            toast.error(`${fieldName} is required.`);
            return false;
        } else if (!regex.test(field)) {
            toast.error(`${fieldName} must be valid.`);
            return false;
        } else if (field[0] !== field[0].toUpperCase()) {
            toast.error(`${fieldName} must start with a capital letter.`);
            return false;
        }
        return true;
    }

    if (!validateField(cropName, "Crop name", alphaRegex)) return false;
    if (!validateField(cropScientificName, "Crop scientific name", alphaNumericRegex)) return false;
    if (!validateField(cropSeason, "Crop season", alphaRegex)) return false;
    if (!validateField(cropType, "Crop type", alphaRegex)) return false;

    if (!image) {
        toast.error("Crop image is required.");
        return false;
    }

    return true;
};

export default validateCrop;