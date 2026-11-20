/**
 * One-command setup for a freshly generated invitation.
 *
 *   npm run setup
 *
 * Does only the safe, local, repeatable steps — installs dependencies and makes
 * the first commit — then prints the two commands that need something only you
 * can provide: your repository URL and your Vercel login. Every step is skipped
 * if it has already been done, so re-running is harmless.
 *
 * Uses Node builtins only, so it works before `npm install`.
 */
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

/**
 * Commands are single strings run through a shell. That is required on Windows,
 * where npm is a .cmd shim that Node refuses to spawn directly, and it avoids
 * the deprecation Node raises when an args array is combined with `shell`.
 * Every command below is a fixed literal — nothing here interpolates input.
 */
const run = (command) => spawnSync(command, { stdio: "inherit", shell: true });

const ok = (command) =>
  spawnSync(command, { stdio: "ignore", shell: true }).status === 0;

const name = JSON.parse(readFileSync("package.json", "utf8")).name;

const step = (message) => console.log(`\n\x1b[36m▸ ${message}\x1b[0m`);
const skip = (message) => console.log(`\x1b[90m  ${message}\x1b[0m`);
const fail = (message) => {
  console.error(`\n\x1b[31m✖ ${message}\x1b[0m\n`);
  process.exit(1);
};

if (!ok("git --version")) {
  fail("git is not installed. Install it from https://git-scm.com and re-run.");
}

step("Installing dependencies");
if (existsSync("node_modules")) {
  skip("node_modules already present — skipping.");
} else if (run("npm install").status !== 0) {
  fail("npm install failed. Scroll up for the reason.");
}

step("Creating the first commit");
if (existsSync(".git")) {
  skip("Already a git repository — skipping.");
} else {
  // Never stage without a .gitignore that excludes node_modules: `git add -A`
  // would otherwise commit the entire dependency tree.
  const ignoresDeps =
    existsSync(".gitignore") &&
    readFileSync(".gitignore", "utf8").includes("node_modules");

  if (!ignoresDeps) {
    fail(
      ".gitignore is missing or does not exclude node_modules. Refusing to " +
        "stage files, as that would commit thousands of dependency files.",
    );
  }

  const committed =
    run("git init -b main").status === 0 &&
    run("git add -A").status === 0 &&
    run('git commit -m "Wedding invitation"').status === 0;

  if (!committed) {
    fail(
      "Could not create the first commit. If git asked you to set user.name " +
        "and user.email, run those two commands and then re-run npm run setup.",
    );
  }
}

console.log("\n\x1b[32m✔ Local setup is done.\x1b[0m\n");
console.log("Next, publish it:\n");

if (ok("git remote get-url origin")) {
  console.log("  git push -u origin main");
} else if (ok("gh --version")) {
  console.log("  \x1b[1mGitHub CLI detected — creates the repo and pushes:\x1b[0m");
  console.log(`  gh repo create ${name} --private --source=. --push`);
} else {
  console.log("  1. Create an empty repository on github.com (no README).");
  console.log("  2. Then:\n");
  console.log(`     git remote add origin https://github.com/<you>/${name}.git`);
  console.log("     git push -u origin main");
}

console.log("\nThen deploy — either import the repo at https://vercel.com/new,");
console.log("or run:\n");
console.log("  npm run deploy\n");
console.log("\x1b[90mThe first `npm run deploy` asks you to log in to Vercel.\x1b[0m");
console.log("\x1b[90mThis site needs no environment variables.\x1b[0m\n");
