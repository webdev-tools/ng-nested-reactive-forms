import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-doc-block',
  templateUrl: './doc-block.component.html',
})
export class DocBlockComponent {
  @Input() demoTitle: string;
  @Input() component: string;
  @Input() demo: string;
  @Input() snippets: Object;
}
