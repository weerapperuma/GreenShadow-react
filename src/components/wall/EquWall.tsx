import WallHeader from "../WallHeader.tsx";
import Table from "../Table.tsx";
import {useEffect, useState} from "react";
import SaveEquPopup from "../popups/Equ/SaveEquPopup.tsx";
import {useDispatch, useSelector} from "react-redux";
import {convertEquArrayTo2DArray} from "../../util/ArrayTo2DArray.ts";
import {Equ} from "../../model/Equ.ts";
import UpdateEquPopup from "../popups/Equ/UpdateEquPopup.tsx";
import ViewEquPopup from "../popups/Equ/ViewEquPopup.tsx";
import Swal from "sweetalert2";
import {deleteEqu} from "../../store/slices/EquSlice.ts";

const EquWall = () => {
    const dataHeaders = [ "equipment Id" , "Name" , "equipment Type" , "status"]
    const [savePopup, setSavePopup] = useState(false)
    const [updatePopup, setUpdatePopup] = useState(false)
    const [viewPopup, setViewPopup] = useState(false)
    const [search, setSearch] = useState("")
    const equData = useSelector((state: {equ:Equ[]}) => state.equ)
    const [filteredData, setFilteredData] = useState(convertEquArrayTo2DArray(equData))
    const [targetEqu, setTargetEqu] = useState("")
    const dispatch = useDispatch()

    const handleSavePopup = () => {
        setSavePopup(!savePopup)
    }

    const handleUpdatePopup = (id:string) => {
        setUpdatePopup(!updatePopup)
        setTargetEqu(id)
    }

    useEffect(() => {
        console.log(equData)
        console.log(convertEquArrayTo2DArray(equData))
        const filteredStaff = convertEquArrayTo2DArray(equData).filter((staff: string[]) => {
            return staff.some((staffData: string) =>
                staffData.toLowerCase().includes(search.toLowerCase())
            );
        });

        setFilteredData(filteredStaff);
    }, [search, equData])

    const handleViewPopup = (id:string) => {
        setViewPopup(!viewPopup)
        setTargetEqu(id)
    }

    const handleDeleteVehicle = (id:string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this Equipment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteEqu(id))
                Swal.fire("Deleted!", "Equipment has been deleted.", "success");
            } else {
                Swal.fire("Cancelled", "Equipment deletion cancelled", "info");
            }
        })
    }



    return(
        <>
            {savePopup && <SaveEquPopup closePopupAction={handleSavePopup} />}
            {updatePopup && <UpdateEquPopup closePopupAction={handleUpdatePopup} targetEqu={targetEqu} />}
            {viewPopup && <ViewEquPopup closePopupAction={handleViewPopup} targetEquId={targetEqu} />}
            <div className="w-100 p-5 bg-transparent" id="staff-wall">
                <WallHeader title={"Equipment Management"} addPopupAction={handleSavePopup} searchAction={setSearch}/>
                <Table headersData={dataHeaders} bodyData={filteredData} updatePopupAction={handleUpdatePopup} viewPopupAction={handleViewPopup} deletePopupAction={handleDeleteVehicle} />
            </div>
        </>
    )
}

export default EquWall