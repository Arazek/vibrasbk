"use strict";
(self["webpackChunkmobile_app"] = self["webpackChunkmobile_app"] || []).push([["apps_mobile-app_src_app_pages_admin_admin-academias_page_ts"],{

/***/ 6086:
/*!*********************************************************************!*\
  !*** ./apps/mobile-app/src/app/pages/admin/admin-academias.page.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminAcademiasPage: () => (/* binding */ AdminAcademiasPage)
/* harmony export */ });
/* harmony import */ var _home_arazek_workspace_jordi_dance_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular/standalone */ 1347);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/admin.service */ 2380);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular/standalone */ 8205);









function AdminAcademiasPage_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "ion-spinner", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function AdminAcademiasPage_ion_list_10_ion_item_1_p_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const academia_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](academia_r2.ciudad);
  }
}
function AdminAcademiasPage_ion_list_10_ion_item_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-item")(1, "ion-label")(2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, AdminAcademiasPage_ion_list_10_ion_item_1_p_4_Template, 2, 1, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "ion-button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AdminAcademiasPage_ion_list_10_ion_item_1_Template_ion_button_click_5_listener() {
      const academia_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.openEdit(academia_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "ion-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "ion-button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AdminAcademiasPage_ion_list_10_ion_item_1_Template_ion_button_click_7_listener() {
      const academia_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.confirmDelete(academia_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "ion-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const academia_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](academia_r2.nombre);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", academia_r2.ciudad);
  }
}
function AdminAcademiasPage_ion_list_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AdminAcademiasPage_ion_list_10_ion_item_1_Template, 9, 2, "ion-item", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r2.academias);
  }
}
class AdminAcademiasPage {
  constructor(admin, alertCtrl, navCtrl) {
    this.admin = admin;
    this.alertCtrl = alertCtrl;
    this.navCtrl = navCtrl;
    this.academias = [];
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
    this.admin.getAcademias().subscribe({
      next: a => {
        this.academias = a;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toast = 'Error cargando academias';
      }
    });
  }
  openCreate() {
    var _this = this;
    return (0,_home_arazek_workspace_jordi_dance_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const alert = yield _this.alertCtrl.create({
        header: 'Nueva academia',
        inputs: [{
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre de la academia'
        }, {
          name: 'ciudad',
          type: 'text',
          placeholder: 'Ciudad (opcional)'
        }],
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Crear',
          handler: data => {
            if (!data.nombre) return false;
            _this.admin.createAcademia({
              nombre: data.nombre,
              ciudad: data.ciudad || undefined
            }).subscribe({
              next: () => {
                _this.toast = 'Academia creada';
                _this.load();
              },
              error: () => {
                _this.toast = 'Error al crear academia';
              }
            });
            return true;
          }
        }]
      });
      yield alert.present();
    })();
  }
  openEdit(academia) {
    var _this2 = this;
    return (0,_home_arazek_workspace_jordi_dance_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const alert = yield _this2.alertCtrl.create({
        header: 'Editar academia',
        inputs: [{
          name: 'nombre',
          type: 'text',
          value: academia.nombre,
          placeholder: 'Nombre'
        }, {
          name: 'ciudad',
          type: 'text',
          value: academia.ciudad ?? '',
          placeholder: 'Ciudad'
        }],
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Guardar',
          handler: data => {
            if (!data.nombre) return false;
            _this2.admin.updateAcademia(academia.id, {
              nombre: data.nombre,
              ciudad: data.ciudad || undefined
            }).subscribe({
              next: () => {
                _this2.toast = 'Academia actualizada';
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
  confirmDelete(academia) {
    var _this3 = this;
    return (0,_home_arazek_workspace_jordi_dance_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const alert = yield _this3.alertCtrl.create({
        header: 'Eliminar academia',
        message: `¿Eliminar "${academia.nombre}"?`,
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            _this3.admin.deleteAcademia(academia.id).subscribe({
              next: () => {
                _this3.toast = 'Academia eliminada';
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
    this.ɵfac = function AdminAcademiasPage_Factory(t) {
      return new (t || AdminAcademiasPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_admin_service__WEBPACK_IMPORTED_MODULE_2__.AdminService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.NavController));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: AdminAcademiasPage,
      selectors: [["app-admin-academias"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
      decls: 15,
      vars: 4,
      consts: [["slot", "start"], [3, "click"], ["slot", "start", "name", "chevron-back"], ["class", "ion-text-center ion-padding", 4, "ngIf"], [4, "ngIf"], ["slot", "fixed", "vertical", "bottom", "horizontal", "end"], ["color", "primary", 3, "click"], ["name", "add"], ["duration", "2500", 3, "didDismiss", "isOpen", "message"], [1, "ion-text-center", "ion-padding"], ["color", "primary"], [4, "ngFor", "ngForOf"], ["fill", "clear", "slot", "end", 3, "click"], ["name", "pencil"], ["fill", "clear", "slot", "end", "color", "danger", 3, "click"], ["name", "trash"]],
      template: function AdminAcademiasPage_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 0)(3, "ion-button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AdminAcademiasPage_Template_ion_button_click_3_listener() {
            return ctx.goBack();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "ion-icon", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, " Admin ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Academias");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "ion-content");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, AdminAcademiasPage_div_9_Template, 2, 0, "div", 3)(10, AdminAcademiasPage_ion_list_10_Template, 2, 1, "ion-list", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "ion-fab", 5)(12, "ion-fab-button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AdminAcademiasPage_Template_ion_fab_button_click_12_listener() {
            return ctx.openCreate();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](13, "ion-icon", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "ion-toast", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("didDismiss", function AdminAcademiasPage_Template_ion_toast_didDismiss_14_listener() {
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
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonButtons, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonList, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonFab, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonFabButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonToast, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonSpinner],
      encapsulation: 2
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=apps_mobile-app_src_app_pages_admin_admin-academias_page_ts.js.map