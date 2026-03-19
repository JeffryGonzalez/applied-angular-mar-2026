import { Component, ChangeDetectionStrategy, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService, type PatternKey } from '@ht/conway/game.service';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'ht-conway-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, FormsModule, NgIcon],
  template: ` <app-ui-page title="Game of Life">
    <div class="game-container">
      <header class="my-2">
        <div class="w-1/2">
          <h2>Conway's Game of Life</h2>
          <label class="input w-auto my-2">
            <span class="label w-40 flex justify-between">
              Generation: {{ game.generation() }}
              @if (game.isRunning()) {
                <span class=""> <span class="loading loading-infinity loading-xs"></span></span>
              }
            </span>
            <span class="label w-30"> Alive Cells: {{ game.aliveCellsCount() }}</span>
            <span class="label w-30"> Board Size: {{ game.boardSize() }}</span>
          </label>
        </div>
      </header>

      <div class="w-full max-w-xs tooltip" data-tip="Change Board Size">
        <input
          type="range"
          min="0"
          max="60"
          [(ngModel)]="game.boardSize"
          class="range range-xs"
          step="10"
        />

        <div class="flex justify-between px-2.5 mt-2 text-xs">
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </div>
        <div class="flex justify-between px-2.5 mt-2 text-xs">
          <span>0</span>
          <span>10</span>
          <span>20</span>
          <span>30</span>
          <span>40</span>
          <span>50</span>
          <span>60</span>
        </div>
      </div>

      <div class="flex">
        <div class="join  mr-2 my-3">
          <label class="select join-item">
            <span class="label">Load Pattern:</span>
            <select class="select select-bordered  w-30" [(ngModel)]="selectedPattern">
              @for (pattern of game.patternOptions; track pattern.key) {
                <option [value]="pattern.key">{{ pattern.label }}</option>
              }
            </select>
          </label>
          <button class="btn  btn-outline join-item" (click)="loadSelectedPattern()">Load</button>
        </div>

        <div class="join  my-3">
          <button
            class="btn btn-square btn-primary join-item"
            (click)="game.isRunning.set(!game.isRunning())"
          >
            <ng-icon size="20px" [name]="game.isRunning() ? 'lucidePause' : 'lucidePlay'"></ng-icon>
          </button>
          <button class="btn btn-primary btn-outline join-item " (click)="game.reset()">
            <ng-icon name="lucideRotateCcw" size="20px"></ng-icon> Reset
          </button>
          <button class="btn btn-primary btn-outline join-item " (click)="game.nextGeneration()">
            Step 1 Generation
            <ng-icon name="lucideArrowBigRight" size="20px"></ng-icon>
          </button>
        </div>
      </div>

      <div class="grid" [style.--board-cols]="game.board().columns">
        @for (row of game.board().cells; track $index; let r = $index) {
          @for (isAlive of row; track $index; let c = $index) {
            <div class="cell" [class.alive]="isAlive" (click)="game.toggleCell(r, c)"></div>
          }
        }
      </div>
    </div>
  </app-ui-page>`,
  styles: `
    .grid {
      display: grid;
      gap: 1px;
      background: #ccc;
      width: max-content;
      margin-top: 16px;
      grid-template-columns: repeat(var(--board-cols), 15px);
    }
    .cell {
      width: 15px;
      height: 15px;
    }
    .cell.alive {
      background: #333;
    }
    .cell:hover {
      background: #eee;
    }
  `,
})
export class HomePage {
  game = inject(GameService);
  selectedPattern: WritableSignal<PatternKey> = signal('gosperGliderGun');

  loadSelectedPattern() {
    this.game.loadPattern(this.selectedPattern());
  }
}
