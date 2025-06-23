import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "@layouts/Main";
import { LoadingSpinner } from "@components/LoadingSpinner";

const LazyHomeWindow = lazy(() => import("./windows/home/Home"));
const LazyUpdaterWindow = lazy(() => import("./windows/updater/Updater"));

export const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/window:main" element={<LazyHomeWindow />} />
            <Route path="/window:update-app" element={<LazyUpdaterWindow />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
};
