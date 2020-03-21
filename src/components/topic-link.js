import store from "../store"
import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const TopicLink = function TopicLink(props) {
    const {topic} = props;
    const topicObj = store.getTopic(topic);
    return (
        <Link className="topic-link" to={`/topic/${topic}`}>
            {topicObj.title}
        </Link>
    )
};

TopicLink.propTypes = {
    topic: PropTypes.string.isRequired
};

export default TopicLink;