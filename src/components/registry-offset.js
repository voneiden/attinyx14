import React from "react";
import PropTypes from "prop-types";
import "./registry-offset.scss";
import cls from "../utils/cls";
import {useParams} from "react-router";

const RegistryOffset = function RegistryOffset(props) {
    const {offset} = props;
    let bits = 0;
    const {activeGroup} = useParams();

    const fieldNameBlocks = offset.fields.map((field, i) => {
        bits += field.size;
        const active = field.relatedGroups.includes(activeGroup);
        const disabled = !field.name;
        const range = field.size > 1 && !disabled ? `[${i + field.size - 1}:${i}]` : null;
        return (
            <div className={cls(
                `field-size-${field.size}`,
                active && `active`,
                disabled && `disabled`,
            )}>
                {field.name}{range}
            </div>
        )
    }).reverse();

    const bitBlocks = [...Array(bits).keys()].map(bit => {
        return (
            <div className={cls(
                `field-size-1`,
                `bit-number`
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