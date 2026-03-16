"use strict";
(self["webpackChunkmobile_app"] = self["webpackChunkmobile_app"] || []).push([["apps_mobile-app_src_app_pages_onboarding_estilos_onboarding-estilos_page_ts"],{

/***/ 7957:
/*!*************************************************************************************!*\
  !*** ./apps/mobile-app/src/app/pages/onboarding/estilos/onboarding-estilos.page.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OnboardingEstilosPage: () => (/* binding */ OnboardingEstilosPage)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular/standalone */ 1347);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../environments/environment */ 3738);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_onboarding_state_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/onboarding-state.service */ 1021);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/auth.service */ 2693);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 6443);











function OnboardingEstilosPage_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "ion-spinner", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function OnboardingEstilosPage_div_11_ion_chip_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-chip", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function OnboardingEstilosPage_div_11_ion_chip_1_Template_ion_chip_click_0_listener() {
      const e_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.toggle(e_r2.slug));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const e_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("color", ctx_r2.isSelected(e_r2.slug) ? "primary" : "medium");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](e_r2.nombre);
  }
}
function OnboardingEstilosPage_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, OnboardingEstilosPage_div_11_ion_chip_1_Template, 3, 2, "ion-chip", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r2.estilos);
  }
}
function OnboardingEstilosPage_ion_select_option_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-select-option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const a_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", a_r4.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](a_r4.nombre);
  }
}
class OnboardingEstilosPage {
  constructor(router, state, authService, http) {
    this.router = router;
    this.state = state;
    this.authService = authService;
    this.http = http;
    this.estilos = [];
    this.academias = [];
    this.selected = [];
    this.selectedAcademiaId = null;
    this.alias = '';
    this.loading = false;
    this.loadingStyles = true;
    this.error = '';
    this.selected = [...this.state.get().estilos];
  }
  ngOnInit() {
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/dance-styles`).subscribe({
      next: s => {
        this.estilos = s;
        this.loadingStyles = false;
      },
      error: () => {
        this.loadingStyles = false;
      }
    });
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/academias`).subscribe({
      next: a => {
        this.academias = a;
      }
    });
  }
  isSelected(slug) {
    return this.selected.includes(slug);
  }
  toggle(slug) {
    if (this.isSelected(slug)) {
      this.selected = this.selected.filter(s => s !== slug);
    } else {
      this.selected = [...this.selected, slug];
    }
  }
  finish() {
    const onboarding = this.state.get();
    if (!onboarding.rol || !onboarding.nivel || this.selected.length === 0 || !this.alias.trim()) {
      this.error = 'Por favor completa todos los campos requeridos.';
      return;
    }
    this.loading = true;
    this.authService.register({
      alias: this.alias.trim(),
      rol: onboarding.rol,
      nivel: onboarding.nivel,
      estilos: this.selected,
      academiaId: this.selectedAcademiaId ?? undefined
    }).subscribe({
      next: () => {
        this.state.reset();
        this.loading = false;
        this.router.navigate(['/tabs/home'], {
          replaceUrl: true
        });
      },
      error: err => {
        this.loading = false;
        console.error('Registration error:', err);
        this.error = err?.error?.message ?? 'Error al crear el perfil.';
      }
    });
  }
  static {
    this.ɵfac = function OnboardingEstilosPage_Factory(t) {
      return new (t || OnboardingEstilosPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_onboarding_state_service__WEBPACK_IMPORTED_MODULE_1__.OnboardingStateService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: OnboardingEstilosPage,
      selectors: [["app-onboarding-estilos"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
      decls: 28,
      vars: 10,
      consts: [["value", "1.0", "color", "secondary"], [1, "ion-padding"], [1, "question"], [1, "subtitle"], ["class", "ion-text-center", "style", "margin-bottom: 20px;", 4, "ngIf"], ["class", "chips-grid", 4, "ngIf"], [1, "field-label"], ["lines", "none", 2, "margin-bottom", "16px", "border-radius", "10px", "overflow", "hidden"], ["placeholder", "Ej. salsa_king", "required", "", 3, "ngModelChange", "ngModel"], ["lines", "none", 2, "margin-bottom", "24px", "border-radius", "10px", "overflow", "hidden"], ["placeholder", "Sin academia", "interface", "action-sheet", 3, "ngModelChange", "ngModel"], [3, "value"], [3, "value", 4, "ngFor", "ngForOf"], ["expand", "block", 3, "click", "disabled"], ["duration", "3000", "color", "danger", 3, "didDismiss", "isOpen", "message"], [1, "ion-text-center", 2, "margin-bottom", "20px"], ["color", "primary", "name", "dots"], [1, "chips-grid"], ["class", "estilo-chip", 3, "color", "click", 4, "ngFor", "ngForOf"], [1, "estilo-chip", 3, "click", "color"]],
      template: function OnboardingEstilosPage_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Paso 4 de 4 \u2014 Estilos");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "ion-progress-bar", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "ion-content", 1)(6, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "\u00BFQu\u00E9 estilos bailas?");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Selecciona al menos uno.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, OnboardingEstilosPage_div_10_Template, 2, 0, "div", 4)(11, OnboardingEstilosPage_div_11_Template, 2, 1, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Tu alias");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "ion-list", 7)(15, "ion-item")(16, "ion-input", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function OnboardingEstilosPage_Template_ion_input_ngModelChange_16_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.alias, $event) || (ctx.alias = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "Academia (opcional)");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "ion-list", 9)(20, "ion-item")(21, "ion-select", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function OnboardingEstilosPage_Template_ion_select_ngModelChange_21_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.selectedAcademiaId, $event) || (ctx.selectedAcademiaId = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "ion-select-option", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "Sin academia");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](24, OnboardingEstilosPage_ion_select_option_24_Template, 2, 2, "ion-select-option", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "ion-button", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function OnboardingEstilosPage_Template_ion_button_click_25_listener() {
            return ctx.finish();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "ion-toast", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("didDismiss", function OnboardingEstilosPage_Template_ion_toast_didDismiss_27_listener() {
            return ctx.error = "";
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.loadingStyles);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.loadingStyles);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.alias);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedAcademiaId);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", null);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.academias);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx.selected.length === 0 || !ctx.alias.trim() || ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.loading ? "Creando perfil..." : "Entrar a la app \uD83C\uDFB5", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("isOpen", !!ctx.error)("message", ctx.error);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonChip, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonInput, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonList, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonToast, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonProgressBar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonSelect, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonSelectOption, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonSpinner],
      styles: [".question[_ngcontent-%COMP%] {\n      font-size: 22px;\n      font-weight: 700;\n      color: var(--ion-text-color, #1a1a2e);\n      margin-bottom: 6px;\n    }\n    .subtitle[_ngcontent-%COMP%] {\n      font-size: 14px;\n      color: var(--ion-color-medium);\n      margin-bottom: 20px;\n    }\n    .chips-grid[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 10px;\n      margin-bottom: 28px;\n    }\n    .estilo-chip[_ngcontent-%COMP%] {\n      height: 36px;\n      font-size: 13px;\n      font-weight: 500;\n      border-radius: 18px;\n      padding: 0 4px;\n    }\n    .field-label[_ngcontent-%COMP%] {\n      font-size: 12px;\n      font-weight: 600;\n      color: var(--ion-color-medium);\n      letter-spacing: 0.5px;\n      text-transform: uppercase;\n      margin-bottom: 4px;\n      padding-left: 4px;\n    }\n  \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9uYm9hcmRpbmctZXN0aWxvcy5wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7SUFDSTtNQUNFLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIscUNBQXFDO01BQ3JDLGtCQUFrQjtJQUNwQjtJQUNBO01BQ0UsZUFBZTtNQUNmLDhCQUE4QjtNQUM5QixtQkFBbUI7SUFDckI7SUFDQTtNQUNFLGFBQWE7TUFDYixlQUFlO01BQ2YsU0FBUztNQUNULG1CQUFtQjtJQUNyQjtJQUNBO01BQ0UsWUFBWTtNQUNaLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIsbUJBQW1CO01BQ25CLGNBQWM7SUFDaEI7SUFDQTtNQUNFLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIsOEJBQThCO01BQzlCLHFCQUFxQjtNQUNyQix5QkFBeUI7TUFDekIsa0JBQWtCO01BQ2xCLGlCQUFpQjtJQUNuQiIsImZpbGUiOiJvbmJvYXJkaW5nLWVzdGlsb3MucGFnZS50cyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIC5xdWVzdGlvbiB7XG4gICAgICBmb250LXNpemU6IDIycHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi10ZXh0LWNvbG9yLCAjMWExYTJlKTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDZweDtcbiAgICB9XG4gICAgLnN1YnRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgfVxuICAgIC5jaGlwcy1ncmlkIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICBnYXA6IDEwcHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyOHB4O1xuICAgIH1cbiAgICAuZXN0aWxvLWNoaXAge1xuICAgICAgaGVpZ2h0OiAzNnB4O1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDE4cHg7XG4gICAgICBwYWRkaW5nOiAwIDRweDtcbiAgICB9XG4gICAgLmZpZWxkLWxhYmVsIHtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICBsZXR0ZXItc3BhY2luZzogMC41cHg7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgICAgcGFkZGluZy1sZWZ0OiA0cHg7XG4gICAgfVxuICAiXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2FwcHMvbW9iaWxlLWFwcC9zcmMvYXBwL3BhZ2VzL29uYm9hcmRpbmcvZXN0aWxvcy9vbmJvYXJkaW5nLWVzdGlsb3MucGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0lBQ0k7TUFDRSxlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLHFDQUFxQztNQUNyQyxrQkFBa0I7SUFDcEI7SUFDQTtNQUNFLGVBQWU7TUFDZiw4QkFBOEI7TUFDOUIsbUJBQW1CO0lBQ3JCO0lBQ0E7TUFDRSxhQUFhO01BQ2IsZUFBZTtNQUNmLFNBQVM7TUFDVCxtQkFBbUI7SUFDckI7SUFDQTtNQUNFLFlBQVk7TUFDWixlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLG1CQUFtQjtNQUNuQixjQUFjO0lBQ2hCO0lBQ0E7TUFDRSxlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLDhCQUE4QjtNQUM5QixxQkFBcUI7TUFDckIseUJBQXlCO01BQ3pCLGtCQUFrQjtNQUNsQixpQkFBaUI7SUFDbkI7O0FBRUosb3BEQUFvcEQiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAucXVlc3Rpb24ge1xuICAgICAgZm9udC1zaXplOiAyMnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tdGV4dC1jb2xvciwgIzFhMWEyZSk7XG4gICAgICBtYXJnaW4tYm90dG9tOiA2cHg7XG4gICAgfVxuICAgIC5zdWJ0aXRsZSB7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgIH1cbiAgICAuY2hpcHMtZ3JpZCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgZ2FwOiAxMHB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMjhweDtcbiAgICB9XG4gICAgLmVzdGlsby1jaGlwIHtcbiAgICAgIGhlaWdodDogMzZweDtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBib3JkZXItcmFkaXVzOiAxOHB4O1xuICAgICAgcGFkZGluZzogMCA0cHg7XG4gICAgfVxuICAgIC5maWVsZC1sYWJlbCB7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDRweDtcbiAgICAgIHBhZGRpbmctbGVmdDogNHB4O1xuICAgIH1cbiAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=apps_mobile-app_src_app_pages_onboarding_estilos_onboarding-estilos_page_ts.js.map