import { registerTemplate } from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const { t: api_text, fr: api_fragment } = $api;
  return [
    $cmp.visible
      ? api_fragment("if-fr0", [api_text("Conditional Text")])
      : api_fragment("if-fr0", [
          $cmp.elseifCondition
            ? api_fragment("if-fr0", [api_text("Elseif!")])
            : api_fragment("if-fr0", [api_text("Else!")]),
        ]),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
