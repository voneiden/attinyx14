import React, {useState} from "react";
import PropTypes from "prop-types";
import "./registry-offset.scss";
import cls from "../utils/cls";
import {useParams} from "react-router";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

const RegistryOffset = function RegistryOffset(props) {
    const {registry, offset, field} = props;
    const fieldInt = parseInt(field);
    let bits = 0;
    const [activeField, setActiveField] = useState(null);

    let detailField = null;

    const fieldNameBlocks = offset.fields.map((fieldObj, i) => {
        bits += fieldObj.size;
        const active = (activeField === null && field === fieldObj.name) || (activeField && activeField === fieldObj.name);
        if (active) {
            detailField = fieldObj;
        }
        const disabled = !fieldObj.name;
        const range = fieldObj.size > 1 && !disabled ? `[${7 - bits + fieldObj.size}:${7-bits+1}]` : '';
        const name = fieldObj.name ? `${fieldObj.name}${range}` : '';
        return (
            <div className={cls(
                `field-name`,
                `field-size-${fieldObj.size}`,
                active && `active`,
                disabled && `disabled`,
            )}
                 key={name}
                 onClick={() => {
                     if (!active) {
                         setActiveField(fieldObj.name)
                     }
                 }}
            >
                {name}
            </div>
        )
    });

    const bitBlocks = [...Array(bits).keys()].map(bit => {
        return (
            <div className={cls(
                `field-size-1`,
                `bit-number`,
                fieldInt === bit && `active`
            )}
                 key={`bit-${bit}`}
            >
                {bit}
            </div>
        )
    }).reverse();

    const rows = [bitBlocks, fieldNameBlocks].map((block, i) => {
        return (
            <div key={`block-${i}`} className="block-row">{block}</div>
        )
    });

    const title = `${registry.name}.${offset.name} - ${offset.title}`;
    console.log("WAT WAT", detailField)
    return (
        <React.Fragment>
            <span className="title">{title}</span>
            <div className='registry-offset offset-fields'>
                {rows}
            </div>
            {
                detailField &&
                <div>
                    <div>{detailField.name} - {detailField.title}</div>
                    <div className="field-description"
                         dangerouslySetInnerHTML={{__html: md.render(detailField.description)}}/>
                </div>
            }

        </React.Fragment>
    )
};

RegistryOffset.propTypes = {
    registry: PropTypes.object.isRequired,
    offset: PropTypes.object.isRequired,
};
export default RegistryOffset;