import { useEffect, useState } from "react";
import { Route } from "../util/models";

type Props = {

};
export const RoutesList = (props: Props) => {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/routes')
      .then((data) => data.json())
      .then((data) => setRoutes(data));
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Start Position</th>
            <th>End Position</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route, key) => (
            <tr key={key}>
              <th>{route.title}</th>
              <td>
                lat: {route.startPosition.lat}
                <br/>
                lng: {route.startPosition.lng}
              </td>
              <td>
                lat: {route.endPosition.lat}
                <br/>
                lng: {route.endPosition.lng}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};