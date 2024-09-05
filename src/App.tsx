import { Route, Routes } from "react-router-dom";

import { routes } from "../src/routes/routes";

const App = () => {
  return (
    <div>
      <Routes>
        {routes.map((route) => {
          const Page = route.page;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <div className="container mx-auto">
                  <Page />
                </div>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
};

export default App;
