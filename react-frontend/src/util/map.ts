import { RouteExistsError } from "../errors/route-exists.error";

export class Route {
  public currentMarker: google.maps.Marker;
  public endMarker: google.maps.Marker;
  private directionsRenderer: google.maps.DirectionsRenderer;

  constructor(options: {
    currentMarkerOptions: google.maps.ReadonlyMarkerOptions;
    endMarkerOptions: google.maps.ReadonlyMarkerOptions;
  }) {
    const { currentMarkerOptions, endMarkerOptions } = options;
    this.currentMarker = new google.maps.Marker(currentMarkerOptions);
    this.endMarker = new google.maps.Marker(endMarkerOptions);

    const strokeColor = (this.currentMarker.getIcon() as google.maps.ReadonlySymbol)
      .strokeColor;
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor,
        strokeOpacity: 0.5,
        strokeWeight: 5,
      },
    });
    this.directionsRenderer.setMap(
      this.currentMarker.getMap() as google.maps.Map
    );

    this.calculateRoute();
  }

  private calculateRoute() {
    const currentPosition = this.currentMarker.getPosition() as google.maps.LatLng;
    const endPosition = this.endMarker.getPosition() as google.maps.LatLng;

    new google.maps.DirectionsService().route(
      {
        origin: currentPosition,
        destination: endPosition,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          this.directionsRenderer.setDirections(result);
          return;
        }

        throw new Error(status);
      }
    );
  }

  delete() {
    this.currentMarker.setMap(null);
    this.endMarker.setMap(null);
    this.directionsRenderer.setMap(null);
  }
}

export class Map {
  public map: google.maps.Map;
  private routes: { [id: string]: Route } = {};
  constructor(element: Element, options: google.maps.MapOptions) {
    this.map = new google.maps.Map(element, options);
  }

  moveCurrentMarker(id: string, position: google.maps.LatLngLiteral) {
    this.routes[id].currentMarker.setPosition(position);
  }

  removeRoute(id: string) {
    const route = this.routes[id];
    route.delete();
    delete this.routes[id];
  }

  addRoute(
    id: string,
    routeOptions: {
      currentMarkerOptions: google.maps.ReadonlyMarkerOptions;
      endMarkerOptions: google.maps.ReadonlyMarkerOptions;
    }
  ) {
    if (id in this.routes) {
      throw new RouteExistsError();
    }

    const { currentMarkerOptions, endMarkerOptions } = routeOptions;
    this.routes[id] = new Route({
      currentMarkerOptions: { ...currentMarkerOptions, map: this.map },
      endMarkerOptions: { ...endMarkerOptions, map: this.map },
    });

    this.fitBounds();
  }

  private fitBounds() {
    const bounds = new google.maps.LatLngBounds();

    Object.keys(this.routes).forEach((id: string) => {
      const route = this.routes[id];
      bounds.extend(route.currentMarker.getPosition() as any);
      bounds.extend(route.endMarker.getPosition() as any);
    });

    this.map.fitBounds(bounds);
  }
}

export const makeCarIcon = (color: string) => ({
  path:
    "M23.5 7c.276 0 .5.224.5.5v.511c0 .793-.926.989-1.616.989l-1.086-2h2.202zm-1.441 3.506c.639 1.186.946 2.252.946 3.666 0 1.37-.397 2.533-1.005 3.981v1.847c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1h-13v1c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1.847c-.608-1.448-1.005-2.611-1.005-3.981 0-1.414.307-2.48.946-3.666.829-1.537 1.851-3.453 2.93-5.252.828-1.382 1.262-1.707 2.278-1.889 1.532-.275 2.918-.365 4.851-.365s3.319.09 4.851.365c1.016.182 1.45.507 2.278 1.889 1.079 1.799 2.101 3.715 2.93 5.252zm-16.059 2.994c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm10 1c0-.276-.224-.5-.5-.5h-7c-.276 0-.5.224-.5.5s.224.5.5.5h7c.276 0 .5-.224.5-.5zm2.941-5.527s-.74-1.826-1.631-3.142c-.202-.298-.515-.502-.869-.566-1.511-.272-2.835-.359-4.441-.359s-2.93.087-4.441.359c-.354.063-.667.267-.869.566-.891 1.315-1.631 3.142-1.631 3.142 1.64.313 4.309.497 6.941.497s5.301-.184 6.941-.497zm2.059 4.527c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-18.298-6.5h-2.202c-.276 0-.5.224-.5.5v.511c0 .793.926.989 1.616.989l1.086-2z",
  fillColor: color,
  strokeColor: color,
  strokeWeight: 1,
  fillOpacity: 1,
  anchor: new google.maps.Point(26, 20),
});

export const makeMarkerIcon = (color: string) => ({
  path:
    "M66.9,41.8c0-11.3-9.1-20.4-20.4-20.4c-11.3,0-20.4,9.1-20.4,20.4c0,11.3,20.4,32.4,20.4,32.4S66.9,53.1,66.9,41.8z    M37,41.4c0-5.2,4.3-9.5,9.5-9.5c5.2,0,9.5,4.2,9.5,9.5c0,5.2-4.2,9.5-9.5,9.5C41.3,50.9,37,46.6,37,41.4z",
  strokeColor: color,
  fillColor: color,
  strokeOpacity: 1,
  strokeWeight: 1,
  fillOpacity: 1,
  anchor: new google.maps.Point(46, 70),
});
