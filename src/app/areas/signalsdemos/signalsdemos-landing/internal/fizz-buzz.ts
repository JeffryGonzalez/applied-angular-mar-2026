import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-demos-fizz-buzz',
  imports: [],
  template: `
    <div>
      @switch (fizzBuzz()) {
        @case ('FizzBuzz') {
          <p>Fizz Buzz</p>
        }
        @case ('Fizz') {
          <p>Fizzing!</p>
        }
        @case ('Buzz') {
          <p>Buzzing</p>
        }
        @case ('none') {
          <p>Try Again!</p>
        }
        @case ('zero') {
          <p>At Zero</p>
        }
      }
    </div>
  `,
  styles: ``,
})
export class FizzBuzz {
  //   @Input() title = 'bird';
  val = input.required<number>();
  fizzBuzz = computed(() => {
    //  3 == fizz
    // 5 == buzz
    // 3 & 5 = FizBuzz
    const current = this.val();
    if (current === 0) {
      return 'zero';
    }
    if (current % 3 === 0 && current % 5 === 0) {
      return 'FizzBuzz';
    }
    if (current % 3 === 0) {
      return 'Fizz';
    }
    if (current % 5 === 0) {
      return 'Buzz';
    }
    return 'none';
  });
}
