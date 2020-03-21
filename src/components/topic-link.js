import store from "../store"
import React from "react";
import PropTypes from "prop-types";

const TopicLink = function TopicLink(props) {
    const {topic} = props;
    const topicObj = store.getTopic(topic);
    return (
        <button className="topic-link" onClick={() => {
            store.setActiveGroup(topic)
        }}>{topicObj.title}</button>
    )
};

TopicLink.propTypes = {
    topic: PropTypes.string.isRequired
};

export default TopicLink;