import { useEditor } from "@craftjs/core";
import React from "react";
import { withTranslation } from "react-i18next";

import {
  AccordionHeader,
  BackgroundAccordion,
  BorderAccordion,
  MarginAccordion,
  PaddingAccordion
} from "../UtilComponents";

import { ContainerDefaultProps } from "./ContainerSettings";

export const ResizerSettings = withTranslation()(({ t, id, isParent }) => {
  const {
    actions: { setProp },
    state
  } = useEditor((state, query) => {
    return {
      state: state
    };
  });
  const props =
    state &&
      state.nodes &&
      state.nodes[id] &&
      state.nodes[id].data &&
      state.nodes[id].data.props
      ? state.nodes[id].data.props
      : ContainerDefaultProps;
  const handleSetProp = val => {
    setProp(id, props => {
      val(props);
    });
  };

  return (
    <React.Fragment>
      {isParent && <AccordionHeader title={t("spacing")} />}
      <MarginAccordion props={props} setProp={handleSetProp} />
      <PaddingAccordion props={props} setProp={handleSetProp} />
      {isParent && <AccordionHeader title={t("decoration")} />}
      <BackgroundAccordion
        props={props}
        setProp={handleSetProp}
        isSelfBg={true}
        defaultImage={ContainerDefaultProps.style.backgroundImage}
      />
      <BorderAccordion props={props} setProp={handleSetProp} />
    </React.Fragment>
  );
});
