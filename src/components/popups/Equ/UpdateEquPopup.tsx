import closeBtn from '../../../assets/icon/close-btn.svg'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store.ts";
import {useEffect, useState} from "react";
import {Staff} from "../../../model/Staff.ts";
import {Equ} from "../../../model/Equ.ts";
import {Field} from "../../../model/Field.ts";
import {toast} from "react-toastify";
import validateEquipment from "../../../util/validation/EquValidation.ts";
import {updateEqu} from "../../../store/slices/EquSlice.ts";

interface UpdateEquPopupProps {
    closePopupAction: (id:string) => void;
    targetEqu: string;
}

const UpdateEquPopup = ({closePopupAction , targetEqu}:UpdateEquPopupProps) => {

    const equ = useSelector((state: RootState) => state.equ)
    const staff = useSelector((state: RootState) => state.staff)
    const field = useSelector((state: RootState) => state.field)
    const[equData, setEquData] = useState<Equ>({
        equId: "",
        equName: "",
        equType: "",
        assignStaff: "",
        assignField: ""
    })

    const dispatch = useDispatch()

    useEffect(() => {
        setEquData(equ.find((equ: Equ) => equ.equId === targetEqu ) as Equ)
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEquData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const updateAction = () => {
        try {
            if (!validateEquipment(equData.equName, equData.equType)){
                return
            }
            dispatch(updateEqu(equData))
            toast.success("Equipment updated successfully.")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div
            id="update-equ-popup"
            className="position-absolute start-0 end-0 top-0 bottom-0 w-100 h-auto justify-content-center align-items-center d-flex"
        >
            <div className="w-50 h-auto p-4">
                <img className="float-end" src={closeBtn} onClick={() => closePopupAction("")}/>
                <h2 className="mt-3 mb-3">Update Equipment</h2>
                <div className="w-100 h-auto form-set">
                    <div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control equ-name-text"
                                id="floatingInput"
                                placeholder=""
                                name={"equName"}
                                defaultValue={equData.equName}
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
                                defaultValue={equData.equType}
                                onChange={handleChange}
                            />
                            <label htmlFor="floatingInput">Equipment Type</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select
                                className="form-control staff-combo"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                name={"assignStaff"}
                                value={equData.assignStaff}
                                onChange={handleChange}
                            >
                                <option value="">None</option>
                                {
                                    staff.map((staff: Staff) => (
                                        <option key={staff.staffId} value={staff.staffId}>{staff.firstName} {staff.lastName}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor="floatingSelect">Select a staff member</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select
                                className="form-control field-combo"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                name={"assignField"}
                                value={equData.assignField}
                                onChange={handleChange}
                            >
                                <option value="">None</option>
                                {
                                    field.map((field: Field) => (
                                        <option key={field.fieldCode} value={field.fieldCode}>{field.fieldName}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor="floatingSelect">Select a field</label>
                        </div>
                    </div>
                    <button type="button" className="btn btn-outline-success w-100" onClick={updateAction}>Update Equipment</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateEquPopup