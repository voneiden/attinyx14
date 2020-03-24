import React from 'react';
import attinyx14pinsPath from './config/attinyx14-pins.toml';
import attinyx14topicsPath from './config/attinyx14-topics.toml';
import attinyx14registries from './config/attinyx14-registries.json';
import './App.scss';
import * as toml from "toml";
import ChipView from "./views/chip-view";
import store from './store';
import TopicView from "./views/topic-view";
import {HashRouter} from "react-router-dom";
import {Route, Switch} from "react-router";

function httpGet(theUrl)
{
	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
	xmlHttp.send( null );
	return xmlHttp.responseText;
}
const attinyx14pins = httpGet(attinyx14pinsPath);
const attinyx14topics = httpGet(attinyx14topicsPath);
//const attinyx14registries = httpGet(attinyx14registriesPath);
store.setPins(toml.parse(attinyx14pins).pins);
store.setTopics(toml.parse(attinyx14topics).topics);
store.setRegistries(attinyx14registries.regs);
function App() {
    return (
        <HashRouter>
            <div className="App">
                <h1>ATtinyX14 Quick Reference</h1>
                <Switch>
                    <Route path="/topic/:activeGroup?/:activePin?">
                        <ChipView/>
                        <TopicView/>
                    </Route>
                    <Route path="/">
                        <ChipView/>
                        <TopicView/>
                    </Route>
                </Switch>
                <div className="data-row">
                </div>
            </div>
        </HashRouter>
    );
}

export default App;
