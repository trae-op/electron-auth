import { container } from "../container.js";
import type { Constructor } from "../types/constructor.js";

export async function instantiateModule(
  moduleClass: Constructor
): Promise<any> {
  const paramTypes = Reflect.getMetadata("design:paramtypes", moduleClass);
  const dependencies = (paramTypes || []) as any[];
  const resolvedDependencies = await Promise.all(
    dependencies.map(async (dependency) => {
      return container.resolve(moduleClass, dependency);
    })
  );
  return new moduleClass(...resolvedDependencies);
}
