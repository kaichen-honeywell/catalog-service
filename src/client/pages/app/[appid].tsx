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
            <td>{data?.version}</td>
          </tr>
          <tr>
            <td>root url</td>
            <td>{data?.rootUrl}</td>
          </tr>
          <tr>
            <td>entry url</td>
            <td>{data?.appEntryUrl}</td>
          </tr>
          <tr>
            <td>release date</td>
            <td>{data?.releaseDate}</td>
          </tr>
          <tr>
            <td>routes</td>
            <td>
              <ul>
                {data?.appRoutes.map((a) => (
                  <li key={a.appRouteId}>
                    {a.defaultName} : {a.rootUrl}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default App;
