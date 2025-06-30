import { lazy, Suspense } from "react";
import Typography from "@mui/material/Typography";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { Provider as ProviderUser } from "@ui-business/User";

const LazyTopPanel = lazy(() => import("./TopPanel"));

const Home = () => {
  return (
    <ProviderUser>
      <Suspense fallback={<LoadingSpinner />}>
        <LazyTopPanel />
      </Suspense>
      <Typography component="h1" variant="h4">
        Electron.js
      </Typography>
    </ProviderUser>
  );
};

export default Home;
