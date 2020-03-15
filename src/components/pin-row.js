import React from "react";
import PropTypes from "prop-types";

const PinRow = function PinRow(props) {
    const {pin, children} = props;
    return (
        <div className={`pin-row pin-${pin.pin}`}>
            {children}
        </div>
    )
};
PinRow.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    pin: PropTypes.object.isRequired,
};
export default PinRow;