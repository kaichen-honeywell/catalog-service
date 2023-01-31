import React from 'react';
import { NextPage } from 'next';
import { IAppData } from '../../pojo';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const token = context.req.headers.cookie.split('=')[1];
  const res = await fetch(`http://localhost:3000/appcatalog`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`, // notice the Bearer before your token
    },
  });
  const appData = await res.json();
  return { props: { data: appData } };
}
const Apps: NextPage<{ data: IAppData[] }> = (props) => {
  const { data } = props;
  return (
    <>
      <div>
        <h1>App List</h1>
      </div>
      <ul>
        {data?.map((item) => (
          <li key={item.appId}>
            <Link href={`/app/${item.appId}`}>{item.defaultName}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Apps;
