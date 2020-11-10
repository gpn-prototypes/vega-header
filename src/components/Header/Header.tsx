import React from 'react';
import {
  generatePath,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import { useGetProjectName } from './__generated__/get-project-name';

import { NavLinkType, Params } from './types';

import { HeaderView } from './HeaderView';

import './Header.css';


export const Header = (): React.ReactElement => {
  const projectsPageMatch = useRouteMatch('/');

  const history = useHistory();

  const location = useLocation();

  const params = useParams<Params>();

  const isExactProjectsPage = projectsPageMatch !== null && projectsPageMatch.isExact;

  const createProjectPageMatch = useRouteMatch('/create');

  const isExactCreateProjectPage = createProjectPageMatch !== null && createProjectPageMatch.isExact;

  const { data, loading } = useGetProjectName({
    skip: params.projectId === undefined,
    variables: { vid: params.projectId },
  });

  const getTitle = (): string | undefined | null => {
    if (data?.data?.__typename === 'Project') {
      return data.data.name;
    }

    return undefined;
  };

  const handleChangeActiveLink = (item: NavLinkType): void => {
    if (item.url && params.projectId !== undefined) {
      history.push(generatePath(item.url, { projectId: params.projectId }))
    }
  }

  return (
    <HeaderView
      pathname={location.pathname}
      onChangeActive={handleChangeActiveLink}
      projectName={getTitle()}
      isLoading={loading}
      isCreateProjectPage={isExactCreateProjectPage}
      isProjectPage={isExactProjectsPage}
    />
  );
};
