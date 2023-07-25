export const enum PLAYER_WIN {
    DEFAULT = "",
    WIN = "win",
    LOSE = "lose",
    
}

export type playerWinType = typeof PLAYER_WIN[keyof typeof PLAYER_WIN];