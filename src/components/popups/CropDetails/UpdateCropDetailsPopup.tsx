import closeBtn from '../../../assets/icon/close-btn.svg'
import {useDispatch} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {Log} from "../../../model/Log.ts";
import {toast} from "react-toastify";
import {updateLog} from "../../../store/slices/LogSlice.ts";

interface UpdateLogPopupProps {
    closePopupAction: (data:Log) => void;
    targetLog: Log;
}

const UpdateCropDetailsPopup = ({ closePopupAction , targetLog } : UpdateLogPopupProps) => {

    const image1Ref = useRef<HTMLInputElement>(null);
    const[staffData, setStaffData] = useState<Log>(targetLog)

    const loadImageToRef = () => {
        if (image1Ref.current){
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(staffData?.observedImage as File)
            image1Ref.current.files = dataTransfer.files;
        }
    }


    const dispatch = useDispatch()

    useEffect(() => {
        loadImageToRef();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setStaffData((prev) => ({
            ...prev,
            [name]: type === "file" && "files" in e.target && e.target.files
                ? e.target.files[0]
                : value,
        }));
    };

    const updateAction = () => {
        // if(!validateStaffMember(staffData)){
        //     return
        // }
        try {
            dispatch(updateLog(staffData))
            toast.success("Staff member updated successfully.")
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <div
            id="update-log-popup"
            className="position-absolute start-0 end-0 top-0 bottom-0 w-100 h-auto justify-content-center align-items-center d-flex"
        >
            <div className="w-50 h-auto p-4">
                <img className="float-end" src={closeBtn} onClick={() => closePopupAction(targetLog)}/>
                <h2 className="mt-3 mb-3">Update Log</h2>
                <div className="w-100 h-auto form-set">
                    <div className="form-floating mb-3">
            <textarea
                className="form-control details-text"
                id="floatingTextarea"
                placeholder="Enter your remark here"
                style={{height: '150px'}}
                value={staffData.logDetail}
                name="logDetail"
                onChange={handleChange}
            ></textarea>
                        <label htmlFor="floatingTextarea">Details</label>
                    </div>
                    <div className="mt-3 mb-4">
                        <div className="form-floating mb-3">
                            <input
                                type="file"
                                className="form-control input-file"
                                id="floatingInput"
                                placeholder="name@example.com"
                                name="observedImage"
                                ref={image1Ref}
                                onChange={handleChange}
                            />
                            <label htmlFor="floatingInput">Image</label>
                        </div>
                    </div>
                    <button type="button" className="btn btn-outline-success w-100" onClick={updateAction}>
                        Update Log
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateCropDetailsPopup