import React from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import { fetch_u_repos } from './api';

const fetcher = (
  url: string
) =>
  fetch(url)
    .then(r => r.json())
    .catch(e => e);

const App: React.FC = () => {
  const { data, error } = useSWR(fetch_u_repos('ShunOmine'), fetcher);

  if(error) return (
    <Container>
      <Error>failed to load</Error>
    </Container>
  );

  if(!data) return (
    <Container>
      <Loading />
    </Container>
  );

  return (
    <Wrapper>
      {data.map((d: any) => (
        <Link href={`${d.full_name}`} target="_blank" key={d.id} rel="noopener noreferrer">
          {d.full_name}
        </Link>
      ))}
    </Wrapper>
  )
};

export default App

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
`;

const Link = styled.a`
  margin: 10px 0;
`;

const Error = styled.h1`
  color: #f75353;
`;

const Loading = styled.div`
  width: 30px;
  height: 30px;
  border-top: 5px solid #00ACED;
  border-right: 5px solid #eee;
  border-bottom: 5px solid #eee;
  border-left: 5px solid #eee;
  border-radius: 50%;
  animation: Loading .8s linear infinite;
  
  @keyframes Loading {
    to {
      transform: rotate(360deg);
    }
  }
`;
