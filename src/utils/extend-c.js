import * as hljs from "highlight.js";
import builtIns from "./extend/builtins";
import literals from "./extend/literals";

// ["built_in", 1]
// ["literal", 1]

let extended = false;
function extendC() {
  if (!extended) {
    extended = true;
    const C = hljs.getLanguage('C')
    const avrDefinition = C.rawDefinition()

    console.log("OHEY C", C)
    avrDefinition.keywords.literal += ` ${literals.map(l => l[0]).join(' ')}`
    avrDefinition.keywords.built_in += ` ${builtIns.join(' ')}`
    console.log("avr", avrDefinition)
    hljs.registerLanguage('avr', () => avrDefinition)
    //literals.reduce((keywords, li) => {
    //  keywords[li[0]] = ["built_in", 1]
    //  return keywords
    //}, C.keywords)
  }
}

export default extendC
