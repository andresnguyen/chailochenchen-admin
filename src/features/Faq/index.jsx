import { Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import categoryApi from 'api/categoryApi';
import faqApi from 'api/faqApi';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import StaffsTable from 'components/StaffsTable/StaffsTable.js';
import StaffSkeletonList from 'features/Auth/components/StaffSkeletonList';
import queryString from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Faq from './components/Faq';
import AddFaq from './components/form/AddFaq';
import { useSnackbar } from 'notistack';
import './style.css';
export default function FaqPage() {
  const history = useHistory();
  const location = useLocation();
  const [faqList, setFaqList] = useState([]);
  const [categories, setCategories] = useState([]);

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
        const { data, pagination } = await faqApi.getAll(queryParams);
        setFaqList(data);
        setPagination(pagination);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchFaqData();
  }, [queryParams, faqList.length]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const { data } = await categoryApi.getAll({
          count: 0,
          limit: 20,
          page: 0,
        });
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryData();
  }, [categories.length]);

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

  const onAddFaq = async (payload) => {
    try {
      const { data } = await faqApi.add(payload);
      setFaqList([data, ...faqList]);
      enqueueSnackbar('Add new faq successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`Failed to add new faq: ${error.response.data.error}`, { variant: 'error' });
    }
  };

  const onEditFaq = async (payload) => {
    try {
      const { data } = await faqApi.update(payload);
      const faqListClone = [...faqList];
      faqListClone[payload.index] = data;
      setFaqList(faqListClone);
      enqueueSnackbar('Edit faq successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`Failed to edit faq: ${error.response.data.error}`, { variant: 'error' });
    }
  };

  const onDeleteFaq = async (payload) => {
    try {
      await faqApi.remove(payload);
      const faqListClone = [...faqList];
      faqListClone.splice(payload.index, 1);
      setFaqList(faqListClone);
      enqueueSnackbar('Delete faq successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`Failed to delete faq: ${error.response.data.error}`, { variant: 'error' });
    }
  };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4>Faqs</h4>
            <AddFaq onAddFaq={onAddFaq} categories={categories} />
          </CardHeader>

          <CardBody>
            {isLoading ? (
              <StaffSkeletonList />
            ) : (
              <StaffsTable
                tableHeaderColor="primary"
                tableHead={['Question', 'Clap count', 'Actions']}
              >
                {faqList.length > 0 &&
                  faqList.map((faq, index) => (
                    <Faq
                      faq={faq}
                      key={faq._id}
                      onEditFaq={onEditFaq}
                      onDeleteFaq={onDeleteFaq}
                      index={index}
                      categories={categories}
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
