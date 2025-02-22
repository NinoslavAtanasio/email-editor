import React from "react";
import { ROOT_NODE, useEditor } from "@craftjs/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box, Divider } from "@material-ui/core";
import { withTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  settings: {
    overflowX: "hidden",
    overflowY: "scroll",
    width: "370px",
    height: "94%"
  }
}));

export const RightPanel = withTranslation()(({ t }) => {
  const classes = useStyles();
  const { selected, rootNode } = useEditor((state, query) => {
    const currentNodeId = state.events.selected;
    let selected;
    if (currentNodeId) {
      const customName = query.node(currentNodeId).get().data.custom.displayName;
      const name = query.node(currentNodeId).get().data.displayName;
      selected = {
        id: currentNodeId,
        name: customName || name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable()
      };
    }

    return {
      selected: selected,
      rootNode: state.nodes[ROOT_NODE]
    };
  });

  const BodySettings =
    rootNode && rootNode.related && rootNode.related.settings ? (
      React.createElement(rootNode.related.settings)
    ) : (
      <React.Fragment></React.Fragment>
    );

  return (
    <Box pb={2} mt={1}>
      <Box display="flex" alignItems="center" ml={2} mb={2} mt={2}>
        <Typography variant="h4">{selected ? t(selected.name.toLowerCase()) : t("body")} {t("settings")}</Typography>
      </Box>
      <Divider />
      <div className={classes.settings}>
        {selected && selected.settings ? (
          React.createElement(selected.settings)
        ) : (
          <React.Fragment>{BodySettings}</React.Fragment>
        )}
      </div>
    </Box>
  );
});
