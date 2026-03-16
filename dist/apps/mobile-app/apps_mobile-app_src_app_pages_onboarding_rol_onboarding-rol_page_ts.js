"use strict";
(self["webpackChunkmobile_app"] = self["webpackChunkmobile_app"] || []).push([["apps_mobile-app_src_app_pages_onboarding_rol_onboarding-rol_page_ts"],{

/***/ 1309:
/*!*****************************************************************************!*\
  !*** ./apps/mobile-app/src/app/pages/onboarding/rol/onboarding-rol.page.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OnboardingRolPage: () => (/* binding */ OnboardingRolPage)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular/standalone */ 1347);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_onboarding_state_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/onboarding-state.service */ 1021);






function OnboardingRolPage_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function OnboardingRolPage_div_8_Template_div_click_0_listener() {
      const r_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.selected = r_r2.value);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div")(4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const r_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("selected", ctx_r2.selected === r_r2.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](r_r2.emoji);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](r_r2.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](r_r2.description);
  }
}
const ROLES = [{
  value: 'leader',
  label: 'Leader',
  description: 'Llevo el compás en pista',
  emoji: '🕺'
}, {
  value: 'follower',
  label: 'Follower',
  description: 'Me dejo llevar por el ritmo',
  emoji: '💃'
}, {
  value: 'switch',
  label: 'Switch',
  description: 'Bailo ambos roles con soltura',
  emoji: '🔄'
}];
class OnboardingRolPage {
  constructor(router, state) {
    this.router = router;
    this.state = state;
    this.roles = ROLES;
    this.selected = null;
    this.selected = this.state.get().rol;
  }
  next() {
    if (!this.selected) return;
    this.state.set({
      rol: this.selected
    });
    this.router.navigate(['/onboarding/nivel']);
  }
  static {
    this.ɵfac = function OnboardingRolPage_Factory(t) {
      return new (t || OnboardingRolPage)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_onboarding_state_service__WEBPACK_IMPORTED_MODULE_0__.OnboardingStateService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: OnboardingRolPage,
      selectors: [["app-onboarding-rol"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
      decls: 11,
      vars: 2,
      consts: [["value", "0.5", "color", "secondary"], [1, "ion-padding"], [1, "question"], ["class", "role-card", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["expand", "block", 2, "margin-top", "24px", 3, "click", "disabled"], [1, "role-card", 3, "click"], [1, "role-emoji"], [1, "role-label"], [1, "role-desc"]],
      template: function OnboardingRolPage_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Paso 2 de 4 \u2014 Tu rol");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "ion-progress-bar", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "ion-content", 1)(6, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "\u00BFQu\u00E9 rol bailas?");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, OnboardingRolPage_div_8_Template, 8, 5, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "ion-button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function OnboardingRolPage_Template_ion_button_click_9_listener() {
            return ctx.next();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, " Siguiente ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.roles);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.selected);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonProgressBar],
      styles: [".question[_ngcontent-%COMP%] {\n      font-size: 22px;\n      font-weight: 700;\n      color: var(--lgui-text-4);\n      margin-bottom: 24px;\n    }\n    .role-card[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: var(--lgui-gap-lg);\n      padding: var(--lgui-pad-sm) var(--lgui-pad-md);\n      border-radius: var(--lgui-radius-default);\n      border: 2px solid var(--lgui-border-3);\n      margin-bottom: var(--lgui-gap-sm);\n      cursor: pointer;\n      background: var(--lgui-surface-1);\n      transition: border-color 0.15s, background 0.15s, transform 0.1s;\n    }\n    .role-card[_ngcontent-%COMP%]:active {\n      transform: scale(0.98);\n    }\n    .role-card.selected[_ngcontent-%COMP%] {\n      border-color: var(--ion-color-primary);\n      background: var(--ion-color-primary);\n      color: #fff;\n    }\n    .role-emoji[_ngcontent-%COMP%] {\n      font-size: 36px;\n      line-height: 1;\n      flex-shrink: 0;\n    }\n    .role-label[_ngcontent-%COMP%] {\n      font-size: 17px;\n      font-weight: 600;\n      color: var(--lgui-text-4);\n    }\n    .role-card.selected[_ngcontent-%COMP%]   .role-label[_ngcontent-%COMP%] { color: #fff; }\n    .role-desc[_ngcontent-%COMP%] {\n      font-size: 13px;\n      margin-top: 2px;\n      color: var(--lgui-text-3);\n    }\n    .role-card.selected[_ngcontent-%COMP%]   .role-desc[_ngcontent-%COMP%] { color: rgba(255,255,255,0.78); }\n  \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9uYm9hcmRpbmctcm9sLnBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtJQUNJO01BQ0UsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQix5QkFBeUI7TUFDekIsbUJBQW1CO0lBQ3JCO0lBQ0E7TUFDRSxhQUFhO01BQ2IsbUJBQW1CO01BQ25CLHVCQUF1QjtNQUN2Qiw4Q0FBOEM7TUFDOUMseUNBQXlDO01BQ3pDLHNDQUFzQztNQUN0QyxpQ0FBaUM7TUFDakMsZUFBZTtNQUNmLGlDQUFpQztNQUNqQyxnRUFBZ0U7SUFDbEU7SUFDQTtNQUNFLHNCQUFzQjtJQUN4QjtJQUNBO01BQ0Usc0NBQXNDO01BQ3RDLG9DQUFvQztNQUNwQyxXQUFXO0lBQ2I7SUFDQTtNQUNFLGVBQWU7TUFDZixjQUFjO01BQ2QsY0FBYztJQUNoQjtJQUNBO01BQ0UsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQix5QkFBeUI7SUFDM0I7SUFDQSxrQ0FBa0MsV0FBVyxFQUFFO0lBQy9DO01BQ0UsZUFBZTtNQUNmLGVBQWU7TUFDZix5QkFBeUI7SUFDM0I7SUFDQSxpQ0FBaUMsNkJBQTZCLEVBQUUiLCJmaWxlIjoib25ib2FyZGluZy1yb2wucGFnZS50cyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIC5xdWVzdGlvbiB7XG4gICAgICBmb250LXNpemU6IDIycHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgY29sb3I6IHZhcigtLWxndWktdGV4dC00KTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gICAgfVxuICAgIC5yb2xlLWNhcmQge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IHZhcigtLWxndWktZ2FwLWxnKTtcbiAgICAgIHBhZGRpbmc6IHZhcigtLWxndWktcGFkLXNtKSB2YXIoLS1sZ3VpLXBhZC1tZCk7XG4gICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1sZ3VpLXJhZGl1cy1kZWZhdWx0KTtcbiAgICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWxndWktYm9yZGVyLTMpO1xuICAgICAgbWFyZ2luLWJvdHRvbTogdmFyKC0tbGd1aS1nYXAtc20pO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tbGd1aS1zdXJmYWNlLTEpO1xuICAgICAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMTVzLCBiYWNrZ3JvdW5kIDAuMTVzLCB0cmFuc2Zvcm0gMC4xcztcbiAgICB9XG4gICAgLnJvbGUtY2FyZDphY3RpdmUge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk4KTtcbiAgICB9XG4gICAgLnJvbGUtY2FyZC5zZWxlY3RlZCB7XG4gICAgICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgIH1cbiAgICAucm9sZS1lbW9qaSB7XG4gICAgICBmb250LXNpemU6IDM2cHg7XG4gICAgICBsaW5lLWhlaWdodDogMTtcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIH1cbiAgICAucm9sZS1sYWJlbCB7XG4gICAgICBmb250LXNpemU6IDE3cHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHZhcigtLWxndWktdGV4dC00KTtcbiAgICB9XG4gICAgLnJvbGUtY2FyZC5zZWxlY3RlZCAucm9sZS1sYWJlbCB7IGNvbG9yOiAjZmZmOyB9XG4gICAgLnJvbGUtZGVzYyB7XG4gICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICBtYXJnaW4tdG9wOiAycHg7XG4gICAgICBjb2xvcjogdmFyKC0tbGd1aS10ZXh0LTMpO1xuICAgIH1cbiAgICAucm9sZS1jYXJkLnNlbGVjdGVkIC5yb2xlLWRlc2MgeyBjb2xvcjogcmdiYSgyNTUsMjU1LDI1NSwwLjc4KTsgfVxuICAiXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2FwcHMvbW9iaWxlLWFwcC9zcmMvYXBwL3BhZ2VzL29uYm9hcmRpbmcvcm9sL29uYm9hcmRpbmctcm9sLnBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtJQUNJO01BQ0UsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQix5QkFBeUI7TUFDekIsbUJBQW1CO0lBQ3JCO0lBQ0E7TUFDRSxhQUFhO01BQ2IsbUJBQW1CO01BQ25CLHVCQUF1QjtNQUN2Qiw4Q0FBOEM7TUFDOUMseUNBQXlDO01BQ3pDLHNDQUFzQztNQUN0QyxpQ0FBaUM7TUFDakMsZUFBZTtNQUNmLGlDQUFpQztNQUNqQyxnRUFBZ0U7SUFDbEU7SUFDQTtNQUNFLHNCQUFzQjtJQUN4QjtJQUNBO01BQ0Usc0NBQXNDO01BQ3RDLG9DQUFvQztNQUNwQyxXQUFXO0lBQ2I7SUFDQTtNQUNFLGVBQWU7TUFDZixjQUFjO01BQ2QsY0FBYztJQUNoQjtJQUNBO01BQ0UsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQix5QkFBeUI7SUFDM0I7SUFDQSxrQ0FBa0MsV0FBVyxFQUFFO0lBQy9DO01BQ0UsZUFBZTtNQUNmLGVBQWU7TUFDZix5QkFBeUI7SUFDM0I7SUFDQSxpQ0FBaUMsNkJBQTZCLEVBQUU7O0FBRXBFLDQ0RUFBNDRFIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgLnF1ZXN0aW9uIHtcbiAgICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBjb2xvcjogdmFyKC0tbGd1aS10ZXh0LTQpO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMjRweDtcbiAgICB9XG4gICAgLnJvbGUtY2FyZCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogdmFyKC0tbGd1aS1nYXAtbGcpO1xuICAgICAgcGFkZGluZzogdmFyKC0tbGd1aS1wYWQtc20pIHZhcigtLWxndWktcGFkLW1kKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWxndWktcmFkaXVzLWRlZmF1bHQpO1xuICAgICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tbGd1aS1ib3JkZXItMyk7XG4gICAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1sZ3VpLWdhcC1zbSk7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1sZ3VpLXN1cmZhY2UtMSk7XG4gICAgICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4xNXMsIGJhY2tncm91bmQgMC4xNXMsIHRyYW5zZm9ybSAwLjFzO1xuICAgIH1cbiAgICAucm9sZS1jYXJkOmFjdGl2ZSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTgpO1xuICAgIH1cbiAgICAucm9sZS1jYXJkLnNlbGVjdGVkIHtcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgY29sb3I6ICNmZmY7XG4gICAgfVxuICAgIC5yb2xlLWVtb2ppIHtcbiAgICAgIGZvbnQtc2l6ZTogMzZweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxO1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgfVxuICAgIC5yb2xlLWxhYmVsIHtcbiAgICAgIGZvbnQtc2l6ZTogMTdweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogdmFyKC0tbGd1aS10ZXh0LTQpO1xuICAgIH1cbiAgICAucm9sZS1jYXJkLnNlbGVjdGVkIC5yb2xlLWxhYmVsIHsgY29sb3I6ICNmZmY7IH1cbiAgICAucm9sZS1kZXNjIHtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIG1hcmdpbi10b3A6IDJweDtcbiAgICAgIGNvbG9yOiB2YXIoLS1sZ3VpLXRleHQtMyk7XG4gICAgfVxuICAgIC5yb2xlLWNhcmQuc2VsZWN0ZWQgLnJvbGUtZGVzYyB7IGNvbG9yOiByZ2JhKDI1NSwyNTUsMjU1LDAuNzgpOyB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=apps_mobile-app_src_app_pages_onboarding_rol_onboarding-rol_page_ts.js.map