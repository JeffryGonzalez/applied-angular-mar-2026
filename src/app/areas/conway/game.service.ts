import { computed, effect, Injectable, linkedSignal, signal } from '@angular/core';

type CellPoint = readonly [row: number, column: number];

export type PatternKey = 'glider' | 'pulsar' | 'gosperGliderGun';

interface PatternPreset {
  readonly minSize: number;
  readonly width: number;
  readonly height: number;
  readonly cells: readonly CellPoint[];
}

export interface PatternOption {
  readonly key: PatternKey;
  readonly label: string;
}

const gliderPreset: PatternPreset = {
  minSize: 20,
  width: 3,
  height: 3,
  cells: [
    [0, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
};

const pulsarPreset: PatternPreset = {
  minSize: 25,
  width: 13,
  height: 13,
  cells: [
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 8],
    [0, 9],
    [0, 10],
    [2, 0],
    [2, 5],
    [2, 7],
    [2, 12],
    [3, 0],
    [3, 5],
    [3, 7],
    [3, 12],
    [4, 0],
    [4, 5],
    [4, 7],
    [4, 12],
    [5, 2],
    [5, 3],
    [5, 4],
    [5, 8],
    [5, 9],
    [5, 10],
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 8],
    [7, 9],
    [7, 10],
    [8, 0],
    [8, 5],
    [8, 7],
    [8, 12],
    [9, 0],
    [9, 5],
    [9, 7],
    [9, 12],
    [10, 0],
    [10, 5],
    [10, 7],
    [10, 12],
    [12, 2],
    [12, 3],
    [12, 4],
    [12, 8],
    [12, 9],
    [12, 10],
  ],
};

const gosperGliderGunPreset: PatternPreset = {
  minSize: 50,
  width: 36,
  height: 9,
  cells: [
    [0, 24],
    [1, 22],
    [1, 24],
    [2, 12],
    [2, 13],
    [2, 20],
    [2, 21],
    [2, 34],
    [2, 35],
    [3, 11],
    [3, 15],
    [3, 20],
    [3, 21],
    [3, 34],
    [3, 35],
    [4, 0],
    [4, 1],
    [4, 10],
    [4, 16],
    [4, 20],
    [4, 21],
    [5, 0],
    [5, 1],
    [5, 10],
    [5, 14],
    [5, 16],
    [5, 17],
    [5, 22],
    [5, 24],
    [6, 10],
    [6, 16],
    [6, 24],
    [7, 11],
    [7, 15],
    [8, 12],
    [8, 13],
  ],
};

const patternPresets: Record<PatternKey, PatternPreset> = {
  glider: gliderPreset,
  pulsar: pulsarPreset,
  gosperGliderGun: gosperGliderGunPreset,
};

const patternOptions: readonly PatternOption[] = [
  { key: 'glider', label: 'Glider' },
  { key: 'pulsar', label: 'Pulsar' },
  { key: 'gosperGliderGun', label: 'Glider Gun' },
];

@Injectable({
  providedIn: 'root',
})
export class GameService {
  readonly patternOptions = patternOptions;

  boardSize = signal<number>(30);
  isRunning = signal<boolean>(false);
  //   generation = signal<number>(0);

  board = linkedSignal<GameBoard>(() => {
    // this.generation.set(0);
    return GameBoard.createEmpty(this.boardSize());
  });

  generation = linkedSignal({
    source: this.boardSize,
    computation: () => 0,
  });

  aliveCellsCount = computed(() => {
    return this.board()
      .cells.flat()
      .filter((isAlive) => isAlive).length;
  });

  loop = effect((onCleanup) => {
    if (this.isRunning()) {
      const interval = setInterval(() => this.nextGeneration(), 160);
      onCleanup(() => clearInterval(interval));
    }
  });

  toggleCell(row: number, column: number) {
    this.board.update((b) => b.toggleCell(row, column));
  }

  nextGeneration() {
    this.board.update((currentBoard) => currentBoard.computeNextGeneration());
    this.generation.update((g) => g + 1);
  }

  changeBoardSize(newSize: number) {
    this.isRunning.set(false);
    this.boardSize.set(newSize);
  }

  reset() {
    this.isRunning.set(false);
    this.boardSize.set(30);
    this.board.set(GameBoard.createEmpty(30));
    this.generation.set(0);
  }

  loadPattern(patternKey: PatternKey) {
    this.applyPattern(patternPresets[patternKey]);
  }

  private applyPattern(pattern: PatternPreset) {
    const size = Math.max(this.boardSize(), pattern.minSize);
    const rowOffset = Math.floor((size - pattern.height) / 2);
    const columnOffset = Math.floor((size - pattern.width) / 2);
    const centeredCells = pattern.cells.map(
      ([row, column]) => [row + rowOffset, column + columnOffset] as const,
    );

    this.isRunning.set(false);
    this.boardSize.set(size);
    this.board.set(GameBoard.fromAliveCells(size, centeredCells));
    this.generation.set(0);
  }
}

export class GameBoard {
  constructor(public readonly cells: boolean[][]) {}

  get rows(): number {
    return this.cells.length;
  }

  get columns(): number {
    return this.cells[0]?.length ?? 0;
  }

  static createEmpty(size: number): GameBoard {
    const cells = Array.from({ length: size }, () => Array.from({ length: size }, () => false));
    return new GameBoard(cells);
  }

  static fromAliveCells(size: number, aliveCells: readonly CellPoint[]): GameBoard {
    const cells = Array.from({ length: size }, () => Array.from({ length: size }, () => false));
    for (const [row, column] of aliveCells) {
      if (row >= 0 && row < size && column >= 0 && column < size) {
        cells[row][column] = true;
      }
    }
    return new GameBoard(cells);
  }

  toggleCell(row: number, column: number): GameBoard {
    const newCells = this.cells.map((r) => [...r]);
    newCells[row][column] = !newCells[row][column];
    return new GameBoard(newCells);
  }

  computeNextGeneration(): GameBoard {
    const newCells = this.cells.map((rowArr, r) =>
      rowArr.map((isAlive, c) => {
        const neighbors = this.countNeighbors(r, c);
        if (isAlive && (neighbors < 2 || neighbors > 3)) return false;
        if (!isAlive && neighbors === 3) return true;
        return isAlive;
      }),
    );
    return new GameBoard(newCells);
  }

  private countNeighbors(row: number, column: number): number {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const newRow = row + dr;
        const newCol = column + dc;
        if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.columns) {
          if (this.cells[newRow][newCol]) count++;
        }
      }
    }
    return count;
  }
}
