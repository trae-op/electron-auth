import { RgModule } from "../@core/decorators/rg-module.js";
import { TrayService } from "./service.js";

@RgModule({
  providers: [TrayService],
  exports: [TrayService],
})
export class TrayModule {}
