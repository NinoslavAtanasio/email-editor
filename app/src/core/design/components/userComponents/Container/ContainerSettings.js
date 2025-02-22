import { useEditor, useNode } from "@craftjs/core";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Button as MaterialButton, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { PADDING, MARGIN, BORDER } from "../Defaults";
import { ConfirmationDialog } from "../../../../components/ConfirmationDialog";

import { CustomAccordion, AccordionHeader } from "../UtilComponents";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ResizerSettings } from "./ResizerSettings";
import lodash from "lodash";

let cnfContent = "";
function Columns({ t, type, handleColumns, props }) {
  let w = 100 / type;
  const [cnfOpen, setCnfOpen] = React.useState(false);
  var normalColumnStyle = {
    border: "thin solid #b4bec3",
    padding: 0,
    height: "4vh",
    background: "#fafafa",
    margin: 2,
    marginRight: 10,
    width: "50%",
    borderRadius: 0
  };

  if (props.props.containerType === type) {
    normalColumnStyle["boxShadow"] = "0 2px 4px 0 rgba(0,0,0,0.2)";
  }

  return (
    <React.Fragment>
      <MaterialButton
        onClick={() => {
          if (props.props.containerType !== type) {
            if (props.props.containerType > type) {
              cnfContent =
                type === 1
                  ? t("loseContentOfAllColumnsMessage")
                  : t("loseContentOfColumnsMessage", { col: props.props.containerType - type });
              setCnfOpen(true);
            } else if (props.props.containerType < type) {
              if (props.props.containerType === 1) {
                setCnfOpen(true);
                cnfContent = t("addNewColumnsMessage");
              } else {
                handleColumns(type);
              }
            }
          }
        }}
        style={normalColumnStyle}
      >
        <Box display="flex" alignItems="center" width="100%">
          {[...Array(type)].map((e, i) => {
            return (
              <Box
                key={i}
                style={{
                  borderRight: i < type - 1 ? "thin solid #b4bec3" : "none",
                  width: `${w}` + "%",
                  height: "4vh"
                }}
              />
            );
          })}
        </Box>
      </MaterialButton>
      {cnfOpen && (
        <ConfirmationDialog
          onYes={() => {
            setCnfOpen(false);
            handleColumns(type);
          }}
          onNo={() => {
            setCnfOpen(false);
          }}
          yesLabel={t("yes")}
          noLabel={t("no")}
          title={t("changeColumns")}
          content={cnfContent}
        />
      )}
    </React.Fragment>
  );
}

export const ContainerSettings = withTranslation()(({ t }) => {
  const { actions, query } = useEditor();

  const {
    id,
    actions: { setProp },
    props,
    nodes,
    linkedNodes,
  } = useNode(node => {
    return {
      props: node.data.props,
      name: node.data.displayName,
      customDisplayName: node.data.custom.displayName,
      nodes: node.data.nodes,
      linkedNodes: node.data.linkedNodes
    };
  });

  const [tabValue, setTabValue] = useState(0);
  const handleColumns = value => {
    if (Object.values(linkedNodes).length) {
      let a = [...Object.values(linkedNodes)];

      let n = a.length - (value > 1 ? value : 0);

      while (n > 0 && n--) {
        let tmp = query.node(a[a.length - 1]).toNodeTree()["nodes"];
        tmp = Object.values(tmp);

        if (tmp && tmp.length && tmp[0].data && tmp[0].data.nodes) {
          let b = [...tmp[0].data.nodes];
          let n1 = b.length;
          while (n1 > 0 && n1--) {
            actions["delete"](b[b.length - 1]);
            b.pop();
          }
        }
        actions.setProp(a[a.length - 1], props => {
          const tmp = lodash.cloneDeep(ContainerDefaultProps);
          lodash.assignIn(props, tmp);
        });
        a.pop();
      }
    }
    let a = [...nodes];
    let n = a.length;
    while (n > 0 && n--) {
      actions["delete"](a[a.length - 1]);
      a.pop();
    }
    setProp(props => {
      props.props.containerType = value;
    });
  };

  const areaProps = index => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  };

  const handleTabs = (e, newValue) => {
    setTabValue(newValue);
  };

  const getNodeId = value => {
    const columnsIds = query.node(id).descendants(false, "linkedNodes");

    if (props && props.props && props.props.containerType > 1 && columnsIds.length) {
      return columnsIds[value];
    } else return id;
  };

  return (
    <React.Fragment>
      <AccordionHeader title={t("basic")} />
      <CustomAccordion
        title={t("columns")}
        preview={
          <Box px={1} bgcolor="#f1f1f1" borderRadius={5}>
            <Typography variant="caption" color="textSecondary">
              {props.props.containerType + " " +
                (props.props.containerType === 1 ? t("column") : t("columns"))}
            </Typography>
          </Box>
        }
        children={
          <React.Fragment>
            <Box
              display="flex"
              alignItems="center"
              mt={2}
              mb={2}
              style={{ width: "inherit" }}
            >
              <Columns type={1} handleColumns={handleColumns} props={props} t={t} />
              <Box flexGrow={1} />
              <Columns type={2} handleColumns={handleColumns} props={props} t={t} />
            </Box>
            <Box display="flex" alignItems="center" mt={2} mb={2}>
              <Columns type={3} handleColumns={handleColumns} props={props} t={t} />
              <Box flexGrow={1} />
              <Columns type={4} handleColumns={handleColumns} props={props} t={t} />
            </Box>
          </React.Fragment>
        }
      />
      {props.props.containerType > 1 && (
        <CustomAccordion
          title={t("columnProperties")}
          defaultExpanded={true}
          children={
            <React.Fragment>
              <Tabs
                value={tabValue}
                onChange={handleTabs}
                aria-label="simple tabs example"
                variant="scrollable"
                style={{
                  marginBottom: 10
                }}
              >
                {[...Array(props.props.containerType)].map((e, i) => {
                  return <Tab key={i} label={`Col ${i + 1}`} {...areaProps(i)} />;
                })}
              </Tabs>

              <ResizerSettings id={getNodeId(tabValue)} />
            </React.Fragment>
          }
        />
      )}
      <ResizerSettings id={id} isParent={true} />
    </React.Fragment>
  );
});

export const ContainerDefaultProps = {
  props: {
    containerType: 2,
    xs: 12,
    alignItems: "center"
  },
  style: {
    backgroundImage: "",
    backgroundColor: "#FFFFFF00",
    width: "100%",
    height: "100%",

    ...BORDER
  },
  parentStyle: {
    ...PADDING,
    ...MARGIN
  },
  options: {
    paddingOptions: "less",
    borderOptions: "less"
  }
};
