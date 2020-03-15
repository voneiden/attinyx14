import React, {useState} from "react";
import PropTypes from "prop-types";
import store from "../store"
import "./registry-offset.scss";
import cls from "../utils/cls";

    const RegistryOffset = function RegistryOffset(props) {
    const { offset } = props;
    let bits = 0;

    const fieldNameBlocks = offset.fields.map((field) => {
        bits += field.size;
        const active = field.relatedGroups.includes(store.activeGroup);
        const disabled = !field.name;
        return (
            <div className={cls(
                `field-size-${field.size}`,
                active && `active`,
                disabled && `disabled`,
            )}>
                {field.name}
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
            { rows }
        </div>
    )
};

RegistryOffset.propTypes = {
    offset: PropTypes.object.isRequired,
};
export default RegistryOffset;