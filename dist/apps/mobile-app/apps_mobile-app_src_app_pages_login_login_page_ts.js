"use strict";
(self["webpackChunkmobile_app"] = self["webpackChunkmobile_app"] || []).push([["apps_mobile-app_src_app_pages_login_login_page_ts"],{

/***/ 6571:
/*!***********************************************************!*\
  !*** ./apps/mobile-app/src/app/pages/login/login.page.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginPage: () => (/* binding */ LoginPage)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular/standalone */ 1347);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/auth.service */ 2693);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);







class LoginPage {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.alias = '';
    this.loading = false;
    this.error = '';
  }
  login() {
    if (!this.alias.trim() || this.loading) return;
    this.loading = true;
    this.authService.login(this.alias.trim()).subscribe({
      next: () => {
        this.router.navigate(['/tabs/home'], {
          replaceUrl: true
        });
      },
      error: err => {
        this.loading = false;
        this.error = err?.error?.message ?? 'Alias no encontrado.';
      }
    });
  }
  static {
    this.ɵfac = function LoginPage_Factory(t) {
      return new (t || LoginPage)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: LoginPage,
      selectors: [["app-login"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
      decls: 23,
      vars: 5,
      consts: [["slot", "start"], ["defaultHref", "/onboarding/ciudad"], [1, "login-container"], [1, "login-emoji"], [1, "login-title"], [1, "login-subtitle"], [1, "input-block"], [1, "field-label"], ["lines", "none", 2, "border-radius", "10px", "overflow", "hidden"], ["placeholder", "Ej. salsa_king", "autocomplete", "off", 3, "ngModelChange", "keyup.enter", "ngModel"], ["expand", "block", 2, "width", "100%", 3, "click", "disabled"], ["duration", "3000", "color", "danger", 3, "didDismiss", "isOpen", "message"]],
      template: function LoginPage_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "ion-back-button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "ion-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Iniciar sesi\u00F3n");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "ion-content")(7, "div", 2)(8, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "\uD83C\uDFB6");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "\u00A1Bienvenido de vuelta!");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, " Introduce tu alias para volver a la pista. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 6)(15, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Tu alias");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "ion-list", 8)(18, "ion-item")(19, "ion-input", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function LoginPage_Template_ion_input_ngModelChange_19_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.alias, $event) || (ctx.alias = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("keyup.enter", function LoginPage_Template_ion_input_keyup_enter_19_listener() {
            return ctx.login();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "ion-button", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LoginPage_Template_ion_button_click_20_listener() {
            return ctx.login();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "ion-toast", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("didDismiss", function LoginPage_Template_ion_toast_didDismiss_22_listener() {
            return ctx.error = "";
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](19);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.alias);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.alias.trim() || ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.loading ? "Entrando..." : "Entrar", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("isOpen", !!ctx.error)("message", ctx.error);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonInput, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonList, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonToast, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonBackButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonButtons],
      styles: [".login-container[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      min-height: 70vh;\n      padding: 32px 24px;\n      text-align: center;\n    }\n    .login-emoji[_ngcontent-%COMP%] {\n      font-size: 56px;\n      margin-bottom: 24px;\n      line-height: 1;\n    }\n    .login-title[_ngcontent-%COMP%] {\n      font-size: 26px;\n      font-weight: 700;\n      color: var(--ion-text-color, #1a1a2e);\n      margin-bottom: 8px;\n    }\n    .login-subtitle[_ngcontent-%COMP%] {\n      font-size: 14px;\n      color: var(--ion-color-medium);\n      margin-bottom: 32px;\n      line-height: 1.5;\n    }\n    .field-label[_ngcontent-%COMP%] {\n      font-size: 12px;\n      font-weight: 600;\n      color: var(--ion-color-medium);\n      letter-spacing: 0.5px;\n      text-transform: uppercase;\n      margin-bottom: 4px;\n      text-align: left;\n      width: 100%;\n    }\n    .input-block[_ngcontent-%COMP%] {\n      width: 100%;\n      margin-bottom: 24px;\n    }\n  \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLnBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtJQUNJO01BQ0UsYUFBYTtNQUNiLHNCQUFzQjtNQUN0QixtQkFBbUI7TUFDbkIsdUJBQXVCO01BQ3ZCLGdCQUFnQjtNQUNoQixrQkFBa0I7TUFDbEIsa0JBQWtCO0lBQ3BCO0lBQ0E7TUFDRSxlQUFlO01BQ2YsbUJBQW1CO01BQ25CLGNBQWM7SUFDaEI7SUFDQTtNQUNFLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIscUNBQXFDO01BQ3JDLGtCQUFrQjtJQUNwQjtJQUNBO01BQ0UsZUFBZTtNQUNmLDhCQUE4QjtNQUM5QixtQkFBbUI7TUFDbkIsZ0JBQWdCO0lBQ2xCO0lBQ0E7TUFDRSxlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLDhCQUE4QjtNQUM5QixxQkFBcUI7TUFDckIseUJBQXlCO01BQ3pCLGtCQUFrQjtNQUNsQixnQkFBZ0I7TUFDaEIsV0FBVztJQUNiO0lBQ0E7TUFDRSxXQUFXO01BQ1gsbUJBQW1CO0lBQ3JCIiwiZmlsZSI6ImxvZ2luLnBhZ2UudHMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAubG9naW4tY29udGFpbmVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgbWluLWhlaWdodDogNzB2aDtcbiAgICAgIHBhZGRpbmc6IDMycHggMjRweDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG4gICAgLmxvZ2luLWVtb2ppIHtcbiAgICAgIGZvbnQtc2l6ZTogNTZweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gICAgICBsaW5lLWhlaWdodDogMTtcbiAgICB9XG4gICAgLmxvZ2luLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMjZweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLXRleHQtY29sb3IsICMxYTFhMmUpO1xuICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgIH1cbiAgICAubG9naW4tc3VidGl0bGUge1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMzJweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgfVxuICAgIC5maWVsZC1sYWJlbCB7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDRweDtcbiAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG4gICAgLmlucHV0LWJsb2NrIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMjRweDtcbiAgICB9XG4gICJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2FwcHMvbW9iaWxlLWFwcC9zcmMvYXBwL3BhZ2VzL2xvZ2luL2xvZ2luLnBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtJQUNJO01BQ0UsYUFBYTtNQUNiLHNCQUFzQjtNQUN0QixtQkFBbUI7TUFDbkIsdUJBQXVCO01BQ3ZCLGdCQUFnQjtNQUNoQixrQkFBa0I7TUFDbEIsa0JBQWtCO0lBQ3BCO0lBQ0E7TUFDRSxlQUFlO01BQ2YsbUJBQW1CO01BQ25CLGNBQWM7SUFDaEI7SUFDQTtNQUNFLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIscUNBQXFDO01BQ3JDLGtCQUFrQjtJQUNwQjtJQUNBO01BQ0UsZUFBZTtNQUNmLDhCQUE4QjtNQUM5QixtQkFBbUI7TUFDbkIsZ0JBQWdCO0lBQ2xCO0lBQ0E7TUFDRSxlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLDhCQUE4QjtNQUM5QixxQkFBcUI7TUFDckIseUJBQXlCO01BQ3pCLGtCQUFrQjtNQUNsQixnQkFBZ0I7TUFDaEIsV0FBVztJQUNiO0lBQ0E7TUFDRSxXQUFXO01BQ1gsbUJBQW1CO0lBQ3JCOztBQUVKLG85REFBbzlEIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgLmxvZ2luLWNvbnRhaW5lciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIG1pbi1oZWlnaHQ6IDcwdmg7XG4gICAgICBwYWRkaW5nOiAzMnB4IDI0cHg7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuICAgIC5sb2dpbi1lbW9qaSB7XG4gICAgICBmb250LXNpemU6IDU2cHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICAgICAgbGluZS1oZWlnaHQ6IDE7XG4gICAgfVxuICAgIC5sb2dpbi10aXRsZSB7XG4gICAgICBmb250LXNpemU6IDI2cHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi10ZXh0LWNvbG9yLCAjMWExYTJlKTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICB9XG4gICAgLmxvZ2luLXN1YnRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDMycHg7XG4gICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgIH1cbiAgICAuZmllbGQtbGFiZWwge1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAwLjVweDtcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuICAgIC5pbnB1dC1ibG9jayB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gICAgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=apps_mobile-app_src_app_pages_login_login_page_ts.js.map