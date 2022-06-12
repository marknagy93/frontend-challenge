import React, {useState} from "react";
import '../ordertable/ordertable.css';


const EditableTable = ({ data, fetchOrders, setPackage }) => {

    const [packagePointValue, setPackagePointValue] = useState(data.packagepoint);
    const [packageWeight, setPackageWeight] = useState(data.weight);

    const handlePackagePointValueChange = (e) => {
        e.preventDefault();
        setPackagePointValue(e.target.value);
    }

    const handlePackageWeightChange = (e) => {
        e.preventDefault();
        setPackageWeight(e.target.value);
    }

    const updateOrders = (packageId) => {
        let item = {packagepoint:packagePointValue, weight:packageWeight};
        console.warn("item", item);
        fetch(`http://localhost:8080/api/v1/packageapp/packages/${packageId}`, {
            method: "PUT",
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(item)
        }).then((resp) => {
                console.warn(resp);
                fetchOrders();
                setPackage(null);
            })
        }

    return (
        <tr>
                        <td className="tabledata">{data.date}</td>
                        <td>
                            <input 
                            type="text"
                            required="required"
                            value={packagePointValue}
                            onChange={handlePackagePointValueChange}
                            id="packagePointEdit" />
                        </td>
                        <td>
                            <input 
                            type="text"
                            required="required"
                            value={packageWeight}
                            onChange={handlePackageWeightChange}
                            id="packageWeightEdit" />
                        </td>
                        <td>
                        <button onClick={() => updateOrders(data.id)} id="save" type="button">Mentés</button>
                        </td>
                    </tr>
    );
}

export default EditableTable;