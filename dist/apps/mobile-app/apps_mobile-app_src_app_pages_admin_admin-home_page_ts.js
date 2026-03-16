"use strict";
(self["webpackChunkmobile_app"] = self["webpackChunkmobile_app"] || []).push([["apps_mobile-app_src_app_pages_admin_admin-home_page_ts"],{

/***/ 7013:
/*!****************************************************************!*\
  !*** ./apps/mobile-app/src/app/pages/admin/admin-home.page.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminHomePage: () => (/* binding */ AdminHomePage)
/* harmony export */ });
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular/standalone */ 1347);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular/standalone */ 8205);





class AdminHomePage {
  constructor(navCtrl) {
    this.navCtrl = navCtrl;
    (0,ionicons__WEBPACK_IMPORTED_MODULE_1__.a)({
      calendar: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.calendar,
      location: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.location,
      statsChart: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.statsChart,
      chevronBack: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.chevronBack,
      musicalNotes: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.musicalNotes,
      school: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.school
    });
  }
  goBack() {
    this.navCtrl.navigateBack('/tabs/profile');
  }
  go(path) {
    this.navCtrl.navigateForward(path);
  }
  static {
    this.ɵfac = function AdminHomePage_Factory(t) {
      return new (t || AdminHomePage)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.NavController));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: AdminHomePage,
      selectors: [["app-admin-home"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
      decls: 28,
      vars: 0,
      consts: [["slot", "start"], [3, "click"], ["slot", "start", "name", "chevron-back"], [1, "admin-header"], ["button", "", 3, "click"], ["name", "calendar", "slot", "start", "color", "primary"], ["name", "location", "slot", "start", "color", "primary"], ["name", "musical-notes", "slot", "start", "color", "primary"], ["name", "school", "slot", "start", "color", "primary"]],
      template: function AdminHomePage_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 0)(3, "ion-button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AdminHomePage_Template_ion_button_click_3_listener() {
            return ctx.goBack();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "ion-icon", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, " Perfil ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "ion-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Panel Admin");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "ion-content")(9, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Gesti\u00F3n");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "ion-list")(12, "ion-item", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AdminHomePage_Template_ion_item_click_12_listener() {
            return ctx.go("/admin/events");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "ion-icon", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "ion-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Eventos");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "ion-item", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AdminHomePage_Template_ion_item_click_16_listener() {
            return ctx.go("/admin/venues");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "ion-icon", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "ion-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "Locales");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "ion-item", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AdminHomePage_Template_ion_item_click_20_listener() {
            return ctx.go("/admin/estilos");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](21, "ion-icon", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "ion-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "Estilos de Baile");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "ion-item", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AdminHomePage_Template_ion_item_click_24_listener() {
            return ctx.go("/admin/academias");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](25, "ion-icon", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "ion-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](27, "Academias");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
        }
      },
      dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonList, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonButtons, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonButton],
      styles: [".admin-header[_ngcontent-%COMP%] {\n      padding: var(--lgui-pad-md);\n      font-size: 13px;\n      color: var(--lgui-text-3);\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.6px;\n    }\n  \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluLWhvbWUucGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0lBQ0k7TUFDRSwyQkFBMkI7TUFDM0IsZUFBZTtNQUNmLHlCQUF5QjtNQUN6QixnQkFBZ0I7TUFDaEIseUJBQXlCO01BQ3pCLHFCQUFxQjtJQUN2QiIsImZpbGUiOiJhZG1pbi1ob21lLnBhZ2UudHMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAuYWRtaW4taGVhZGVyIHtcbiAgICAgIHBhZGRpbmc6IHZhcigtLWxndWktcGFkLW1kKTtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGNvbG9yOiB2YXIoLS1sZ3VpLXRleHQtMyk7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAwLjZweDtcbiAgICB9XG4gICJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2FwcHMvbW9iaWxlLWFwcC9zcmMvYXBwL3BhZ2VzL2FkbWluL2FkbWluLWhvbWUucGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0lBQ0k7TUFDRSwyQkFBMkI7TUFDM0IsZUFBZTtNQUNmLHlCQUF5QjtNQUN6QixnQkFBZ0I7TUFDaEIseUJBQXlCO01BQ3pCLHFCQUFxQjtJQUN2Qjs7QUFFSix3bUJBQXdtQiIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIC5hZG1pbi1oZWFkZXIge1xuICAgICAgcGFkZGluZzogdmFyKC0tbGd1aS1wYWQtbWQpO1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgY29sb3I6IHZhcigtLWxndWktdGV4dC0zKTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNnB4O1xuICAgIH1cbiAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=apps_mobile-app_src_app_pages_admin_admin-home_page_ts.js.map