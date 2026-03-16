"use strict";
(self["webpackChunkmobile_app"] = self["webpackChunkmobile_app"] || []).push([["apps_mobile-app_src_app_pages_profile_profile_page_ts"],{

/***/ 8267:
/*!***************************************************************!*\
  !*** ./apps/mobile-app/src/app/pages/profile/profile.page.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProfilePage: () => (/* binding */ ProfilePage)
/* harmony export */ });
/* harmony import */ var _home_arazek_workspace_jordi_dance_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular/standalone */ 1347);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ 3738);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_profile_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/profile.service */ 7097);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/auth.service */ 2693);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 6443);















function ProfilePage_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-spinner", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function ProfilePage_div_9_ion_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ProfilePage_div_9_ion_button_9_Template_ion_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r2.router.navigate(["/admin"]));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Panel Admin ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function ProfilePage_div_9_ion_select_option_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-select-option", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const n_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", n_r4.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", n_r4.label, " ");
  }
}
function ProfilePage_div_9_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-spinner", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function ProfilePage_div_9_div_21_ion_chip_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-chip", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ProfilePage_div_9_div_21_ion_chip_1_Template_ion_chip_click_0_listener() {
      const e_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r5).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r2.toggleEstilo(e_r6.slug));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const e_r6 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("color", ctx_r2.isSelected(e_r6.slug) ? "primary" : "medium");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](e_r6.nombre);
  }
}
function ProfilePage_div_9_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, ProfilePage_div_9_div_21_ion_chip_1_Template, 3, 2, "ion-chip", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r2.estiloOptions);
  }
}
function ProfilePage_div_9_ion_select_option_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-select-option", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const a_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", a_r7.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](a_r7.nombre);
  }
}
function ProfilePage_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "div", 8)(2, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 10)(5, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, ProfilePage_div_9_ion_button_9_Template, 2, 0, "ion-button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11, "Nivel");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "ion-list", 15)(13, "ion-item")(14, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15, "Nivel actual");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "ion-select", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function ProfilePage_div_9_Template_ion_select_ngModelChange_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r2.selectedNivel, $event) || (ctx_r2.selectedNivel = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, ProfilePage_div_9_ion_select_option_17_Template, 2, 2, "ion-select-option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19, "Estilos");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](20, ProfilePage_div_9_div_20_Template, 2, 0, "div", 18)(21, ProfilePage_div_9_div_21_Template, 2, 1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](23, "Academia");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "ion-list", 20)(25, "ion-item")(26, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](27, "Academia");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](28, "ion-select", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function ProfilePage_div_9_Template_ion_select_ngModelChange_28_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r2.selectedAcademiaId, $event) || (ctx_r2.selectedAcademiaId = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "ion-select-option", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](30, "Sin academia");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](31, ProfilePage_div_9_ion_select_option_31_Template, 2, 2, "ion-select-option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](32, "ion-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ProfilePage_div_9_Template_ion_button_click_32_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r2.save());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](34, "ion-button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ProfilePage_div_9_Template_ion_button_click_34_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r2.confirmLogout());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](35, "ion-icon", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](36, " Cerrar sesi\u00F3n ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](37, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r2.initials);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r2.profile.alias);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", ctx_r2.profile.ciudad, " \u00B7 ", ctx_r2.rolLabel, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r2.profile.rol === "admin");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.selectedNivel);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r2.nivelOptions);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r2.loadingStyles);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx_r2.loadingStyles);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.selectedAcademiaId);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", null);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r2.academias);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r2.saving || ctx_r2.selectedEstilos.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r2.saving ? "Guardando..." : "Guardar cambios", " ");
  }
}
const NIVEL_OPTIONS = [{
  value: 'nuevo',
  label: 'Nuevo'
}, {
  value: 'iniciacion',
  label: 'Iniciación'
}, {
  value: 'social_comodo',
  label: 'Social cómodo'
}, {
  value: 'intermedio',
  label: 'Intermedio'
}, {
  value: 'avanzado',
  label: 'Avanzado'
}];
class ProfilePage {
  constructor(profileService, authService, router, alertCtrl, http) {
    this.profileService = profileService;
    this.authService = authService;
    this.router = router;
    this.alertCtrl = alertCtrl;
    this.http = http;
    this.profile = null;
    this.loading = true;
    this.loadingStyles = true;
    this.saving = false;
    this.toastMsg = '';
    this.selectedNivel = 'social_comodo';
    this.selectedEstilos = [];
    this.selectedAcademiaId = null;
    this.nivelOptions = NIVEL_OPTIONS;
    this.estiloOptions = [];
    this.academias = [];
    (0,ionicons__WEBPACK_IMPORTED_MODULE_6__.a)({
      logOutOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.logOutOutline
    });
  }
  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: p => {
        this.profile = p;
        this.selectedNivel = p.nivel;
        this.selectedEstilos = [...p.estilos];
        this.selectedAcademiaId = p.academiaId ?? null;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastMsg = 'No se pudo cargar el perfil.';
      }
    });
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiUrl}/dance-styles`).subscribe({
      next: s => {
        this.estiloOptions = s;
        this.loadingStyles = false;
      },
      error: () => {
        this.loadingStyles = false;
      }
    });
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiUrl}/academias`).subscribe({
      next: a => {
        this.academias = a;
      }
    });
  }
  get initials() {
    return (this.profile?.alias ?? '?').slice(0, 2).toUpperCase();
  }
  get rolLabel() {
    const map = {
      leader: 'Leader',
      follower: 'Follower',
      switch: 'Switch',
      admin: 'Admin'
    };
    return map[this.profile?.rol ?? ''] ?? '';
  }
  isSelected(slug) {
    return this.selectedEstilos.includes(slug);
  }
  toggleEstilo(slug) {
    if (this.isSelected(slug)) {
      this.selectedEstilos = this.selectedEstilos.filter(s => s !== slug);
    } else {
      this.selectedEstilos = [...this.selectedEstilos, slug];
    }
  }
  save() {
    this.saving = true;
    this.profileService.updateProfile({
      nivel: this.selectedNivel,
      estilos: this.selectedEstilos,
      academiaId: this.selectedAcademiaId ?? undefined
    }).subscribe({
      next: p => {
        this.profile = p;
        this.saving = false;
        this.toastMsg = 'Perfil actualizado.';
      },
      error: () => {
        this.saving = false;
        this.toastMsg = 'Error al guardar.';
      }
    });
  }
  confirmLogout() {
    var _this = this;
    return (0,_home_arazek_workspace_jordi_dance_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const alert = yield _this.alertCtrl.create({
        header: 'Cerrar sesión',
        message: '¿Seguro que quieres salir?',
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Salir',
          role: 'destructive',
          handler: () => _this.logout()
        }]
      });
      yield alert.present();
    })();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/onboarding/ciudad'], {
      replaceUrl: true
    });
  }
  static {
    this.ɵfac = function ProfilePage_Factory(t) {
      return new (t || ProfilePage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_profile_service__WEBPACK_IMPORTED_MODULE_3__.ProfileService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_4__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: ProfilePage,
      selectors: [["app-profile"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵStandaloneFeature"]],
      decls: 11,
      vars: 4,
      consts: [["slot", "end"], [3, "click"], [1, "ion-padding"], ["class", "ion-text-center", "style", "padding-top: 60px;", 4, "ngIf"], [4, "ngIf"], ["duration", "2000", 3, "didDismiss", "isOpen", "message"], [1, "ion-text-center", 2, "padding-top", "60px"], ["color", "primary"], [1, "identity-card"], [1, "avatar"], [1, "identity-info"], [1, "identity-alias"], [1, "identity-meta"], ["expand", "block", "color", "secondary", 3, "click", 4, "ngIf"], [1, "section-title"], [2, "border-radius", "10px", "overflow", "hidden", "margin-bottom", "0"], ["interface", "action-sheet", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "ion-text-center", "style", "margin-bottom: 16px;", 4, "ngIf"], ["class", "estilos-grid", 4, "ngIf"], [2, "border-radius", "10px", "overflow", "hidden", "margin-bottom", "var(--lgui-gap-xl)"], [3, "value"], ["expand", "block", 3, "click", "disabled"], ["expand", "block", "fill", "clear", "color", "danger", 2, "margin-top", "var(--lgui-gap-xl)", 3, "click"], ["slot", "start", "name", "log-out-outline"], [1, "bottom-space"], ["expand", "block", "color", "secondary", 3, "click"], [1, "ion-text-center", 2, "margin-bottom", "16px"], ["name", "dots", "color", "primary"], [1, "estilos-grid"], ["class", "estilo-chip", 3, "color", "click", 4, "ngFor", "ngForOf"], [1, "estilo-chip", 3, "click", "color"]],
      template: function ProfilePage_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Mi Perfil");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "ion-buttons", 0)(5, "ion-button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ProfilePage_Template_ion_button_click_5_listener() {
            return ctx.logout();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "Salir");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "ion-content", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, ProfilePage_div_8_Template, 2, 0, "div", 3)(9, ProfilePage_div_9_Template, 38, 14, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "ion-toast", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("didDismiss", function ProfilePage_Template_ion_toast_didDismiss_10_listener() {
            return ctx.toastMsg = "";
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.profile && !ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("isOpen", !!ctx.toastMsg)("message", ctx.toastMsg);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgModel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonButtons, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonSpinner, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonList, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonSelect, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonSelectOption, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonChip, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonToast, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonIcon],
      styles: [".identity-card[_ngcontent-%COMP%] {\n      background: var(--ion-color-primary);\n      border-radius: var(--lgui-radius-default);\n      padding: var(--lgui-pad-lg) var(--lgui-pad-md);\n      margin-bottom: var(--lgui-gap-xl);\n      display: flex;\n      align-items: center;\n      gap: var(--lgui-gap-lg);\n      box-shadow: var(--lgui-shadow-accent-md);\n    }\n    .avatar[_ngcontent-%COMP%] {\n      width: 64px;\n      height: 64px;\n      border-radius: 50%;\n      background: rgba(255,255,255,0.22);\n      border: 2px solid rgba(255,255,255,0.4);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 22px;\n      font-weight: 700;\n      color: #fff;\n      flex-shrink: 0;\n      letter-spacing: -0.5px;\n    }\n    .identity-info[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n    .identity-alias[_ngcontent-%COMP%] {\n      font-size: 20px;\n      font-weight: 700;\n      color: #fff;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n    .identity-meta[_ngcontent-%COMP%] { font-size: 13px; color: rgba(255,255,255,0.75); margin-top: 3px; }\n    .section-title[_ngcontent-%COMP%] {\n      font-size: 11px;\n      font-weight: 700;\n      letter-spacing: 0.6px;\n      text-transform: uppercase;\n      color: var(--lgui-text-3);\n      margin-bottom: var(--lgui-gap-sm);\n      margin-top: var(--lgui-gap-xl);\n    }\n    .estilos-grid[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: var(--lgui-gap-sm);\n      margin-bottom: var(--lgui-gap-xl);\n    }\n    .estilo-chip[_ngcontent-%COMP%] { height: 36px; font-size: 13px; font-weight: 500; }\n    .bottom-space[_ngcontent-%COMP%] { height: var(--lgui-space-8); }\n  \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2ZpbGUucGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0lBQ0k7TUFDRSxvQ0FBb0M7TUFDcEMseUNBQXlDO01BQ3pDLDhDQUE4QztNQUM5QyxpQ0FBaUM7TUFDakMsYUFBYTtNQUNiLG1CQUFtQjtNQUNuQix1QkFBdUI7TUFDdkIsd0NBQXdDO0lBQzFDO0lBQ0E7TUFDRSxXQUFXO01BQ1gsWUFBWTtNQUNaLGtCQUFrQjtNQUNsQixrQ0FBa0M7TUFDbEMsdUNBQXVDO01BQ3ZDLGFBQWE7TUFDYixtQkFBbUI7TUFDbkIsdUJBQXVCO01BQ3ZCLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIsV0FBVztNQUNYLGNBQWM7TUFDZCxzQkFBc0I7SUFDeEI7SUFDQSxpQkFBaUIsT0FBTyxFQUFFLFlBQVksRUFBRTtJQUN4QztNQUNFLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIsV0FBVztNQUNYLG1CQUFtQjtNQUNuQixnQkFBZ0I7TUFDaEIsdUJBQXVCO0lBQ3pCO0lBQ0EsaUJBQWlCLGVBQWUsRUFBRSw2QkFBNkIsRUFBRSxlQUFlLEVBQUU7SUFDbEY7TUFDRSxlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLHFCQUFxQjtNQUNyQix5QkFBeUI7TUFDekIseUJBQXlCO01BQ3pCLGlDQUFpQztNQUNqQyw4QkFBOEI7SUFDaEM7SUFDQTtNQUNFLGFBQWE7TUFDYixlQUFlO01BQ2YsdUJBQXVCO01BQ3ZCLGlDQUFpQztJQUNuQztJQUNBLGVBQWUsWUFBWSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRTtJQUNoRSxnQkFBZ0IsMkJBQTJCLEVBQUUiLCJmaWxlIjoicHJvZmlsZS5wYWdlLnRzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgLmlkZW50aXR5LWNhcmQge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tbGd1aS1yYWRpdXMtZGVmYXVsdCk7XG4gICAgICBwYWRkaW5nOiB2YXIoLS1sZ3VpLXBhZC1sZykgdmFyKC0tbGd1aS1wYWQtbWQpO1xuICAgICAgbWFyZ2luLWJvdHRvbTogdmFyKC0tbGd1aS1nYXAteGwpO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IHZhcigtLWxndWktZ2FwLWxnKTtcbiAgICAgIGJveC1zaGFkb3c6IHZhcigtLWxndWktc2hhZG93LWFjY2VudC1tZCk7XG4gICAgfVxuICAgIC5hdmF0YXIge1xuICAgICAgd2lkdGg6IDY0cHg7XG4gICAgICBoZWlnaHQ6IDY0cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMjIpO1xuICAgICAgYm9yZGVyOiAycHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjQpO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBjb2xvcjogI2ZmZjtcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IC0wLjVweDtcbiAgICB9XG4gICAgLmlkZW50aXR5LWluZm8geyBmbGV4OiAxOyBtaW4td2lkdGg6IDA7IH1cbiAgICAuaWRlbnRpdHktYWxpYXMge1xuICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB9XG4gICAgLmlkZW50aXR5LW1ldGEgeyBmb250LXNpemU6IDEzcHg7IGNvbG9yOiByZ2JhKDI1NSwyNTUsMjU1LDAuNzUpOyBtYXJnaW4tdG9wOiAzcHg7IH1cbiAgICAuc2VjdGlvbi10aXRsZSB7XG4gICAgICBmb250LXNpemU6IDExcHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNnB4O1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgIGNvbG9yOiB2YXIoLS1sZ3VpLXRleHQtMyk7XG4gICAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1sZ3VpLWdhcC1zbSk7XG4gICAgICBtYXJnaW4tdG9wOiB2YXIoLS1sZ3VpLWdhcC14bCk7XG4gICAgfVxuICAgIC5lc3RpbG9zLWdyaWQge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgIGdhcDogdmFyKC0tbGd1aS1nYXAtc20pO1xuICAgICAgbWFyZ2luLWJvdHRvbTogdmFyKC0tbGd1aS1nYXAteGwpO1xuICAgIH1cbiAgICAuZXN0aWxvLWNoaXAgeyBoZWlnaHQ6IDM2cHg7IGZvbnQtc2l6ZTogMTNweDsgZm9udC13ZWlnaHQ6IDUwMDsgfVxuICAgIC5ib3R0b20tc3BhY2UgeyBoZWlnaHQ6IHZhcigtLWxndWktc3BhY2UtOCk7IH1cbiAgIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2FwcHMvbW9iaWxlLWFwcC9zcmMvYXBwL3BhZ2VzL3Byb2ZpbGUvcHJvZmlsZS5wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7SUFDSTtNQUNFLG9DQUFvQztNQUNwQyx5Q0FBeUM7TUFDekMsOENBQThDO01BQzlDLGlDQUFpQztNQUNqQyxhQUFhO01BQ2IsbUJBQW1CO01BQ25CLHVCQUF1QjtNQUN2Qix3Q0FBd0M7SUFDMUM7SUFDQTtNQUNFLFdBQVc7TUFDWCxZQUFZO01BQ1osa0JBQWtCO01BQ2xCLGtDQUFrQztNQUNsQyx1Q0FBdUM7TUFDdkMsYUFBYTtNQUNiLG1CQUFtQjtNQUNuQix1QkFBdUI7TUFDdkIsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQixXQUFXO01BQ1gsY0FBYztNQUNkLHNCQUFzQjtJQUN4QjtJQUNBLGlCQUFpQixPQUFPLEVBQUUsWUFBWSxFQUFFO0lBQ3hDO01BQ0UsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQixXQUFXO01BQ1gsbUJBQW1CO01BQ25CLGdCQUFnQjtNQUNoQix1QkFBdUI7SUFDekI7SUFDQSxpQkFBaUIsZUFBZSxFQUFFLDZCQUE2QixFQUFFLGVBQWUsRUFBRTtJQUNsRjtNQUNFLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIscUJBQXFCO01BQ3JCLHlCQUF5QjtNQUN6Qix5QkFBeUI7TUFDekIsaUNBQWlDO01BQ2pDLDhCQUE4QjtJQUNoQztJQUNBO01BQ0UsYUFBYTtNQUNiLGVBQWU7TUFDZix1QkFBdUI7TUFDdkIsaUNBQWlDO0lBQ25DO0lBQ0EsZUFBZSxZQUFZLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFO0lBQ2hFLGdCQUFnQiwyQkFBMkIsRUFBRTs7QUFFakQsNG5HQUE0bkciLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAuaWRlbnRpdHktY2FyZCB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1sZ3VpLXJhZGl1cy1kZWZhdWx0KTtcbiAgICAgIHBhZGRpbmc6IHZhcigtLWxndWktcGFkLWxnKSB2YXIoLS1sZ3VpLXBhZC1tZCk7XG4gICAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1sZ3VpLWdhcC14bCk7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogdmFyKC0tbGd1aS1nYXAtbGcpO1xuICAgICAgYm94LXNoYWRvdzogdmFyKC0tbGd1aS1zaGFkb3ctYWNjZW50LW1kKTtcbiAgICB9XG4gICAgLmF2YXRhciB7XG4gICAgICB3aWR0aDogNjRweDtcbiAgICAgIGhlaWdodDogNjRweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC4yMik7XG4gICAgICBib3JkZXI6IDJweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuNCk7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgZm9udC1zaXplOiAyMnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgICBsZXR0ZXItc3BhY2luZzogLTAuNXB4O1xuICAgIH1cbiAgICAuaWRlbnRpdHktaW5mbyB7IGZsZXg6IDE7IG1pbi13aWR0aDogMDsgfVxuICAgIC5pZGVudGl0eS1hbGlhcyB7XG4gICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgY29sb3I6ICNmZmY7XG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIH1cbiAgICAuaWRlbnRpdHktbWV0YSB7IGZvbnQtc2l6ZTogMTNweDsgY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsMC43NSk7IG1hcmdpbi10b3A6IDNweDsgfVxuICAgIC5zZWN0aW9uLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBsZXR0ZXItc3BhY2luZzogMC42cHg7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgY29sb3I6IHZhcigtLWxndWktdGV4dC0zKTtcbiAgICAgIG1hcmdpbi1ib3R0b206IHZhcigtLWxndWktZ2FwLXNtKTtcbiAgICAgIG1hcmdpbi10b3A6IHZhcigtLWxndWktZ2FwLXhsKTtcbiAgICB9XG4gICAgLmVzdGlsb3MtZ3JpZCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgZ2FwOiB2YXIoLS1sZ3VpLWdhcC1zbSk7XG4gICAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1sZ3VpLWdhcC14bCk7XG4gICAgfVxuICAgIC5lc3RpbG8tY2hpcCB7IGhlaWdodDogMzZweDsgZm9udC1zaXplOiAxM3B4OyBmb250LXdlaWdodDogNTAwOyB9XG4gICAgLmJvdHRvbS1zcGFjZSB7IGhlaWdodDogdmFyKC0tbGd1aS1zcGFjZS04KTsgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 7097:
/*!*************************************************************!*\
  !*** ./apps/mobile-app/src/app/services/profile.service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProfileService: () => (/* binding */ ProfileService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 3738);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);



class ProfileService {
  constructor(http) {
    this.http = http;
    this.base = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/users`;
  }
  getProfile() {
    return this.http.get(`${this.base}/profile`);
  }
  updateProfile(payload) {
    return this.http.patch(`${this.base}/profile`, payload);
  }
  static {
    this.ɵfac = function ProfileService_Factory(t) {
      return new (t || ProfileService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: ProfileService,
      factory: ProfileService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=apps_mobile-app_src_app_pages_profile_profile_page_ts.js.map