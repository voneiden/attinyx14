import React from "react";
import PropTypes from "prop-types"
import store from "../store"
import "./chip-topic.scss"

const DatasheetLink = function DatasheetLink(props) {
    const {registry, page} = props;
    const link = registry ? store.getRegistryDatasheetLink(registry) : store.getDatasheetPageLink(page);
    return link ? <a href={link} target="_blank" rel="noopener noreferrer">🗎</a> : <span>(??? link ???)</span>;
};
DatasheetLink.propTypes = {
    registry: PropTypes.object,
    page: PropTypes.number
};

export default DatasheetLink;