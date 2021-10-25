/* eslint-disable react/react-in-jsx-scope */
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  item: { marginBottom: 12 },
}));

export default function CategoriesSkeleton() {
  const classes = useStyles();
  return (
    <Box>
      <Skeleton
        animation="wave"
        variant="rect"
        width="100%"
        height="40px"
        className={classes.item}
      />
      <Skeleton
        animation="wave"
        variant="rect"
        width="100%"
        height="40px"
        className={classes.item}
      />
      <Skeleton
        animation="wave"
        variant="rect"
        width="100%"
        height="40px"
        className={classes.item}
      />
    </Box>
  );
}
