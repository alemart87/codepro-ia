import z from "zod"
import { EOL } from "os"
import { NamedError } from "@codepro-ai/util/error"

export namespace UI {
  const LOGO = [
    [`      o   o    `, ` .d8888b.   .d88b.  8888888b.  8888888888 8888888b.  8888888b.   .d88b.  `],
    [`       \\_/     `, `d88P  Y88b d88""88b 888  "Y88b 888        888   Y88b 888   Y88b d88""88b `],
    [`      (o o)    `, `888    888 888  888 888    888 888        888    888 888    888 888  888 `],
    [`     (  v  )   `, `888        888  888 888    888 8888888    888   d88P 888   d88P 888  888 `],
    [`      \\   /    `, `888        888  888 888    888 888        8888888P"  8888888P"  888  888 `],
    [`      |   |    `, `888    888 888  888 888    888 888        888        888 T88b   888  888 `],
    [`      | O |    `, `Y88b  d88P Y88..88P 888  .d88P 888        888        888  T88b  Y88..88P `],
    [`      |   |    `, ` "Y8888P"   "Y88P"  8888888P"  8888888888 888        888   T88b  "Y88P"  `],
  ]

  export const CancelledError = NamedError.create("UICancelledError", z.void())

  export const Style = {
    TEXT_HIGHLIGHT: "\x1b[96m",
    TEXT_HIGHLIGHT_BOLD: "\x1b[96m\x1b[1m",
    TEXT_DIM: "\x1b[90m",
    TEXT_DIM_BOLD: "\x1b[90m\x1b[1m",
    TEXT_NORMAL: "\x1b[0m",
    TEXT_NORMAL_BOLD: "\x1b[1m",
    TEXT_WARNING: "\x1b[93m",
    TEXT_WARNING_BOLD: "\x1b[93m\x1b[1m",
    TEXT_DANGER: "\x1b[91m",
    TEXT_DANGER_BOLD: "\x1b[91m\x1b[1m",
    TEXT_SUCCESS: "\x1b[92m",
    TEXT_SUCCESS_BOLD: "\x1b[92m\x1b[1m",
    TEXT_INFO: "\x1b[94m",
    TEXT_INFO_BOLD: "\x1b[94m\x1b[1m",
  }

  export function println(...message: string[]) {
    print(...message)
    Bun.stderr.write(EOL)
  }

  export function print(...message: string[]) {
    blank = false
    Bun.stderr.write(message.join(" "))
  }

  let blank = false
  export function empty() {
    if (blank) return
    println("" + Style.TEXT_NORMAL)
    blank = true
  }

  export function logo(pad?: string) {
    const result = []
    for (const row of LOGO) {
      if (pad) result.push(pad)
      result.push(Bun.color("gray", "ansi"))
      result.push(row[0])
      result.push("\x1b[0m")
      result.push(row[1])
      result.push(EOL)
    }
    return result.join("").trimEnd()
  }

  export async function input(prompt: string): Promise<string> {
    const readline = require("readline")
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    return new Promise((resolve) => {
      rl.question(prompt, (answer: string) => {
        rl.close()
        resolve(answer.trim())
      })
    })
  }

  export function error(message: string) {
    println(Style.TEXT_DANGER_BOLD + "Error: " + Style.TEXT_NORMAL + message)
  }

  export function markdown(text: string): string {
    return text
  }
}
