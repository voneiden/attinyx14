import React from "react";
import PropTypes from "prop-types"
import "./chip-leg.scss"

const ChipLeg = function ChipLeg(props) {
    const {pin} = props;
    return <div className="chip-leg"><span className="pin-number">{pin}</span></div>
};
ChipLeg.propTypes = {
    pin: PropTypes.number.isRequired,
};

export default ChipLeg;