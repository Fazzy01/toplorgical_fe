# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


STEP RUNNING THE APP

# STEP 1
- clone the App

# STEP 2
- cd into the app (cd toplorgical_fe)

# STEP 3
- setup environment variable

VITE_APP_LOCAL_BASE_URL = http://127.0.0.1:3000/
VITE_APP_PRODUCTION_BASE_URL = http://127.0.0.1:3000/
NODE_ENV= development
VITE_APP_PAYSTACK_PUBLIC_KEY = <your_api_test_key>

NB that http://127.0.0.1:3000/ is api_gateway url

# STEP 4
- run command to install depencies and run server
---- npm install
---  npm run dev