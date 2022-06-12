import React, {Fragment, useEffect, useState} from "react";
import './ordertable.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Media from "react-media";
import ReadOnlyTable from "../readonlytable/ReadOnlyTable";
import EditableTable from "../editabletable/EditableTable";

const OrderTable = () => { 

    const [packageData, setPackageData] = useState([]);
    const [editPackage, setPackage] = useState(null);

    const fetchOrders = () => {
        fetch('http://localhost:8080/api/v1/packageapp/packages')
            .then((result) => result.json())
            .then((data) => {
                setPackageData(data);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    useEffect(() => {
        fetchOrders();
    },[]);

    const deletePackage = async (packageId) => {
        const response = await fetch(`http://localhost:8080/api/v1/packageapp/packages/${packageId}`, {
            method: "DELETE",
        });
        if(response.status === 200) {
            const packageVar = packageData.find((onePackage) => onePackage.id === packageId);
            const index = packageData.indexOf(packageVar);
            const newPackageArray = [...packageData];
            newPackageArray.splice(index, 1);
            setPackageData(newPackageArray);
        }
    }

    const handleEditClick = (e, data) => {
        e.preventDefault();
        setPackage(data.id);
    }

    return (
        <div className="tableContainer">
            <h1>Megrendelések</h1>
            <div className="tableList">
            {packageData.map((data) => (
                <table className="table">
                    <thead>
                        <tr>
                            <th id="thdate" className="tablehead">Dátum</th>
                            <th id="thpoint" className="tablehead">Csomagpont neve</th>
                            <Media query="(min-width: 550px)">
                                {matches => {
                                    return matches 
                                    ? <th id="thweight" className="tablehead">Küldemény súlya</th>
                                    : <th id="iconEdit" className="tabledata"><ModeEditOutlineOutlinedIcon /></th>
                                }}
                            </Media>
                            <th id="thdeleteIcon" className="tablehead"></th>
                            <th id="theditIcon" className="tablehead"></th>

                        </tr>
                    </thead>
                    <tbody>
                    <Fragment>
                        {editPackage === data.id ? (
                            <EditableTable 
                            data={data}
                            fetchOrders={fetchOrders}
                            setPackage={setPackage} />
                        ) : (
                            <ReadOnlyTable 
                            data={data}
                            handleEditClick={handleEditClick}
                            deletePackage={deletePackage} />
                        )}
                    </Fragment>
                    </tbody>
                </table>
            ))}
            </div>
        </div>
    );
}

export default OrderTable;