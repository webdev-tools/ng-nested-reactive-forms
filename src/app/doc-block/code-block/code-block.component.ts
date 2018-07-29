import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { CodeHighlightService } from './code-highlight.service';

@Component({
  selector: 'app-code-block',
  template: `<pre class="language-{{ lang }}"><code #code class="language-{{ lang }}"></code></pre>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent implements AfterViewInit {
  @ViewChild('code') codeEl: ElementRef<HTMLElement>;

  @Input() code = '';
  @Input() lang = '';

  constructor(private codeHighlight: CodeHighlightService) {}

  ngAfterViewInit() {
    this.codeEl.nativeElement.innerHTML = this.codeHighlight.highlight(this.code, this.lang);
  }
}
