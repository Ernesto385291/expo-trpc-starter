#!/usr/bin/env node

/**
 * Reset the starter to a blank Expo Router app.
 *
 * The script can move the current src directory to /example/src before creating
 * a fresh src/app/index.tsx and src/app/_layout.tsx. It is intentionally
 * interactive because it can remove application code.
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const root = process.cwd();
const exampleDir = "example";
const oldDirs = ["src"];
const newAppDir = "src/app";
const exampleDirPath = path.join(root, exampleDir);

const indexContent = `import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function moveOrDeleteDirectories(userInput) {
  try {
    if (userInput === "y") {
      await fs.promises.mkdir(exampleDirPath, { recursive: true });
      console.log(`Created /${exampleDir}.`);
    }

    for (const dir of oldDirs) {
      const oldDirPath = path.join(root, dir);

      if (!fs.existsSync(oldDirPath)) {
        console.log(`/${dir} does not exist, skipping.`);
        continue;
      }

      if (userInput === "y") {
        const newDirPath = path.join(root, exampleDir, dir);
        await fs.promises.rm(newDirPath, { recursive: true, force: true });
        await fs.promises.rename(oldDirPath, newDirPath);
        console.log(`Moved /${dir} to /${exampleDir}/${dir}.`);
      } else {
        await fs.promises.rm(oldDirPath, { recursive: true, force: true });
        console.log(`Deleted /${dir}.`);
      }
    }

    const newAppDirPath = path.join(root, newAppDir);
    await fs.promises.mkdir(newAppDirPath, { recursive: true });
    await fs.promises.writeFile(path.join(newAppDirPath, "index.tsx"), indexContent);
    await fs.promises.writeFile(path.join(newAppDirPath, "_layout.tsx"), layoutContent);

    console.log("\nProject reset complete.");
    console.log("Next steps:");
    console.log("1. Run `bun run start`.");
    console.log("2. Edit `src/app/index.tsx`.");
    console.log("3. Keep route files in `src/app` and shared app code outside it.");
  } catch (error) {
    console.error(`Error during reset: ${error.message}`);
    process.exitCode = 1;
  }
}

rl.question(
  "Move existing src to /example before creating a blank app? (Y/n): ",
  (answer) => {
    const userInput = answer.trim().toLowerCase() || "y";

    if (userInput !== "y" && userInput !== "n") {
      console.log("Invalid input. Please enter Y or n.");
      rl.close();
      process.exitCode = 1;
      return;
    }

    moveOrDeleteDirectories(userInput).finally(() => rl.close());
  }
);
