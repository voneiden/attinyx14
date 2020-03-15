import React from "react";
import PropTypes from "prop-types"

const RegistryLink = function RegistryLink(props) {
    const {registry, offset, field} = props;

    const text = offset ? `${registry} ${offset}` : `${registry}`;

    return (
        <a>
            { text }
        </a>
    )
};
RegistryLink.propTypes = {
    registry: PropTypes.string.isRequired,
    offset: PropTypes.string,
    field: PropTypes.string,
};
export default RegistryLink;