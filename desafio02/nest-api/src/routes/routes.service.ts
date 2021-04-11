import { Injectable } from '@nestjs/common';
import { Route } from './entities/route.entity'

@Injectable()
export class RoutesService {
  private routes: Route[] = [
    {
      title: 'route 1',
      startPosition: {
        lat: -23.625996215782695,
        lng: -46.65633371168834,
      },
      endPosition: {
        lat: -23.58748199882667,
        lng: -46.657729472444174,
      },
    },
    {
      title: 'route 2',
      startPosition: {
        lat: -23.58748199882667,
        lng: -46.657729472444174,
      },
      endPosition: {
        lat: -23.561713514621893,
        lng: -46.65572718492119,
      },
    },
    {
      title: 'route 3',
      startPosition: {
        lat: -23.561713514621893,
        lng: -46.65572718492119,
      },
      endPosition: {
        lat: -23.54722218376444,
        lng: -46.66440849435947,
      },
    },
    {
      title: 'route 4',
      startPosition: {
        lat: -23.54722218376444,
        lng: -46.66440849435947,
      },
      endPosition: {
        lat: -23.544951941785087,
        lng: -46.64390978440986,
      },
    },
    {
      title: 'route 5',
      startPosition: {
        lat: -23.544951941785087,
        lng: -46.64390978440986,
      },
      endPosition: {
        lat: -23.625996215782695,
        lng: -46.65633371168834,
      },
    },
  ]
  findAll() {
    return this.routes;
  }
}
