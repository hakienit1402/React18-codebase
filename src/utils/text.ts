//  kebab-case -> camelCase
function kebabToCamel(kebab: string): string {
  return kebab.replace(/-./g, (match) => match.charAt(1).toUpperCase());
}

//  kebab-case -> PascalCase
function kebabToPascal(kebab: string): string {
  return kebab
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

//  kebab-case -> snake_case
function kebabToSnake(kebab: string): string {
  return kebab.replace(/-/g, "_");
}

//  kebab-case -> Title Case
function kebabToTitleCase(kebab: string): string {
  return kebab
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

//  camelCase -> kebab-case
function camelToKebab(camel: string): string {
  return camel.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

//  camelCase -> PascalCase
function camelToPascal(camel: string): string {
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

//  camelCase -> snake_case
function camelToSnake(camel: string): string {
  return camel.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}

//  camelCase -> Title Case
function camelToTitleCase(camel: string): string {
  return camel.replace(/([A-Z])/g, " $1").replace(/^./, (match) => match.toUpperCase());
}

//  PascalCase -> kebab-case
function pascalToKebab(pascal: string): string {
  return pascal.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

//  PascalCase -> camelCase
function pascalToCamel(pascal: string): string {
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

//  PascalCase -> snake_case
function pascalToSnake(pascal: string): string {
  return pascal.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}

//  PascalCase -> Title Case
function pascalToTitleCase(pascal: string): string {
  return pascal.replace(/([A-Z])/g, " $1").replace(/^./, (match) => match.toUpperCase());
}

//  snake_case -> kebab-case
function snakeToKebab(snake: string): string {
  return snake.replace(/_/g, "-");
}

//  snake_case -> camelCase
function snakeToCamel(snake: string): string {
  return snake.replace(/_./g, (match) => match.charAt(1).toUpperCase());
}

//  snake_case -> PascalCase
function snakeToPascal(snake: string): string {
  return snake
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

//  snake_case -> Title Case
function snakeToTitleCase(snake: string): string {
  return snake
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

//  Title Case -> kebab-case
function titleToKebab(title: string): string {
  return title.replace(/\s+/g, "-").toLowerCase();
}

//  Title Case -> camelCase
function titleToCamel(title: string): string {
  return title.toLowerCase().replace(/\s+(.)/g, (match) => match.charAt(1).toUpperCase());
}

//  Title Case -> PascalCase
function titleToPascal(title: string): string {
  return title
    .replace(/\s+(.)/g, (match) => match.charAt(1).toUpperCase())
    .replace(/^./, (match) => match.toUpperCase());
}

//  Title Case -> snake_case
function titleToSnake(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "_");
}

export {
  kebabToCamel,
  kebabToPascal,
  kebabToSnake,
  kebabToTitleCase,
  camelToKebab,
  camelToPascal,
  camelToSnake,
  camelToTitleCase,
  pascalToKebab,
  pascalToCamel,
  pascalToSnake,
  pascalToTitleCase,
  snakeToKebab,
  snakeToCamel,
  snakeToPascal,
  snakeToTitleCase,
  titleToKebab,
  titleToCamel,
  titleToPascal,
  titleToSnake,
};
