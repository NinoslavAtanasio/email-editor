import React, { useEffect } from "react";
import cx from "classnames";
import { Box } from "@material-ui/core";
import { Frame, Element, useEditor, ROOT_NODE } from "@craftjs/core";
import { BodyWrapper, Container } from "../userComponents/index";
import { ContainerDefaultProps } from "../userComponents/Container/ContainerSettings";


export default function Design({ editorState }) {
  const { actions, enabled, connectors, rootNode } = useEditor(
    (state, query) => ({
      enabled: state.options.enabled,
      canUndo: query.history.canUndo(),
      canRedo: query.history.canRedo(),
      rootNode: state.nodes[ROOT_NODE]
    })
  );

  const bodyBackgroundColor = rootNode
    ? rootNode.data.props.style.backgroundColor
    : ContainerDefaultProps.style.backgroundColor;
  const bodyBackgroundImage = rootNode
    ? rootNode.data.props.style.backgroundImage
    : ContainerDefaultProps.style.backgroundColor;
  var styleCopy = JSON.parse(JSON.stringify(ContainerDefaultProps));
  styleCopy.style.backgroundColor = "#ffffff";
  styleCopy.parentStyle.paddingTop = 10;
  styleCopy.parentStyle.paddingBottom = 10;
  styleCopy.parentStyle.paddingRight = 10;
  styleCopy.parentStyle.paddingLeft = 10;

  useEffect(() => {
    if (editorState) {
      actions.deserialize(editorState);
    }
  }, [editorState]);

  return (
    <div
      style={{
        backgroundImage: "url(" + bodyBackgroundImage + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: bodyBackgroundColor,
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "scroll"
      }}
      ref={ref => connectors.select(connectors.hover(ref, null), null)}
    >
      <div
        className={cx([
          "craftjs-renderer h-full w-full transition pb-8",
          {
            "overflow-auto": enabled,
            "overflow-y": "scroll"
          }
        ])}
      >
        <Box mb={20} mt={3}>
          <Frame data={editorState}>
            <BodyWrapper id="wrapper">
              <Element
                id="main"
                canvas
                is={Container}
                {...styleCopy}
                style={{
                  ...styleCopy.style
                }}
                parentStyle={{
                  ...styleCopy.parentStyle
                }}
                props={{
                  ...ContainerDefaultProps.props,
                  xs: 7,
                  id: "Main",
                  containerType: 1
                }}
                custom={{
                  displayName: "Main"
                }}
              >
              </Element>
            </BodyWrapper>
          </Frame>
        </Box>
      </div>
    </div>
  );
}
