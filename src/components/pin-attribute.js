import React from "react";
import "./pin-attribute.scss";
import cls from "../utils/cls";
import store from "../store";
import { observer } from 'mobx-react'
import {getSnapshot} from "mobx-state-tree";

const PinAttribute = observer(function PinAttribute(props) {
    const { pin, attribute } = props;
    const { label, type, alt, groups } = attribute;
    const { activeGroup, activePin } = store;
    const pinPrimaryGroup = groups.length ? groups[0] : null;
    const pinActive = activePin && activePin === pin.pin
    const pinInActiveGroup = groups.includes(activeGroup);
    const pinInactive =  activeGroup && !pinInActiveGroup
    const pinPrimaryHighlight =  groups.includes(store.primaryHighlightGroup);
    const pinSecondaryHighlight = !pinPrimaryHighlight && store.secondaryHighlightGroups.filter((g) => groups.includes(g)).length;
    return (
        <div className={
            cls(
                `pin-attribute`,
                `${type}-pin`,
                alt && `alt-pin`,
                pinPrimaryHighlight && `highlight-primary-pin`,
                pinSecondaryHighlight && `highlight-secondary-pin`,
                pinActive && `active-pin`,
                pinInActiveGroup && `active-group`,
                pinInactive && `inactive-group`,
                )}
             onMouseEnter={() => store.setHighlightGroups(getSnapshot(groups))}
             onMouseLeave={() => store.setHighlightGroups([])}
             onClick={(e) => {
                 store.setActivePinAndGroup(pin.pin, pinPrimaryGroup);
                 e.stopPropagation()}
             }
        >
            { label }
        </div>
    )
})

export default PinAttribute;