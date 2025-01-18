import closeBtn from "../../../assets/icon/close-btn.svg";
import '../../../css/components/Popups/LogPopup.css'
import {generateUUID} from "../../../util/generateUUID.ts";
import {useState} from "react";
import {Log} from "../../../model/Log.ts";
import {RootState} from "../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {addLog} from "../../../store/slices/LogSlice.ts";
import {toast} from "react-toastify";

interface SaveCropDetailsPopup {
    closePopupAction: () => void;
}

const SaveCropDetailsPopup = ({ closePopupAction } : SaveCropDetailsPopup) => {

    const setDate = () => {
        const cropDate = new Date();
        const formattedDate = cropDate.toLocaleDateString('en-US'); // Output: "01/03/2025"
        console.log(formattedDate);
        return formattedDate;
    }

    const [crop, setCrop] = useState<Log>({
        logCode: generateUUID('LOG'),
        logDate: setDate() ? setDate() as string : "",
        cropCodes: [],
        logDetail: "",
        fieldCodes: [],
        observedImage: null,
        staffIds: []
    })

    const [fieldSet, setFieldSet] = useState<string[]>([])
    const [cropSet, setCropSet] = useState<string[]>([])
    const [staffSet, setStaffSet] = useState<string[]>([])
    const staff = useSelector((state: RootState) => state.staff)
    const field = useSelector((state: RootState) => state.field)
    const crops = useSelector((state: RootState) => state.crop)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setCrop((prev) => ({
            ...prev,
            [name]: type === "file" && "files" in e.target && e.target.files
                ? e.target.files[0]
                : value,
        }));
    };

    const saveField = (fieldCode: string) => {
        setFieldSet([...fieldSet, fieldCode])
    }

    const saveCrop = (cropCode: string) => {
        setCropSet([...cropSet, cropCode])
    }

    const saveStaff = (staffId: string) => {
        setStaffSet([...staffSet, staffId])
    }

    const removeField = (fieldCode: string) => {
        setFieldSet(fieldSet.filter((field) => field !== fieldCode))
    }

    const removeCrop = (cropCode: string) => {
        setCropSet(cropSet.filter((crop) => crop !== cropCode))
    }

    const removeStaff = (staffId: string) => {
        setStaffSet(staffSet.filter((staff) => staff !== staffId))
    }

    const dispatch = useDispatch();

    const handleSaveLog = () => {
        if (!crop.logDetail) return;

        try {
            crop.fieldCodes = fieldSet;
            crop.cropCodes = cropSet;
            crop.staffIds = staffSet
            dispatch(addLog(crop));
            toast.success("Log saved successfully.");
        }catch (e) {
            console.error(e);
        }
    }

    return (
        <div
            id="save-log-popup"
            className="position-absolute start-0 end-0 top-0 bottom-0 w-100 h-auto justify-content-center align-items-center d-flex"
        >
            <div className="w-50 h-auto p-4">
                <img className="float-end" src={closeBtn} onClick={closePopupAction}/>
                <h2 className="mt-3 mb-3">Save Log</h2>
                <div className="w-100 h-auto form-set d-grid">
                    <div>
                        <div className="form-floating mb-3">
                            <select
                                className="form-control field-combo"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                name={"fieldCodes"}
                                onChange={(e) => saveField(e.target.value)}
                            >
                                <option value="" disabled selected>None</option>
                                {
                                    field.map((field) => (
                                        <option key={field.fieldCode} value={field.fieldCode}>{field.fieldName}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor="floatingSelect">Select a Field</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select
                                className="form-control crop-combo"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                name={"cropCodes"}
                                onChange={(e) => saveCrop(e.target.value)}
                            >
                                <option value="" disabled selected>None</option>
                                {
                                    crops.map((crop) => (
                                        <option key={crop.cropCode} value={crop.cropCode}>{crop.cropName}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor="floatingSelect">Select a Crop</label>
                        </div>
                        <div>
                            <div className="form-floating mb-3">
                                <select
                                    className="form-control staff-combo"
                                    id="floatingSelect"
                                    aria-label="Floating label select example"
                                    name={"staffIds"}
                                    onChange={(e) => saveStaff(e.target.value)}
                                >
                                    <option value="" disabled selected>None</option>
                                    {
                                        staff.map((staff) => (
                                            <option key={staff.staffId} value={staff.staffId}>{staff.firstName}</option>
                                        ))
                                    }
                                </select>
                                <label htmlFor="floatingSelect">Select a staff member</label>
                            </div>
                            <div className="form-floating mb-3">
                            <textarea
                                className="form-control description"
                                id="logDetailTextarea"
                                placeholder="Enter your remark here"
                                style={{height: "150px"}}
                                name="logDetail"
                                onChange={handleChange}
                            ></textarea>
                                <label htmlFor="floatingTextarea">Details</label>
                            </div>
                        </div>
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
                                <input id="file" type="file" className="observed-image"
                                        name="observedImage"
                                        onChange={handleChange}
                                />
                            </label>
                        </form>
                        <div className="select-field-set">
                            {
                                fieldSet.map((fieldCode) => (
                                    <h6 key={fieldCode} onClick={() => removeField(fieldCode)}>
                                        {fieldCode}
                                    </h6>
                                ))
                            }
                        </div>
                        <div className="select-staff-set">
                            {
                                staffSet.map((staffId) => (
                                    <h6 key={staffId} onClick={() => removeStaff(staffId)}>
                                        {staffId}
                                    </h6>
                                ))
                            }
                        </div>
                        <div className="select-crop-set">
                            {
                                cropSet.map((cropCode) => (
                                    <h6 key={cropCode} onClick={() => removeCrop(cropCode)}>
                                        {cropCode}
                                    </h6>
                                ))
                            }
                        </div>
                    </div>
                    <button type="button" className="btn btn-outline-success w-100" onClick={handleSaveLog}>
                        Save Log
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SaveCropDetailsPopup