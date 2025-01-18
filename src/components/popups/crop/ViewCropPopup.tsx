import closeBtn from "../../../assets/icon/close-btn.svg";
import {Crop} from "../../../model/Crop.ts";

interface ViewCropPopupProps {
    closePopupAction: (id:Crop) => void;
    targetCrop: Crop;
}

const ViewCropPopup = ({closePopupAction,targetCrop}:ViewCropPopupProps) => {
    return (
        <div
            id="view-crop-popup"
            className="position-absolute start-0 end-0 top-0 bottom-0 w-100 h-auto justify-content-center align-items-center d-flex"
        >
            <div className="w-50 h-auto p-4">
                <img className="float-end" src={closeBtn} onClick={() => closePopupAction(targetCrop)}/>
                <h2 className="mt-3 mb-3">View Crop</h2>
                <div className="w-100 h-auto form-set d-grid">
                    <div>
                        <div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control crop-code-text"
                                    id="floatingInput"
                                    placeholder=""
                                    readOnly
                                    value={targetCrop.cropCode}
                                />
                                <label htmlFor="floatingInput">Crop Code</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control crop-name-text"
                                    id="floatingInput"
                                    placeholder=""
                                    readOnly
                                    value={targetCrop.cropName}
                                />
                                <label htmlFor="floatingInput">Crop Common Name</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control crop-scientific-name-text"
                                id="floatingInput"
                                placeholder=""
                                readOnly
                                value={targetCrop.cropScientificName}
                            />
                            <label htmlFor="floatingInput">Crop Scientific Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control crop-season-text"
                                id="floatingInput"
                                placeholder=""
                                readOnly
                                value={targetCrop.cropSeason}
                            />
                            <label htmlFor="floatingInput">Crop Season</label>
                        </div>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control crop-type-text"
                            id="floatingInput"
                            placeholder=""
                            readOnly
                            value={targetCrop.cropType}
                        />
                        <label htmlFor="floatingInput">Crop Category</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control field-id-text"
                            id="floatingInput"
                            placeholder=""
                            readOnly
                            value={targetCrop.assignField === "" ? "None" : targetCrop.assignField}
                        />
                        <label htmlFor="floatingInput">Field Id</label>
                    </div>
                </div>
                <div className="mt-3 mb-4 w-100 field-img">
                    <img className="w-100 crop-Img"
                         src={!targetCrop.cropImage ? "https://via.placeholder.com/150" : URL.createObjectURL(targetCrop.cropImage)}
                         alt=""/>
                </div>
            </div>
        </div>
    )
}

export default ViewCropPopup