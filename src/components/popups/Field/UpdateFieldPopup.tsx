import closeBtn from '../../../assets/icon/close-btn.svg';
import {Field} from '../../../model/Field.ts';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store.ts";
import {toast} from "react-toastify";
import fieldValidation from "../../../util/validation/FieldValidation.ts";
import {updateField} from "../../../store/slices/FieldSlice.ts";

interface UpdateFieldPopupProps {
    closePopupAction: (data: Field) => void;
    targetField: Field;
}

const UpdateFieldPopup = ({ closePopupAction, targetField }: UpdateFieldPopupProps) => {
    const image1Ref = useRef<HTMLInputElement>(null);
    const image2Ref = useRef<HTMLInputElement>(null);
    const staff = useSelector((state: RootState) => state.staff);
    const [selectedStaffSet, setSelectedStaffSet] = useState<string[]>(targetField.assignStaffs);
    const [field, setField] = useState<Field>({
        fieldCode: targetField.fieldCode,
        fieldName: targetField.fieldName,
        fieldSize: targetField.fieldSize,
        fieldImage1: targetField.fieldImage1,
        fieldImage2: targetField.fieldImage2,
        location: {
            latitude: targetField.location.latitude,
            longitude: targetField.location.longitude,
        },
        assignStaffs: targetField.assignStaffs
    });
    const dispatch = useDispatch();

    const handleSetDefaultImage = (img: File, ref: React.RefObject<HTMLInputElement>) => {
        if (ref.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(img);
            ref.current.files = dataTransfer.files;
        }
    };

    const loadSelectedStaff = () => {
        console.log(selectedStaffSet.length);
        return selectedStaffSet.map((staffId) => {
            const staffMember = staff.find((staff) => staff.staffId === staffId);
            return (<h6 data-id={staffMember?.staffId} onClick={() => {removeSelectedStaff(staffMember?.staffId as string)}}>{staffMember?.firstName} {staffMember?.lastName}</h6>)
        });
    }

    const handleSelectStaff = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const staffId = e.target.value;
        const staffMember = staff.find((staff) => staff.staffId === staffId);
        if (staffMember) {
            const isStaffSelected = selectedStaffSet.includes(staffId);
            if (!isStaffSelected) {
                setSelectedStaffSet([...selectedStaffSet, staffId]);
            } else {
                toast.error('Staff member already selected');
            }
        } else {
            toast.error('Staff member not found');
        }
    }

    useEffect(() => {
        loadSelectedStaff()
    }, [selectedStaffSet]);

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

            googleMap.addListener('click', (e : google.maps.MapMouseEvent) => {
                if (e.latLng) {
                    // Remove previous marker
                    if (markerRef.current) {
                        markerRef.current.setMap(null);
                    }

                    // Set new marker
                    markerRef.current = new google.maps.Marker({
                        position: e.latLng,
                        map: googleMap,
                    });

                    // Update location in field
                    setField((prev) => ({
                        ...prev,
                        location: {
                            latitude: e.latLng!.lat(),
                            longitude: e.latLng!.lng(),
                        },
                    }));
                }
            });
        }
    }, [map]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        setField((prev) => {
            if (files) {
                console.log(files[0]);
                console.log(field.fieldImage1)
                return {
                    ...prev,
                    [name]: files[0] as File, // Ensure it's cast to File
                };
            }
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleUpdateField = () => {
        try {
            if (field.fieldImage1 === null) {
                field.fieldImage1 = image1Ref.current?.files?.[0] as File;
            }
            if (field.fieldImage2 === null) {
                field.fieldImage2 = image2Ref.current?.files?.[0] as File;
            }
            console.log(selectedStaffSet);
            field.assignStaffs = selectedStaffSet;
            if (!fieldValidation(field.fieldName, field.fieldSize, field.fieldImage1, field.fieldImage2)) {
                toast.error('Invalid field data');
                return;
            }
            dispatch(updateField(field));
            toast.success('Field updated successfully');
        } catch (e) {
            console.error(e);
        }
    };

    const removeSelectedStaff = (id:string) => {
        const newSelectedStaffSet = selectedStaffSet.filter((staffId) => staffId !== id);
        setSelectedStaffSet(newSelectedStaffSet)
    }

    return (
        <div
            id="update-field-popup"
            className="position-absolute start-0 end-0 top-0 bottom-0 w-100 h-auto justify-content-center align-items-center d-flex"
        >
            <div className="w-75 h-auto p-4">
                <img
                    className="float-end"
                    src={closeBtn}
                    alt="Close"
                    onClick={() => closePopupAction(targetField)}
                />
                <h2 className="mt-3 mb-3">Update Field</h2>
                <div className="w-100 h-auto form-set d-grid">
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control fieldName-text"
                            id="fieldNameInput"
                            placeholder="Field Name"
                            defaultValue={targetField.fieldName}
                            name={"fieldName"}
                            onChange={handleChange}
                        />
                        <label htmlFor="fieldNameInput">Field Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control fieldSize-text"
                            id="fieldSizeInput"
                            placeholder="Field Size"
                            defaultValue={targetField.fieldSize}
                            name={"fieldSize"}
                            onChange={handleChange}
                        />
                        <label htmlFor="fieldSizeInput">Field Size</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="file"
                            className="form-control image-1"
                            id="image1Input"
                            ref={image1Ref}
                            name={"fieldImage1"}
                            onChange={handleChange}
                        />
                        <label htmlFor="image1Input">Select Image 1</label>
                        <button
                            type="button"
                            className="btn btn-secondary mt-2"
                            onClick={() =>
                                handleSetDefaultImage(
                                    targetField.fieldImage1 as File,
                                    image1Ref
                                )
                            }
                        >
                            Set Old Image 1
                        </button>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="file"
                            className="form-control image-2"
                            id="image2Input"
                            ref={image2Ref}
                            name={"fieldImage2"}
                            onChange={handleChange}
                        />
                        <label htmlFor="image2Input">Select Image 2</label>
                        <button
                            type="button"
                            className="btn btn-secondary mt-2"
                            onClick={() =>
                                handleSetDefaultImage(
                                    targetField.fieldImage2 as File,
                                    image2Ref
                                )
                            }
                        >
                            Set Old Image 2
                        </button>
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <select
                        className="form-control staff-combo"
                        id="staffSelect"
                        defaultValue="N/A"
                        aria-label="Floating label select example staff-combo"
                        onChange={handleSelectStaff}
                    >
                        <option value="N/A">
                            None
                        </option>
                        {staff.map((staffMember) => (
                            <option key={staffMember.staffId} value={staffMember.staffId}>
                                {staffMember.firstName} {staffMember.lastName}
                            </option>
                        ))}
                        {/* Add options dynamically as needed */}
                    </select>
                    <label htmlFor="staffSelect">Select a Staff Member</label>
                </div>
                <div className="selected-staff">
                    {loadSelectedStaff()}
                </div>
                <div
                    id="map"
                    ref={mapRef}
                    className="mt-2 mb-4"
                    style={{width: '100%', height: '300px'}}
                ></div>
                <button type="button" className="btn btn-outline-success w-100" onClick={handleUpdateField}>
                    Update Field
                </button>
            </div>
        </div>
    );
};

export default UpdateFieldPopup;
