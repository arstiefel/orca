import {
  keybindingMatchesAction,
  type KeybindingActionId,
  type KeybindingInput,
  type KeybindingOverrides
} from '../../../../shared/keybindings'

export type NativeChatSplitDirection = 'right' | 'down'

export type NativeChatSplitShortcut = {
  direction: NativeChatSplitDirection
  opensTerminal: boolean
}

const SPLIT_SHORTCUTS: readonly [KeybindingActionId, NativeChatSplitShortcut][] = [
  ['terminal.splitRight', { direction: 'right', opensTerminal: false }],
  ['terminal.splitDown', { direction: 'down', opensTerminal: false }],
  ['chat.splitTerminalRight', { direction: 'right', opensTerminal: true }],
  ['chat.splitTerminalDown', { direction: 'down', opensTerminal: true }]
]

export function matchNativeChatSplitShortcut(
  input: KeybindingInput,
  platform: NodeJS.Platform,
  keybindings: KeybindingOverrides
): NativeChatSplitShortcut | null {
  const match = SPLIT_SHORTCUTS.find(([actionId]) =>
    keybindingMatchesAction(actionId, input, platform, keybindings)
  )
  return match?.[1] ?? null
}
