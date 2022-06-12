import React from "react";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Media from "react-media";
import '../ordertable/ordertable.css';

const ReadOnlyTable = ({ data, handleEditClick, deletePackage }) => {

    return (
        <tr>
                        <td className="tabledata">{data.date}</td>
                        <td className="tabledata">{data.packagepoint}</td>
                        <Media query="(min-width: 550px)">
                            {matches => {
                                return matches 
                                ? <td className="tabledata">{data.weight} gramm</td>
                                : <td onClick={() => deletePackage(data.id)} id="iconDelete" className="tabledata"><DeleteOutlineOutlinedIcon /></td>
                            }}
                        </Media>
                        <Media query = "(min-width: 550px)">
                            {matches => {
                                return matches
                                ? <td onClick={() => deletePackage(data.id)} id="iconDelete" className="tabledata"><DeleteOutlineOutlinedIcon /></td>
                                : <td className="hidden"></td>
                            }}
                        </Media>
                        <Media query = "(min-width: 550px)">
                            {matches => {
                                return matches
                                ? <td onClick={(e) => handleEditClick(e, data)} id="iconEdit" className="tabledata"><ModeEditOutlineOutlinedIcon /></td>
                                : <td className="hidden"></td>
                            }}
                        </Media>
        </tr>
    );
}

export default ReadOnlyTable;