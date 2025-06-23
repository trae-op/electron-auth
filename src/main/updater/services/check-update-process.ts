import { Injectable } from "../../@core/decorators/injectable.js";
import { getStore } from "../../$shared/store.js";

@Injectable()
export class CheckUpdateProcessService {
  constructor() {}

  isUpdateProcess() {
    const isUpdateProcess = getStore("updateProcess");

    return isUpdateProcess !== undefined && isUpdateProcess;
  }
}
