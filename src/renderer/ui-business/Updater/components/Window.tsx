import Stack from "@mui/material/Stack";
import Button, { ButtonProps } from "@mui/material/Button";
import { Circular } from "./CircularProgress";
import { DownloadedButton } from "./DownloadedButton";
import { useIpc } from "../hooks";
import { Context } from "../context";
import { Message } from "./Message";

export const Window = () => {
  const value = useIpc();

  return (
    <Context.Provider value={value}>
      <Stack spacing={2} alignItems="center">
        <Message />
        <Circular />
        <DownloadedButton<ButtonProps> component={Button} variant="outlined">
          Update downloaded
        </DownloadedButton>
      </Stack>
    </Context.Provider>
  );
};
