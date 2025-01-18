import {Crop} from "../../../model/Crop.ts";
import closeBtn from '../../../assets/icon/close-btn.svg'
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store.ts";
import validateCrop from "../../../util/validation/CropValidation.ts";
import {updateCrop} from "../../../store/slices/CropSlice.ts";
import {toast} from "react-toastify";

interface UpdateCropPopupProps {
    handleCloseUpdateCropPopup: (data:Crop) => void;
    targetCrop: Crop;
}

const UpdateCropPopup = ({ handleCloseUpdateCropPopup , targetCrop }:UpdateCropPopupProps) => {

    const [crop, setCrop] = useState<Crop>(targetCrop)
    const dispatch = useDispatch();
    const field = useSelector((state: RootState) => state.field);
    const image1Ref = useRef<HTMLInputElement>(null);

    const loadImageToRef = () => {
        if (image1Ref.current){
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(targetCrop?.cropImage as File)
            image1Ref.current.files = dataTransfer.files;
        }
    }

    useEffect(() => {
        loadImageToRef();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setCrop((prev) => ({
            ...prev,
            [name]: type === "file" && "files" in e.target && e.target.files
                ? e.target.files[0]
                : value,
        }));
    };

    const handleUpdateCrop = () => {
        if (!validateCrop(crop.cropName, crop.cropScientificName, crop.cropSeason, crop.cropType, crop.cropImage)) return;

        try {
            dispatch(updateCrop(crop));
            toast.success("Crop update successfully.");
        }catch (e) {
            console.error(e);
        }
    }


    return (
        <div
            id="update-crop-popup"
            className="position-absolute start-0 end-0 top-0 bottom-0 w-100 h-auto justify-content-center align-items-center d-flex"
        >
            <div className="w-50 h-auto p-4">
                <img className="float-end" src={closeBtn} onClick={() => handleCloseUpdateCropPopup(targetCrop)}/>
                <h2 className="mt-3 mb-3">Update Crop</h2>
                <div className="w-100 h-auto form-set d-grid">
                    <div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control crop-name-text"
                                id="floatingInput"
                                placeholder=""
                                name="cropName"
                                defaultValue={crop.cropName}
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
                                name="cropType"
                                defaultValue={crop.cropType}
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
                                name="cropScientificName"
                                defaultValue={crop.cropScientificName}
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
                                name="cropSeason"
                                defaultValue={crop.cropSeason}
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
                        value={crop.assignField}
                    >
                        <option value="" disabled selected>None</option>
                        {field.map((f) => (
                            <option value={f.fieldName}>{f.fieldName} - {f.fieldCode}</option>
                        ))}
                    </select>
                    <label htmlFor="floatingSelect">Select a field</label>
                </div>
                <div className="mt-3 mb-4">
                    <div className="form-floating mb-3">
                        <input
                            type="file"
                            className="form-control img-input"
                            id="floatingSelect"
                            placeholder=""
                            name="cropImage"
                            onChange={handleChange}
                            ref={image1Ref}
                        />
                        <label htmlFor="floatingInput">Crop Image</label>
                    </div>
                </div>

                <button type="button" className="btn btn-outline-success w-100" onClick={handleUpdateCrop}>
                    Update Crop
                </button>
            </div>
        </div>
    )
}

export default UpdateCropPopup