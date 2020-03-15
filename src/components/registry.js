import React, {useState} from "react";
import PropTypes from "prop-types";
import store from "../store"
import RegistryOffset from "./registry-offset";
import "./registry.scss"

const Registry = function Registry(props) {
    const [offsetName, setOffsetName] = useState(props.offset)
    const [fieldName, setFieldName] = useState(props.field)
    const registry = store.getRegistry(props.registry);
    if (!registry) {
        return <span>Registry definition for '{props.registry}' is missing</span>
    }

    const offset = registry.offsets.find(o => o.name === props.offset);
    console.log("offset", offset, props.offset, registry.offsets)
    const title = offset ? `${registry.name} > ${offset.name}` : registry.name;
    const link = store.getRegistryDatasheetLink(registry);
    const linkElement = link ? <a href={link} target="_blank" rel="noopener noreferrer">🗎</a> : null;
    return (
        <div className="registry">
            <div>
                <span className="title">{ title } {linkElement}</span>
                { offset && <RegistryOffset offset={offset}/> }
            </div>
        </div>
    )
};

Registry.propTypes = {
    registry: PropTypes.string.isRequired,
    offset: PropTypes.string,
    field: PropTypes.string,
};
export default Registry;