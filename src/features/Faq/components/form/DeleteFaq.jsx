import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

DeleteFaq.propTypes = {
  faq: PropTypes.object,
  onDeleteFaq: PropTypes.func,
  index: PropTypes.number,
};

export default function DeleteFaq({ faq, onDeleteFaq, index }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleOk = () => {
    const payload = { faqId: faq._id, index };
    onDeleteFaq(payload);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button onClick={handleClickOpen} size="small" color="secondary" variant="contained">
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Box padding="24px" >
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: '#afafaf', fontSize: 20, fontWeight: 500 }}
            >
              Are you sure delete this FAQ?
            </DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary" variant="contained" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
