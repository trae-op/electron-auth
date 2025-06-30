import { memo, type ReactNode } from "react";
import { useIpc } from "../hooks";
import { Provider } from "./Provider";

const ContainerIpc = memo(({ children }: { children: ReactNode }) => {
  useIpc();

  return children;
});

export const ProviderAuth = memo(({ children }: { children: ReactNode }) => (
  <Provider>
    <ContainerIpc>{children}</ContainerIpc>
  </Provider>
));
