import { dialog } from "electron";
import { logger } from "../logger.js";

type TParams = {
  title: string;
  body: string;
};

export function showErrorMessages({ title, body }: TParams) {
  logger.error(title, body);
  dialog.showMessageBox({
    title,
    message: body,
  });
}
