import { Box, TableCell, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import DeleteFaq from './form/DeleteFaq';
import EditFaq from './form/EditFaq';

Faq.propTypes = {
  faq: PropTypes.object,
  onEditFaq: PropTypes.func,
  onDeleteFaq: PropTypes.func,
  index: PropTypes.number,
  categories: PropTypes.array,
};

export default function Faq({ faq, onEditFaq, onDeleteFaq, index, categories }) {
  return (
    <TableRow key={faq._id.toString()}>
      <TableCell>{faq.question}</TableCell>
      <TableCell>{faq.clapsCount}</TableCell>
      <TableCell align="right">
        <Box display="flex" justifyContent="flex-end">
          <Box marginRight={2}>
            <EditFaq faq={faq} onEditFaq={onEditFaq} index={index} categories={categories} />
          </Box>
          <DeleteFaq faq={faq} onDeleteFaq={onDeleteFaq} index={index} />
        </Box>
      </TableCell>
    </TableRow>
  );
}
