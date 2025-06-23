import { container } from "../container.js";
import { Constructor } from "../types/constructor.js";
import { RgModuleMetadata } from "../types/module-metadata.js";

export async function registerProviders(
  moduleClass: Constructor,
  metadata: RgModuleMetadata
): Promise<void> {
  if (metadata.providers) {
    for (const providerClass of metadata.providers) {
      container.addProvider(moduleClass, providerClass);
    }
  }
}
