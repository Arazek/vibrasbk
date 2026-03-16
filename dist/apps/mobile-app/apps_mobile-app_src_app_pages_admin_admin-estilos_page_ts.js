"use strict";
(self["webpackChunkmobile_app"] = self["webpackChunkmobile_app"] || []).push([["apps_mobile-app_src_app_pages_admin_admin-estilos_page_ts"],{

/***/ 2741:
/*!*******************************************************************!*\
  !*** ./apps/mobile-app/src/app/pages/admin/admin-estilos.page.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminEstilosPage: () => (/* binding */ AdminEstilosPage)
/* harmony export */ });
/* harmony import */ var _home_arazek_workspace_jordi_dance_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular/standalone */ 1347);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/admin.service */ 2380);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular/standalone */ 8205);










function AdminEstilosPage_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "ion-spinner", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function AdminEstilosPage_ion_list_10_ion_item_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-item")(1, "ion-label")(2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AdminEstilosPage_ion_list_10_ion_item_1_Template_ion_button_click_6_listener() {
      const style_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.openEdit(style_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "ion-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "ion-button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AdminEstilosPage_ion_list_10_ion_item_1_Template_ion_button_click_8_listener() {
      const style_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.confirmDelete(style_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](9, "ion-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const style_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](style_r2.nombre);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](style_r2.slug);
  }
}
function AdminEstilosPage_ion_list_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AdminEstilosPage_ion_list_10_ion_item_1_Template, 10, 2, "ion-item", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r2.styles);
  }
}
class AdminEstilosPage {
  constructor(admin, modalCtrl, alertCtrl, navCtrl) {
    this.admin = admin;
    this.modalCtrl = modalCtrl;
    this.alertCtrl = alertCtrl;
    this.navCtrl = navCtrl;
    this.styles = [];
    this.loading = true;
    this.toast = '';
    (0,ionicons__WEBPACK_IMPORTED_MODULE_4__.a)({
      add: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.add,
      trash: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.trash,
      pencil: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.pencil,
      chevronBack: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.chevronBack
    });
  }
  goBack() {
    this.navCtrl.navigateBack('/admin');
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this.admin.getDanceStyles().subscribe({
      next: s => {
        this.styles = s;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toast = 'Error cargando estilos';
      }
    });
  }
  openCreate() {
    var _this = this;
    return (0,_home_arazek_workspace_jordi_dance_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const alert = yield _this.alertCtrl.create({
        header: 'Nuevo estilo',
        inputs: [{
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre (ej: Salsa Cubana)'
        }, {
          name: 'slug',
          type: 'text',
          placeholder: 'Slug (ej: salsa_cubana)'
        }],
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Crear',
          handler: data => {
            if (!data.nombre || !data.slug) return false;
            _this.admin.createDanceStyle({
              nombre: data.nombre,
              slug: data.slug
            }).subscribe({
              next: () => {
                _this.toast = 'Estilo creado';
                _this.load();
              },
              error: () => {
                _this.toast = 'Error al crear estilo';
              }
            });
            return true;
          }
        }]
      });
      yield alert.present();
    })();
  }
  openEdit(style) {
    var _this2 = this;
    return (0,_home_arazek_workspace_jordi_dance_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const alert = yield _this2.alertCtrl.create({
        header: 'Editar estilo',
        inputs: [{
          name: 'nombre',
          type: 'text',
          value: style.nombre,
          placeholder: 'Nombre'
        }],
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Guardar',
          handler: data => {
            if (!data.nombre) return false;
            _this2.admin.updateDanceStyle(style.id, {
              nombre: data.nombre
            }).subscribe({
              next: () => {
                _this2.toast = 'Estilo actualizado';
                _this2.load();
              },
              error: () => {
                _this2.toast = 'Error al actualizar';
              }
            });
            return true;
          }
        }]
      });
      yield alert.present();
    })();
  }
  confirmDelete(style) {
    var _this3 = this;
    return (0,_home_arazek_workspace_jordi_dance_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const alert = yield _this3.alertCtrl.create({
        header: 'Eliminar estilo',
        message: `¿Eliminar "${style.nombre}"?`,
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            _this3.admin.deleteDanceStyle(style.id).subscribe({
              next: () => {
                _this3.toast = 'Estilo eliminado';
                _this3.load();
              },
              error: () => {
                _this3.toast = 'Error al eliminar';
              }
            });
          }
        }]
      });
      yield alert.present();
    })();
  }
  static {
    this.ɵfac = function AdminEstilosPage_Factory(t) {
      return new (t || AdminEstilosPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_admin_service__WEBPACK_IMPORTED_MODULE_2__.AdminService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.NavController));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: AdminEstilosPage,
      selectors: [["app-admin-estilos"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
      decls: 15,
      vars: 4,
      consts: [["slot", "start"], [3, "click"], ["slot", "start", "name", "chevron-back"], ["class", "ion-text-center ion-padding", 4, "ngIf"], [4, "ngIf"], ["slot", "fixed", "vertical", "bottom", "horizontal", "end"], ["color", "primary", 3, "click"], ["name", "add"], ["duration", "2500", 3, "didDismiss", "isOpen", "message"], [1, "ion-text-center", "ion-padding"], ["color", "primary"], [4, "ngFor", "ngForOf"], ["fill", "clear", "slot", "end", 3, "click"], ["name", "pencil"], ["fill", "clear", "slot", "end", "color", "danger", 3, "click"], ["name", "trash"]],
      template: function AdminEstilosPage_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 0)(3, "ion-button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AdminEstilosPage_Template_ion_button_click_3_listener() {
            return ctx.goBack();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "ion-icon", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, " Admin ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Estilos de Baile");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "ion-content");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, AdminEstilosPage_div_9_Template, 2, 0, "div", 3)(10, AdminEstilosPage_ion_list_10_Template, 2, 1, "ion-list", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "ion-fab", 5)(12, "ion-fab-button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AdminEstilosPage_Template_ion_fab_button_click_12_listener() {
            return ctx.openCreate();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](13, "ion-icon", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "ion-toast", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("didDismiss", function AdminEstilosPage_Template_ion_toast_didDismiss_14_listener() {
            return ctx.toast = "";
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("isOpen", !!ctx.toast)("message", ctx.toast);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonButtons, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonList, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonFab, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonFabButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonToast, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonSpinner],
      encapsulation: 2
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=apps_mobile-app_src_app_pages_admin_admin-estilos_page_ts.js.map