import { useNode } from "@craftjs/core";
import { Box } from "@material-ui/core";
import React from "react";
import { withTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import {
  SizeAccordion,
  ColorAccordion,
  AlignmentAccordion,
  AccordionHeader,
  BackgroundAccordion,
  PaddingAccordion,
  MarginAccordion
} from "../UtilComponents/SettingsUtils";
import { GroupedButtons } from "../UtilComponents/GroupedButtons";
import { CustomAccordion } from "../UtilComponents/Accordion";
import { MARGIN } from "../Defaults";

export const DividerSettings = withTranslation()(({ t }) => {
  const {
    actions: { setProp },
    props,
  } = useNode(node => ({
    props: node.data.props
  }));

  var height = props.style.height;
  return (
    <div>
      <AccordionHeader title={t("size")} />
      <CustomAccordion
        title={t("thickness")}
        preview={
          <Box px={1} bgcolor="#f1f1f1" borderRadius={5}>
            <Typography variant="caption" color="textSecondary">
              {height}
            </Typography>
          </Box>
        }
        children={
          <GroupedButtons
            displayProp={height}
            handleChange={newValue => {
              setProp(props => {
                props.style.height = newValue;
              });
            }}
          />
        }
      />
      <SizeAccordion props={props} setProp={setProp} type="Width" title={t("width")} />
      <AccordionHeader title={t("spacing")} />
      <AlignmentAccordion props={props} setProp={setProp} />
      <MarginAccordion props={props} setProp={setProp} />
      <PaddingAccordion props={props} setProp={setProp} />
      <AccordionHeader title={t("decoration")} />
      <BackgroundAccordion
        props={props}
        setProp={setProp}
        isSelfBg={false}
        defaultImage={DividerDefaultProps.parentStyle.backgroundImage}
      />
      <ColorAccordion props={props} setProp={setProp} types={[{ name: t("divider"), value: "Divider" }]} />
    </div>
  );
});

export const DividerDefaultProps = {
  style: {
    width: "100%",
    height: 2,
    backgroundColor: "#808080"
  },
  parentStyle: {
    align: "left",
    backgroundImage: "",
    backgroundColor: "#00000000",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,

    ...MARGIN
  },
  options: {
    paddingOptions: "more",
    borderOptions: "less"
  }
};
