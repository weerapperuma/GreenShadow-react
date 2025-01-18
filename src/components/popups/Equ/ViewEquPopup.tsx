import closeBtn from "../../../assets/icon/close-btn.svg";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store.ts";
import {useEffect, useState} from "react";
import {Equ} from "../../../model/Equ.ts";

interface ViewStaffPopupProps {
    targetEquId: string;
    closePopupAction: (id:string) => void;
}


const ViewEquPopup = ({ targetEquId , closePopupAction }:ViewStaffPopupProps) => {
    
    const equipment = useSelector((state: RootState) => state.equ);
    const [equipmentData, setEquipmentData] = useState<Equ | null>(null);
    const staff = useSelector((state: RootState) => state.staff);
    const fields = useSelector((state: RootState) => state.field);
    
    useEffect(() => {
        const selectedEquipment = equipment.find((e: Equ) => e.equId === targetEquId) || null;
        setEquipmentData(selectedEquipment);
    }, [targetEquId, equipment]);

    const getStaffName = (staffId:string) => {
        const selectedStaff = staff.find((s) => s.staffId === staffId);
        return selectedStaff?.firstName + " " + selectedStaff?.lastName + " - " + selectedStaff?.staffId;
    }

    const getFieldName = (fieldId:string) => {
        const selectedField = fields.find((f) => f.fieldCode === fieldId);
        return selectedField?.fieldName + " " + selectedField?.fieldCode;
    }
    
    return (
        <div
            id="view-equ-popup"
            className="position-absolute start-0 end-0 top-0 bottom-0 w-100 h-auto justify-content-center align-items-center d-flex"
        >
            <div className="w-50 h-auto p-4">
                <img className="float-end" src={closeBtn} onClick={ () => closePopupAction("") }/>
                <h2 className="mt-3 mb-3">View Equipment</h2>
                <div className="w-100 h-auto form-set">
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control equ-id-text"
                            id="floatingInput"
                            placeholder=""
                            readOnly
                            value={equipmentData?.equId}
                        />
                        <label htmlFor="floatingInput">Equipment Id</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control equ-name-text"
                            id="floatingInput"
                            placeholder=""
                            readOnly
                            value={equipmentData?.equName}
                        />
                        <label htmlFor="floatingInput">Equipment Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control equ-type-text"
                            id="floatingInput"
                            placeholder=""
                            readOnly
                            value={equipmentData?.equType}
                        />
                        <label htmlFor="floatingInput">Equipment Type</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control field-text"
                            id="floatingInput"
                            placeholder=""
                            readOnly
                            value={equipmentData?.assignField === "" ? "Not Assigned" : getFieldName(equipmentData?.assignField as string)}
                        />
                        <label htmlFor="floatingInput">Assign Field</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control staff-text"
                            id="floatingInput"
                            placeholder=""
                            readOnly
                            value={equipmentData?.assignStaff === "" ? "Not Assigned" : getStaffName(equipmentData?.assignStaff as string)}
                        />
                        <label htmlFor="floatingInput">Assign Staff</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewEquPopup