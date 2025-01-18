import closeBtn from '../../../assets/icon/close-btn.svg'
import {Field} from "../../../model/Field.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store.ts";
import {dataRefactor} from "../../../util/dataRefactor.ts";
import {useEffect, useRef, useState} from "react";

interface ViewFieldPopupProps {
    targetField: Field;
    closePopupAction: (data:Field) => void;
}

const ViewFieldPopup = ({ targetField , closePopupAction }:ViewFieldPopupProps) => {
    const staffSet = useSelector((state: RootState) => state.staff)

    const handleLoadStaff = (id:string) => {
        const staffMember = staffSet.find((staffData) => staffData.staffId === id)
        return (
            <>
                <div>{staffMember ? dataRefactor(staffMember.staffId, 10) : ""}</div>
                <div
                    className="border-start border-black">
                    {staffMember ? staffMember?.firstName : ""} {staffMember ? staffMember?.lastName : ""}
                </div>
            </>
        )
    }

    const mapRef = useRef<HTMLDivElement>(null);
    const markerRef = useRef<google.maps.Marker | null>(null); // Use a ref for the marker
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const defaultLocation = {
        lat: targetField.location.latitude,
        lng: targetField.location.longitude
    };

    useEffect(() => {
        if (mapRef.current && !map) {
            const googleMap = new google.maps.Map(mapRef.current, {
                center: defaultLocation,
                zoom: 13,
            });
            setMap(googleMap);

            // Initial marker
            markerRef.current = new google.maps.Marker({
                position: defaultLocation,
                map: googleMap,
            });
        }
    }, [map]);


    return (
        <div
            id="view-field-popup"
            className="position-absolute start-0 end-0 top-0 bottom-0 w-100 h-auto justify-content-center align-items-center d-flex"
        >
            <div className="w-75 h-auto p-4">
                <img className="float-end" src={closeBtn} onClick={() => closePopupAction(targetField)}/>
                <h2 className="mt-3 mb-3">View Field</h2>
                <div className="first-sec">
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control fieldCode-text"
                            id="floatingInput"
                            placeholder="name@example.com"
                            readOnly
                            value={targetField.fieldCode}
                        />
                        <label htmlFor="floatingInput">Field Code</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control fieldName-text"
                            id="floatingInput"
                            placeholder="name@example.com"
                            readOnly
                            value={targetField.fieldName}
                        />
                        <label htmlFor="floatingInput">Field Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control fieldSize-text"
                            id="floatingInput"
                            placeholder="name@example.com"
                            readOnly
                            value={targetField.fieldSize}
                        />
                        <label htmlFor="floatingInput">Field Size</label>
                    </div>
                </div>
                <div className="form-set gap-2">
                    <img className="image-1"
                        src={!targetField.fieldImage1 ? "https://via.placeholder.com/150" : URL.createObjectURL(targetField.fieldImage1)}
                         alt=""/>
                    <img className="image-2"
                         src={!targetField.fieldImage2 ? "https://via.placeholder.com/150" : URL.createObjectURL(targetField.fieldImage2)}
                         alt=""/>
                </div>
                <div
                    id="map"
                    ref={mapRef}
                    className="mt-2 mb-4"
                    style={{width: '100%', height: '200px'}}
                ></div>
                <div className="table w-100 border border-black">
                    <div className="table-head w-100 d-grid border-bottom border-black">
                        <div>Staff Id</div>
                        <div className="border-start border-black">Staff Name</div>
                    </div>
                    <div className="tableBody w-100 border-bottom border-black">
                        <div className="d-grid">
                            {
                                targetField.assignStaffs.map((staffId) => (
                                    <>
                                        {handleLoadStaff(staffId)}
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewFieldPopup