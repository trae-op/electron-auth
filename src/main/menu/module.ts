import { RgModule } from "../@core/decorators/rg-module.js";
import { MenuService } from "./service.js";

@RgModule({
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
