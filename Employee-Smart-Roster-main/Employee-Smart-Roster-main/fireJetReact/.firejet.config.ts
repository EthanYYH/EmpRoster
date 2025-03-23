import { FJ } from "@firejet/cli";

const config: FJ.FireJetConfig = {
  groups: {
    default: {
      components: {
        Login: {
          defaultExport: true,
          path: "src/components/Login.tsx",
          exportName: "Login",
          structure: {
            type: "component",
            name: "Login",
            children: [],
            props: {},
          },
        },
      },
      globalCss: ["./styles.css"],
      postcssPath: "./postcss.config.js",
    },
  },
};

export default config;
