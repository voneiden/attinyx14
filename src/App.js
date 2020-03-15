import React from 'react';
import attinyx14pinsPath from './config/attinyx14-pins.toml';
import attinyx14topicsPath from './config/attinyx14-topics.toml';
import attinyx14registriesPath from './config/attinyx14-registries.toml';
import './App.scss';
import * as toml from "toml";
import ChipView from "./views/chip-view";
import store from './store';
import TopicView from "./views/topic-view";

function httpGet(theUrl)
{
	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
	xmlHttp.send( null );
	return xmlHttp.responseText;
}
const attinyx14pins = httpGet(attinyx14pinsPath);
const attinyx14topics = httpGet(attinyx14topicsPath);
const attinyx14registries = httpGet(attinyx14registriesPath);

store.setPins(toml.parse(attinyx14pins).pins);
store.setTopics(toml.parse(attinyx14topics).topics);
store.setRegistries(toml.parse(attinyx14registries).regs);

function App() {
    return (
        <div className="App">
			<ChipView/>
            <TopicView/>
            <div className="data-row">
            </div>
        </div>
    );
}

export default App;
