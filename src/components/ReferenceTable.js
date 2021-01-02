import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MuiTableCell from "@material-ui/core/TableCell";

const TableCell = withStyles({
  root: {
    borderColor: "#949494",
  },
})(MuiTableCell);

const useStyles = makeStyles({
  container: {
    width: "35%",
    height: "80%",
    backgroundColor: "#2e2d2d",
  },
  row: {
    backgroundColor: "transparent",
  },
  font: {
    color: "#949494",
    fontSize: 16,
  },
  titleFont: {
    color: "#ffffff",
    fontSize: 15,
  },
  chineseFont: {
    color: "#949494",
    fontSize: 30,
  },
});

/**
 * Selection Box Component which allow users to select different groups and sets for practice
 * @param {array} props.chinese      array of chinese characters from selected group and set
 */
export default function ReferenceTable(props) {
  const classes = useStyles();
  const { chinese } = props;

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.titleFont} align="center">
              Character
            </TableCell>
            <TableCell className={classes.titleFont} align="center">
              Pinyin
            </TableCell>
            <TableCell className={classes.titleFont} align="center">
              Meaning
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chinese.map((chinese) => (
            <TableRow className={classes.row} key={chinese.character}>
              <TableCell
                className={classes.font && classes.chineseFont}
                align="center"
              >
                {chinese.character}
              </TableCell>
              <TableCell className={classes.font} align="center">
                {chinese.pinyin}
              </TableCell>
              <TableCell className={classes.font} align="center">
                {chinese.meaning}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
