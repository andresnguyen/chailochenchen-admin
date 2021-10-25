import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

StaffSkeletonList.propTypes = {
  length: PropTypes.number,
};

StaffSkeletonList.defaultProps = {
  length: 6,
};

function StaffSkeletonList({ length }) {
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index} xs={12}>
            <Skeleton variant="text" width="100%" height={65}></Skeleton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default StaffSkeletonList;
