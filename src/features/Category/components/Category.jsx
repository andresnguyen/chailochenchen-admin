import {  Box, TableCell, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import DeleteCategory from './form/DeleteCategory';
import EditCategory from './form/EditCategory';

Category.propTypes = {
  category: PropTypes.object,
  onEditCategory: PropTypes.func,
  onDeleteCategory: PropTypes.func,
  index: PropTypes.number,
};

export default function Category({ category, onEditCategory, onDeleteCategory, index }) {
  return (
    <TableRow key={category._id.toString()}>
      <TableCell >{category.name}</TableCell>
      {
        category.status === 1 ?  <TableCell >Active</TableCell> :  <TableCell >Inactive</TableCell>
      }
      <TableCell >
        <Box display="flex" justifyContent="flex-end">
          <Box marginRight={2}>
            <EditCategory category={category} onEditCategory={onEditCategory} index={index}/>
          </Box>
        <DeleteCategory category={category} onDeleteCategory={onDeleteCategory} index={index}/>
      </Box>
      </TableCell>
    </TableRow>
  );
}
