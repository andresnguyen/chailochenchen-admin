// @material-ui/core components
import { TableCell, TablePagination, TableRow } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import { Add, Delete, Edit } from '@material-ui/icons';
import staffApi from 'api/staffApi';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import Button from 'components/CustomButtons/Button.js';
import GridContainer from 'components/Grid/GridContainer.js';
// core components
import GridItem from 'components/Grid/GridItem.js';
import StaffsTable from 'components/StaffsTable/StaffsTable.js';
import AddStaff from 'features/Auth/components/AddStaff';
import EditStaff from 'features/Auth/components/EditStaff';
// import EditStaff from 'features/Auth/components/EditStaff';
import StaffSkeletonList from 'features/Auth/components/StaffSkeletonList';
import { useSnackbar } from 'notistack';
import { default as React, useEffect, useState } from 'react';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      margin: '0',
      marginTop: '0',
      marginBottom: '0',
      color: 'rgba(255,255,255,.62)',
      fontSize: '14px',
    },

    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },

  cardTitleWhite: {
    minHeight: 'auto',
    marginTop: '0px',
    marginBottom: '3px',

    color: '#FFFFFF',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: '300',
    textDecoration: 'none',

    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },

  iconButton: {
    cursor: 'pointer',
  },
};

const useStyles = makeStyles(styles);

export default function StaffsTableList() {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [staffList, setStaffList] = useState([]);

  const [pagination, setPagination] = useState({});

  const [limit, setLimit] = useState(pagination.limit ? pagination.limit : 5);

  const [loading, setLoading] = useState(false);

  const [updateData, setUpdateData] = useState({});

  // Handle open, close dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle open, close Update Staff Dialog
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Fetch Data
  const fetchStaffs = async (params) => {
    try {
      setLoading(true);
      const staffListResponse = await staffApi.getAll(params);
      const { data = [], pagination = {} } = staffListResponse || {};

      if (data.length > 0) {
        setStaffList(staffListResponse.data);
      }

      setPagination(pagination);
    } catch (error) {
      enqueueSnackbar('Server Error', { variant: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  // Handle Form Submit
  const handleStaffListSubmit = async (values) => {
    try {
      const data = {
        role: 1,
        active: 1,
        fullname: values.fullname,
        email: values.email,
        password: values.password,
      };

      const response = await staffApi.add(data);

      setStaffList(response);

      await fetchStaffs();

      handleClose();

      enqueueSnackbar('Add new staff successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to add new staff', { variant: 'error' });
    }
  };

  //Handle table pagination
  function handlePageChange(event, page) {
    fetchStaffs({ page, limit });
  }

  const handleChangeRowsPerPage = (event) => {
    fetchStaffs({ limit: event.target.value });
    setLimit(event.target.value);
  };

  //Handle delete staff
  const handleDelete = async (id) => {
    try {
      const delStaff = staffList.filter((staff) => id === staff._id);
      const delId = delStaff[0]._id;

      const response = await staffApi.remove(delId);

      setStaffList(response);

      fetchStaffs();

      enqueueSnackbar('Delete staff successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to delete staff', { variant: 'error' });
    }
  };

  //Handle update staff
  const handleUpdateClick = (id) => {
    setOpenDialog(true);
    const updateStaff = staffList.filter((staff) => id === staff._id);
    setUpdateData(updateStaff);
  };

  const handleUpdateStaff = async (values) => {
    let data;
    try {
      if (values.password !== updateData[0].password) {
        data = {
          _id: updateData[0]._id,
          fullname: values.fullname,
          password: values.password,
          active: values.active,
        };
      } else
        data = {
          _id: updateData[0]._id,
          fullname: values.fullname,
          active: values.active,
        };

      const response = await staffApi.update(data);
      setStaffList(response);
      fetchStaffs();

      setOpenDialog(false);
      enqueueSnackbar('Update staff successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to update staff', { variant: 'error' });
    }
  };

  return (
    <div>
      <GridContainer>
        {/* Staffs Table List */}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Staff List</h4>

              <Button color="primary" onClick={handleClickOpen}>
                <Add />
                Add Staff
              </Button>
            </CardHeader>

            <CardBody>
              {loading ? (
                <StaffSkeletonList />
              ) : (
                <StaffsTable
                  tableHeaderColor="primary"
                  tableHead={['Role', 'Active', 'Name', 'Email', '', '']}
                >
                  {staffList.length > 0 &&
                    staffList.map((staff) => {
                      return (
                        <TableRow className={classes.tableBodyRow} key={staff._id.toString()}>
                          <TableCell className={classes.tableCell}>{staff.role}</TableCell>

                          <TableCell className={classes.tableCell}>{staff.active}</TableCell>

                          <TableCell className={classes.tableCell}>{staff.fullname}</TableCell>

                          <TableCell className={classes.tableCell}>{staff.email}</TableCell>

                          <TableCell className={classes.tableCell}>
                            <Delete
                              className={classes.iconButton}
                              onClick={() =>
                                window.confirm('Delete this staff permanently?') &&
                                handleDelete(staff._id)
                              }
                            />
                          </TableCell>

                          <TableCell className={classes.tableCell}>
                            <Edit
                              className={classes.iconButton}
                              onClick={() => handleUpdateClick(staff._id)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </StaffsTable>
              )}
            </CardBody>

            <TablePagination
              count={pagination.count}
              page={pagination.page}
              rowsPerPage={limit}
              onChangePage={handlePageChange}
              rowsPerPageOptions={[5, 10, 25]}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Card>
        </GridItem>

        {/* Add Staff Dialog */}
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <AddStaff onSubmit={handleStaffListSubmit} />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary" simple>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Staff Dialog */}
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <EditStaff data={updateData[0]} onSubmit={handleUpdateStaff} />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary" simple>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </GridContainer>
    </div>
  );
}
