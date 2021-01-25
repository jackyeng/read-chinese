import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#656565",
    color: "#e5e5e5",
    boxShadow: theme.shadows[1],
    fontSize: 20,
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  button: {
    size: 20,
  },
}));

export default function CustomizedTooltips(props) {
  const { chinese } = props;
  return (
    <LightTooltip
      title={
        <div>
          {"pinyin: " + chinese.pinyin} <br /> {"meaning: " + chinese.meaning}
        </div>
      }
    >
      <Button style={{ fontSize: "25px", color: "#949494" }}>
        {chinese.character}
      </Button>
    </LightTooltip>
  );
}
