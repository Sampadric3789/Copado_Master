import _cCustom from "c/custom";
import { registerTemplate } from "lwc";
const stc0 = {
  key: 1,
};
const stc1 = {
  key: 2,
};
const stc2 = [];
function tmpl($api, $cmp, $slotset, $ctx) {
  const { t: api_text, c: api_custom_element, fr: api_fragment } = $api;
  return [
    $cmp.visible
      ? api_fragment("if-fr0", [
          api_custom_element("c-custom", _cCustom, stc0, [
            api_text("Visible Header"),
          ]),
        ])
      : api_fragment("if-fr0", [
          $cmp.elseifCondition
            ? api_fragment("if-fr0", [
                api_custom_element("c-custom", _cCustom, stc1, [
                  api_text("First Alternative Header"),
                ]),
              ])
            : api_fragment("if-fr0", stc2),
        ]),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
