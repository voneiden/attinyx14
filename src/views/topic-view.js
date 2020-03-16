import React from "react";
import store from "../store"
import "./topic-view.scss"
import {observer} from "mobx-react";
import RegistryLink from "../components/registry-link";
import Registry from "../components/registry";
import DatasheetLink from "../components/datasheet-link";

const rePlacer = new RegExp("<(\\w+):([\\w.]+)>");

const formatText = function formatText(text) {
    let content = [text ? text : ""];
    let references = [];
    let match;
    while ((match = content[content.length - 1].match(rePlacer))) {
        const [matchSegment, key, value] = match;
        const segment = content[content.length - 1];
        const before = segment.slice(0, match.index);
        const after = segment.slice(match.index + matchSegment.length, segment.length);
        let link = `(??? ${key} ???)`;
        let reference = null;
        if (key === "REG") {
            const [registry, offset, field] = value.split(".");
            link = <RegistryLink registry={registry} offset={offset} field={field}/>;
            reference = <Registry registry={registry} offset={offset} field={field}/>;
        } else if (key === "REF") {
            link = <DatasheetLink page={value}/>
        }
        content[content.length - 1] = before;
        content.push(link);
        content.push(after);
        references.push(reference);
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
        formatted = topic ? (
            <React.Fragment>
                <h3>{topic.title}</h3>
                <div className="topic-text">{formatText(topic.text)}</div>
            </React.Fragment>
        ) : <span>Topic '{activeGroup}' not found</span>
    }
    if (!formatted) {
        const primaryHighlightGroup = store.primaryHighlightGroup;
        const topic = store.getTopic(primaryHighlightGroup);
        formatted = topic ? <h3>{topic.title}</h3> : null;
    }
    return (
        <div
            className="topic-view"
            onClick={ e => e.stopPropagation() }
        >
            <div>
                {formatted}
            </div>
        </div>
    )
});

export default TopicView;