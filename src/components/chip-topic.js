import React from "react";
import PropTypes from "prop-types"
import "./chip-leg.scss"
import cls from "../utils/cls"
import store from "../store"
import "./chip-topic.scss"
import {observer} from "mobx-react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";

const ChipTopic = observer(function ChipTopic(props) {
    const {topic} = props;
    const {activeGroup} = useParams();
    const active = activeGroup === topic;
    const inactive = activeGroup && !active;

    return (
        <Link to={`/topic/${topic}`} className={
            cls(
                `chip-topic`,
                active && `active-topic`,
                inactive && `inactive-topic`,
            )}
             onMouseEnter={() => store.setHighlightGroups([topic])}
             onMouseLeave={() => store.setHighlightGroups([])}
             onClick={(e) => {
                 //store.setActivePinAndGroup(null);
                 e.stopPropagation()
             }
             }
        >
            {topic}
        </Link>
    )
});
ChipTopic.propTypes = {
    topic: PropTypes.string.isRequired,
};

export default ChipTopic;