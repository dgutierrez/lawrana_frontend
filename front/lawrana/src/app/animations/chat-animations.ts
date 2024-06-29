import { animate, state, style, transition, trigger } from '@angular/animations';

export const exibeNovaMensagenTrigger = trigger('exibeMensagem', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(1000, style({
      opacity: 1
    }))
  ])
])
