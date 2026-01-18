import { TextAttributes, RGBA } from "@opentui/core"
import { For, type JSX } from "solid-js"
import { useTheme, tint } from "@tui/context/theme"

// Shadow markers (rendered chars in parens):
// _ = full shadow cell (space with bg=shadow)
// ^ = letter top, shadow bottom (▀ with fg=letter, bg=shadow)
// ~ = shadow top only (▀ with fg=shadow)
const SHADOW_MARKER = /[_^~]/

const LOGO_LEFT = [
  `      o   o    `,
  `       \\_/     `,
  `      (o o)    `,
  `     (  v  )   `,
  `      \\   /    `,
  `      |   |    `,
  `      | O |    `,
  `      |   |    `,
]

const LOGO_RIGHT = [
  ` .d8888b.   .d88b.  8888888b.  8888888888 8888888b.  8888888b.   .d88b.  `,
  `d88P  Y88b d88""88b 888  "Y88b 888        888   Y88b 888   Y88b d88""88b `,
  `888    888 888  888 888    888 888        888    888 888    888 888  888 `,
  `888        888  888 888    888 8888888    888   d88P 888   d88P 888  888 `,
  `888        888  888 888    888 888        8888888P"  8888888P"  888  888 `,
  `888    888 888  888 888    888 888        888        888 T88b   888  888 `,
  `Y88b  d88P Y88..88P 888  .d88P 888        888        888  T88b  Y88..88P `,
  ` "Y8888P"   "Y88P"  8888888P"  8888888888 888        888   T88b  "Y88P"  `,
]

export function Logo() {
  const { theme } = useTheme()

  const renderLine = (line: string, fg: RGBA, bold: boolean): JSX.Element[] => {
    const shadow = tint(theme.background, fg, 0.25)
    const attrs = bold ? TextAttributes.BOLD : undefined
    const elements: JSX.Element[] = []
    let i = 0

    while (i < line.length) {
      const rest = line.slice(i)
      const markerIndex = rest.search(SHADOW_MARKER)

      if (markerIndex === -1) {
        elements.push(
          <text fg={fg} attributes={attrs} selectable={false}>
            {rest}
          </text>,
        )
        break
      }

      if (markerIndex > 0) {
        elements.push(
          <text fg={fg} attributes={attrs} selectable={false}>
            {rest.slice(0, markerIndex)}
          </text>,
        )
      }

      const marker = rest[markerIndex]
      switch (marker) {
        case "_":
          elements.push(
            <text fg={fg} bg={shadow} attributes={attrs} selectable={false}>
              {" "}
            </text>,
          )
          break
        case "^":
          elements.push(
            <text fg={fg} bg={shadow} attributes={attrs} selectable={false}>
              ▀
            </text>,
          )
          break
        case "~":
          elements.push(
            <text fg={shadow} attributes={attrs} selectable={false}>
              ▀
            </text>,
          )
          break
      }

      i += markerIndex + 1
    }

    return elements
  }

  return (
    <box>
      <For each={LOGO_LEFT}>
        {(line, index) => (
          <box flexDirection="row" gap={1}>
            <box flexDirection="row">{renderLine(line, theme.textMuted, false)}</box>
            <box flexDirection="row">{renderLine(LOGO_RIGHT[index()], theme.text, true)}</box>
          </box>
        )}
      </For>
    </box>
  )
}
