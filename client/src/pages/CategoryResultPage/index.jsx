import { useState, useEffect } from 'react';

import { Spinner } from '@chakra-ui/spinner';
import { Center } from '@chakra-ui/layout';

import { Navbar } from '../../components/Navbar';
import { WithFooter } from '../../components/Footer';
import { ResourceContainer } from '../../components/ResourceContainer';

import { useResources } from '../../hooks/useResources';
import { useParams, useHistory } from 'react-router-dom';
import { FilterType } from '../../constants/commonVariable';
import { Heading } from '@chakra-ui/react';

export const CategoryResultPage = () => {
  const { resources, isLoading } = useResources();
  const [filteredResources, setFilteredResources] = useState([]);
  const { category: categoryName } = useParams();

  useEffect(() => {
    if (resources) {
      setFilteredResources(
        resources.filter((resource) => resource.category == categoryName)
      );
    }
  }, [resources]);

  return (
    <WithFooter>
      <Navbar />
      <Heading pt={10} pb={10} textAlign="center" mx="auto" fontSize="3xl"> {categoryName} </Heading>
      {!isLoading ? (
        <ResourceContainer resources={filteredResources} type={FilterType.SHOW_RESOURCES} />
      ) : (
        <Center>
          <Spinner />
        </Center>
      )}
    </WithFooter>
  );
};