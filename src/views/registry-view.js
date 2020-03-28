import {observer} from "mobx-react";
import {useParams} from "react-router";
import React from "react";
import Registry from "../components/registry";
import store from "../store";

const RegistryView = observer(function RegistryView(props) {
    const {registry, offset, field} = useParams();
    const registryObj = store.getRegistry(registry);
    return (
        <div
            className="registry-view topic-view"
            onClick={e => e.stopPropagation()}
        >
            <div>
                <h3>{registryObj.name} registry</h3>
                <h4>{registryObj.title}</h4>
                <div>{registryObj.description}</div>
                <Registry registry={registry} offset={offset} field={field}/>
            </div>

        </div>
    )
});

export default RegistryView