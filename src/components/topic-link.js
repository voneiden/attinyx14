import store from "../store"
import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const TopicLink = function TopicLink(props) {
    const {topic} = props;
    const topicObj = store.getTopic(topic);
    return topicObj ? (
        <Link className="topic-link" to={`/topic/${topic}`}>
            {topicObj.title}
        </Link>
    ) : (
        <span>{`"${topic}" (topic missing)`}</span>
    )
};

TopicLink.propTypes = {
    topic: PropTypes.string.isRequired
};

export default TopicLink;