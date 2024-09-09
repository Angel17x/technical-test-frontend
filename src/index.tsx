import './index.css';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './core/redux/store.ts'
import { StrictMode } from 'react'
import { ThemeProvider } from "@material-tailwind/react";
import { RouterProvider } from 'react-router-dom';
import { router } from './core/router/router.tsx';

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
