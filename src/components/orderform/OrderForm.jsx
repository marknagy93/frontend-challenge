import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import './orderform.css';

const orderCreate = {};

const OrderForm = () => {

    const [packageWeight, setPackageWeight] = useState("");
    const [packagePointValue, setPackagePointValue] = useState("");
    const [firstPackageValue, setFirstPackageValue] = useState("");
    const packagePointValues = [
        {
            label: '1. számú posta - Pécs Légszeszgyár u. 12/B',
            value: '1. számú posta - Pécs Légszeszgyár u. 12/B',
        },
        {
            label: '1. számú posta - Paks Kömlödi körút 38.',
            value: '1. számú posta - Paks Kömlödi körút 38.',
        }
    ];

    const isValid = packageWeight && packagePointValue;

    useEffect(() => {
        if(firstPackageValue !== packagePointValue) {
            orderCreate['packagepoint'] = packagePointValue;
        }
        setFirstPackageValue(packagePointValue);
    },[firstPackageValue, packagePointValue]);

    const handlePackageWeightChange = (e) => {
            e.preventDefault();
            setPackageWeight(e.target.value);
        }

    const gatheringInfo = ({ target: { id, value, checked }}) => {
        const mapNameToProperty = {
            packageWeight: 'weight',
        }

        const property = mapNameToProperty[id];

        orderCreate[property] = value === 'on' ? checked : value;
    };

    const submitValidation = async () => {
        await fetch(`http://localhost:8080/api/v1/packageapp/packages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderCreate),
        });
        window.location.reload();
    }

    return (
        <div className="formContainer">
            <h1>Megrendelő űrlap</h1>
            <form onChange={gatheringInfo} className="form">
                <label id="weight">Küldemény súlya</label>
                <input type="text" placeholder="gramm" value={packageWeight} onChange={handlePackageWeightChange} id="packageWeight" />
                <label id="package">Csomagpont</label>
                <TextField
                    id="packagePoint"
                    select
                    value={packagePointValue}
                    onChange={(e) => setPackagePointValue(e.target.value)}
                    style={{ width: '71.5vw', maxWidth: '380px', margin: "30px", marginTop: "0px" }}
                >
                    {packagePointValues.map((option) => (
                        <MenuItem style={{ fontSize: '15px'}} key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <button disabled={!isValid} id="submit" type="button" onClick={submitValidation}>Mentés</button>
            </form>
        </div>
    );
};

export default OrderForm;