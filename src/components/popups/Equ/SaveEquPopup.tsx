import closeBtn from "../../../assets/icon/close-btn.svg";
import {Equ} from "../../../model/Equ.ts";
import {useState} from "react";
import validateEquipment from "../../../util/validation/EquValidation.ts";
import {useDispatch} from "react-redux";
import {saveEqu} from "../../../store/slices/EquSlice.ts";
import {toast} from "react-toastify";
import '../../../css/components/Popups/EquPopup.css'
import {generateUUID} from "../../../util/generateUUID.ts";

interface AddEquPopupProps {
    closePopupAction: () => void;
}

const SaveEquPopup = ( {closePopupAction} : AddEquPopupProps ) => {
    const [equipment, setEquipment] = useState<Equ>({
        equId: generateUUID("EQU"),
        equName: "",
        equType: "",
        assignField: "",
        assignStaff: "",
    })

    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEquipment((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if(!validateEquipment(equipment.equName, equipment.equType)){
            return
        }
        console.log(equipment)
        try {
            console.log(equipment)
            dispatch(saveEqu(equipment))
            toast.success("Equipment saved successfully.")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div
            id="save-equ-popup"
            className="position-absolute start-0 end-0 top-0 bottom-0 w-100 h-auto justify-content-center align-items-center d-flex"
        >
            <div className="w-50 h-auto p-4">
                <img className="float-end" src={closeBtn} onClick={closePopupAction}/>
                <h2 className="mt-3 mb-3">Save Equipment</h2>
                <div className="w-100 h-auto form-set">
                    <div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control equ-name-text"
                                id="floatingInput"
                                placeholder=""
                                name={"equName"}
                                onChange={handleChange}
                            />
                            <label htmlFor="floatingInput">Equipment Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control equ-type-text"
                                id="floatingInput"
                                placeholder=""
                                name={"equType"}
                                onChange={handleChange}
                            />
                            <label htmlFor="floatingInput">Equipment Type</label>
                        </div>
                    </div>
                    <button type="button" className="btn btn-outline-success w-100" onClick={handleSave}>Save Equipment</button>
                </div>
            </div>
        </div>
    )
}

export default SaveEquPopup;