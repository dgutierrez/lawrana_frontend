import { animate, state, style, transition, trigger } from '@angular/animations';

export const ListaPessoaAnimationTrigger = trigger('destacaUsuario', [
  state('default', style(
    {

      //backgroundColor: 'blue'
    }
  )),
  state('destacado', style({
    //backgroundColor: 'red',
    border: '2px solid #B2B6FF',
    textColor: 'yellow',
    foreColor: 'purple',
    filter: 'brightness(92%)'
  })),
  transition('default => destacado', [
    animate('200ms ease-out', style({
      transform: 'scale(1.02)'
    })),
    animate(200)
  ])
])
