import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const sweepUpAnimation = trigger('sweepUp', [
    transition('* => *', [
        query('.product-wrapper:enter', [
            style({ opacity: 0, transform: 'translateY(50px)' }),
            stagger(100, [
                animate('0.5s', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ])
]);
