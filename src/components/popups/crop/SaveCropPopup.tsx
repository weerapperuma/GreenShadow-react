import CloseBtn from '../../../assets/icon/close-btn.svg'
import '../../../css/components/Popups/CropPopup.css'
import {useState} from "react";
import {Crop} from "../../../model/Crop.ts";
import {generateUUID} from "../../../util/generateUUID.ts";
import {useDispatch, useSelector} from "react-redux";
import validateCrop from "../../../util/validation/CropValidation.ts";
import {addCrop} from "../../../store/slices/CropSlice.ts";
import {toast} from "react-toastify";
import {RootState} from "../../../store/store.ts";

interface SaveCropProps {
    closePopupAction: () => void;
}

const SaveCropPopup = ({closePopupAction} :SaveCropProps) => {
    const [crop, setCrop] = useState<Crop>({
        cropCode: generateUUID('CROP'),
        cropName: "",
        cropScientificName: "",
        cropSeason: "",
        cropType: "",
        cropImage: null,
        assignField: "",
    })
    const dispatch = useDispatch();
    const field = useSelector((state: RootState) => state.field);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setCrop((prev) => ({
            ...prev,
            [name]: type === "file" && "files" in e.target && e.target.files
                ? e.target.files[0]
                : value,
        }));
    };

    const handleSaveCrop = () => {
        if (!validateCrop(crop.cropName, crop.cropScientificName, crop.cropSeason, crop.cropType, crop.cropImage)) return;

        try {
            dispatch(addCrop(crop));
            toast.success("Crop saved successfully.");
        }catch (e) {
            console.error(e);
        }
    }

    return (
        <div
            id="save-crop-popup"
            className="position-absolute start-0 end-0 top-0 bottom-0 w-100 h-auto justify-content-center align-items-center d-flex"
        >
            <div className="w-50 h-auto p-4">
                <img className="float-end" src={CloseBtn} onClick={closePopupAction}/>
                <h2 className="mt-3 mb-3">Save Crop</h2>
                <div className="w-100 h-auto form-set d-grid">
                    <div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control crop-name-text"
                                id="floatingInput"
                                placeholder=""
                                name={"cropName"}
                                onChange={handleChange}
                            />
                            <label htmlFor="floatingInput">Crop Common Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control crop-type-text"
                                id="floatingInput"
                                placeholder=""
                                name={"cropType"}
                                onChange={handleChange}
                            />
                            <label htmlFor="floatingInput">Crop Type</label>
                        </div>
                    </div>
                    <div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control crop-scientific-text"
                                id="floatingInput"
                                placeholder=""
                                name={"cropScientificName"}
                                onChange={handleChange}
                            />
                            <label htmlFor="floatingInput">Crop Scientific Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control crop-session-text"
                                id="floatingInput"
                                placeholder=""
                                name={"cropSeason"}
                                onChange={handleChange}
                            />
                            <label htmlFor="floatingInput">Crop Session</label>
                        </div>
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <select
                        className="form-control field-combo"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                        name={"assignField"}
                        onChange={handleChange}
                    >
                        <option value="" disabled selected>None</option>
                        {field.map((f) => (
                            <option value={f.fieldName}>{f.fieldName} - {f.fieldCode}</option>
                        ))}

                    </select>
                    <label htmlFor="floatingSelect">Select a field</label>
                </div>
                <div className="mt-3 mb-4">
                    <form className="file-upload-form w-100">
                        <label htmlFor="file" className="file-upload-label w-100">
                            <div className="file-upload-design">
                                <svg viewBox="0 0 640 512" height="1em">
                                    <path
                                        d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                                    ></path>
                                </svg>
                                <p>Drag and Drop</p>
                                <p>or</p>
                                <span className="browse-button">Browse file</span>
                            </div>
                            <input className="img-input" id="file" type="file"
                                name={"cropImage"}
                                onChange={handleChange}
                            />
                        </label>
                    </form>
                </div>

                <button type="button" className="btn btn-outline-success w-100" onClick={handleSaveCrop}>
                    Save Crop
                </button>
            </div>
        </div>
    )
}

export default SaveCropPopup;