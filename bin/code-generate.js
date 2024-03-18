const { existsSync, writeFileSync, mkdirSync } = require("fs");
const { join, basename } = require("path");
const { API_SERVERS } = require("../config");
const { argv, cwd } = process;
const [, , type, url, output, filename = type] = argv;

const firstUpper = (s = "") => s.slice(0, 1).toUpperCase() + s.slice(1);
const firstLower = (s = "") => s.slice(0, 1).toLocaleLowerCase() + s.slice(1);
const className = (s = "") =>
  `Api` + firstUpper(s).replace(/[^\w](\w)/g, (_, v) => v.toUpperCase());

async function main(type, url, output, filename = type) {
  if (!type) throw "No find type in argument";

  if (!url) throw "No find url in argument";

  if (!output) throw "No find output directory in argument";

  if (!filename) throw "No find filename in argument";

  const OUTPUT_DIR = join(cwd(), output);

  if (!existsSync(OUTPUT_DIR)) {
    try {
      mkdirSync(join(OUTPUT_DIR, "types"), { recursive: true });
    } catch (e) {
      throw "Cant create output dir";
    }
  }

  const { servers, paths, components } = await fetch(url).then((e) => e.json());

  if (!paths || !components) throw "Unknow json format!";

  const { schemas } = components;

  if (!schemas) throw "Unknow json format!";

  /**
   * @type {Map<string, string>}
   */
  const outputSchemas = new Map();

  console.log("Generate components...");
  for (const name in schemas) {
    const scheme = schemas[name];

    if ("enum" in scheme) {
      const enumNabes = scheme["x-enumNames"] ?? "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const enumBody = scheme["enum"]
        .map((e, i) => "  " + enumNabes[i] + " = " + JSON.stringify(e) + ",")
        .join("\n");

      outputSchemas.set(
        name,
        `enum ${name} {\n${enumBody}\n}\n\nexport default ${name};`
      );
      continue;
    }

    if ("properties" in scheme && scheme["type"] == "object") {
      const { properties, required } = scheme;
      const imports = new Set();

      const typeConvert = ({ ["$ref"]: ref, type, items, nullable }) => {
        ref = basename(ref ?? "any");
        if (ref != "any") imports.add(ref);

        if (type === "integer") type = "number";

        if (type === "array") type = `${typeConvert(items)}[]`;

        if (nullable) return `(${type ?? ref} | null)`;

        return type ?? ref;
      };

      const interfaceBody = Object.entries(properties)
        .map(([name, { description, readOnly, ...item }]) => {
          const isRequired = !required || required.indexOf(name) !== -1;
          let pre = "";
          if (description) pre = `  /** @description ${description} */\n`;

          return `${pre}  ${readOnly ? "readonly " : ""}${name}${
            isRequired ? "" : "?"
          }: ${typeConvert(item)};`;
        })
        .join("\n\n");

      const importsString = [...imports]
        .map((e) => `import ${e} from "./${e}";`)
        .join("\n");

      outputSchemas.set(
        name,
        `${
          importsString ? `${importsString}\n\n` : ""
        }export default interface ${name} {\n${interfaceBody}\n}`
      );
      continue;
    }
  }

  for (const [name, body] of outputSchemas) {
    console.log(`Writing ${name}.ts`);
    writeFileSync(join(OUTPUT_DIR, "types", name + ".ts"), body);
  }

  /** @type {Set<string>} */
  const imports = new Set();
  /** @type {string[]} */
  const bodySegments = [];

  const classTemplate = (body = "") => {
    let importString = [...imports]
      .map(
        (e, i, d, [n, nn = n, nnn = ""] = e.split(":")) =>
          `import ${n} from "${nn[0] == "@" ? nn : `./types/${nn}`}";${nnn}`
      )
      .join("\n");
    return `${
      importString ? importString + "\n\n" : ""
    }export class ${className(filename)} {\n${body}\n}`;
  };

  const typeConvert = (input) => {
    if (!input) return "void";
    let { ["$ref"]: ref, type, items, nullable, properties, format } = input;
    ref = basename(ref ?? "any");
    if (ref != "any") imports.add(ref);

    if (type === "string" && format === "date-time") type = "Date";

    if (type === "integer") type = "number";

    if (type === "array") type = `${typeConvert(items)}[]`;

    if (type === "object")
      type =
        "{ " +
        Object.entries(properties)
          .map(([name, value]) => {
            return `${name}: ${typeConvert(value)};`;
          })
          .join(" ") +
        " }";

    if (nullable) return `(${type ?? ref} | null)`;

    return type ?? ref;
  };

  const writeFile = () => {
    writeFileSync(
      join(OUTPUT_DIR, filename + ".ts"),
      classTemplate(
        bodySegments
          .join("\n\n")
          .split("\n")
          .map((e) => "  " + e)
          .join("\n")
      )
    );
  };

  if (type === "rest-url") {
    bodySegments.push(
      `#baseUrl = '';`,
      "get baseUrl() { return this.#baseUrl; }",
      `constructor(baseUrl = '') {\n  this.#baseUrl = baseUrl;\n}`,
      "" +
        "urlWithParams(url: string, params: any) {\n" +
        "  const paramString = Object.entries(params)\n" +
        "    .map(([name, value]) => `${name}=${value}`)\n" +
        "    .join('&')\n\n" +
        "  return url + (paramString ? `?${paramString}` : ``);\n" +
        "}",
      `private join(...paths: string[]) {\n  return paths.join('/').replace(/\\/+/g, '/');\n}`
    );

    for (const path in paths) {
      for (const method in paths[path]) {
        const settings = paths[path][method];
        let {
          parameters,
          requestBody,
          summary = "",
          description = "",
        } = settings;
        const name = basename(path);
        const params = [];
        const meta = [];

        summary = summary.trim();
        description = description.trim();

        if (parameters) {
          const typeSegments = [];

          for (const { name, schema } of parameters)
            typeSegments.push(`${name}: ${typeConvert(schema)};`);

          let typeString = typeSegments.length
            ? `{ ${typeSegments.join(" ")} }`
            : "any";

          params.push(`params: ${typeString}`);
        }

        const body = (
          "" +
          "return " +
          (parameters
            ? `this.join(this.#baseUrl, this.urlWithParams("${path}", params))`
            : `this.join(this.#baseUrl, "${path}")`) +
          ";\n"
        )
          .split("\n")
          .map((e) => "  " + e)
          .join("\n");

        let m = `${method}${firstUpper(name)}URL(${params.join(
          ", "
        )}) {\n${body}\n}`;

        if (summary) meta.push(`@summary ${summary}`);
        if (description) meta.push(`@description ${description}`);

        if (meta.length) {
          m = `/**\n` + meta.map((e) => "* " + e).join("\n") + "\n*/\n" + m;
        }

        bodySegments.push(m);
      }
    }

    return writeFile();
  }

  // if (type === "rest") {
  //   bodySegments.push(
  //     `#baseUrl = '';`,
  //     "get baseUrl() { return this.#baseUrl; }",
  //     `constructor(baseUrl = '') {\n  this.#baseUrl = baseUrl;\n}`,
  //     "" +
  //       "urlWithParams(url: string, params: any) {\n" +
  //       "  const paramString = Object.entries(params)\n" +
  //       "    .map(([name, value]) => `${name}=${value}`)\n" +
  //       "    .join('&')\n\n" +
  //       "  return url + (paramString ? `?${paramString}` : ``);\n" +
  //       "}",
  //     `private join(...paths: string[]) {\n  return paths.join('/').replace(/\\/+/g, '/');\n}`
  //   );

  //   for (const path in paths) {
  //     for (const method in paths[path]) {
  //       const settings = paths[path][method];
  //       let {
  //         parameters,
  //         requestBody,
  //         summary = "",
  //         description = "",
  //       } = settings;
  //       const name = basename(path);
  //       const params = [];
  //       const meta = [];

  //       summary = summary.trim();
  //       description = description.trim();

  //       if (parameters) {
  //         const typeSegments = [];

  //         for (const { name, schema } of parameters)
  //           typeSegments.push(`${name}: ${typeConvert(schema)};`);

  //         let typeString = typeSegments.length
  //           ? `{ ${typeSegments.join(" ")} }`
  //           : "any";

  //         params.push(`params: ${typeString}`);
  //       }

  //       const preBody = [];
  //       const paramsBody = [];

  //       if (requestBody) {
  //         const { content } = requestBody;
  //         const { schema } =
  //           content["multipart/form-data"] || content["application/json"];

  //         if ("multipart/form-data" in content) {
  //           preBody.push("const form = new FormData();\n");
  //           preBody.push("for(const name in body)");
  //           preBody.push(
  //             "  form.append(name, body[name as keyof typeof body]);"
  //           );

  //           paramsBody.push(`body: form`);
  //         } else {
  //           paramsBody.push(`headers: { 'Content-Type': 'application/json' }`);
  //           paramsBody.push(`body: JSON.stringify(body)`);
  //         }

  //         params.push(`body: ${typeConvert(schema)}`);
  //       }

  //       const prebodyString = preBody.map((e) => e).join("\n");
  //       const paramsBodyString = paramsBody.map((e) => "  " + e).join(",\n");

  //       const outputType =
  //         settings?.responses?.[200]?.content?.["application/json"]?.["schema"];

  //       const body = (
  //         "" +
  //         (prebodyString ? prebodyString + "\n\n" : "") +
  //         "return fetch(\n" +
  //         (parameters
  //           ? `  this.join(this.#baseUrl, this.urlWithParams("${path}", params))`
  //           : `  this.join(this.#baseUrl, "${path}")`) +
  //         ", {\n" +
  //         `  method: "${method.toUpperCase()}",\n` +
  //         (paramsBodyString ? paramsBodyString + "\n" : "") +
  //         `}).then(e => e.json()) as Promise<${typeConvert(outputType)}>;`
  //       )
  //         .split("\n")
  //         .map((e) => "  " + e)
  //         .join("\n");

  //       let m = `async ${method}${firstUpper(name)}(${params.join(
  //         ", "
  //       )}) {\n${body}\n}`;

  //       if (summary) meta.push(`@summary ${summary}`);
  //       if (description) meta.push(`@description ${description}`);

  //       if (meta.length) {
  //         m = `/**\n` + meta.map((e) => "* " + e).join("\n") + "\n*/\n" + m;
  //       }

  //       bodySegments.push(m);
  //     }
  //   }

  //   return writeFile();
  // }

  if (type === "s-server") {
    imports.add("{ HubConnection }:@microsoft/signalr:\n");

    bodySegments.push(
      `#hub!: HubConnection;`,
      "get hub() { return this.#hub; }",
      `constructor(hub: HubConnection) {\n  this.#hub = hub;\n}`
    );

    for (const path in paths) {
      for (const method in paths[path]) {
        const settings = paths[path][method];
        let {
          parameters,
          requestBody,
          summary = "",
          description = "",
        } = settings;
        const name = basename(path);
        const params = [];
        const meta = [];

        summary = summary.trim();
        description = description.trim();

        if (parameters) {
          const typeSegments = [];

          for (let { name, schema, description = "" } of parameters) {
            description = description.trim();
            if (description)
              meta.push(
                `@param {${typeConvert(schema)}} ${name} ${description}`
              );

            typeSegments.push(`${name}: ${typeConvert(schema)}`);
          }

          let typeString = typeSegments.length
            ? `[${typeSegments.join(", ")}]`
            : "any";

          params.push(`...args: ${typeString}`);
        }

        const outputType =
          settings?.responses?.[200]?.content?.["application/json"]?.["schema"];

        const body = (
          "" +
          `return this.#hub.invoke<${typeConvert(outputType)}>('${name}'${
            parameters ? ", ...args" : ""
          });`
        )
          .split("\n")
          .map((e) => "  " + e)
          .join("\n");

        let m = `async ${firstLower(name)}(${params.join(", ")}) {\n${body}\n}`;

        if (summary) meta.push(`@summary ${summary}`);
        if (description) meta.push(`@description ${description}`);

        if (meta.length) {
          m = `/**\n` + meta.map((e) => "* " + e).join("\n") + "\n*/\n" + m;
        }

        bodySegments.push(m);
      }
    }

    return writeFile();
  }

  if (type === "s-client") {
    imports.add("{ HubConnection }:@microsoft/signalr:\n");

    bodySegments.push(
      `#hub!: HubConnection;`,
      "get hub() { return this.#hub; }",
      `constructor(hub: HubConnection) {\n  this.#hub = hub;\n}`
    );

    for (const path in paths) {
      for (const method in paths[path]) {
        const settings = paths[path][method];
        let {
          parameters,
          requestBody,
          summary = "",
          description = "",
        } = settings;
        const name = basename(path);
        const params = [];
        const meta = [];

        summary = summary.trim();
        description = description.trim();

        if (parameters) {
          const typeSegments = [];

          for (let { name, schema, description = "" } of parameters) {
            description = description.trim();
            if (description)
              meta.push(
                `@param {${typeConvert(schema)}} ${name} ${description}`
              );

            typeSegments.push(`${name}: ${typeConvert(schema)}`);
          }

          let typeString = typeSegments.length
            ? `[${typeSegments.join(", ")}]`
            : "any";

          params.push(`listener: (...args: ${typeString}) => any`);
        } else {
          params.push(`listener: () => void`);
        }

        const outputType =
          settings?.responses?.[200]?.content?.["application/json"]?.["schema"];

        const body = (
          "" +
          `this.#hub.on('${name}', listener);\n` +
          `return () => { this.#hub.off('${name}', listener); };`
        )
          .split("\n")
          .map((e) => "  " + e)
          .join("\n");

        let m = `on${firstUpper(name)}(${params.join(", ")}) {\n${body}\n}`;

        if (summary) meta.push(`@summary ${summary}`);
        if (description) meta.push(`@description ${description}`);

        if (meta.length) {
          m = `/**\n` + meta.map((e) => "* " + e).join("\n") + "\n*/\n" + m;
        }

        bodySegments.push(m);
      }
    }

    return writeFile();
  }

  throw "Unknow type in argument";
}

if (argv.length > 2) main(...argv.slice(2)).catch(console.error);
else {
  for (const { type, url, output, name } of API_SERVERS) {
    main(type, url, output, filename)
      .then(() => console.log("Done"))
      .catch(console.error);
  }
}
