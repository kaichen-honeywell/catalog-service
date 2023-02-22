import React from 'react';
import { NextPage } from 'next';
import { IAppData } from '../../../pojo';

export async function getServerSideProps(context) {
  const appid = context.params.appid;
  const token = context.req.headers.cookie.split('=')[1];
  const res = await fetch(`http://localhost:3000/appcatalog/${appid}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`, // notice the Bearer before your token
    },
  });
  const appData = await res.json();
  return { props: { data: appData } };
}

const App: NextPage<{ data: IAppData }> = (props) => {
  const { data } = props;
  return (
    <div>
      <h1>App Detail -- {data?.defaultName}</h1>
      <table>
        <tbody>
          <tr>
            <td>app Id</td>
            <td>{data?.appId}</td>
          </tr>
          <tr>
            <td>version</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default App;
