import { parseFragment, registerTemplate } from "lwc";
let $fragment1;
const $hoisted1 = parseFragment`<h1${1}${2}>hello</h1>`;
function tmpl($api, $cmp, $slotset, $ctx) {
  const { t: api_text, st: api_static_fragment } = $api;
  return [api_static_fragment($fragment1 || ($fragment1 = $hoisted1()), 1)];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
