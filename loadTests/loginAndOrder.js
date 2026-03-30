import { sleep, check } from 'k6'
import http from 'k6/http'

export const options = {
  cloud: {
    distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '1m' },
        { target: 20, duration: '3m30s' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  // login
  const loginRes = http.post(
    'https://pizza.devops-cwarner.click/api/auth',
    JSON.stringify({ email: 'c@jwt.com', password: 'c' }),
    { headers: { 'content-type': 'application/json' } }
  )

  check(loginRes, {
    'login status is 200': (r) => r.status === 200,
  })

  const authToken = loginRes.json('token')
  const authHeaders = {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${authToken}`,
    },
  }

  sleep(1)

  // get menu
  http.get('https://pizza.devops-cwarner.click/api/order/menu', authHeaders)

  sleep(1)

  // buy pizza
  const orderRes = http.post(
    'https://pizza.devops-cwarner.click/api/order',
    JSON.stringify({
      franchiseId: 1,
      storeId: 1,
      items: [{ menuId: 1, description: 'Pizza', price: 0.001 }],
    }),
    authHeaders
  )

  check(orderRes, {
    'order status is 200': (r) => r.status === 200,
  })

  // verify jwt — pulled dynamically from order response
  const pizzaJwt = orderRes.json('jwt')

  const verifyRes = http.post(
    'https://pizza.devops-cwarner.click/api/order/verify',
    JSON.stringify({ jwt: pizzaJwt }),
    authHeaders
  )

  check(verifyRes, {
    'pizza jwt is valid': (r) => r.status === 200,
  })

  sleep(1)
}