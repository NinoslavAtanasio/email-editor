import React from "react";
import { useNode } from "@craftjs/core";
import { withTranslation } from "react-i18next";
import { unescapeHTML } from "../../../utils/unescapeHtml";
import {
  AccordionHeader,
  MarginAccordion,
  PaddingAccordion
} from "../UtilComponents/SettingsUtils";
import Editor from "../../../../components/AceEditor";
import { CustomAccordion } from "../UtilComponents/Accordion";
import { MARGIN, PADDING } from "../Defaults";

let isHtmlPaste = true;

export const HtmlBoxSettings = withTranslation()(({ t }) => {
  const {
    actions: { setProp },
    props,
  } = useNode(node => ({
    props: node.data.props
  }));
  const [html, setHtml] = React.useState(unescapeHTML(props.props.html));
  const handleHtmlChange = value => {
    if (isHtmlPaste) {
      isHtmlPaste = false;
      setHtml(unescapeHTML(value));
    } else {
      setHtml(value);
    }
    setProp(props => {
      props.props.html = value;
    });
  };

  return (
    <div>
      <AccordionHeader title={t("basic")} />
      <CustomAccordion
        title="HTML"
        children={
          <Editor
            height="400px"
            mode="html"
            defaultValue=""
            onChange={handleHtmlChange}
            onPaste={() => {
              isHtmlPaste = true;
            }}
            value={html}
            disableSyntaxCheck={true}
          ></Editor>
        }
      />
      <AccordionHeader title={t("spacing")} />
      <MarginAccordion props={props} setProp={setProp} />
      <PaddingAccordion props={props} setProp={setProp} />
    </div>
  );
});

export const HtmlBoxDefaultProps = {
  props: {
    html: "<h4>Hello, world!</h4>"
  },
  parentStyle: {
    ...PADDING,

    ...MARGIN
  },
  options: {
    paddingOptions: "less",
    marginOptions: "less"
  }
};
