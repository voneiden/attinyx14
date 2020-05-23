import React from "react";
import store from "../store"
import "./topic-view.scss"
import {observer} from "mobx-react";
import RegistryLink from "../components/registry-link";
import Registry from "../components/registry";
import DatasheetLink from "../components/datasheet-link";
import MarkdownIt from 'markdown-it';
import * as hljs from "highlight.js";
import "highlight.js/styles/darcula.css";
import ReactHtmlParser, {convertNodeToElement} from 'react-html-parser';
import TopicLink from "../components/topic-link";
import {useParams} from "react-router";
import isEmptyTextNode from "react-html-parser/lib/utils/isEmptyTextNode";
import {literalMap} from "../utils/extend/literals";
import {registryGroupMap} from "../utils/extend/builtins";


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
  console.log(hljs.getLanguage('C'))

  const preprocessNodes = function preprocessNodes(nodes) {
    nodes.map(node => {
      // Workaround for ReactHtmlParser destroying whitespace
      // (https://github.com/wrakky/react-html-parser/issues/39)
      if (node.name === 'pre' && node.children.length) {
        const codes = node.children.filter(n => n.name === 'code')
        for (const code of codes) {
          for (const cnode of code.children) {
            if (isEmptyTextNode(cnode)) {
              cnode.type = "protected";
            }
          }
        }
      }
      return node;
    })
    return nodes;
  }

  const transform = function transform(node, index) {
    // Workaround for ReactHtmlParser destroying whitespace
    // (https://github.com/wrakky/react-html-parser/issues/39)
    console.log(node.attribs)
    if (node.type === "protected") {
      node.type = "text";
    } else if (node.attribs && node.attribs.class === 'hljs-literal') {
      const literal = literalMap[node.children[0].data]
      if (literal) {
        node.attribs.title = `${literal[1]}\n${literal[2]}`
        node.attribs.class = 'hljs-literal title-highlight'
      }
    } else if (node.attribs && node.attribs.class === 'hljs-built_in') {
      const nameCandidate = node.children[0].data.split('_')[0]
      const nameCandidate2 = nameCandidate.slice(0, -1)

      const registryGroup = registryGroupMap[nameCandidate] ? registryGroupMap[nameCandidate] : registryGroupMap[nameCandidate2]
      if (registryGroup) {
        node.attribs.title = `${registryGroup[0]}: ${registryGroup[1]}`
        node.attribs.class = 'hljs-built_in title-highlight'
      }
    } else if (node.name === 'reg') {
      const [registry, offset, field] = node.children[0].data.split(".");
      const key = `registry-${registry}-${offset}`
      if (!references.filter(r => r.key ===key).length) {
        references.push(<Registry key={key} registry={registry} offset={offset}
                                  field={field}/>);
      }
      return <RegistryLink registry={registry} offset={offset} field={field}/>;
    } else if (node.name === 'ref') {
      return <DatasheetLink page={node.children[0].data}/>
    } else if (node.name === 'topic') {
      return <TopicLink topic={node.children[0].data}/>
    } else if (node.name === 'example') {
      node.name = 'div';
      node.attribs = {
        'class': 'code-example',
      };
      return convertNodeToElement(node, index, transform);
    }
    return undefined
  };
  const html = md.render(text);
  const jsx = ReactHtmlParser(html, {transform: transform, preprocessNodes: preprocessNodes});
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
