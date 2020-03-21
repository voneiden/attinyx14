import React from "react";
import PropTypes from "prop-types";
import "./registry-offset.scss";
import cls from "../utils/cls";
import {useParams} from "react-router";

const RegistryOffset = function RegistryOffset(props) {
    const {offset, field} = props;
    const fieldInt = parseInt(field);
    let bits = 0;
    const {activeGroup} = useParams();

    const fieldNameBlocks = offset.fields.map((fieldObj, i) => {
        bits += fieldObj.size;
        const active = fieldObj.relatedGroups.includes(activeGroup) || field === fieldObj.name;
        const disabled = !fieldObj.name;
        const range = fieldObj.size > 1 && !disabled ? `[${i + fieldObj.size - 1}:${i}]` : null;
        return (
            <div className={cls(
                `field-size-${fieldObj.size}`,
                active && `active`,
                disabled && `disabled`,
            )}>
                {fieldObj.name}{range}
            </div>
        )
    }).reverse();

    const bitBlocks = [...Array(bits).keys()].map(bit => {
        return (
            <div className={cls(
                `field-size-1`,
                `bit-number`,
                fieldInt === bit && `active`
            )}>
                {bit}
            </div>
        )
    }).reverse();

    const rows = [bitBlocks, fieldNameBlocks].map(block => {
        return (
            <div className="block-row">{block}</div>
        )
    });


    return (
        <div className='registry-offset offset-fields'>
            {rows}
        </div>
    )
};

RegistryOffset.propTypes = {
    offset: PropTypes.object.isRequired,
};
export default RegistryOffset;