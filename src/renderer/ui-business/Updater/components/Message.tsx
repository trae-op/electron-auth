import { memo } from "react";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import { useControlContext } from "../hooks";

export const Message = memo((props: TypographyProps) => {
  const { message } = useControlContext();

  if (message === undefined) {
    return null;
  }

  return (
    <Typography
      component="h6"
      sx={{ color: "text.secondary" }}
      variant="h6"
      {...props}
    >
      {message}
    </Typography>
  );
});
