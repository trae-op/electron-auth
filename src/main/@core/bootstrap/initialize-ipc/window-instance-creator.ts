import { container } from "../../container.js";
import type { Constructor } from "../../types/constructor.js";
import type { TWindowManager } from "../../types/window-manager.js";

export async function createWindowInstance<T extends TWindowManager>(
  moduleClass: Constructor,
  windowClass: Constructor<T>
): Promise<T | undefined> {
  if (!windowClass) {
    return undefined;
  }

  const dependenciesTypes =
    Reflect.getMetadata("design:paramtypes", windowClass) || [];

  const resolvedDependencies = await Promise.all(
    dependenciesTypes.map((depType: any) =>
      container.resolve(moduleClass, depType)
    )
  );

  const windowInstance = new windowClass(...resolvedDependencies);
  return windowInstance;
}
