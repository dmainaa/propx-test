import {BASE_ROUTES} from './bases.js'

const buildRoute = (base) => (
  {
    root: base,
    child: (...segments) => {
      return [base, ...segments].join('/')
    }
  }
)

export const ROUTES = {
  dashboard: buildRoute(BASE_ROUTES.DASHBOARD),
  users: buildRoute(BASE_ROUTES.LANDLORD),
  auth: buildRoute(BASE_ROUTES.AUTH),
};