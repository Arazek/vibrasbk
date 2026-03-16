"use strict";
(self["webpackChunkmobile_app"] = self["webpackChunkmobile_app"] || []).push([["apps_mobile-app_src_app_pages_admin_admin-events_page_ts"],{

/***/ 2971:
/*!******************************************************************!*\
  !*** ./apps/mobile-app/src/app/pages/admin/admin-events.page.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminEventsPage: () => (/* binding */ AdminEventsPage)
/* harmony export */ });
/* harmony import */ var _home_arazek_workspace_jordi_dance_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular/standalone */ 1347);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _event_form_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event-form.modal */ 521);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ 3738);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/admin.service */ 2380);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular/standalone */ 8205);











const _c0 = ["photoInput"];
function AdminEventsPage_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-spinner", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminEventsPage_ion_list_10_ion_item_1_img_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "img", 22);
  }
  if (rf & 2) {
    const ev_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("src", ctx_r3.photoThumb(ev_r3.fotoUrl), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeUrl"]);
  }
}
function AdminEventsPage_ion_list_10_ion_item_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "\uD83C\uDFB5");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminEventsPage_ion_list_10_ion_item_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, AdminEventsPage_ion_list_10_ion_item_1_img_1_Template, 1, 1, "img", 14)(2, AdminEventsPage_ion_list_10_ion_item_1_div_2_Template, 2, 0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-label")(4, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "ion-button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminEventsPage_ion_list_10_ion_item_1_Template_ion_button_click_8_listener() {
      const ev_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r2).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r3.openPhotoUpload(ev_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "ion-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "ion-button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminEventsPage_ion_list_10_ion_item_1_Template_ion_button_click_10_listener() {
      const ev_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r2).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r3.openEdit(ev_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](11, "ion-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "ion-button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminEventsPage_ion_list_10_ion_item_1_Template_ion_button_click_12_listener() {
      const ev_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r2).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r3.confirmDelete(ev_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](13, "ion-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ev_r3 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ev_r3.fotoUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ev_r3.fotoUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", ev_r3.venue == null ? null : ev_r3.venue.nombre, " - ", ev_r3.tipo, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", ctx_r3.dayName(ev_r3.diaSemana), " ", ev_r3.horaInicio, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("color", ev_r3.fotoUrl ? "success" : "medium");
  }
}
function AdminEventsPage_ion_list_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, AdminEventsPage_ion_list_10_ion_item_1_Template, 14, 7, "ion-item", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r3.events);
  }
}
const DAY_NAMES = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
class AdminEventsPage {
  constructor(admin, modalCtrl, alertCtrl, navCtrl, loadingCtrl) {
    this.admin = admin;
    this.modalCtrl = modalCtrl;
    this.alertCtrl = alertCtrl;
    this.navCtrl = navCtrl;
    this.loadingCtrl = loadingCtrl;
    this.events = [];
    this.venues = [];
    this.loading = true;
    this.toast = '';
    this.selectedEventId = null;
    (0,ionicons__WEBPACK_IMPORTED_MODULE_6__.a)({
      add: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.add,
      trash: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.trash,
      pencil: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.pencil,
      camera: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.camera,
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
    this.admin.getEvents().subscribe({
      next: evs => {
        this.events = evs;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
    this.admin.getVenues().subscribe({
      next: vs => {
        this.venues = vs;
      }
    });
  }
  dayName(idx) {
    return DAY_NAMES[idx] ?? '';
  }
  photoThumb(url) {
    return url.startsWith('http') ? url : _environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.socketUrl + url;
  }
  openCreate() {
    var _this = this;
    return (0,_home_arazek_workspace_jordi_dance_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this.modalCtrl.create({
        component: _event_form_modal__WEBPACK_IMPORTED_MODULE_2__.EventFormModal,
        componentProps: {
          editingId: null,
          venues: _this.venues,
          initial: {
            venueId: _this.venues[0]?.id ?? '',
            tipo: 'social',
            diaSemana: 0,
            horaInicio: '21:00'
          }
        }
      });
      yield modal.present();
      const {
        data
      } = yield modal.onWillDismiss();
      if (!data?.form) return;
      _this.admin.createEvent(data.form).subscribe({
        next: () => {
          _this.toast = 'Evento creado';
          _this.load();
        },
        error: e => {
          _this.toast = e?.error?.message ?? 'Error al crear';
        }
      });
    })();
  }
  openEdit(ev) {
    var _this2 = this;
    return (0,_home_arazek_workspace_jordi_dance_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this2.modalCtrl.create({
        component: _event_form_modal__WEBPACK_IMPORTED_MODULE_2__.EventFormModal,
        componentProps: {
          editingId: ev.id,
          venues: _this2.venues,
          initial: {
            venueId: ev.venue?.id ?? '',
            tipo: ev.tipo,
            diaSemana: ev.diaSemana ?? 0,
            horaInicio: ev.horaInicio,
            nombre: ev.nombre,
            precio: ev.precio,
            profesores: ev.profesores,
            instructores: ev.instructores,
            fechaFin: ev.fechaFin,
            fechaInicio: ev.fechaInicio,
            titulo: ev.titulo,
            nivel: ev.nivel,
            precioEntrada: ev.precioEntrada,
            tallerIncluido: ev.tallerIncluido,
            localidad: ev.localidad,
            duracionDias: ev.duracionDias,
            precios: ev.precios,
            enlaceWeb: ev.enlaceWeb
          }
        }
      });
      yield modal.present();
      const {
        data
      } = yield modal.onWillDismiss();
      if (!data?.form) return;
      _this2.admin.updateEvent(ev.id, data.form).subscribe({
        next: () => {
          _this2.toast = 'Evento actualizado';
          _this2.load();
        },
        error: e => {
          _this2.toast = e?.error?.message ?? 'Error al actualizar';
        }
      });
    })();
  }
  openPhotoUpload(ev) {
    this.selectedEventId = ev.id;
    this.photoInput.nativeElement.click();
  }
  onPhotoSelected(event) {
    var _this3 = this;
    return (0,_home_arazek_workspace_jordi_dance_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const file = event.target.files?.[0];
      if (!file || !_this3.selectedEventId) return;
      const loading = yield _this3.loadingCtrl.create({
        message: 'Subiendo foto...'
      });
      yield loading.present();
      _this3.admin.uploadEventPhoto(_this3.selectedEventId, file).subscribe({
        next: () => {
          loading.dismiss();
          _this3.toast = 'Foto subida';
          _this3.load();
        },
        error: () => {
          loading.dismiss();
          _this3.toast = 'Error al subir foto';
        }
      });
      event.target.value = '';
    })();
  }
  confirmDelete(ev) {
    var _this4 = this;
    return (0,_home_arazek_workspace_jordi_dance_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const alert = yield _this4.alertCtrl.create({
        header: 'Eliminar evento',
        message: 'Eliminar este evento?',
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            _this4.admin.deleteEvent(ev.id).subscribe({
              next: () => {
                _this4.toast = 'Evento eliminado';
                _this4.load();
              },
              error: () => {
                _this4.toast = 'Error al eliminar';
              }
            });
          }
        }]
      });
      yield alert.present();
    })();
  }
  static {
    this.ɵfac = function AdminEventsPage_Factory(t) {
      return new (t || AdminEventsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_admin_service__WEBPACK_IMPORTED_MODULE_4__.AdminService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.LoadingController));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: AdminEventsPage,
      selectors: [["app-admin-events"]],
      viewQuery: function AdminEventsPage_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.photoInput = _t.first);
        }
      },
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵStandaloneFeature"]],
      decls: 17,
      vars: 4,
      consts: [["photoInput", ""], ["slot", "start"], [3, "click"], ["slot", "start", "name", "chevron-back"], ["class", "ion-text-center ion-padding", 4, "ngIf"], [4, "ngIf"], ["type", "file", "accept", "image/*", 2, "display", "none", 3, "change"], ["slot", "fixed", "vertical", "bottom", "horizontal", "end"], ["color", "primary", 3, "click"], ["name", "add"], ["duration", "2500", 3, "didDismiss", "isOpen", "message"], [1, "ion-text-center", "ion-padding"], ["color", "primary"], [4, "ngFor", "ngForOf"], ["slot", "start", "style", "width:44px; height:44px; object-fit:cover; border-radius:8px; flex-shrink:0;", 3, "src", 4, "ngIf"], ["slot", "start", "style", "width:44px; height:44px; border-radius:8px; background:var(--lgui-surface-3); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0;", 4, "ngIf"], ["fill", "clear", "slot", "end", 3, "click", "color"], ["name", "camera"], ["fill", "clear", "slot", "end", 3, "click"], ["name", "pencil"], ["fill", "clear", "slot", "end", "color", "danger", 3, "click"], ["name", "trash"], ["slot", "start", 2, "width", "44px", "height", "44px", "object-fit", "cover", "border-radius", "8px", "flex-shrink", "0", 3, "src"], ["slot", "start", 2, "width", "44px", "height", "44px", "border-radius", "8px", "background", "var(--lgui-surface-3)", "display", "flex", "align-items", "center", "justify-content", "center", "font-size", "20px", "flex-shrink", "0"]],
      template: function AdminEventsPage_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 1)(3, "ion-button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminEventsPage_Template_ion_button_click_3_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx.goBack());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "ion-icon", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, " Admin ");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "ion-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "Eventos");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "ion-content");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, AdminEventsPage_div_9_Template, 2, 0, "div", 4)(10, AdminEventsPage_ion_list_10_Template, 2, 1, "ion-list", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "input", 6, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function AdminEventsPage_Template_input_change_11_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx.onPhotoSelected($event));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "ion-fab", 7)(14, "ion-fab-button", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminEventsPage_Template_ion_fab_button_click_14_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx.openCreate());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](15, "ion-icon", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "ion-toast", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("didDismiss", function AdminEventsPage_Template_ion_toast_didDismiss_16_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx.toast = "");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("isOpen", !!ctx.toast)("message", ctx.toast);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonButtons, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonList, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonFab, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonFabButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonToast, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonSpinner],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 521:
/*!*****************************************************************!*\
  !*** ./apps/mobile-app/src/app/pages/admin/event-form.modal.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventFormModal: () => (/* binding */ EventFormModal)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular/standalone */ 1347);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);







function EventFormModal_ion_select_option_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-select-option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const v_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", v_r1.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](v_r1.nombre);
  }
}
function EventFormModal_ng_container_21_ion_select_option_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-select-option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const d_r4 = ctx.$implicit;
    const i_r5 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", i_r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](d_r4);
  }
}
function EventFormModal_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Horario recurrente");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3)(4, "ion-select", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_ng_container_21_Template_ion_select_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx_r2.form.diaSemana, $event) || (ctx_r2.form.diaSemana = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, EventFormModal_ng_container_21_ion_select_option_5_Template, 2, 2, "ion-select-option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 3)(7, "ion-input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_ng_container_21_Template_ion_input_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx_r2.form.horaInicio, $event) || (ctx_r2.form.horaInicio = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Detalles");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "ion-item", 17)(11, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "\u00BFHay taller incluido?");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "ion-toggle", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_ng_container_21_Template_ion_toggle_ngModelChange_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx_r2.form.tallerIncluido, $event) || (ctx_r2.form.tallerIncluido = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 3)(15, "ion-input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_ng_container_21_Template_ion_input_ngModelChange_15_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx_r2.form.precioEntrada, $event) || (ctx_r2.form.precioEntrada = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 3)(17, "ion-input", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_ng_container_21_Template_ion_input_ngModelChange_17_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx_r2.instructoresStr, $event) || (ctx_r2.instructoresStr = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.diaSemana);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r2.dayOptions);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.horaInicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.tallerIncluido);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.precioEntrada);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.instructoresStr);
  }
}
function EventFormModal_ng_container_22_ion_select_option_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-select-option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const n_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", n_r7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](n_r7);
  }
}
function EventFormModal_ng_container_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Fechas");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3)(4, "ion-input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_ng_container_22_Template_ion_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx_r2.form.fechaInicio, $event) || (ctx_r2.form.fechaInicio = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3)(6, "ion-input", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_ng_container_22_Template_ion_input_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx_r2.form.fechaFin, $event) || (ctx_r2.form.fechaFin = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 3)(8, "ion-input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_ng_container_22_Template_ion_input_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx_r2.form.horaInicio, $event) || (ctx_r2.form.horaInicio = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Contenido");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 3)(12, "ion-input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_ng_container_22_Template_ion_input_ngModelChange_12_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx_r2.form.titulo, $event) || (ctx_r2.form.titulo = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 3)(14, "ion-select", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_ng_container_22_Template_ion_select_ngModelChange_14_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx_r2.form.nivel, $event) || (ctx_r2.form.nivel = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, EventFormModal_ng_container_22_ion_select_option_15_Template, 2, 2, "ion-select-option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 3)(17, "ion-input", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_ng_container_22_Template_ion_input_ngModelChange_17_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx_r2.form.precio, $event) || (ctx_r2.form.precio = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 3)(19, "ion-input", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_ng_container_22_Template_ion_input_ngModelChange_19_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx_r2.profesoresStr, $event) || (ctx_r2.profesoresStr = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.fechaInicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.fechaFin);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.horaInicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.titulo);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.nivel);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r2.niveles);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.precio);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.profesoresStr);
  }
}
function EventFormModal_ng_container_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Fechas");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3)(4, "ion-input", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_ng_container_23_Template_ion_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx_r2.form.fechaInicio, $event) || (ctx_r2.form.fechaInicio = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3)(6, "ion-input", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_ng_container_23_Template_ion_input_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx_r2.form.duracionDias, $event) || (ctx_r2.form.duracionDias = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Detalles");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 3)(10, "ion-input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_ng_container_23_Template_ion_input_ngModelChange_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx_r2.form.titulo, $event) || (ctx_r2.form.titulo = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 3)(12, "ion-input", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_ng_container_23_Template_ion_input_ngModelChange_12_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx_r2.form.localidad, $event) || (ctx_r2.form.localidad = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 3)(14, "ion-input", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_ng_container_23_Template_ion_input_ngModelChange_14_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx_r2.preciosStr, $event) || (ctx_r2.preciosStr = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 3)(16, "ion-input", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_ng_container_23_Template_ion_input_ngModelChange_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx_r2.form.enlaceWeb, $event) || (ctx_r2.form.enlaceWeb = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.fechaInicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.duracionDias);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.titulo);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.localidad);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.preciosStr);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.enlaceWeb);
  }
}
const DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const NIVELES = ['nuevo', 'iniciacion', 'social_comodo', 'intermedio', 'avanzado'];
class EventFormModal {
  constructor(modalCtrl) {
    this.modalCtrl = modalCtrl;
    this.editingId = null;
    this.initial = {};
    this.venues = [];
    this.form = {
      venueId: '',
      tipo: 'social',
      diaSemana: 0,
      horaInicio: '21:00'
    };
    this.dayOptions = DAY_NAMES;
    this.niveles = NIVELES;
    // Helper strings for array fields
    this.instructoresStr = '';
    this.profesoresStr = '';
    this.preciosStr = '';
  }
  ngOnInit() {
    this.form = {
      ...this.initial,
      venueId: this.initial.venueId ?? this.venues[0]?.id ?? '',
      tipo: this.initial.tipo ?? 'social',
      diaSemana: this.initial.diaSemana ?? 0,
      horaInicio: this.initial.horaInicio ?? '21:00'
    };
    this.instructoresStr = (this.initial.instructores ?? []).join(', ');
    this.profesoresStr = (this.initial.profesores ?? []).join(', ');
    this.preciosStr = this.initial.precios ?? '';
  }
  dismiss() {
    this.modalCtrl.dismiss(null);
  }
  submit() {
    if (!this.form.venueId) return;
    // Parse array helpers back
    if (this.form.tipo === 'social') {
      this.form.instructores = this.instructoresStr ? this.instructoresStr.split(',').map(s => s.trim()) : undefined;
    }
    if (this.form.tipo === 'intensivo') {
      this.form.profesores = this.profesoresStr ? this.profesoresStr.split(',').map(s => s.trim()) : undefined;
    }
    if (this.form.tipo === 'congreso') {
      this.form.precios = this.preciosStr || undefined;
    }
    this.modalCtrl.dismiss({
      form: this.form
    });
  }
  static {
    this.ɵfac = function EventFormModal_Factory(t) {
      return new (t || EventFormModal)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_1__.ModalController));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: EventFormModal,
      selectors: [["app-event-form-modal"]],
      inputs: {
        editingId: "editingId",
        initial: "initial",
        venues: "venues"
      },
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
      decls: 26,
      vars: 9,
      consts: [["slot", "end"], [3, "click"], [1, "ion-padding"], [1, "form-field"], ["label", "Local", "labelPlacement", "stacked", "interface", "action-sheet", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["label", "Tipo", "labelPlacement", "stacked", "interface", "action-sheet", 3, "ngModelChange", "ngModel"], ["value", "social"], ["value", "intensivo"], ["value", "congreso"], ["label", "Nombre (opcional)", "labelPlacement", "stacked", 3, "ngModelChange", "ngModel"], [4, "ngIf"], ["expand", "block", 2, "margin-top", "24px", 3, "click"], [3, "value"], [1, "section-title"], ["label", "D\u00EDa de la semana", "labelPlacement", "stacked", "interface", "action-sheet", 3, "ngModelChange", "ngModel"], ["label", "Hora inicio (HH:MM)", "labelPlacement", "stacked", "placeholder", "21:00", 3, "ngModelChange", "ngModel"], ["lines", "none", 2, "padding", "0"], ["slot", "end", 3, "ngModelChange", "ngModel"], ["label", "Precio entrada (\u20AC)", "labelPlacement", "stacked", "type", "number", 3, "ngModelChange", "ngModel"], ["label", "Instructores (separados por coma)", "labelPlacement", "stacked", 3, "ngModelChange", "ngModel"], ["label", "Fecha inicio (YYYY-MM-DD)", "labelPlacement", "stacked", "placeholder", "2026-04-01", 3, "ngModelChange", "ngModel"], ["label", "Fecha fin (YYYY-MM-DD)", "labelPlacement", "stacked", "placeholder", "2026-04-03", 3, "ngModelChange", "ngModel"], ["label", "Hora inicio (HH:MM)", "labelPlacement", "stacked", "placeholder", "10:00", 3, "ngModelChange", "ngModel"], ["label", "T\u00EDtulo", "labelPlacement", "stacked", 3, "ngModelChange", "ngModel"], ["label", "Nivel", "labelPlacement", "stacked", "interface", "action-sheet", 3, "ngModelChange", "ngModel"], ["label", "Precio (\u20AC)", "labelPlacement", "stacked", "type", "number", 3, "ngModelChange", "ngModel"], ["label", "Profesores (separados por coma)", "labelPlacement", "stacked", 3, "ngModelChange", "ngModel"], ["label", "Fecha inicio (YYYY-MM-DD)", "labelPlacement", "stacked", "placeholder", "2026-05-01", 3, "ngModelChange", "ngModel"], ["label", "Duraci\u00F3n (d\u00EDas)", "labelPlacement", "stacked", "type", "number", 3, "ngModelChange", "ngModel"], ["label", "Localidad", "labelPlacement", "stacked", 3, "ngModelChange", "ngModel"], ["label", "Precios (texto libre, ej: Pase completo 80\u20AC)", "labelPlacement", "stacked", 3, "ngModelChange", "ngModel"], ["label", "Enlace web", "labelPlacement", "stacked", "type", "url", 3, "ngModelChange", "ngModel"]],
      template: function EventFormModal_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ion-buttons", 0)(5, "ion-button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EventFormModal_Template_ion_button_click_5_listener() {
            return ctx.dismiss();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Cerrar");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "ion-content", 2)(8, "div", 3)(9, "ion-select", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_Template_ion_select_ngModelChange_9_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx.form.venueId, $event) || (ctx.form.venueId = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, EventFormModal_ion_select_option_10_Template, 2, 2, "ion-select-option", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 3)(12, "ion-select", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_Template_ion_select_ngModelChange_12_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx.form.tipo, $event) || (ctx.form.tipo = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "ion-select-option", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Social");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "ion-select-option", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Intensivo");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "ion-select-option", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Congreso");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 3)(20, "ion-input", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function EventFormModal_Template_ion_input_ngModelChange_20_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx.form.nombre, $event) || (ctx.form.nombre = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, EventFormModal_ng_container_21_Template, 18, 6, "ng-container", 11)(22, EventFormModal_ng_container_22_Template, 20, 8, "ng-container", 11)(23, EventFormModal_ng_container_23_Template, 17, 6, "ng-container", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "ion-button", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EventFormModal_Template_ion_button_click_24_listener() {
            return ctx.submit();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.editingId ? "Editar evento" : "Nuevo evento");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx.form.venueId);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.venues);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx.form.tipo);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx.form.nombre);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.form.tipo === "social");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.form.tipo === "intensivo");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.form.tipo === "congreso");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.editingId ? "Guardar cambios" : "Crear evento", " ");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_1__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_1__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_1__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_1__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_1__.IonButtons, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_1__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_1__.IonInput, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_1__.IonSelect, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_1__.IonSelectOption, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_1__.IonToggle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_1__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_1__.IonLabel],
      styles: [".form-field[_ngcontent-%COMP%] { padding: 8px 0; }\n    .section-title[_ngcontent-%COMP%] {\n      font-size: 11px;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.6px;\n      color: var(--lgui-text-3);\n      padding: 16px 0 4px;\n    }\n    ion-content[_ngcontent-%COMP%] {\n      --background: var(--ion-background-color, #ffffff);\n      --color: var(--ion-text-color, #19213D);\n    }\n    ion-input[_ngcontent-%COMP%], ion-select[_ngcontent-%COMP%] { color: var(--ion-text-color, #19213D); }\n  \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50LWZvcm0ubW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtJQUNJLGNBQWMsY0FBYyxFQUFFO0lBQzlCO01BQ0UsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQix5QkFBeUI7TUFDekIscUJBQXFCO01BQ3JCLHlCQUF5QjtNQUN6QixtQkFBbUI7SUFDckI7SUFDQTtNQUNFLGtEQUFrRDtNQUNsRCx1Q0FBdUM7SUFDekM7SUFDQSx3QkFBd0IscUNBQXFDLEVBQUUiLCJmaWxlIjoiZXZlbnQtZm9ybS5tb2RhbC50cyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIC5mb3JtLWZpZWxkIHsgcGFkZGluZzogOHB4IDA7IH1cbiAgICAuc2VjdGlvbi10aXRsZSB7XG4gICAgICBmb250LXNpemU6IDExcHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAwLjZweDtcbiAgICAgIGNvbG9yOiB2YXIoLS1sZ3VpLXRleHQtMyk7XG4gICAgICBwYWRkaW5nOiAxNnB4IDAgNHB4O1xuICAgIH1cbiAgICBpb24tY29udGVudCB7XG4gICAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1iYWNrZ3JvdW5kLWNvbG9yLCAjZmZmZmZmKTtcbiAgICAgIC0tY29sb3I6IHZhcigtLWlvbi10ZXh0LWNvbG9yLCAjMTkyMTNEKTtcbiAgICB9XG4gICAgaW9uLWlucHV0LCBpb24tc2VsZWN0IHsgY29sb3I6IHZhcigtLWlvbi10ZXh0LWNvbG9yLCAjMTkyMTNEKTsgfVxuICAiXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2FwcHMvbW9iaWxlLWFwcC9zcmMvYXBwL3BhZ2VzL2FkbWluL2V2ZW50LWZvcm0ubW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtJQUNJLGNBQWMsY0FBYyxFQUFFO0lBQzlCO01BQ0UsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQix5QkFBeUI7TUFDekIscUJBQXFCO01BQ3JCLHlCQUF5QjtNQUN6QixtQkFBbUI7SUFDckI7SUFDQTtNQUNFLGtEQUFrRDtNQUNsRCx1Q0FBdUM7SUFDekM7SUFDQSx3QkFBd0IscUNBQXFDLEVBQUU7O0FBRW5FLDRnQ0FBNGdDIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgLmZvcm0tZmllbGQgeyBwYWRkaW5nOiA4cHggMDsgfVxuICAgIC5zZWN0aW9uLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNnB4O1xuICAgICAgY29sb3I6IHZhcigtLWxndWktdGV4dC0zKTtcbiAgICAgIHBhZGRpbmc6IDE2cHggMCA0cHg7XG4gICAgfVxuICAgIGlvbi1jb250ZW50IHtcbiAgICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWJhY2tncm91bmQtY29sb3IsICNmZmZmZmYpO1xuICAgICAgLS1jb2xvcjogdmFyKC0taW9uLXRleHQtY29sb3IsICMxOTIxM0QpO1xuICAgIH1cbiAgICBpb24taW5wdXQsIGlvbi1zZWxlY3QgeyBjb2xvcjogdmFyKC0taW9uLXRleHQtY29sb3IsICMxOTIxM0QpOyB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=apps_mobile-app_src_app_pages_admin_admin-events_page_ts.js.map