import React from "react";
import store from "../store"
import "./topic-view.scss"
import {observer} from "mobx-react";
import RegistryLink from "../components/registry-link";
import Registry from "../components/registry";

const splitter = new RegExp("\\bR:(\\w+)(?:\\.(\\w+)(?:\\.(\\w+))?)?\\b", "g");
const formatText = function formatText(text) {
    console.log(text);
    console.log(splitter);
    let content = [text];
    let references = [];

    for (const registryDefinition of text.matchAll(splitter)) {
        console.log("registryDefinition", registryDefinition)
        const [, registry, offset, field] = registryDefinition

        const [before, after] = content[content.length - 1].split(splitter, 1);
        content[content.length - 1] = before;
        content.push(<RegistryLink registry={registry} offset={offset} field={field}/>);
        content.push(after);
        references.push(<Registry registry={registry} offset={offset} field={field}/>);
    }
    content.push(
        <div className="references">
            {references}
        </div>
    );

    return content
};

const TopicView = observer(function TopicView(props) {
    const { activeGroup } = store;
    let formatted = null;
    if (activeGroup) {
        const topic = store.getTopic(activeGroup);
        formatted = (
            <React.Fragment>
                <h3>{topic.title}</h3>
                <div>{formatText(topic.text)}</div>
            </React.Fragment>
        )
    }
    if (!formatted) {
        const primaryHighlightGroup = store.primaryHighlightGroup;
        const topicId = primaryHighlightGroup ? primaryHighlightGroup : "default";
        const topic = store.getTopic(topicId);
        //const text = store.topics.find((t) => t.topic === "default").text;
        //let formatted = text.replace("\n", "<br/>");
        formatted = topic ? topic.title : store.getTopic("default").title;
    }
    return (
        <div className="topic-view">
            {formatted}
        </div>
    )
});

export default TopicView;