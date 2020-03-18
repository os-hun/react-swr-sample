import React from 'react';
import useSWR from 'swr';
import { URepo } from './api';

const fetcher = (
  url: string
) =>
  fetch(url)
    .then(r => r.json())
    .catch(e => e);

const App: React.FC = () => {
  const { data, error } = useSWR(URepo('shunomine'), fetcher);

  if(error) return <h1>failed to load</h1>;
  if(!data) return <h1>loading....</h1>;

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      {data.map((d: any) => (
        <a href={`${d.full_name}`} target="_blank" key={d.id} rel="noopener noreferrer">
          {d.full_name}
        </a>
      ))}
    </div>
  )
};

export default App
