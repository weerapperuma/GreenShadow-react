import {toast} from "react-toastify";

const validateEquipment = (equipmentName:string, equipmentType:string) => {
    const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
    if (!equipmentName || equipmentName.trim() === "") {
        toast.error("Equipment name is required.");
        return false;
    } else if (!alphaNumericRegex.test(equipmentName)) {
        toast.error("Equipment name can only contain letters and numbers.");
        return false;
    } else if (equipmentName[0] !== equipmentName[0].toUpperCase()) {
        toast.error("The first letter of the equipment name must be capitalized.");
        return false;
    }

    if (!equipmentType || equipmentType.trim() === "") {
        toast.error("Equipment type is required.");
        return false;
    } else if (!alphaNumericRegex.test(equipmentType)) {
        toast.error("Equipment type can only contain letters and numbers.");
        return false;
    } else if (equipmentType[0] !== equipmentType[0].toUpperCase()) {
        toast.error("The first letter of the equipment type must be capitalized.");
        return false;
    }
    return true;
}

export default validateEquipment;