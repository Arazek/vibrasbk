"use strict";
(self["webpackChunkmobile_app"] = self["webpackChunkmobile_app"] || []).push([["apps_mobile-app_src_app_pages_onboarding_ciudad_onboarding-ciudad_page_ts"],{

/***/ 5337:
/*!***********************************************************************************!*\
  !*** ./apps/mobile-app/src/app/pages/onboarding/ciudad/onboarding-ciudad.page.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OnboardingCiudadPage: () => (/* binding */ OnboardingCiudadPage)
/* harmony export */ });
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular/standalone */ 1347);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 5072);



class OnboardingCiudadPage {
  constructor(router) {
    this.router = router;
  }
  next() {
    this.router.navigate(['/onboarding/rol']);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  static {
    this.ɵfac = function OnboardingCiudadPage_Factory(t) {
      return new (t || OnboardingCiudadPage)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: OnboardingCiudadPage,
      selectors: [["app-onboarding-ciudad"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
      decls: 21,
      vars: 0,
      consts: [["value", "0.25", "color", "secondary"], [1, "hero"], [1, "hero-emoji"], [1, "hero-title"], [1, "hero-subtitle"], [1, "city-badge"], ["expand", "block", 2, "width", "100%", 3, "click"], [1, "login-link"], [3, "click"]],
      template: function OnboardingCiudadPage_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Bienvenido");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "ion-progress-bar", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "ion-content")(6, "div", 1)(7, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "\uD83D\uDC83\uD83D\uDD7A");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Predictor de Sociales");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Descubre c\u00F3mo ser\u00E1 el ambiente antes de salir a bailar. Sabe si la pista estar\u00E1 animada, el nivel de los bailarines y el balance de roles. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "\uD83D\uDCCD Cartagena");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "ion-button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OnboardingCiudadPage_Template_ion_button_click_15_listener() {
            return ctx.next();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " Crear perfil \u2014 Soy nuevo ");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, " \u00BFYa tienes cuenta? ");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "span", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OnboardingCiudadPage_Template_span_click_19_listener() {
            return ctx.goToLogin();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Iniciar sesi\u00F3n");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
        }
      },
      dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_2__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_2__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_2__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_2__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_2__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_2__.IonProgressBar],
      styles: [".hero[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      min-height: 70vh;\n      padding: 32px 24px;\n      text-align: center;\n    }\n    .hero-emoji[_ngcontent-%COMP%] {\n      font-size: 64px;\n      margin-bottom: 24px;\n      line-height: 1;\n    }\n    .hero-title[_ngcontent-%COMP%] {\n      font-size: 28px;\n      font-weight: 700;\n      color: var(--ion-text-color, #1a1a2e);\n      margin-bottom: 12px;\n    }\n    .hero-subtitle[_ngcontent-%COMP%] {\n      font-size: 15px;\n      color: var(--ion-color-medium);\n      line-height: 1.6;\n      margin-bottom: 8px;\n    }\n    .city-badge[_ngcontent-%COMP%] {\n      display: inline-block;\n      background: var(--ion-color-primary, #E84855);\n      color: #fff;\n      font-weight: 600;\n      font-size: 14px;\n      padding: 6px 16px;\n      border-radius: 20px;\n      margin: 16px 0 32px;\n    }\n    .login-link[_ngcontent-%COMP%] {\n      margin-top: 16px;\n      font-size: 14px;\n      color: var(--ion-color-medium);\n    }\n    .login-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      color: var(--ion-color-primary, #E84855);\n      font-weight: 600;\n      cursor: pointer;\n    }\n  \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9uYm9hcmRpbmctY2l1ZGFkLnBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtJQUNJO01BQ0UsYUFBYTtNQUNiLHNCQUFzQjtNQUN0QixtQkFBbUI7TUFDbkIsdUJBQXVCO01BQ3ZCLGdCQUFnQjtNQUNoQixrQkFBa0I7TUFDbEIsa0JBQWtCO0lBQ3BCO0lBQ0E7TUFDRSxlQUFlO01BQ2YsbUJBQW1CO01BQ25CLGNBQWM7SUFDaEI7SUFDQTtNQUNFLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIscUNBQXFDO01BQ3JDLG1CQUFtQjtJQUNyQjtJQUNBO01BQ0UsZUFBZTtNQUNmLDhCQUE4QjtNQUM5QixnQkFBZ0I7TUFDaEIsa0JBQWtCO0lBQ3BCO0lBQ0E7TUFDRSxxQkFBcUI7TUFDckIsNkNBQTZDO01BQzdDLFdBQVc7TUFDWCxnQkFBZ0I7TUFDaEIsZUFBZTtNQUNmLGlCQUFpQjtNQUNqQixtQkFBbUI7TUFDbkIsbUJBQW1CO0lBQ3JCO0lBQ0E7TUFDRSxnQkFBZ0I7TUFDaEIsZUFBZTtNQUNmLDhCQUE4QjtJQUNoQztJQUNBO01BQ0Usd0NBQXdDO01BQ3hDLGdCQUFnQjtNQUNoQixlQUFlO0lBQ2pCIiwiZmlsZSI6Im9uYm9hcmRpbmctY2l1ZGFkLnBhZ2UudHMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAuaGVybyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIG1pbi1oZWlnaHQ6IDcwdmg7XG4gICAgICBwYWRkaW5nOiAzMnB4IDI0cHg7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuICAgIC5oZXJvLWVtb2ppIHtcbiAgICAgIGZvbnQtc2l6ZTogNjRweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gICAgICBsaW5lLWhlaWdodDogMTtcbiAgICB9XG4gICAgLmhlcm8tdGl0bGUge1xuICAgICAgZm9udC1zaXplOiAyOHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tdGV4dC1jb2xvciwgIzFhMWEyZSk7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgIH1cbiAgICAuaGVyby1zdWJ0aXRsZSB7XG4gICAgICBmb250LXNpemU6IDE1cHg7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICBsaW5lLWhlaWdodDogMS42O1xuICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgIH1cbiAgICAuY2l0eS1iYWRnZSB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSwgI0U4NDg1NSk7XG4gICAgICBjb2xvcjogI2ZmZjtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBwYWRkaW5nOiA2cHggMTZweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gICAgICBtYXJnaW46IDE2cHggMCAzMnB4O1xuICAgIH1cbiAgICAubG9naW4tbGluayB7XG4gICAgICBtYXJnaW4tdG9wOiAxNnB4O1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIH1cbiAgICAubG9naW4tbGluayBzcGFuIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSwgI0U4NDg1NSk7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIH1cbiAgIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2FwcHMvbW9iaWxlLWFwcC9zcmMvYXBwL3BhZ2VzL29uYm9hcmRpbmcvY2l1ZGFkL29uYm9hcmRpbmctY2l1ZGFkLnBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtJQUNJO01BQ0UsYUFBYTtNQUNiLHNCQUFzQjtNQUN0QixtQkFBbUI7TUFDbkIsdUJBQXVCO01BQ3ZCLGdCQUFnQjtNQUNoQixrQkFBa0I7TUFDbEIsa0JBQWtCO0lBQ3BCO0lBQ0E7TUFDRSxlQUFlO01BQ2YsbUJBQW1CO01BQ25CLGNBQWM7SUFDaEI7SUFDQTtNQUNFLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIscUNBQXFDO01BQ3JDLG1CQUFtQjtJQUNyQjtJQUNBO01BQ0UsZUFBZTtNQUNmLDhCQUE4QjtNQUM5QixnQkFBZ0I7TUFDaEIsa0JBQWtCO0lBQ3BCO0lBQ0E7TUFDRSxxQkFBcUI7TUFDckIsNkNBQTZDO01BQzdDLFdBQVc7TUFDWCxnQkFBZ0I7TUFDaEIsZUFBZTtNQUNmLGlCQUFpQjtNQUNqQixtQkFBbUI7TUFDbkIsbUJBQW1CO0lBQ3JCO0lBQ0E7TUFDRSxnQkFBZ0I7TUFDaEIsZUFBZTtNQUNmLDhCQUE4QjtJQUNoQztJQUNBO01BQ0Usd0NBQXdDO01BQ3hDLGdCQUFnQjtNQUNoQixlQUFlO0lBQ2pCOztBQUVKLDR4RUFBNHhFIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgLmhlcm8ge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBtaW4taGVpZ2h0OiA3MHZoO1xuICAgICAgcGFkZGluZzogMzJweCAyNHB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIH1cbiAgICAuaGVyby1lbW9qaSB7XG4gICAgICBmb250LXNpemU6IDY0cHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICAgICAgbGluZS1oZWlnaHQ6IDE7XG4gICAgfVxuICAgIC5oZXJvLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLXRleHQtY29sb3IsICMxYTFhMmUpO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICB9XG4gICAgLmhlcm8tc3VidGl0bGUge1xuICAgICAgZm9udC1zaXplOiAxNXB4O1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICB9XG4gICAgLmNpdHktYmFkZ2Uge1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnksICNFODQ4NTUpO1xuICAgICAgY29sb3I6ICNmZmY7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgcGFkZGluZzogNnB4IDE2cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICAgICAgbWFyZ2luOiAxNnB4IDAgMzJweDtcbiAgICB9XG4gICAgLmxvZ2luLWxpbmsge1xuICAgICAgbWFyZ2luLXRvcDogMTZweDtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICB9XG4gICAgLmxvZ2luLWxpbmsgc3BhbiB7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnksICNFODQ4NTUpO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=apps_mobile-app_src_app_pages_onboarding_ciudad_onboarding-ciudad_page_ts.js.map