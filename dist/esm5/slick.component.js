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
var SlickCarouselComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function SlickCarouselComponent(el, zone) {
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
     */
    /**
     * On component destroy
     * @return {?}
     */
    SlickCarouselComponent.prototype.ngOnDestroy = /**
     * On component destroy
     * @return {?}
     */
    function () {
        this.unslick();
    };
    /**
     * @return {?}
     */
    SlickCarouselComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.ngAfterViewChecked();
    };
    /**
     * On component view checked
     */
    /**
     * On component view checked
     * @return {?}
     */
    SlickCarouselComponent.prototype.ngAfterViewChecked = /**
     * On component view checked
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._addedSlides.length > 0 || this._removedSlides.length > 0) {
            /** @type {?} */
            var nextSlidesLength = this.slides.length - this._removedSlides.length + this._addedSlides.length;
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
                function (slickItem) {
                    _this.slides.push(slickItem);
                    _this.zone.runOutsideAngular((/**
                     * @return {?}
                     */
                    function () {
                        _this.$instance.slick('slickAdd', slickItem.el.nativeElement);
                    }));
                }));
                this._addedSlides = [];
                this._removedSlides.forEach((/**
                 * @param {?} slickItem
                 * @return {?}
                 */
                function (slickItem) {
                    /** @type {?} */
                    var idx = _this.slides.indexOf(slickItem);
                    _this.slides = _this.slides.filter((/**
                     * @param {?} s
                     * @return {?}
                     */
                    function (s) { return s !== slickItem; }));
                    _this.zone.runOutsideAngular((/**
                     * @return {?}
                     */
                    function () {
                        _this.$instance.slick('slickRemove', idx);
                    }));
                }));
                this._removedSlides = [];
            }
        }
    };
    /**
     * init slick
     */
    /**
     * init slick
     * @return {?}
     */
    SlickCarouselComponent.prototype.initSlick = /**
     * init slick
     * @return {?}
     */
    function () {
        var _this = this;
        this.slides = this._addedSlides;
        this._addedSlides = [];
        this._removedSlides = [];
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.$instance = jQuery(_this.el.nativeElement);
            _this.$instance.on('init', (/**
             * @param {?} event
             * @param {?} slick
             * @return {?}
             */
            function (event, slick) {
                _this.zone.run((/**
                 * @return {?}
                 */
                function () {
                    _this.init.emit({ event: event, slick: slick });
                }));
            }));
            _this.$instance.slick(_this.config);
            _this.zone.run((/**
             * @return {?}
             */
            function () {
                _this.initialized = true;
                _this.currentIndex = (_this.config && _this.config.initialSlide) ? _this.config.initialSlide : 0;
            }));
            _this.$instance.on('afterChange', (/**
             * @param {?} event
             * @param {?} slick
             * @param {?} currentSlide
             * @return {?}
             */
            function (event, slick, currentSlide) {
                _this.zone.run((/**
                 * @return {?}
                 */
                function () {
                    _this.afterChange.emit({ event: event, slick: slick, currentSlide: currentSlide });
                    _this.currentIndex = currentSlide;
                }));
            }));
            _this.$instance.on('beforeChange', (/**
             * @param {?} event
             * @param {?} slick
             * @param {?} currentSlide
             * @param {?} nextSlide
             * @return {?}
             */
            function (event, slick, currentSlide, nextSlide) {
                _this.zone.run((/**
                 * @return {?}
                 */
                function () {
                    _this.beforeChange.emit({ event: event, slick: slick, currentSlide: currentSlide, nextSlide: nextSlide });
                }));
            }));
            _this.$instance.on('breakpoint', (/**
             * @param {?} event
             * @param {?} slick
             * @param {?} breakpoint
             * @return {?}
             */
            function (event, slick, breakpoint) {
                _this.zone.run((/**
                 * @return {?}
                 */
                function () {
                    _this.breakpoint.emit({ event: event, slick: slick, breakpoint: breakpoint });
                }));
            }));
            _this.$instance.on('destroy', (/**
             * @param {?} event
             * @param {?} slick
             * @return {?}
             */
            function (event, slick) {
                _this.zone.run((/**
                 * @return {?}
                 */
                function () {
                    _this.destroy.emit({ event: event, slick: slick });
                    _this.initialized = false;
                }));
            }));
        }));
    };
    /**
     * @param {?} slickItem
     * @return {?}
     */
    SlickCarouselComponent.prototype.addSlide = /**
     * @param {?} slickItem
     * @return {?}
     */
    function (slickItem) {
        this._addedSlides.push(slickItem);
    };
    /**
     * @param {?} slickItem
     * @return {?}
     */
    SlickCarouselComponent.prototype.removeSlide = /**
     * @param {?} slickItem
     * @return {?}
     */
    function (slickItem) {
        this._removedSlides.push(slickItem);
    };
    /**
     * Slick Method
     */
    /**
     * Slick Method
     * @param {?} index
     * @return {?}
     */
    SlickCarouselComponent.prototype.slickGoTo = /**
     * Slick Method
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var _this = this;
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.$instance.slick('slickGoTo', index);
        }));
    };
    /**
     * @return {?}
     */
    SlickCarouselComponent.prototype.slickNext = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.$instance.slick('slickNext');
        }));
    };
    /**
     * @return {?}
     */
    SlickCarouselComponent.prototype.slickPrev = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.$instance.slick('slickPrev');
        }));
    };
    /**
     * @return {?}
     */
    SlickCarouselComponent.prototype.slickPause = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.$instance.slick('slickPause');
        }));
    };
    /**
     * @return {?}
     */
    SlickCarouselComponent.prototype.slickPlay = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.$instance.slick('slickPlay');
        }));
    };
    /**
     * @return {?}
     */
    SlickCarouselComponent.prototype.unslick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.$instance) {
            this.zone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                _this.$instance.slick('unslick');
            }));
            this.$instance = undefined;
        }
        this.initialized = false;
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    SlickCarouselComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes['config'].previousValue !== changes['config'].currentValue && changes['config'].currentValue !== undefined) {
            if (this.initialized) {
                /** @type {?} */
                var refresh_1 = changes['config'].currentValue['refresh'];
                /** @type {?} */
                var newOptions_1 = Object.assign({}, changes['config'].currentValue);
                delete newOptions_1['refresh'];
                this.zone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () {
                    _this.$instance.slick('slickSetOption', newOptions_1, refresh_1);
                }));
            }
        }
    };
    SlickCarouselComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-slick-carousel',
                    exportAs: 'slick-carousel',
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return SlickCarouselComponent; })),
                            multi: true
                        }],
                    template: '<ng-content></ng-content>'
                }] }
    ];
    /** @nocollapse */
    SlickCarouselComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    SlickCarouselComponent.propDecorators = {
        config: [{ type: Input }],
        afterChange: [{ type: Output }],
        beforeChange: [{ type: Output }],
        breakpoint: [{ type: Output }],
        destroy: [{ type: Output }],
        init: [{ type: Output }]
    };
    return SlickCarouselComponent;
}());
export { SlickCarouselComponent };
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
var SlickItemDirective = /** @class */ (function () {
    function SlickItemDirective(el, platformId, carousel) {
        this.el = el;
        this.platformId = platformId;
        this.carousel = carousel;
    }
    /**
     * @return {?}
     */
    SlickItemDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            this.carousel.addSlide(this);
        }
    };
    /**
     * @return {?}
     */
    SlickItemDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            this.carousel.removeSlide(this);
        }
    };
    SlickItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngxSlickItem]',
                },] }
    ];
    /** @nocollapse */
    SlickItemDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: SlickCarouselComponent, decorators: [{ type: Host }] }
    ]; };
    return SlickItemDirective;
}());
export { SlickItemDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNsaWNrLWNhcm91c2VsLyIsInNvdXJjZXMiOlsic2xpY2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBR0gsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixJQUFJLEVBQ0osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBSU4sTUFBTSxFQUNOLFdBQVcsRUFFZCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQU9qRDtJQTBCSTs7T0FFRztJQUNILGdDQUFvQixFQUFjLEVBQ2QsSUFBWTtRQURaLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBakJ0QixnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BELGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25ELFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoRCxTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFJaEQsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUNuQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNuQixtQkFBYyxHQUF5QixFQUFFLENBQUM7UUFDMUMsaUJBQVksR0FBeUIsRUFBRSxDQUFDO0lBUWhELENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCw0Q0FBVzs7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7SUFFRCxnREFBZTs7O0lBQWY7UUFDSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUs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QTBEOztJQUMxRCxzQ0FBdUQ7O0lBRXZELDJDQUFzQjs7SUFDdEIsOENBQTRCOztJQUM1Qix3Q0FBMEI7O0lBQzFCLDZDQUEyQjs7Ozs7SUFDM0IsZ0RBQWtEOzs7OztJQUNsRCw4Q0FBZ0Q7Ozs7O0lBS3BDLG9DQUFzQjs7Ozs7SUFDdEIsc0NBQW9COztBQXdLcEM7SUFJSSw0QkFBbUIsRUFBYyxFQUNRLFVBQWtCLEVBQy9CLFFBQWdDO1FBRnpDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDUSxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQXdCO0lBQzVELENBQUM7Ozs7SUFFRCxxQ0FBUTs7O0lBQVI7UUFDSSxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUM7Ozs7SUFFRCx3Q0FBVzs7O0lBQVg7UUFDSSxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQztJQUNMLENBQUM7O2dCQW5CSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtpQkFDN0I7Ozs7Z0JBN05HLFVBQVU7NkNBZ09HLE1BQU0sU0FBQyxXQUFXO2dCQUNPLHNCQUFzQix1QkFBL0MsSUFBSTs7SUFjckIseUJBQUM7Q0FBQSxBQXBCRCxJQW9CQztTQWpCWSxrQkFBa0I7OztJQUNmLGdDQUFxQjs7Ozs7SUFDckIsd0NBQStDOzs7OztJQUMvQyxzQ0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlclZpZXdDaGVja2VkLFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEhvc3QsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgUExBVEZPUk1fSUQsXG4gICAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZGVjbGFyZSBjb25zdCBqUXVlcnk6IGFueTtcblxuLyoqXG4gKiBTbGljayBjb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtc2xpY2stY2Fyb3VzZWwnLFxuICAgIGV4cG9ydEFzOiAnc2xpY2stY2Fyb3VzZWwnLFxuICAgIHByb3ZpZGVyczogW3tcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNsaWNrQ2Fyb3VzZWxDb21wb25lbnQpLFxuICAgICAgICBtdWx0aTogdHJ1ZVxuICAgIH1dLFxuICAgIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG59KVxuZXhwb3J0IGNsYXNzIFNsaWNrQ2Fyb3VzZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG5cbiAgICBASW5wdXQoKSBjb25maWc6IGFueTtcbiAgICBAT3V0cHV0KCkgYWZ0ZXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBiZWZvcmVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBicmVha3BvaW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgZGVzdHJveTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGluaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljICRpbnN0YW5jZTogYW55O1xuICAgIHB1YmxpYyBjdXJyZW50SW5kZXg6IG51bWJlcjtcbiAgICBwdWJsaWMgc2xpZGVzOiBhbnlbXSA9IFtdO1xuICAgIHB1YmxpYyBpbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIHByaXZhdGUgX3JlbW92ZWRTbGlkZXM6IFNsaWNrSXRlbURpcmVjdGl2ZVtdID0gW107XG4gICAgcHJpdmF0ZSBfYWRkZWRTbGlkZXM6IFNsaWNrSXRlbURpcmVjdGl2ZVtdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uIGNvbXBvbmVudCBkZXN0cm95XG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5zbGljaygpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5uZ0FmdGVyVmlld0NoZWNrZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbiBjb21wb25lbnQgdmlldyBjaGVja2VkXG4gICAgICovXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgICAgICBpZiAodGhpcy5fYWRkZWRTbGlkZXMubGVuZ3RoID4gMCB8fCB0aGlzLl9yZW1vdmVkU2xpZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRTbGlkZXNMZW5ndGggPSB0aGlzLnNsaWRlcy5sZW5ndGggLSB0aGlzLl9yZW1vdmVkU2xpZGVzLmxlbmd0aCArIHRoaXMuX2FkZGVkU2xpZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgIGlmIChuZXh0U2xpZGVzTGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRTbGljaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiBuZXh0U2xpZGVzTGVuZ3RoIGlzIHplcmUsIGRvIG5vdGhpbmdcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dFNsaWRlc0xlbmd0aCA9PT0gMCkgeyAvLyB1bnNsaWNrIGNhc2VcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2xpY2soKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkZWRTbGlkZXMuZm9yRWFjaChzbGlja0l0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlcy5wdXNoKHNsaWNrSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRpbnN0YW5jZS5zbGljaygnc2xpY2tBZGQnLCBzbGlja0l0ZW0uZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZGVkU2xpZGVzID0gW107XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVkU2xpZGVzLmZvckVhY2goc2xpY2tJdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5zbGlkZXMuaW5kZXhPZihzbGlja0l0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlcyA9IHRoaXMuc2xpZGVzLmZpbHRlcihzID0+IHMgIT09IHNsaWNrSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRpbnN0YW5jZS5zbGljaygnc2xpY2tSZW1vdmUnLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVkU2xpZGVzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpbml0IHNsaWNrXG4gICAgICovXG4gICAgaW5pdFNsaWNrKCkge1xuICAgICAgICB0aGlzLnNsaWRlcyA9IHRoaXMuX2FkZGVkU2xpZGVzO1xuICAgICAgICB0aGlzLl9hZGRlZFNsaWRlcyA9IFtdO1xuICAgICAgICB0aGlzLl9yZW1vdmVkU2xpZGVzID0gW107XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRpbnN0YW5jZSA9IGpRdWVyeSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgICAgICB0aGlzLiRpbnN0YW5jZS5vbignaW5pdCcsIChldmVudCwgc2xpY2spID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0LmVtaXQoe2V2ZW50LCBzbGlja30pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuJGluc3RhbmNlLnNsaWNrKHRoaXMuY29uZmlnKTtcblxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9ICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5pbml0aWFsU2xpZGUpID8gdGhpcy5jb25maWcuaW5pdGlhbFNsaWRlIDogMDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLiRpbnN0YW5jZS5vbignYWZ0ZXJDaGFuZ2UnLCAoZXZlbnQsIHNsaWNrLCBjdXJyZW50U2xpZGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZnRlckNoYW5nZS5lbWl0KHtldmVudCwgc2xpY2ssIGN1cnJlbnRTbGlkZX0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IGN1cnJlbnRTbGlkZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLiRpbnN0YW5jZS5vbignYmVmb3JlQ2hhbmdlJywgKGV2ZW50LCBzbGljaywgY3VycmVudFNsaWRlLCBuZXh0U2xpZGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWZvcmVDaGFuZ2UuZW1pdCh7ZXZlbnQsIHNsaWNrLCBjdXJyZW50U2xpZGUsIG5leHRTbGlkZX0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuJGluc3RhbmNlLm9uKCdicmVha3BvaW50JywgKGV2ZW50LCBzbGljaywgYnJlYWtwb2ludCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJyZWFrcG9pbnQuZW1pdCh7ZXZlbnQsIHNsaWNrLCBicmVha3BvaW50fSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy4kaW5zdGFuY2Uub24oJ2Rlc3Ryb3knLCAoZXZlbnQsIHNsaWNrKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveS5lbWl0KHtldmVudCwgc2xpY2t9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZFNsaWRlKHNsaWNrSXRlbTogU2xpY2tJdGVtRGlyZWN0aXZlKSB7XG4gICAgICAgIHRoaXMuX2FkZGVkU2xpZGVzLnB1c2goc2xpY2tJdGVtKTtcbiAgICB9XG5cbiAgICByZW1vdmVTbGlkZShzbGlja0l0ZW06IFNsaWNrSXRlbURpcmVjdGl2ZSkge1xuICAgICAgICB0aGlzLl9yZW1vdmVkU2xpZGVzLnB1c2goc2xpY2tJdGVtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTbGljayBNZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgc2xpY2tHb1RvKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGluc3RhbmNlLnNsaWNrKCdzbGlja0dvVG8nLCBpbmRleCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzbGlja05leHQoKSB7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRpbnN0YW5jZS5zbGljaygnc2xpY2tOZXh0Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzbGlja1ByZXYoKSB7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRpbnN0YW5jZS5zbGljaygnc2xpY2tQcmV2Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzbGlja1BhdXNlKCkge1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kaW5zdGFuY2Uuc2xpY2soJ3NsaWNrUGF1c2UnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNsaWNrUGxheSgpIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGluc3RhbmNlLnNsaWNrKCdzbGlja1BsYXknKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHVuc2xpY2soKSB7XG4gICAgICAgIGlmICh0aGlzLiRpbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnN0YW5jZS5zbGljaygndW5zbGljaycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRpbnN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoY2hhbmdlc1snY29uZmlnJ10ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlc1snY29uZmlnJ10uY3VycmVudFZhbHVlICYmIGNoYW5nZXNbJ2NvbmZpZyddLmN1cnJlbnRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZnJlc2ggPSBjaGFuZ2VzWydjb25maWcnXS5jdXJyZW50VmFsdWVbJ3JlZnJlc2gnXTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgY2hhbmdlc1snY29uZmlnJ10uY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgbmV3T3B0aW9uc1sncmVmcmVzaCddO1xuXG4gICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kaW5zdGFuY2Uuc2xpY2soJ3NsaWNrU2V0T3B0aW9uJywgbmV3T3B0aW9ucywgcmVmcmVzaCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbmd4U2xpY2tJdGVtXScsXG59KVxuZXhwb3J0IGNsYXNzIFNsaWNrSXRlbURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgQEhvc3QoKSBwcml2YXRlIGNhcm91c2VsOiBTbGlja0Nhcm91c2VsQ29tcG9uZW50KSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsLmFkZFNsaWRlKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsLnJlbW92ZVNsaWRlKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19