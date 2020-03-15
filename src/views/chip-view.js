import React from "react";
import PropTypes from "prop-types";
import PinRow from "../components/pin-row";
import PinAttribute from "../components/pin-attribute";
import store from "../store";
import ChipLeg from "../components/chip-leg";
import ChipTopic from "../components/chip-topic";

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
                <ChipLeg pin={pin.pin}/>
            </PinRow>
        )
    });
    const rightPins = pins.slice(pinsPerSide, pins.length).map(pin => {
        const attributes = pin.attributes.map((a, i) => {
            return <PinAttribute key={i} attribute={a} pin={pin}/>
        });
        return (
            <PinRow pin={pin}>
                <ChipLeg pin={pin.pin}/>
                {attributes}
            </PinRow>
        )
    });

    const chipTopics = store.chipTopics.map(topic => {
        return <ChipTopic key={topic.topic} topic={topic.topic}/>
    });

    return (
        <div className="model-row" onClick={() => store.setActivePinAndGroup(null, null)}>
            <div className="model-row--left-column">
                {leftPins}
            </div>
            <div className="model-row--middle-column">
                <div className="attiny">
                    <div className="pin1marker"/>
                    { chipTopics }
                </div>
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