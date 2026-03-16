"use strict";
(self["webpackChunkmobile_app"] = self["webpackChunkmobile_app"] || []).push([["apps_mobile-app_src_app_pages_onboarding_nivel_onboarding-nivel_page_ts"],{

/***/ 6627:
/*!*********************************************************************************!*\
  !*** ./apps/mobile-app/src/app/pages/onboarding/nivel/onboarding-nivel.page.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OnboardingNivelPage: () => (/* binding */ OnboardingNivelPage)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular/standalone */ 1347);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_onboarding_state_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/onboarding-state.service */ 1021);






function OnboardingNivelPage_div_8_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u2713");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function OnboardingNivelPage_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function OnboardingNivelPage_div_8_Template_div_click_0_listener() {
      const n_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.selected = n_r2.value);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 7)(4, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, OnboardingNivelPage_div_8_span_8_Template, 2, 0, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const n_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("selected", ctx_r2.selected === n_r2.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](n_r2.emoji);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](n_r2.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](n_r2.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.selected === n_r2.value);
  }
}
const NIVELES = [{
  value: 'nuevo',
  label: 'Nuevo',
  description: 'Estoy empezando mis primeras clases',
  emoji: '🌱'
}, {
  value: 'iniciacion',
  label: 'Iniciación',
  description: 'Tengo las bases, salgo con apoyo',
  emoji: '📚'
}, {
  value: 'social_comodo',
  label: 'Social cómodo',
  description: 'Me manejo bien en la pista',
  emoji: '😎'
}, {
  value: 'intermedio',
  label: 'Intermedio',
  description: 'Aplico técnica y combos variados',
  emoji: '⚡'
}, {
  value: 'avanzado',
  label: 'Avanzado',
  description: 'Nivel alto, bailo con solvencia',
  emoji: '🏆'
}];
class OnboardingNivelPage {
  constructor(router, state) {
    this.router = router;
    this.state = state;
    this.niveles = NIVELES;
    this.selected = null;
    this.selected = this.state.get().nivel;
  }
  next() {
    if (!this.selected) return;
    this.state.set({
      nivel: this.selected
    });
    this.router.navigate(['/onboarding/estilos']);
  }
  static {
    this.ɵfac = function OnboardingNivelPage_Factory(t) {
      return new (t || OnboardingNivelPage)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_onboarding_state_service__WEBPACK_IMPORTED_MODULE_0__.OnboardingStateService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: OnboardingNivelPage,
      selectors: [["app-onboarding-nivel"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
      decls: 11,
      vars: 2,
      consts: [["value", "0.75", "color", "secondary"], [1, "ion-padding"], [1, "question"], ["class", "nivel-card", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["expand", "block", 2, "margin-top", "24px", 3, "click", "disabled"], [1, "nivel-card", 3, "click"], [2, "font-size", "28px", "line-height", "1", "flex-shrink", "0"], [2, "flex", "1"], [1, "nivel-label"], [1, "nivel-desc"], ["class", "check", 4, "ngIf"], [1, "check"]],
      template: function OnboardingNivelPage_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Paso 3 de 4 \u2014 Tu nivel");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "ion-progress-bar", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "ion-content", 1)(6, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "\u00BFC\u00F3mo describes tu nivel?");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, OnboardingNivelPage_div_8_Template, 9, 6, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "ion-button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function OnboardingNivelPage_Template_ion_button_click_9_listener() {
            return ctx.next();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, " Siguiente ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.niveles);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.selected);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonProgressBar],
      styles: [".question[_ngcontent-%COMP%] {\n      font-size: 22px;\n      font-weight: 700;\n      color: var(--lgui-text-4);\n      margin-bottom: 24px;\n    }\n    .nivel-card[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: var(--lgui-gap-md);\n      padding: var(--lgui-pad-sm) var(--lgui-pad-md);\n      border-radius: var(--lgui-radius-default);\n      border: 2px solid var(--lgui-border-3);\n      margin-bottom: var(--lgui-gap-sm);\n      cursor: pointer;\n      background: var(--lgui-surface-1);\n      transition: border-color 0.15s, background 0.15s, transform 0.1s;\n    }\n    .nivel-card[_ngcontent-%COMP%]:active {\n      transform: scale(0.98);\n    }\n    .nivel-card.selected[_ngcontent-%COMP%] {\n      border-color: var(--ion-color-primary);\n      background: var(--lgui-red-100, rgba(232, 72, 85, 0.06));\n    }\n    .nivel-label[_ngcontent-%COMP%] {\n      font-size: 15px;\n      font-weight: 600;\n      color: var(--lgui-text-4);\n    }\n    .nivel-card.selected[_ngcontent-%COMP%]   .nivel-label[_ngcontent-%COMP%] {\n      color: var(--ion-color-primary);\n    }\n    .nivel-desc[_ngcontent-%COMP%] {\n      font-size: 12px;\n      color: var(--lgui-text-4);\n      margin-top: 2px;\n    }\n    .check[_ngcontent-%COMP%] {\n      font-size: 20px;\n      color: var(--ion-color-primary);\n      flex-shrink: 0;\n    }\n  \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9uYm9hcmRpbmctbml2ZWwucGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0lBQ0k7TUFDRSxlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLHlCQUF5QjtNQUN6QixtQkFBbUI7SUFDckI7SUFDQTtNQUNFLGFBQWE7TUFDYixtQkFBbUI7TUFDbkIsdUJBQXVCO01BQ3ZCLDhDQUE4QztNQUM5Qyx5Q0FBeUM7TUFDekMsc0NBQXNDO01BQ3RDLGlDQUFpQztNQUNqQyxlQUFlO01BQ2YsaUNBQWlDO01BQ2pDLGdFQUFnRTtJQUNsRTtJQUNBO01BQ0Usc0JBQXNCO0lBQ3hCO0lBQ0E7TUFDRSxzQ0FBc0M7TUFDdEMsd0RBQXdEO0lBQzFEO0lBQ0E7TUFDRSxlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLHlCQUF5QjtJQUMzQjtJQUNBO01BQ0UsK0JBQStCO0lBQ2pDO0lBQ0E7TUFDRSxlQUFlO01BQ2YseUJBQXlCO01BQ3pCLGVBQWU7SUFDakI7SUFDQTtNQUNFLGVBQWU7TUFDZiwrQkFBK0I7TUFDL0IsY0FBYztJQUNoQiIsImZpbGUiOiJvbmJvYXJkaW5nLW5pdmVsLnBhZ2UudHMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAucXVlc3Rpb24ge1xuICAgICAgZm9udC1zaXplOiAyMnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1sZ3VpLXRleHQtNCk7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICAgIH1cbiAgICAubml2ZWwtY2FyZCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogdmFyKC0tbGd1aS1nYXAtbWQpO1xuICAgICAgcGFkZGluZzogdmFyKC0tbGd1aS1wYWQtc20pIHZhcigtLWxndWktcGFkLW1kKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWxndWktcmFkaXVzLWRlZmF1bHQpO1xuICAgICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tbGd1aS1ib3JkZXItMyk7XG4gICAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1sZ3VpLWdhcC1zbSk7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1sZ3VpLXN1cmZhY2UtMSk7XG4gICAgICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4xNXMsIGJhY2tncm91bmQgMC4xNXMsIHRyYW5zZm9ybSAwLjFzO1xuICAgIH1cbiAgICAubml2ZWwtY2FyZDphY3RpdmUge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk4KTtcbiAgICB9XG4gICAgLm5pdmVsLWNhcmQuc2VsZWN0ZWQge1xuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1sZ3VpLXJlZC0xMDAsIHJnYmEoMjMyLCA3MiwgODUsIDAuMDYpKTtcbiAgICB9XG4gICAgLm5pdmVsLWxhYmVsIHtcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogdmFyKC0tbGd1aS10ZXh0LTQpO1xuICAgIH1cbiAgICAubml2ZWwtY2FyZC5zZWxlY3RlZCAubml2ZWwtbGFiZWwge1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICB9XG4gICAgLm5pdmVsLWRlc2Mge1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgY29sb3I6IHZhcigtLWxndWktdGV4dC00KTtcbiAgICAgIG1hcmdpbi10b3A6IDJweDtcbiAgICB9XG4gICAgLmNoZWNrIHtcbiAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICBmbGV4LXNocmluazogMDtcbiAgICB9XG4gICJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2FwcHMvbW9iaWxlLWFwcC9zcmMvYXBwL3BhZ2VzL29uYm9hcmRpbmcvbml2ZWwvb25ib2FyZGluZy1uaXZlbC5wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7SUFDSTtNQUNFLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIseUJBQXlCO01BQ3pCLG1CQUFtQjtJQUNyQjtJQUNBO01BQ0UsYUFBYTtNQUNiLG1CQUFtQjtNQUNuQix1QkFBdUI7TUFDdkIsOENBQThDO01BQzlDLHlDQUF5QztNQUN6QyxzQ0FBc0M7TUFDdEMsaUNBQWlDO01BQ2pDLGVBQWU7TUFDZixpQ0FBaUM7TUFDakMsZ0VBQWdFO0lBQ2xFO0lBQ0E7TUFDRSxzQkFBc0I7SUFDeEI7SUFDQTtNQUNFLHNDQUFzQztNQUN0Qyx3REFBd0Q7SUFDMUQ7SUFDQTtNQUNFLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIseUJBQXlCO0lBQzNCO0lBQ0E7TUFDRSwrQkFBK0I7SUFDakM7SUFDQTtNQUNFLGVBQWU7TUFDZix5QkFBeUI7TUFDekIsZUFBZTtJQUNqQjtJQUNBO01BQ0UsZUFBZTtNQUNmLCtCQUErQjtNQUMvQixjQUFjO0lBQ2hCOztBQUVKLGcxRUFBZzFFIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgLnF1ZXN0aW9uIHtcbiAgICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBjb2xvcjogdmFyKC0tbGd1aS10ZXh0LTQpO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMjRweDtcbiAgICB9XG4gICAgLm5pdmVsLWNhcmQge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IHZhcigtLWxndWktZ2FwLW1kKTtcbiAgICAgIHBhZGRpbmc6IHZhcigtLWxndWktcGFkLXNtKSB2YXIoLS1sZ3VpLXBhZC1tZCk7XG4gICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1sZ3VpLXJhZGl1cy1kZWZhdWx0KTtcbiAgICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWxndWktYm9yZGVyLTMpO1xuICAgICAgbWFyZ2luLWJvdHRvbTogdmFyKC0tbGd1aS1nYXAtc20pO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tbGd1aS1zdXJmYWNlLTEpO1xuICAgICAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMTVzLCBiYWNrZ3JvdW5kIDAuMTVzLCB0cmFuc2Zvcm0gMC4xcztcbiAgICB9XG4gICAgLm5pdmVsLWNhcmQ6YWN0aXZlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC45OCk7XG4gICAgfVxuICAgIC5uaXZlbC1jYXJkLnNlbGVjdGVkIHtcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tbGd1aS1yZWQtMTAwLCByZ2JhKDIzMiwgNzIsIDg1LCAwLjA2KSk7XG4gICAgfVxuICAgIC5uaXZlbC1sYWJlbCB7XG4gICAgICBmb250LXNpemU6IDE1cHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHZhcigtLWxndWktdGV4dC00KTtcbiAgICB9XG4gICAgLm5pdmVsLWNhcmQuc2VsZWN0ZWQgLm5pdmVsLWxhYmVsIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgfVxuICAgIC5uaXZlbC1kZXNjIHtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGNvbG9yOiB2YXIoLS1sZ3VpLXRleHQtNCk7XG4gICAgICBtYXJnaW4tdG9wOiAycHg7XG4gICAgfVxuICAgIC5jaGVjayB7XG4gICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=apps_mobile-app_src_app_pages_onboarding_nivel_onboarding-nivel_page_ts.js.map