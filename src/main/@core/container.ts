import { Constructor } from "./types/constructor.js";
import { RgModuleMetadata } from "./types/module-metadata.js";

export class Container {
  private modules = new Map<
    any,
    { providers: Map<any, any>; exports: any[] }
  >();
  private instances = new Map<any, any>(); // Saving instances

  addModule(
    moduleClass: Constructor,
    metadata: Pick<RgModuleMetadata, "exports" | "providers">
  ) {
    this.modules.set(moduleClass, {
      providers: new Map(),
      exports: metadata.exports || [],
    });
  }

  addProvider(moduleClass: Constructor, provider: any, instance?: any) {
    const moduleData = this.modules.get(moduleClass);
    if (moduleData) {
      moduleData.providers.set(provider, instance || provider); // We store either the class itself or the instance
    }
  }

  getProvider<T = any>(moduleClass: Constructor, token: any): T | undefined {
    const moduleData = this.modules.get(moduleClass);
    if (moduleData && moduleData.providers.has(token)) {
      return moduleData.providers.get(token);
    }
    return undefined;
  }

  getModuleExports(moduleClass: Constructor): Constructor[] {
    const moduleData = this.modules.get(moduleClass);
    return moduleData?.exports || [];
  }

  async resolve<T>(
    moduleClass: Constructor,
    token: any
  ): Promise<T | undefined> {
    const provider = this.getProvider(moduleClass, token);

    if (!provider) {
      // Let's try to find the exported provider in the imported modules
      const moduleMetadata = Reflect.getMetadata("RgModule", moduleClass);
      if (moduleMetadata?.imports) {
        for (const importedModuleClass of moduleMetadata.imports) {
          const exportedProviders = this.getModuleExports(importedModuleClass);
          if (exportedProviders.includes(token)) {
            const exportedProvider = this.getProvider(
              importedModuleClass,
              token
            );
            if (exportedProvider) {
              return this.resolve(importedModuleClass, token); // Recursively resolving the dependency
            }
          }
        }
      }

      if (!provider && token !== moduleClass) {
        throw new Error(
          `Error: Provider not found for token "${String(token)}" in module "${
            moduleClass.name
          }" or its imports.`
        );
      }

      return undefined;
    }

    // If the provider is already instantiated (singleton), return it
    if (typeof provider !== "function" && this.instances.has(token)) {
      return this.instances.get(token) as T;
    }

    // If the provider is a class, instantiate it
    if (typeof provider === "function") {
      const dependencies =
        Reflect.getMetadata("design:paramtypes", provider) || [];
      const resolvedDependencies = await Promise.all(
        dependencies.map(async (dep: any) => this.resolve(moduleClass, dep))
      );
      const instance = new provider(...resolvedDependencies);
      this.instances.set(token, instance); // Saving the instance
      return instance as T;
    }

    // If provider is a factory (not processing yet)
    // If provider is a value (return)
    return provider as T;
  }
}

export const container = new Container();
