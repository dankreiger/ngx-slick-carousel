/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isPlatformBrowser } from '@angular/common';
import { Component, Directive, ElementRef, EventEmitter, forwardRef, Host, Inject, Input, NgZone, Output, PLATFORM_ID } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 * Slick component
 */
export class SlickCarouselComponent {
    /**
     * Constructor
     * @param {?} el
     * @param {?} zone
     */
    constructor(el, zone) {
        this.el = el;
        this.zone = zone;
        this.afterChange = new EventEmitter();
        this.beforeChange = new EventEmitter();
        this.breakpoint = new EventEmitter();
        this.destroy = new EventEmitter();
        this.init = new EventEmitter();
        this.slides = [];
        this.initialized = false;
        this._removedSlides = [];
        this._addedSlides = [];
    }
    /**
     * On component destroy
     * @return {?}
     */
    ngOnDestroy() {
        this.unslick();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.ngAfterViewChecked();
    }
    /**
     * On component view checked
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this._addedSlides.length > 0 || this._removedSlides.length > 0) {
            /** @type {?} */
            const nextSlidesLength = this.slides.length - this._removedSlides.length + this._addedSlides.length;
            if (!this.initialized) {
                if (nextSlidesLength > 0) {
                    this.initSlick();
                }
                // if nextSlidesLength is zere, do nothing
            }
            else if (nextSlidesLength === 0) { // unslick case
                this.unslick();
            }
            else {
                this._addedSlides.forEach((/**
                 * @param {?} slickItem
                 * @return {?}
                 */
                slickItem => {
                    this.slides.push(slickItem);
                    this.zone.runOutsideAngular((/**
                     * @return {?}
                     */
                    () => {
                        this.$instance.slick('slickAdd', slickItem.el.nativeElement);
                    }));
                }));
                this._addedSlides = [];
                this._removedSlides.forEach((/**
                 * @param {?} slickItem
                 * @return {?}
                 */
                slickItem => {
                    /** @type {?} */
                    const idx = this.slides.indexOf(slickItem);
                    this.slides = this.slides.filter((/**
                     * @param {?} s
                     * @return {?}
                     */
                    s => s !== slickItem));
                    this.zone.runOutsideAngular((/**
                     * @return {?}
                     */
                    () => {
                        this.$instance.slick('slickRemove', idx);
                    }));
                }));
                this._removedSlides = [];
            }
        }
    }
    /**
     * init slick
     * @return {?}
     */
    initSlick() {
        this.slides = this._addedSlides;
        this._addedSlides = [];
        this._removedSlides = [];
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.$instance = jQuery(this.el.nativeElement);
            this.$instance.on('init', (/**
             * @param {?} event
             * @param {?} slick
             * @return {?}
             */
            (event, slick) => {
                this.zone.run((/**
                 * @return {?}
                 */
                () => {
                    this.init.emit({ event, slick });
                }));
            }));
            this.$instance.slick(this.config);
            this.zone.run((/**
             * @return {?}
             */
            () => {
                this.initialized = true;
                this.currentIndex = (this.config && this.config.initialSlide) ? this.config.initialSlide : 0;
            }));
            this.$instance.on('afterChange', (/**
             * @param {?} event
             * @param {?} slick
             * @param {?} currentSlide
             * @return {?}
             */
            (event, slick, currentSlide) => {
                this.zone.run((/**
                 * @return {?}
                 */
                () => {
                    this.afterChange.emit({ event, slick, currentSlide });
                    this.currentIndex = currentSlide;
                }));
            }));
            this.$instance.on('beforeChange', (/**
             * @param {?} event
             * @param {?} slick
             * @param {?} currentSlide
             * @param {?} nextSlide
             * @return {?}
             */
            (event, slick, currentSlide, nextSlide) => {
                this.zone.run((/**
                 * @return {?}
                 */
                () => {
                    this.beforeChange.emit({ event, slick, currentSlide, nextSlide });
                }));
            }));
            this.$instance.on('breakpoint', (/**
             * @param {?} event
             * @param {?} slick
             * @param {?} breakpoint
             * @return {?}
             */
            (event, slick, breakpoint) => {
                this.zone.run((/**
                 * @return {?}
                 */
                () => {
                    this.breakpoint.emit({ event, slick, breakpoint });
                }));
            }));
            this.$instance.on('destroy', (/**
             * @param {?} event
             * @param {?} slick
             * @return {?}
             */
            (event, slick) => {
                this.zone.run((/**
                 * @return {?}
                 */
                () => {
                    this.destroy.emit({ event, slick });
                    this.initialized = false;
                }));
            }));
        }));
    }
    /**
     * @param {?} slickItem
     * @return {?}
     */
    addSlide(slickItem) {
        this._addedSlides.push(slickItem);
    }
    /**
     * @param {?} slickItem
     * @return {?}
     */
    removeSlide(slickItem) {
        this._removedSlides.push(slickItem);
    }
    /**
     * Slick Method
     * @param {?} index
     * @return {?}
     */
    slickGoTo(index) {
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.$instance.slick('slickGoTo', index);
        }));
    }
    /**
     * @return {?}
     */
    slickNext() {
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.$instance.slick('slickNext');
        }));
    }
    /**
     * @return {?}
     */
    slickPrev() {
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.$instance.slick('slickPrev');
        }));
    }
    /**
     * @return {?}
     */
    slickPause() {
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.$instance.slick('slickPause');
        }));
    }
    /**
     * @return {?}
     */
    slickPlay() {
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.$instance.slick('slickPlay');
        }));
    }
    /**
     * @return {?}
     */
    unslick() {
        if (this.$instance) {
            this.zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                this.$instance.slick('unslick');
            }));
            this.$instance = undefined;
        }
        this.initialized = false;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['config'].previousValue !== changes['config'].currentValue && changes['config'].currentValue !== undefined) {
            if (this.initialized) {
                /** @type {?} */
                const refresh = changes['config'].currentValue['refresh'];
                /** @type {?} */
                const newOptions = Object.assign({}, changes['config'].currentValue);
                delete newOptions['refresh'];
                this.zone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => {
                    this.$instance.slick('slickSetOption', newOptions, refresh);
                }));
            }
        }
    }
}
SlickCarouselComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-slick-carousel',
                exportAs: 'slick-carousel',
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => SlickCarouselComponent)),
                        multi: true
                    }],
                template: '<ng-content></ng-content>'
            }] }
];
/** @nocollapse */
SlickCarouselComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
SlickCarouselComponent.propDecorators = {
    config: [{ type: Input }],
    afterChange: [{ type: Output }],
    beforeChange: [{ type: Output }],
    breakpoint: [{ type: Output }],
    destroy: [{ type: Output }],
    init: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    SlickCarouselComponent.prototype.config;
    /** @type {?} */
    SlickCarouselComponent.prototype.afterChange;
    /** @type {?} */
    SlickCarouselComponent.prototype.beforeChange;
    /** @type {?} */
    SlickCarouselComponent.prototype.breakpoint;
    /** @type {?} */
    SlickCarouselComponent.prototype.destroy;
    /** @type {?} */
    SlickCarouselComponent.prototype.init;
    /** @type {?} */
    SlickCarouselComponent.prototype.$instance;
    /** @type {?} */
    SlickCarouselComponent.prototype.currentIndex;
    /** @type {?} */
    SlickCarouselComponent.prototype.slides;
    /** @type {?} */
    SlickCarouselComponent.prototype.initialized;
    /**
     * @type {?}
     * @private
     */
    SlickCarouselComponent.prototype._removedSlides;
    /**
     * @type {?}
     * @private
     */
    SlickCarouselComponent.prototype._addedSlides;
    /**
     * @type {?}
     * @private
     */
    SlickCarouselComponent.prototype.el;
    /**
     * @type {?}
     * @private
     */
    SlickCarouselComponent.prototype.zone;
}
export class SlickItemDirective {
    /**
     * @param {?} el
     * @param {?} platformId
     * @param {?} carousel
     */
    constructor(el, platformId, carousel) {
        this.el = el;
        this.platformId = platformId;
        this.carousel = carousel;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.carousel.addSlide(this);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId)) {
            this.carousel.removeSlide(this);
        }
    }
}
SlickItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxSlickItem]',
            },] }
];
/** @nocollapse */
SlickItemDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: SlickCarouselComponent, decorators: [{ type: Host }] }
];
if (false) {
    /** @type {?} */
    SlickItemDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    SlickItemDirective.prototype.platformId;
    /**
     * @type {?}
     * @private
     */
    SlickItemDirective.prototype.carousel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNsaWNrLWNhcm91c2VsLyIsInNvdXJjZXMiOlsic2xpY2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBR0gsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixJQUFJLEVBQ0osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBSU4sTUFBTSxFQUNOLFdBQVcsRUFFZCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQWlCakQsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7O0lBbUIvQixZQUFvQixFQUFjLEVBQ2QsSUFBWTtRQURaLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBakJ0QixnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BELGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25ELFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoRCxTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFJaEQsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUNuQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNuQixtQkFBYyxHQUF5QixFQUFFLENBQUM7UUFDMUMsaUJBQVksR0FBeUIsRUFBRSxDQUFDO0lBUWhELENBQUM7Ozs7O0lBS0QsV0FBVztRQUNQLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7O0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBS0Qsa0JBQWtCO1FBQ2QsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztrQkFDMUQsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNO1lBQ25HLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNuQixJQUFJLGdCQUFnQixHQUFHLENBQUMsRUFBRTtvQkFDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2lCQUNwQjtnQkFDRCwwQ0FBMEM7YUFDN0M7aUJBQU0sSUFBSSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsRUFBRSxlQUFlO2dCQUNoRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDbEI7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPOzs7O2dCQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUI7OztvQkFBQyxHQUFHLEVBQUU7d0JBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNqRSxDQUFDLEVBQUMsQ0FBQztnQkFDUCxDQUFDLEVBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztnQkFFdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPOzs7O2dCQUFDLFNBQVMsQ0FBQyxFQUFFOzswQkFDOUIsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07Ozs7b0JBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFDLENBQUM7b0JBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCOzs7b0JBQUMsR0FBRyxFQUFFO3dCQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQzdDLENBQUMsRUFBQyxDQUFDO2dCQUNQLENBQUMsRUFBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO2FBQzVCO1NBQ0o7SUFDTCxDQUFDOzs7OztJQUtELFNBQVM7UUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUI7OztRQUFDLEdBQUcsRUFBRTtZQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRS9DLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU07Ozs7O1lBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRzs7O2dCQUFDLEdBQUcsRUFBRTtvQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLEVBQUMsQ0FBQztZQUNQLENBQUMsRUFBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWxDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRzs7O1lBQUMsR0FBRyxFQUFFO2dCQUNmLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUV4QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pHLENBQUMsRUFBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsYUFBYTs7Ozs7O1lBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxFQUFFO2dCQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7OztnQkFBQyxHQUFHLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBQyxDQUFDLENBQUM7b0JBQ3BELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO2dCQUNyQyxDQUFDLEVBQUMsQ0FBQztZQUNQLENBQUMsRUFBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsY0FBYzs7Ozs7OztZQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLEVBQUU7Z0JBQ3hFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRzs7O2dCQUFDLEdBQUcsRUFBRTtvQkFDZixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7Z0JBQ3BFLENBQUMsRUFBQyxDQUFDO1lBQ1AsQ0FBQyxFQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxZQUFZOzs7Ozs7WUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUU7Z0JBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRzs7O2dCQUFDLEdBQUcsRUFBRTtvQkFDZixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztnQkFDckQsQ0FBQyxFQUFDLENBQUM7WUFDUCxDQUFDLEVBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVM7Ozs7O1lBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRzs7O2dCQUFDLEdBQUcsRUFBRTtvQkFDZixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO29CQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDN0IsQ0FBQyxFQUFDLENBQUM7WUFDUCxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsU0FBNkI7UUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsU0FBNkI7UUFDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7Ozs7O0lBS00sU0FBUyxDQUFDLEtBQWE7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUI7OztRQUFDLEdBQUcsRUFBRTtZQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRU0sU0FBUztRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCOzs7UUFBQyxHQUFHLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRU0sU0FBUztRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCOzs7UUFBQyxHQUFHLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRU0sVUFBVTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCOzs7UUFBQyxHQUFHLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRU0sU0FBUztRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCOzs7UUFBQyxHQUFHLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRU0sT0FBTztRQUNWLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQjs7O1lBQUMsR0FBRyxFQUFFO2dCQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwQyxDQUFDLEVBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxLQUFLLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7WUFDcEgsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFOztzQkFDWixPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7O3NCQUNuRCxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQztnQkFDcEUsT0FBTyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRTdCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCOzs7Z0JBQUMsR0FBRyxFQUFFO29CQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ2hFLENBQUMsRUFBQyxDQUFDO2FBQ047U0FDSjtJQUNMLENBQUM7OztZQWxNSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsU0FBUyxFQUFFLENBQUM7d0JBQ1IsT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVU7Ozt3QkFBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBc0IsRUFBQzt3QkFDckQsS0FBSyxFQUFFLElBQUk7cUJBQ2QsQ0FBQztnQkFDRixRQUFRLEVBQUUsMkJBQTJCO2FBQ3hDOzs7O1lBOUJHLFVBQVU7WUFNVixNQUFNOzs7cUJBMkJMLEtBQUs7MEJBQ0wsTUFBTTsyQkFDTixNQUFNO3lCQUNOLE1BQU07c0JBQ04sTUFBTTttQkFDTixNQUFNOzs7O0lBTFAsd0NBQXFCOztJQUNyQiw2Q0FBOEQ7O0lBQzlELDhDQUErRDs7SUFDL0QsNENBQTZEOztJQUM3RCx5Q0FBMEQ7O0lBQzFELHNDQUF1RDs7SUFFdkQsMkNBQXNCOztJQUN0Qiw4Q0FBNEI7O0lBQzVCLHdDQUEwQjs7SUFDMUIsNkNBQTJCOzs7OztJQUMzQixnREFBa0Q7Ozs7O0lBQ2xELDhDQUFnRDs7Ozs7SUFLcEMsb0NBQXNCOzs7OztJQUN0QixzQ0FBb0I7O0FBMktwQyxNQUFNLE9BQU8sa0JBQWtCOzs7Ozs7SUFDM0IsWUFBbUIsRUFBYyxFQUNRLFVBQWtCLEVBQy9CLFFBQWdDO1FBRnpDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDUSxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQXdCO0lBQzVELENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEM7SUFDTCxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQzs7O1lBbkJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2FBQzdCOzs7O1lBN05HLFVBQVU7eUNBZ09HLE1BQU0sU0FBQyxXQUFXO1lBQ08sc0JBQXNCLHVCQUEvQyxJQUFJOzs7O0lBRkwsZ0NBQXFCOzs7OztJQUNyQix3Q0FBK0M7Ozs7O0lBQy9DLHNDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSG9zdCxcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBQTEFURk9STV9JRCxcbiAgICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5kZWNsYXJlIGNvbnN0IGpRdWVyeTogYW55O1xuXG4vKipcbiAqIFNsaWNrIGNvbXBvbmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1zbGljay1jYXJvdXNlbCcsXG4gICAgZXhwb3J0QXM6ICdzbGljay1jYXJvdXNlbCcsXG4gICAgcHJvdmlkZXJzOiBbe1xuICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2xpY2tDYXJvdXNlbENvbXBvbmVudCksXG4gICAgICAgIG11bHRpOiB0cnVlXG4gICAgfV0sXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgU2xpY2tDYXJvdXNlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBBZnRlclZpZXdDaGVja2VkIHtcblxuICAgIEBJbnB1dCgpIGNvbmZpZzogYW55O1xuICAgIEBPdXRwdXQoKSBhZnRlckNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGJlZm9yZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGJyZWFrcG9pbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBkZXN0cm95OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgaW5pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgJGluc3RhbmNlOiBhbnk7XG4gICAgcHVibGljIGN1cnJlbnRJbmRleDogbnVtYmVyO1xuICAgIHB1YmxpYyBzbGlkZXM6IGFueVtdID0gW107XG4gICAgcHVibGljIGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfcmVtb3ZlZFNsaWRlczogU2xpY2tJdGVtRGlyZWN0aXZlW10gPSBbXTtcbiAgICBwcml2YXRlIF9hZGRlZFNsaWRlczogU2xpY2tJdGVtRGlyZWN0aXZlW10gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT24gY29tcG9uZW50IGRlc3Ryb3lcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bnNsaWNrKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm5nQWZ0ZXJWaWV3Q2hlY2tlZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uIGNvbXBvbmVudCB2aWV3IGNoZWNrZWRcbiAgICAgKi9cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9hZGRlZFNsaWRlcy5sZW5ndGggPiAwIHx8IHRoaXMuX3JlbW92ZWRTbGlkZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgbmV4dFNsaWRlc0xlbmd0aCA9IHRoaXMuc2xpZGVzLmxlbmd0aCAtIHRoaXMuX3JlbW92ZWRTbGlkZXMubGVuZ3RoICsgdGhpcy5fYWRkZWRTbGlkZXMubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRTbGlkZXNMZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGlmIG5leHRTbGlkZXNMZW5ndGggaXMgemVyZSwgZG8gbm90aGluZ1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0U2xpZGVzTGVuZ3RoID09PSAwKSB7IC8vIHVuc2xpY2sgY2FzZVxuICAgICAgICAgICAgICAgIHRoaXMudW5zbGljaygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRlZFNsaWRlcy5mb3JFYWNoKHNsaWNrSXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVzLnB1c2goc2xpY2tJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGluc3RhbmNlLnNsaWNrKCdzbGlja0FkZCcsIHNsaWNrSXRlbS5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkZWRTbGlkZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZWRTbGlkZXMuZm9yRWFjaChzbGlja0l0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLnNsaWRlcy5pbmRleE9mKHNsaWNrSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVzID0gdGhpcy5zbGlkZXMuZmlsdGVyKHMgPT4gcyAhPT0gc2xpY2tJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGluc3RhbmNlLnNsaWNrKCdzbGlja1JlbW92ZScsIGlkeCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZWRTbGlkZXMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGluaXQgc2xpY2tcbiAgICAgKi9cbiAgICBpbml0U2xpY2soKSB7XG4gICAgICAgIHRoaXMuc2xpZGVzID0gdGhpcy5fYWRkZWRTbGlkZXM7XG4gICAgICAgIHRoaXMuX2FkZGVkU2xpZGVzID0gW107XG4gICAgICAgIHRoaXMuX3JlbW92ZWRTbGlkZXMgPSBbXTtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGluc3RhbmNlID0galF1ZXJ5KHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgICAgIHRoaXMuJGluc3RhbmNlLm9uKCdpbml0JywgKGV2ZW50LCBzbGljaykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXQuZW1pdCh7ZXZlbnQsIHNsaWNrfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy4kaW5zdGFuY2Uuc2xpY2sodGhpcy5jb25maWcpO1xuXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLmluaXRpYWxTbGlkZSkgPyB0aGlzLmNvbmZpZy5pbml0aWFsU2xpZGUgOiAwO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuJGluc3RhbmNlLm9uKCdhZnRlckNoYW5nZScsIChldmVudCwgc2xpY2ssIGN1cnJlbnRTbGlkZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFmdGVyQ2hhbmdlLmVtaXQoe2V2ZW50LCBzbGljaywgY3VycmVudFNsaWRlfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gY3VycmVudFNsaWRlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuJGluc3RhbmNlLm9uKCdiZWZvcmVDaGFuZ2UnLCAoZXZlbnQsIHNsaWNrLCBjdXJyZW50U2xpZGUsIG5leHRTbGlkZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZm9yZUNoYW5nZS5lbWl0KHtldmVudCwgc2xpY2ssIGN1cnJlbnRTbGlkZSwgbmV4dFNsaWRlfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy4kaW5zdGFuY2Uub24oJ2JyZWFrcG9pbnQnLCAoZXZlbnQsIHNsaWNrLCBicmVha3BvaW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnJlYWtwb2ludC5lbWl0KHtldmVudCwgc2xpY2ssIGJyZWFrcG9pbnR9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLiRpbnN0YW5jZS5vbignZGVzdHJveScsIChldmVudCwgc2xpY2spID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95LmVtaXQoe2V2ZW50LCBzbGlja30pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkU2xpZGUoc2xpY2tJdGVtOiBTbGlja0l0ZW1EaXJlY3RpdmUpIHtcbiAgICAgICAgdGhpcy5fYWRkZWRTbGlkZXMucHVzaChzbGlja0l0ZW0pO1xuICAgIH1cblxuICAgIHJlbW92ZVNsaWRlKHNsaWNrSXRlbTogU2xpY2tJdGVtRGlyZWN0aXZlKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZWRTbGlkZXMucHVzaChzbGlja0l0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNsaWNrIE1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBzbGlja0dvVG8oaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kaW5zdGFuY2Uuc2xpY2soJ3NsaWNrR29UbycsIGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNsaWNrTmV4dCgpIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGluc3RhbmNlLnNsaWNrKCdzbGlja05leHQnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNsaWNrUHJldigpIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGluc3RhbmNlLnNsaWNrKCdzbGlja1ByZXYnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNsaWNrUGF1c2UoKSB7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRpbnN0YW5jZS5zbGljaygnc2xpY2tQYXVzZScpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2xpY2tQbGF5KCkge1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kaW5zdGFuY2Uuc2xpY2soJ3NsaWNrUGxheScpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdW5zbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuJGluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJGluc3RhbmNlLnNsaWNrKCd1bnNsaWNrJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGluc3RhbmNlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzWydjb25maWcnXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWydjb25maWcnXS5jdXJyZW50VmFsdWUgJiYgY2hhbmdlc1snY29uZmlnJ10uY3VycmVudFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmcmVzaCA9IGNoYW5nZXNbJ2NvbmZpZyddLmN1cnJlbnRWYWx1ZVsncmVmcmVzaCddO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld09wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBjaGFuZ2VzWydjb25maWcnXS5jdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBuZXdPcHRpb25zWydyZWZyZXNoJ107XG5cbiAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRpbnN0YW5jZS5zbGljaygnc2xpY2tTZXRPcHRpb24nLCBuZXdPcHRpb25zLCByZWZyZXNoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tuZ3hTbGlja0l0ZW1dJyxcbn0pXG5leHBvcnQgY2xhc3MgU2xpY2tJdGVtRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICBASG9zdCgpIHByaXZhdGUgY2Fyb3VzZWw6IFNsaWNrQ2Fyb3VzZWxDb21wb25lbnQpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwuYWRkU2xpZGUodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwucmVtb3ZlU2xpZGUodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=