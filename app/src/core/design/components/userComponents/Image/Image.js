import { useNode } from "@craftjs/core";
import { Grid } from "@material-ui/core";
import React from "react";
import { ImageDefaultProps, ImageSettings } from "./ImageSettings";
import { ImagePlaceholder } from "./ImagePlaceholder";

export const Image = ({ props, style, parentStyle }) => {
    const {
        connectors: { connect },
        id
    } = useNode();

    //bgimage/bgcolor
    var parentStyleCopy = {
        ...parentStyle
    };

    parentStyleCopy.backgroundImage = "url(" + parentStyleCopy.backgroundImage + ")";
    return (
        <Grid
            item
            id={id}
            xs={12}
            ref={connect}
            style={Object.assign(
                {
                    textAlign: parentStyleCopy.align
                },
                parentStyleCopy
            )}
        >
            <a
                href={props.path}
                target={props.linkTarget}
                style={{
                    pointerEvents: props.path === "#" ? "none" : "auto"
                }}
            >
                {props.src === ImageDefaultProps.props.src ? <ImagePlaceholder /> : (
                    <img src={props.src} width={style.width} alt={props.altText} style={style} />
                )}
            </a>
        </Grid>
    );
};

Image.craft = {
    props: ImageDefaultProps,
    displayName: "Image",
    related: {
        settings: ImageSettings
    }
};
