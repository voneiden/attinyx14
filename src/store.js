import { types } from "mobx-state-tree";


const PinAttributeModel = types.model({
    type: types.string,
    label: types.string,
    alt: types.optional(types.boolean, false),
    groups: types.array(types.string),
});

const PinModel = types.model({
    pin: types.number,
    attributes: types.array(PinAttributeModel),
});

const TopicModel = types.model( {
    topic: types.string,
    title: types.string,
    text: types.string,
    chip: types.optional(types.boolean, false)
});

const FieldModel = types.model({
    name: types.maybeNull(types.string),
    title: types.maybeNull(types.string),
    size: types.optional(types.number, 1),
    description: types.maybeNull(types.string),
    relatedGroups: types.array(types.string),
});

const OffsetModel = types.model({
    name: types.string,
    title: types.string,
    fields: types.array(FieldModel),
    description: types.maybeNull(types.string),
});

const RegistryModel = types.model({
    name: types.string,
    datasheetPage: types.maybeNull(types.number),
    offsets: types.array(OffsetModel)
});

const Store = types.model({
    topics: types.array(TopicModel),
    registries: types.array(RegistryModel),
    pins: types.array(PinModel),
    highlightGroups: types.array(types.string),
    datasheetUrl: types.optional(types.string, "http://ww1.microchip.com/downloads/en/DeviceDoc/ATtiny214-414-814-DataSheet-DS40001912C.pdf")

}).actions(self => ({
    setTopics(topics) {
        self.topics = topics;
    },
    setRegistries(registries) {
        self.registries = registries;
    },
    setPins(pins) {
        self.pins = pins;
    },
    setHighlightGroups(highlightGroups) {
        if (highlightGroups !== self.highlightGroups) {
            self.highlightGroups = highlightGroups ? highlightGroups : []
        }
    },
})).views(self => ({
    get primaryHighlightGroup() {
        return self.highlightGroups.length ? self.highlightGroups[0] : null
    },
    get secondaryHighlightGroups() {
        return self.highlightGroups.slice(1)
    },
    getTopic(topic) {
        return self.topics.find((t) => t.topic === topic)
    },
    getRegistry(registryName) {
        return self.registries.find((r) => r.name === registryName)
    },
    getRegistryDatasheetLink(registry) {
        return self.getDatasheetPageLink(registry.datasheetPage)
    },
     getDatasheetPageLink(page) {
        return page ? `${self.datasheetUrl}#page=${page}` : null
    },
    get chipTopics() {
        return self.topics.filter(t => t.chip)
    }

}));

const store = Store.create();
export default store