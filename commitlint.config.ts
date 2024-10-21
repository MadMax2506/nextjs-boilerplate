import { RuleConfigSeverity, type UserConfig } from "@commitlint/types"

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      noteKeywords: ["ticket"],
    },
  },
  rules: {
    "scope-enum": [RuleConfigSeverity.Error, "always", ["app", "web", "api", "package", "config"]],
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"],
    ],
    "ticket-in-footer": [RuleConfigSeverity.Error, "always"],
  },
  plugins: [
    {
      rules: {
        "ticket-in-footer": (parsed) => {
          const { notes } = parsed
          const ticketRegex = /(none|#\d+)/

          const ticketNote = notes.find((note) => note.title === "ticket")

          if (!ticketNote) {
            return [false, "A 'ticket' entry in the Footer is required! e.g. 'ticket: #1234' or 'ticket: none'"]
          }

          if (!ticketRegex.test(ticketNote.text)) {
            return [
              false,
              "Please supply either a ticket number or 'none' in the footer! e.g. 'ticket: #1234' or 'ticket: none'",
            ]
          }

          return [true]
        },
      },
    },
  ],
}

export default config
