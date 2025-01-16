import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { CustomerStore } from '@poc/features/customers/data/customer.store';
import { JsonPipe } from '@angular/common';
import { TitleComponent } from '@poc/shared/components/title/title.component';
import { ToolbarComponent } from '@poc/shared/components/toolbar/toolbar.component';

@Component({
  selector: 'poc-customers',
  imports: [JsonPipe, TitleComponent, ToolbarComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'p-3' }
})
export class CustomersComponent implements OnInit {
  #store = inject(CustomerStore);

  items = this.#store.listItems;
  loading = this.#store.loading;
  _ = effect(() => {
    const error = this.#store.error();
    if (error) {
      alert(error);
    }
  });

  ngOnInit(): void {
    this.#store.find();
  }
}
