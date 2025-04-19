declare module "play-sound" {
  interface PlayerOptions {
    players?: string[];
    player?: string;
  }

  interface PlayOptions {
    volume?: number;
    [key: string]: any;
  }

  interface Player {
    play: (
      filepath: string,
      options?: PlayOptions,
      callback?: (err: Error | null) => void
    ) => any;
  }

  function createPlayer(options?: PlayerOptions): Player;

  export default createPlayer;
}
