import { ChangeDetectionStrategy, Component, model, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { isNotNullOrUndefined } from '@poc/core/base/is-notnull-or-undefined';

@Component({
  selector: 'poc-search-box',
  imports: [FormsModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent implements OnInit {
  searchTerm = model<string>();
  #search$ = toObservable(this.searchTerm).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    filter(isNotNullOrUndefined),
    takeUntilDestroyed()
  );

  search = output<string>();
  changed = output<string>();
  filter = output<void>();
  clear = output<void>();

  ngOnInit() {
    this.#search$.subscribe(value => this.changed.emit(value));
  }

  onSearch() {
    const searchTerm = this.searchTerm();
    if (searchTerm !== undefined) {
      this.search.emit(searchTerm);
    }
  }

  onClear() {
    this.searchTerm.set(undefined);
    this.clear.emit();
  }
}
