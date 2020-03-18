import React, { useState } from 'react';
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
  const [u_value, setUValue] = useState('facebook');
  const [username, setUserName] = useState('facebook');
  const { data, error } = useSWR(fetch_u_repos(username), fetcher);
  const message = data && ( data.message );

  if(error) return (
    <Container>
      <Error>failed to load</Error>
    </Container>
  );

  if(message) return (
    <Container>
      <Error>{data.message}</Error>
    </Container>
  );

  if(!data) return (
    <Container>
      <Loading />
    </Container>
  );

  const onSubmit = (e: any) => {
    setUserName(u_value);
    e.preventDefault()
  };

  return (
    <Wrapper>
      <form onSubmit={e => onSubmit(e)}>
        <Input type="text" placeholder="set username" onChange={e => setUValue(e.target.value)} />
        <Submit type="submit" value="送信" />
      </form>
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

const Error = styled.h3`
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

const Input = styled.input`
  height: 40px;
  width: 150px;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #eee;
  box-sizing: border-box;
  outline: none;
  -webkit-appearance: none;
`;

const Submit = styled.input`
  height: 40px;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  box-shadow: none;
  color: #fefefe;
  background: #00aced;
  outline: none;
  -webkit-appearance: none;
`;
