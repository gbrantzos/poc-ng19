import { ChangeDetectionStrategy, Component, model, OnInit, output } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { isNotNullOrUndefined } from '@poc/core/base/is-notnull-or-undefined';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

type QuickSearch = {
  term: string;
  fields: readonly string[];
};
type Filter = {
  field: string;
  operator: string;
  value: string[];
};
export type SearchEvent = QuickSearch | 'CLEARED' | Filter[];

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

  search = output<SearchEvent>();
  changed = output<SearchEvent>();
  filter = output<void>();

  ngOnInit() {
    this.#search$.subscribe(value => this.changed.emit({ term: value, fields: [] }));
  }

  onSearch() {
    const searchTerm = this.searchTerm();
    if (searchTerm !== undefined) {
      this.search.emit({ term: searchTerm, fields: [] });
    }
  }

  onClear() {
    this.searchTerm.set(undefined);
    this.search.emit('CLEARED');
  }
}
