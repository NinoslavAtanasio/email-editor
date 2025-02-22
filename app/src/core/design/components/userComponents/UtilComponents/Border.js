import { TextField, MenuItem, Switch, Box } from "@material-ui/core";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { withTranslation } from "react-i18next";
import { CustomColorPicker } from "./ColorPicker";
import { GroupedButtons } from "./GroupedButtons";

const Border = withTranslation()(({ t, propKey, propName, setProp, props, styleProp }) => {
  const borderStylesOpts = [
    { name: t("solid"), value: "Solid" },
    { name: t("dotted"), value: "Dotted" },
    { name: t("dashed"), value: "Dashed" }
  ];
  const tmp = props[styleProp][propKey];
  let [width, style, color] = typeof tmp === "string" ? [...tmp.split(" ")] : [];
  width = width && width !== "" ? width : "0px";
  style = style && style !== "" ? style : "solid";
  color = color && color !== "" ? color : "#000000";
  const selectedValue = borderStylesOpts.filter(({ value: opts }) => opts.toLowerCase() === style).map(({ name }) => name);

  const handleSetProp = () => {
    setProp(props => {
      if (propName === "All Sides") {
        props[styleProp]["borderTop"] = width + " " + style + " " + color + " ";
        props[styleProp]["borderBottom"] = width + " " + style + " " + color + " ";
        props[styleProp]["borderRight"] = width + " " + style + " " + color + " ";
        props[styleProp]["borderLeft"] = width + " " + style + " " + color + " ";
      } else {
        props[styleProp][propKey] = width + " " + style + " " + color + " ";
      }
    });
  };

  return (
    <Box my={2} mr={1} display="flex" flexDirection="column">
      <Typography variant="caption" color="textSecondary">
        {propName}
      </Typography>
      <TextField
        variant="outlined"
        value={selectedValue}
        onChange={e => {
          e.persist();
          style = e.target.value.toLowerCase();
          handleSetProp();
        }}
        fullWidth
        margin="dense"
        size="small"
        select
      >
        {borderStylesOpts.map(({ name, value }, index) => {
          return (
            <MenuItem key={index} value={value}>
              {name ?? value}
            </MenuItem>
          );
        })}
      </TextField>
      <Box my={1} display="flex" alignItems="center">
        <GroupedButtons
          displayProp={width ? width.substring(0, width.length - 2) : width}
          handleChange={newValue => {
            width = `${newValue}px`;
            handleSetProp();
          }}
        />
        <Box flexGrow={1} />
        <CustomColorPicker
          value={color}
          onChange={newValue => {
            color = newValue;
            handleSetProp();
          }}
        />
      </Box>
    </Box>
  );
});

export const BorderComponent = withTranslation()(({ t, props, setProp, styleProp = "style" }) => {
  const handleOptionChange = () => {
    let value = props[styleProp].borderTop;

    setProp(props => {
      props[styleProp] = {
        ...props[styleProp],
        borderTop: value,
        borderBottom: value,
        borderRight: value,
        borderLeft: value
      };
      props["borderOptions"] = props["borderOptions"] === "more" ? "less" : "more";
    });
  };

  let radius = props[styleProp].borderRadius;

  return (
    <React.Fragment>
      <Box justifyContent="center" alignItems="center" m={1}>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="subtitle2" color="textSecondary">
            {t("uniform")}
          </Typography>
          <Box flexGrow={1} />
          <Switch
            checked={props["borderOptions"] !== "more"}
            size="small"
            onChange={handleOptionChange}
          />
        </Box>
        <Box>
          {props["borderOptions"] === "more" ? (
            <React.Fragment>
              <Box display="flex" alignItems="center">
                <Border
                  propKey="borderTop"
                  propName="Top"
                  setProp={setProp}
                  props={props}
                  styleProp={styleProp}
                  title={t("top")}
                />
                <Box flexGrow={1} />
                <Border
                  propKey="borderBottom"
                  propName="Bottom"
                  setProp={setProp}
                  props={props}
                  styleProp={styleProp}
                  title={t("bottom")}
                />
              </Box>
              <Box display="flex" alignItems="center">
                <Border
                  propKey="borderLeft"
                  propName="Left"
                  setProp={setProp}
                  props={props}
                  styleProp={styleProp}
                  title={t("left")}
                />
                <Box flexGrow={1} />
                <Border
                  propKey="borderRight"
                  propName="Right"
                  setProp={setProp}
                  props={props}
                  styleProp={styleProp}
                  title={t("right")}
                />
              </Box>
            </React.Fragment>
          ) : (
            <Border
              propKey="borderTop"
              propName="All Sides"
              setProp={setProp}
              props={props}
              styleProp={styleProp}
              title={t("allSides")}
            />
          )}
        </Box>
      </Box>
      <Box display="flex" m={1} flexDirection="column">
        <Typography variant="caption" color="textSecondary" style={{ marginBottom: 8 }}>
          {t("borderRadius")}
        </Typography>
        <GroupedButtons
          displayProp={radius}
          handleChange={newValue => {
            setProp(props => {
              props[styleProp].borderRadius = newValue;
            });
          }}
        />
      </Box>
    </React.Fragment>
  );
});
