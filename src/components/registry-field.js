import React, {useState} from "react";
import PropTypes from "prop-types";
import store from "../store"

const RegistryField = function RegistryField(props) {
    const { offset } = props;
    const fields = offset.fields.reduce((fields, field) => {

    }, []);
    return (
        <div>
            <span>{ title }</span>
            <table>

            </table>
        </div>
    )
};

RegistryField.propTypes = {
    offset: PropTypes.object.isRequired,
};
export default RegistryField;