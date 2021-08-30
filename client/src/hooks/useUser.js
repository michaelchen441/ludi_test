import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { authApis, resourceApis, userApis } from '../services';

export const useUser = () => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery('user', userApis.getUser, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const savedResourceIds = useMemo(
    () => (user ? user.savedResourceIds : []),
    [user]
  );

  const saveMutation = useMutation(resourceApis.saveResource, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
    },
  });

  const unsaveMutation = useMutation(resourceApis.unsaveResource, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
    },
  });

  const loginMutation = useMutation(authApis.loginUser, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
    },
  });
  
  return {
    user,
    savedResourceIds,
    saveMutation,
    unsaveMutation,
    loginMutation,
    isLoading,
    error,
  };
};
