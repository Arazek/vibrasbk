"use strict";
(self["webpackChunkmobile_app"] = self["webpackChunkmobile_app"] || []).push([["common"],{

/***/ 2380:
/*!***********************************************************!*\
  !*** ./apps/mobile-app/src/app/services/admin.service.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminService: () => (/* binding */ AdminService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 3738);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);



class AdminService {
  constructor(http) {
    this.http = http;
    this.venuesBase = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/venues`;
    this.eventsBase = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/events`;
    this.stylesBase = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/dance-styles`;
    this.academiasBase = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/academias`;
  }
  // ─── Venues ────────────────────────────────────────────────────────────────
  getVenues() {
    return this.http.get(this.venuesBase);
  }
  createVenue(payload) {
    return this.http.post(this.venuesBase, payload);
  }
  updateVenue(id, payload) {
    return this.http.patch(`${this.venuesBase}/${id}`, payload);
  }
  deleteVenue(id) {
    return this.http.delete(`${this.venuesBase}/${id}`);
  }
  // ─── Events ────────────────────────────────────────────────────────────────
  getEvents() {
    return this.http.get(`${this.eventsBase}/week`);
  }
  createEvent(payload) {
    return this.http.post(this.eventsBase, payload);
  }
  updateEvent(id, payload) {
    return this.http.patch(`${this.eventsBase}/${id}`, payload);
  }
  deleteEvent(id) {
    return this.http.delete(`${this.eventsBase}/${id}`);
  }
  uploadEventPhoto(eventId, file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.eventsBase}/${eventId}/photo`, formData);
  }
  // ─── Dance Styles ──────────────────────────────────────────────────────────
  getDanceStyles() {
    return this.http.get(this.stylesBase);
  }
  createDanceStyle(payload) {
    return this.http.post(this.stylesBase, payload);
  }
  updateDanceStyle(id, payload) {
    return this.http.patch(`${this.stylesBase}/${id}`, payload);
  }
  deleteDanceStyle(id) {
    return this.http.delete(`${this.stylesBase}/${id}`);
  }
  // ─── Academias ─────────────────────────────────────────────────────────────
  getAcademias() {
    return this.http.get(this.academiasBase);
  }
  createAcademia(payload) {
    return this.http.post(this.academiasBase, payload);
  }
  updateAcademia(id, payload) {
    return this.http.patch(`${this.academiasBase}/${id}`, payload);
  }
  deleteAcademia(id) {
    return this.http.delete(`${this.academiasBase}/${id}`);
  }
  static {
    this.ɵfac = function AdminService_Factory(t) {
      return new (t || AdminService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: AdminService,
      factory: AdminService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 1021:
/*!**********************************************************************!*\
  !*** ./apps/mobile-app/src/app/services/onboarding-state.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OnboardingStateService: () => (/* binding */ OnboardingStateService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);

class OnboardingStateService {
  constructor() {
    this.state = {
      rol: null,
      nivel: null,
      estilos: [],
      academia: ''
    };
  }
  get() {
    return this.state;
  }
  set(partial) {
    this.state = {
      ...this.state,
      ...partial
    };
  }
  reset() {
    this.state = {
      rol: null,
      nivel: null,
      estilos: [],
      academia: ''
    };
  }
  isComplete() {
    return !!this.state.rol && !!this.state.nivel && this.state.estilos.length > 0;
  }
  static {
    this.ɵfac = function OnboardingStateService_Factory(t) {
      return new (t || OnboardingStateService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: OnboardingStateService,
      factory: OnboardingStateService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=common.js.map