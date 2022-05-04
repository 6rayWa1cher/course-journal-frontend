const isLetter = (c: string) =>
  c.toLowerCase() !== c.toUpperCase() ||
  (c.length > 0 && (c.codePointAt(0) as number) > 127);

export const getFirstCapitalSymbols = (str: string, n = 3) =>
  str
    .split("")
    .map((c) => (isLetter(c) ? c : " "))
    .join("")
    .split(" ")
    .filter((s) => s !== "")
    .map((s) => s[0].toUpperCase())
    .slice(0, n)
    .join("");
