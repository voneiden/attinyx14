import React from "react";
import PropTypes from "prop-types"
import "./chip-leg.scss"
import cls from "../utils/cls"
import store from "../store"
import "./chip-topic.scss"
import {observer} from "mobx-react";

const ChipTopic = observer(function ChipTopic(props) {
    const {topic} = props;
    const active = store.activeGroup === topic;
    const inactive = store.activeGroup && !active;

    return (
        <div className={
            cls(
                `chip-topic`,
                active && `active-topic`,
                inactive && `inactive-topic`,
            )}
             onMouseEnter={() => store.setHighlightGroups([topic])}
             onMouseLeave={() => store.setHighlightGroups([])}
             onClick={(e) => {
                 store.setActivePinAndGroup(null, topic);
                 e.stopPropagation()
             }
             }
        >
            {topic}
        </div>
    )
});
ChipTopic.propTypes = {
    topic: PropTypes.string.isRequired,
};

export default ChipTopic;