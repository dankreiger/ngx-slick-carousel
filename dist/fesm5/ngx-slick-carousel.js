import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Component, forwardRef, ElementRef, NgZone, Input, Output, Directive, Inject, PLATFORM_ID, Host, EventEmitter, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SlickCarouselModule = /** @class */ (function () {
    function SlickCarouselModule() {
    }
    SlickCarouselModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        SlickCarouselComponent,
                        SlickItemDirective,
                    ],
                    exports: [
                        SlickCarouselComponent,
                        SlickItemDirective,
                    ]
                },] }
    ];
    return SlickCarouselModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { SlickCarouselComponent, SlickCarouselModule, SlickItemDirective };
//# sourceMappingURL=ngx-slick-carousel.js.map
