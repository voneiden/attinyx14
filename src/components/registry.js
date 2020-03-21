import React from "react";
import PropTypes from "prop-types";
import store from "../store"
import RegistryOffset from "./registry-offset";
import "./registry.scss"
import RegistryOffsets from "./registry-offsets";
import DatasheetLink from "./datasheet-link";

const Registry = function Registry(props) {
    const registry = store.getRegistry(props.registry);
    if (!registry) {
        return <div>Registry definition for '{props.registry}' is missing</div>
    }


    const offset = registry.offsets.find(o => o.name === props.offset);
    const { field } = props;
    const title = offset ? `${registry.name} > ${offset.name}` : registry.name;
    const linkElement = <DatasheetLink registry={registry}/>;
    if (!props.offset) {
        return (
            <div className="registry">
                <div>
                    <span className="title">{title} {linkElement}</span>
                    <RegistryOffsets registry={registry}/>
                </div>

            </div>
        )
    }
    return (
        <div className="registry">
            <div>
                <span className="title">{title} {linkElement}</span>
                {offset && <RegistryOffset offset={offset} field={field}/>}
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