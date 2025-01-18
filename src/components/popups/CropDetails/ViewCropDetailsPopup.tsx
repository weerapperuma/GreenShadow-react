import closeBtn from '../../../assets/icon/close-btn.svg'
import {Log} from "../../../model/Log.ts";
import {dataRefactor} from "../../../util/dataRefactor.ts";

interface ViewCropDetailsPopupProps {
    closePopupAction: (data:Log) => void;
    targetLog: Log;
}

const ViewCropDetailsPopup = ({closePopupAction,targetLog}:ViewCropDetailsPopupProps) => {
    return (
        <div
            id="view-log-popup"
            className="position-absolute start-0 end-0 top-0 bottom-0 w-100 h-auto justify-content-center align-items-center d-flex"
        >
            <div className="w-50 h-auto p-4">
                <img className="float-end" src={closeBtn} onClick={() => closePopupAction(targetLog)}/>
                <h2 className="mt-3 mb-3">View Crop</h2>
                <div className="w-100 h-auto form-set d-grid">
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control log-code-text"
                            id="floatingInput"
                            placeholder="name@example.com"
                            readOnly
                            value={targetLog.logCode}
                        />
                        <label htmlFor="floatingInput">Log Code</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control log-date-text"
                            id="floatingInput"
                            placeholder="name@example.com"
                            readOnly
                            value={targetLog.logDate}
                        />
                        <label htmlFor="floatingInput">Log Date</label>
                    </div>
                </div>
                <div className="form-floating mb-3">
            <textarea
                className="form-control details-text"
                id="floatingTextarea"
                placeholder="Enter your remark here"
                style={{height: "150px"}}
                readOnly
                value={targetLog.logDetail}
            ></textarea>
                    <label htmlFor="floatingTextarea">Details</label>
                </div>
                <div className="select-sets d-flex">
                    <div className="crop-set">
                        {
                            targetLog.cropCodes.map((crop) => (
                                <h6>{dataRefactor(crop,10)}</h6>
                            ))
                        }
                    </div>
                    <div className="field-set">
                        {
                            targetLog.fieldCodes.map((field) => (
                                <h6>{dataRefactor(field,10)}</h6>
                            ))
                        }
                    </div>
                    <div className="staff-set">
                        {
                            targetLog.staffIds.map((staff) => (
                                <h6>{dataRefactor(staff,10)}</h6>
                            ))
                        }
                    </div>
                </div>
                <div className="mt-3 mb-4 w-100 field-img">
                    <img
                        className="w-100 observed-image"
                        src={!targetLog.observedImage ? "https://via.placeholder.com/150" : URL.createObjectURL(targetLog.observedImage)}
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

export default ViewCropDetailsPopup