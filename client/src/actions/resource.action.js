import {
  FETCH_RESOURCES_REQUEST,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_FAILURE,
  FETCH_SAVED_RESOURCES_REQUEST,
  FETCH_SAVED_RESOURCES_SUCCESS,
  FETCH_SAVED_RESOURCES_FAILURE,
} from '../constants/actionTypes';

import * as api from '../services';

export const fetchResources =
  (searchTerm, searchFields, filterTags, sortOption) => async (dispatch) => {
    try {
      dispatch({ type: FETCH_RESOURCES_REQUEST });

      const { data: resources } = await api.getResources();
      const action = {
        type: FETCH_RESOURCES_SUCCESS,
        payload: {
          resources,
          searchTerm,
          searchFields,
          filterTags,
          sortOption,
        },
      };
      dispatch(action);
    } catch (error) {
      dispatch({
        type: FETCH_RESOURCES_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const fetchSavedResources = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SAVED_RESOURCES_REQUEST });

    const { data: resources } = await api.getResources();
    const { resourceIds: savedResourceIds } = await api.getSavedResourceIds();
    const action = {
      type: FETCH_SAVED_RESOURCES_SUCCESS,
      payload: {
        resources,
        savedResourceIds,
      },
    };
    dispatch(action);
  } catch (error) {
    dispatch({
      type: FETCH_SAVED_RESOURCES_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
