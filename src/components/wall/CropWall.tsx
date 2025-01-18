import WallHeader from "../WallHeader.tsx";
import CardSet from "../CardSet.tsx";
import SaveCropPopup from "../popups/crop/SaveCropPopup.tsx";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../../store/store.ts";
import { Crop } from "../../model/Crop.ts";
import {Field} from "../../model/Field.ts";
import {Log} from "../../model/Log.ts";
import UpdateCropPopup from "../popups/crop/UpdateCropPopup.tsx";
import ViewCropPopup from "../popups/crop/ViewCropPopup.tsx";
import Swal from "sweetalert2";
import {removeCrop} from "../../store/slices/CropSlice.ts";

const CropWall = () => {
    const [saveCropPopup, setSaveCropPopup] = useState(false);
    const [updateCropPopup, setUpdateCropPopup] = useState(false);
    const [viewCropPopup, setViewCropPopup] = useState(false);
    const [targetCrop, setTargetCrop] = useState<Crop>({} as Crop);
    const crop = useSelector((state: RootState) => state.crop);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    const handleSaveCropPopup = () => {
        setSaveCropPopup(!saveCropPopup);
    };

    const handleUpdatePopup = (data: Crop | Field | Log) => {
        if ('cropName' in data && 'cropCode' in data) {
            setTargetCrop(data as Crop); // Type narrowed to Crop
            setUpdateCropPopup((prev) => !prev);
        }
    }

    const handleViewCropPopup = (data: Crop | Field | Log) => {
        if ('cropName' in data && 'cropCode' in data) {
            setTargetCrop(data as Crop); // Type narrowed to Crop
            setViewCropPopup((prev) => !prev);
        }
    }

    // Filtered crop data based on search, without modifying state unnecessarily
    const filteredCropData = crop.filter((crop: Crop) =>
        crop.cropName.toLowerCase().includes(search.toLowerCase())
    );

    const handleDeleteField = (fieldId: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this crop?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeCrop(fieldId))
                Swal.fire("Deleted!", "Crop has been deleted.", "success");
            } else {
                Swal.fire("Cancelled", "Crop deletion cancelled", "info");
            }
        })
    }

    return (
        <>
            {saveCropPopup && <SaveCropPopup closePopupAction={handleSaveCropPopup} />}
            {updateCropPopup && <UpdateCropPopup handleCloseUpdateCropPopup={handleUpdatePopup} targetCrop={targetCrop} />}
            {viewCropPopup && <ViewCropPopup targetCrop={targetCrop} closePopupAction={handleViewCropPopup} />}
            <div className="w-100 p-5 bg-transparent" id="staff-wall">
                <WallHeader title={"Crop Management"} addPopupAction={handleSaveCropPopup} searchAction={setSearch} />
                <CardSet cardType={"crop"} cardSet={filteredCropData} handleUpdatePopup={handleUpdatePopup} handleViewPopup={handleViewCropPopup} handleDeletePopup={handleDeleteField} />
            </div>
        </>
    );
};

export default CropWall;
