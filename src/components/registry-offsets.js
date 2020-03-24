import React from "react";
import PropTypes from "prop-types"
import "./chip-leg.scss"
import "./chip-topic.scss"
import {observer} from "mobx-react";
import RegistryOffset from "./registry-offset";

const RegistryOffsets = observer(function RegistryOffsets(props) {
    const {registry} = props;
    const offsets = registry.offsets.map((offset, i) => {
        return (
            <RegistryOffset key={i} registry={registry} offset={offset}/>
        )
    });

    return (
        <React.Fragment>
            {offsets}
        </React.Fragment>
    )
});
RegistryOffsets.propTypes = {
    registry: PropTypes.object.isRequired,
};

export default RegistryOffsets;