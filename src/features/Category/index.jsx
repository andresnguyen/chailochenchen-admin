/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import categoryApi from 'api/categoryApi';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import StaffsTable from 'components/StaffsTable/StaffsTable.js';
import StaffSkeletonList from 'features/Auth/components/StaffSkeletonList';
import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Category from './components/Category';
import AddCategory from './components/form/AddCategory';

export default function CategoryPage() {
  const history = useHistory();
  const location = useLocation();
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    count: 0,
    limit: 0,
    page: 0,
  });

  const { enqueueSnackbar } = useSnackbar();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      page: Number(params.page) || 0,
      limit: Number(params.limit) || 15,
    };
  }, [location.search]);

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        setIsLoading(true);
        const { data, pagination } = await categoryApi.getAll(queryParams);
        setCategoryList(data);
        setPagination(pagination);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchFaqData();
  }, [queryParams, categoryList.length]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const { data } = await categoryApi.getAll();
        setCategoryList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryData();
  }, []);

  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      page: page - 1,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const onAddCategory = async (payload) => {
    try {
      const { data } = await categoryApi.add(payload);
      setCategoryList([data, ...categoryList]);
      enqueueSnackbar('Add new category successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`Failed to add new category: ${error}`, { variant: 'error' });
    }
  };

  const onEditCategory = async (payload) => {
    try {
      const { data } = await categoryApi.update(payload);
      const categoryListClone = [...categoryList];
      categoryListClone[payload.index] = data;
      setCategoryList(categoryListClone);
      enqueueSnackbar('Edit category successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`Failed to edit category: ${error}`, { variant: 'error' });
    }
  };

  const onDeleteCategory = async (payload) => {
    try {
      await categoryApi.remove(payload);
      const categoryListClone = [...categoryList];
      categoryListClone.splice(payload.index, 1);
      setCategoryList(categoryListClone);
      enqueueSnackbar('Delete category successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`Failed to delete category: ${error}`, { variant: 'error' });
    }
  };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4>Categories</h4>
            <AddCategory onAddCategory={onAddCategory} />
          </CardHeader>

          <CardBody>
            {isLoading ? (
              <StaffSkeletonList />
            ) : (
              <StaffsTable tableHeaderColor="primary" tableHead={['Name', 'Status', 'Actions']}>
                {categoryList.length > 0 &&
                  categoryList.map((category, index) => (
                    <Category
                      category={category}
                      key={category._id}
                      onEditCategory={onEditCategory}
                      onDeleteCategory={onDeleteCategory}
                      index={index}
                    />
                  ))}
              </StaffsTable>
            )}
          </CardBody>
          <Box margin="24px">
            <Pagination
              count={Math.ceil(pagination.count / pagination.limit)}
              page={pagination.page + 1}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              color="primary"
            />
          </Box>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
