import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link }  from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import api from '../../services/Api';

import logoImg from '../../assets/logo.svg';
import { Header, RepositoryInfo, Issues } from './style';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  }

}

const Respository: React.FC = () => {

  const [repostiory, setRepositry] = useState<Repository | null >(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`)
    .then(response => {
      setRepositry(response.data)
    });

    api.get(`repos/${params.repository}/issues`)
    .then(response => {
      setIssues(response.data);
    });
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="GitHub Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} >
          </FiChevronLeft>
          Voltar
        </Link>
      </Header>

      { repostiory && (
        <RepositoryInfo>
          <header>
            <img src={repostiory.owner.avatar_url}  alt={repostiory.owner.login} />
            <div>
              <strong>{repostiory.full_name}</strong>
              <p>{repostiory.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repostiory.stargazers_count}</strong>
              <span>Starts</span>
            </li>
            <li>
              <strong>{repostiory.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repostiory.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url}>
          <div>
            <strong>{issue.title}</strong>
            <p>{issue.user.login}</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        ))}
      </Issues>
    </>
  );
}

export default Respository;
