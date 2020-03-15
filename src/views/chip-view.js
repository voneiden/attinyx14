import React from "react";
import PropTypes from "prop-types";
import PinRow from "../components/pin-row";
import PinAttribute from "../components/pin-attribute";
import store from "../store";

const ChipView = function ChipView(props) {
    const { pins } = store;
    const pinsPerSide = pins.length / 2;
    console.log("PINS", pins);
    const leftPins = pins.slice(0, pinsPerSide).map(pin => {
        const attributes = pin.attributes.map((a, i) => {
            return <PinAttribute key={i} attribute={a} pin={pin}/>
        });
        attributes.reverse();
        return (
            <PinRow pin={pin}>
                {attributes}
                <div className="chip-leg"/>
            </PinRow>
        )
    });
    const rightPins = pins.slice(pinsPerSide, pins.length).map(pin => {
        const attributes = pin.attributes.map((a, i) => {
            return <PinAttribute key={i} attribute={a} pin={pin}/>
        });
        return (
            <PinRow pin={pin}>
                <div className="chip-leg"/>
                {attributes}
            </PinRow>
        )
    });

    return (
        <div className="model-row">
            <div className="model-row--left-column">
                {leftPins}
            </div>
            <div className="model-row--middle-column">
                <div className="attiny"></div>
            </div>
            <div className="model-row--right-column">
                {rightPins}
            </div>
        </div>
    )
};
ChipView.propTypes = {
};
export default ChipView;