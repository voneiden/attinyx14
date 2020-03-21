import React from "react";
import store from "../store"
import "./topic-view.scss"
import {observer} from "mobx-react";
import RegistryLink from "../components/registry-link";
import Registry from "../components/registry";
import DatasheetLink from "../components/datasheet-link";
import MarkdownIt from 'markdown-it';
import * as hljs from "highlight.js";
import "highlight.js/styles/dracula.css";
import ReactHtmlParser from 'react-html-parser';
import TopicLink from "../components/topic-link";
import {useParams} from "react-router";

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {
      }
    }
    return ''; // use external default escaping
  },
  html: true,
});

const formatText = function formatText(text) {
  const references = [];
  const html = md.render(text);
  const jsx = ReactHtmlParser(html, {
    transform: (node, index) => {
      if (node.parent && node.parent.name === 'reg' && node.type === 'text') {
        const [registry, offset, field] = node.data.split(".");
        references.push(<Registry registry={registry} offset={offset} field={field}/>);
        return <RegistryLink registry={registry} offset={offset} field={field}/>;
      } else if (node.parent && node.parent.name === 'ref' && node.type === 'text') {
        return <DatasheetLink page={node.data}/>
      } else if (node.parent && node.parent.name === 'topic' && node.type ==='text') {
        return <TopicLink topic={node.data}/>
      }
      return undefined
    }
  });
  return (
    <React.Fragment>
      {jsx}
      <div className="references">
        {references}
      </div>
    </React.Fragment>
  );
};

const TopicView = observer(function TopicView(props) {
  const {activeGroup} = useParams();
  console.log("")
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
      onClick={e => e.stopPropagation()}
    >
      <div>
        {formatted}
      </div>
    </div>
  )
});

export default TopicView;
