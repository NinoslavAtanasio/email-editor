import { useNode } from "@craftjs/core";
import { Grid } from "@material-ui/core";
import React from "react";
import { VideoDefaultProps, VideoSettings } from "./VideoSettings";
import { VideoPlaceholder } from "./VideoPlaceholder";
export const Video = ({ props, style, parentStyle }) => {
  const {
    connectors: { connect },
    id
  } = useNode();

  //bgimage/bgcolor
  var parentStyleCopy = {
    ...parentStyle
  };
  if (parentStyleCopy.backgroundImage !== "") {
    parentStyleCopy.backgroundImage = "url(" + parentStyleCopy.backgroundImage + ")";
  }

  return (
    <Grid
      item
      xs={12}
      id={id}
      style={Object.assign(
        {
          textAlign: parentStyleCopy.align
        },
        parentStyleCopy
      )}
      ref={connect}
    >
      {props.src ? (
        <React.Fragment>
          <video style={style} controls>
            <source src={props.src} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        </React.Fragment>
      ) : (
        <VideoPlaceholder />
      )}
    </Grid>
  );
};

Video.craft = {
  props: VideoDefaultProps,
  related: {
    settings: VideoSettings
  },
  displayName: "Video",
  rules: {
    canMoveIn: () => false
  }
};
