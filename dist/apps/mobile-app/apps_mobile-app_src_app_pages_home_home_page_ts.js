"use strict";
(self["webpackChunkmobile_app"] = self["webpackChunkmobile_app"] || []).push([["apps_mobile-app_src_app_pages_home_home_page_ts"],{

/***/ 1535:
/*!*********************************************************!*\
  !*** ./apps/mobile-app/src/app/pages/home/home.page.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomePage: () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 1567);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular/standalone */ 1347);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _components_event_card_event_card_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/event-card/event-card.component */ 2819);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_events_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/events.service */ 2917);











function HomePage_div_20_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HomePage_div_20_button_3_Template_button_click_0_listener() {
      const c_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.setCiudad(c_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const c_r4 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("active", ctx_r1.selectedCiudad === c_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", c_r4, " ");
  }
}
function HomePage_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 7)(1, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HomePage_div_20_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.setCiudad(null));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, " \uD83D\uDCCD Todas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, HomePage_div_20_button_3_Template, 2, 3, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("active", !ctx_r1.selectedCiudad);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.availableCities);
  }
}
function HomePage_div_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "ion-spinner", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function HomePage_div_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 20)(1, "ion-text", 21)(2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ion-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HomePage_div_24_Template_ion_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.load(null));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Reintentar");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r1.error);
  }
}
function HomePage_div_25_div_1_app_event_card_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-event-card", 29);
  }
  if (rf & 2) {
    const ev_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("event", ev_r6);
  }
}
function HomePage_div_25_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 26)(1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, HomePage_div_25_div_1_app_event_card_3_Template, 1, 1, "app-event-card", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](group_r7.dayName);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", group_r7.events);
  }
}
function HomePage_div_25_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30)(1, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\uD83C\uDFB5");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Sin eventos esta semana");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "No hay sociales programados.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "\u00A1Vuelve pronto!");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function HomePage_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, HomePage_div_25_div_1_Template, 4, 2, "div", 24)(2, HomePage_div_25_div_2_Template, 9, 0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.grouped);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.grouped.length === 0);
  }
}
const DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const MONTH_NAMES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
class HomePage {
  constructor(eventsService, router) {
    this.eventsService = eventsService;
    this.router = router;
    this.loading = true;
    this.error = '';
    this.grouped = [];
    this.selectedTipo = null;
    this.selectedCiudad = null;
    this.availableCities = [];
    this.allLoadedEvents = [];
    (0,ionicons__WEBPACK_IMPORTED_MODULE_4__.a)({
      musicalNotes: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.musicalNotes,
      calendar: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.calendar
    });
    // Reload every time the router lands on /tabs/home (initial + return from event detail)
    this.navSub = this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.filter)(e => e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_6__.NavigationEnd && e.urlAfterRedirects === '/tabs/home')).subscribe(() => this.load(null));
  }
  ngOnDestroy() {
    this.navSub.unsubscribe();
  }
  openCalendar() {
    this.router.navigate(['/calendar']);
  }
  setTipo(tipo) {
    this.selectedTipo = tipo;
    this.load(null);
  }
  setCiudad(ciudad) {
    this.selectedCiudad = ciudad;
    this.applyFilters();
  }
  load(refresher) {
    this.loading = !refresher;
    this.error = '';
    this.eventsService.getWeeklyEvents(this.selectedTipo ?? undefined).subscribe({
      next: events => {
        this.allLoadedEvents = events;
        this.availableCities = [...new Set(events.map(e => e.venue?.ciudad).filter(c => !!c))];
        if (this.selectedCiudad && !this.availableCities.includes(this.selectedCiudad)) {
          this.selectedCiudad = null;
        }
        this.applyFilters();
        this.loading = false;
        refresher?.complete();
      },
      error: () => {
        this.error = 'No se pudo cargar la agenda.';
        this.loading = false;
        refresher?.complete();
      }
    });
  }
  applyFilters() {
    const filtered = this.selectedCiudad ? this.allLoadedEvents.filter(e => e.venue?.ciudad === this.selectedCiudad) : this.allLoadedEvents;
    this.grouped = this.groupByDay(filtered);
  }
  groupByDay(events) {
    const map = new Map();
    for (const ev of events) {
      // Parsear "YYYY-MM-DD" como fecha local para evitar el desfase UTC
      const [yr, mo, dy] = ev.eventDate.split('-').map(Number);
      const d = new Date(yr, mo - 1, dy);
      const normalized = d.getDay() === 0 ? 6 : d.getDay() - 1;
      if (!map.has(normalized)) map.set(normalized, {
        date: d,
        events: []
      });
      map.get(normalized).events.push(ev);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a - b).map(([day, {
      date,
      events: evs
    }]) => ({
      dayName: `${DAY_NAMES[day]} ${date.getDate()} de ${MONTH_NAMES[date.getMonth()]}`,
      events: evs
    }));
  }
  static {
    this.ɵfac = function HomePage_Factory(t) {
      return new (t || HomePage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_events_service__WEBPACK_IMPORTED_MODULE_2__.EventsService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: HomePage,
      selectors: [["app-home"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
      decls: 26,
      vars: 12,
      consts: [["slot", "start"], [1, "brand-slot"], ["name", "musical-notes", 1, "brand-icon"], [1, "brand-name"], ["slot", "end"], [3, "click"], ["slot", "icon-only", "name", "calendar"], [1, "filter-bar"], [1, "filter-chip", 3, "click"], [1, "filter-chip", "tipo-social", 3, "click"], [1, "filter-chip", "tipo-intensivo", 3, "click"], [1, "filter-chip", "tipo-congreso", 3, "click"], ["class", "filter-bar", 4, "ngIf"], ["slot", "fixed", 3, "ionRefresh"], ["class", "loading-container", 4, "ngIf"], ["class", "ion-padding", 4, "ngIf"], ["class", "content-area", 4, "ngIf"], ["class", "filter-chip", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "loading-container"], ["color", "primary"], [1, "ion-padding"], ["color", "danger"], ["expand", "block", 3, "click"], [1, "content-area"], ["class", "day-group", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], [1, "day-group"], [1, "day-header"], [3, "event", 4, "ngFor", "ngForOf"], [3, "event"], [1, "empty-state"], [1, "empty-icon"], [1, "empty-title"], [1, "empty-subtitle"]],
      template: function HomePage_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 0)(3, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "ion-icon", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "span", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Predictor");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "ion-buttons", 4)(8, "ion-button", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HomePage_Template_ion_button_click_8_listener() {
            return ctx.openCalendar();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](9, "ion-icon", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "ion-content")(11, "div", 7)(12, "button", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HomePage_Template_button_click_12_listener() {
            return ctx.setTipo(null);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, " Todos ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "button", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HomePage_Template_button_click_14_listener() {
            return ctx.setTipo("social");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, " Social ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "button", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HomePage_Template_button_click_16_listener() {
            return ctx.setTipo("intensivo");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, " Intensivo ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "button", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HomePage_Template_button_click_18_listener() {
            return ctx.setTipo("congreso");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, " Congreso ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](20, HomePage_div_20_Template, 4, 3, "div", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "ion-refresher", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ionRefresh", function HomePage_Template_ion_refresher_ionRefresh_21_listener($event) {
            return ctx.load($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](22, "ion-refresher-content");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](23, HomePage_div_23_Template, 2, 0, "div", 14)(24, HomePage_div_24_Template, 6, 1, "div", 15)(25, HomePage_div_25_Template, 3, 2, "div", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](12);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("active", !ctx.selectedTipo);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("active", ctx.selectedTipo === "social");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("active", ctx.selectedTipo === "intensivo");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("active", ctx.selectedTipo === "congreso");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.availableCities.length > 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.error);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.loading && !ctx.error);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonSpinner, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonText, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonButtons, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonRefresher, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonRefresherContent, _components_event_card_event_card_component__WEBPACK_IMPORTED_MODULE_1__.EventCardComponent],
      styles: [".brand-slot[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      padding-left: 4px;\n    }\n    .brand-icon[_ngcontent-%COMP%] { font-size: 22px; color: var(--ion-color-primary); }\n    .brand-name[_ngcontent-%COMP%] {\n      font-size: 16px;\n      font-weight: 700;\n      color: var(--lgui-text-4);\n      letter-spacing: -0.3px;\n    }\n    .filter-bar[_ngcontent-%COMP%] {\n      display: flex;\n      gap: var(--lgui-gap-sm);\n      padding: var(--lgui-space-3) var(--lgui-pad-md);\n      overflow-x: auto;\n      overflow-y: hidden;\n      border-bottom: 1px solid var(--lgui-border-2);\n      background: var(--lgui-surface-1);\n      \n\n      scrollbar-width: none;\n    }\n    .filter-bar[_ngcontent-%COMP%]::-webkit-scrollbar { display: none; }\n    .filter-chip[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      height: 30px;\n      padding: 0 var(--lgui-space-3);\n      border-radius: var(--lgui-radius-pill);\n      font-size: 13px;\n      font-weight: 600;\n      cursor: pointer;\n      flex-shrink: 0;\n      transition: background 0.15s, color 0.15s;\n      background: var(--lgui-surface-3);\n      color: var(--lgui-text-3);\n      border: none;\n      -webkit-user-select: none;\n              user-select: none;\n    }\n    .filter-chip.active[_ngcontent-%COMP%] {\n      background: var(--ion-color-primary);\n      color: #fff;\n    }\n    .filter-chip.active.tipo-social[_ngcontent-%COMP%]   { background: var(--tipo-social-color, #4A90D9); }\n    .filter-chip.active.tipo-intensivo[_ngcontent-%COMP%] { background: var(--tipo-taller-color, #D07A2E); }\n    .filter-chip.active.tipo-congreso[_ngcontent-%COMP%] { background: var(--tipo-congreso-color, #7B52AB); }\n    .day-header[_ngcontent-%COMP%] {\n      padding: var(--lgui-space-5) var(--lgui-pad-md) var(--lgui-space-1);\n      font-size: 11px;\n      font-weight: 700;\n      letter-spacing: 1px;\n      text-transform: uppercase;\n      color: var(--lgui-text-3);\n    }\n    .day-group[_ngcontent-%COMP%] {\n      margin-bottom: var(--lgui-gap-sm);\n    }\n    .content-area[_ngcontent-%COMP%] {\n      padding-bottom: var(--lgui-space-8);\n    }\n    .loading-container[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      padding: var(--lgui-space-9) 0;\n    }\n    .empty-state[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      padding: var(--lgui-space-10) var(--lgui-space-6);\n      text-align: center;\n    }\n    .empty-icon[_ngcontent-%COMP%] {\n      font-size: 56px;\n      margin-bottom: var(--lgui-gap-lg);\n      line-height: 1;\n    }\n    .empty-title[_ngcontent-%COMP%] {\n      font-size: 17px;\n      font-weight: 600;\n      color: var(--lgui-text-4);\n      margin-bottom: var(--lgui-gap-sm);\n    }\n    .empty-subtitle[_ngcontent-%COMP%] {\n      font-size: 14px;\n      color: var(--lgui-text-3);\n      line-height: 1.6;\n    }\n  \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUucGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0lBQ0k7TUFDRSxhQUFhO01BQ2IsbUJBQW1CO01BQ25CLFFBQVE7TUFDUixpQkFBaUI7SUFDbkI7SUFDQSxjQUFjLGVBQWUsRUFBRSwrQkFBK0IsRUFBRTtJQUNoRTtNQUNFLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIseUJBQXlCO01BQ3pCLHNCQUFzQjtJQUN4QjtJQUNBO01BQ0UsYUFBYTtNQUNiLHVCQUF1QjtNQUN2QiwrQ0FBK0M7TUFDL0MsZ0JBQWdCO01BQ2hCLGtCQUFrQjtNQUNsQiw2Q0FBNkM7TUFDN0MsaUNBQWlDO01BQ2pDLG1DQUFtQztNQUNuQyxxQkFBcUI7SUFDdkI7SUFDQSxpQ0FBaUMsYUFBYSxFQUFFO0lBQ2hEO01BQ0Usb0JBQW9CO01BQ3BCLG1CQUFtQjtNQUNuQixZQUFZO01BQ1osOEJBQThCO01BQzlCLHNDQUFzQztNQUN0QyxlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLGVBQWU7TUFDZixjQUFjO01BQ2QseUNBQXlDO01BQ3pDLGlDQUFpQztNQUNqQyx5QkFBeUI7TUFDekIsWUFBWTtNQUNaLHlCQUFpQjtjQUFqQixpQkFBaUI7SUFDbkI7SUFDQTtNQUNFLG9DQUFvQztNQUNwQyxXQUFXO0lBQ2I7SUFDQSxvQ0FBb0MsNkNBQTZDLEVBQUU7SUFDbkYscUNBQXFDLDZDQUE2QyxFQUFFO0lBQ3BGLG9DQUFvQywrQ0FBK0MsRUFBRTtJQUNyRjtNQUNFLG1FQUFtRTtNQUNuRSxlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLG1CQUFtQjtNQUNuQix5QkFBeUI7TUFDekIseUJBQXlCO0lBQzNCO0lBQ0E7TUFDRSxpQ0FBaUM7SUFDbkM7SUFDQTtNQUNFLG1DQUFtQztJQUNyQztJQUNBO01BQ0UsYUFBYTtNQUNiLHVCQUF1QjtNQUN2QixtQkFBbUI7TUFDbkIsOEJBQThCO0lBQ2hDO0lBQ0E7TUFDRSxhQUFhO01BQ2Isc0JBQXNCO01BQ3RCLG1CQUFtQjtNQUNuQix1QkFBdUI7TUFDdkIsaURBQWlEO01BQ2pELGtCQUFrQjtJQUNwQjtJQUNBO01BQ0UsZUFBZTtNQUNmLGlDQUFpQztNQUNqQyxjQUFjO0lBQ2hCO0lBQ0E7TUFDRSxlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLHlCQUF5QjtNQUN6QixpQ0FBaUM7SUFDbkM7SUFDQTtNQUNFLGVBQWU7TUFDZix5QkFBeUI7TUFDekIsZ0JBQWdCO0lBQ2xCIiwiZmlsZSI6ImhvbWUucGFnZS50cyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIC5icmFuZC1zbG90IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA2cHg7XG4gICAgICBwYWRkaW5nLWxlZnQ6IDRweDtcbiAgICB9XG4gICAgLmJyYW5kLWljb24geyBmb250LXNpemU6IDIycHg7IGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7IH1cbiAgICAuYnJhbmQtbmFtZSB7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgY29sb3I6IHZhcigtLWxndWktdGV4dC00KTtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAtMC4zcHg7XG4gICAgfVxuICAgIC5maWx0ZXItYmFyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IHZhcigtLWxndWktZ2FwLXNtKTtcbiAgICAgIHBhZGRpbmc6IHZhcigtLWxndWktc3BhY2UtMykgdmFyKC0tbGd1aS1wYWQtbWQpO1xuICAgICAgb3ZlcmZsb3cteDogYXV0bztcbiAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1sZ3VpLWJvcmRlci0yKTtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWxndWktc3VyZmFjZS0xKTtcbiAgICAgIC8qIEhpZGUgc2Nyb2xsYmFyIGJ1dCBrZWVwIHNjcm9sbCAqL1xuICAgICAgc2Nyb2xsYmFyLXdpZHRoOiBub25lO1xuICAgIH1cbiAgICAuZmlsdGVyLWJhcjo6LXdlYmtpdC1zY3JvbGxiYXIgeyBkaXNwbGF5OiBub25lOyB9XG4gICAgLmZpbHRlci1jaGlwIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGhlaWdodDogMzBweDtcbiAgICAgIHBhZGRpbmc6IDAgdmFyKC0tbGd1aS1zcGFjZS0zKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWxndWktcmFkaXVzLXBpbGwpO1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1cywgY29sb3IgMC4xNXM7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1sZ3VpLXN1cmZhY2UtMyk7XG4gICAgICBjb2xvcjogdmFyKC0tbGd1aS10ZXh0LTMpO1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgfVxuICAgIC5maWx0ZXItY2hpcC5hY3RpdmUge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgY29sb3I6ICNmZmY7XG4gICAgfVxuICAgIC5maWx0ZXItY2hpcC5hY3RpdmUudGlwby1zb2NpYWwgICB7IGJhY2tncm91bmQ6IHZhcigtLXRpcG8tc29jaWFsLWNvbG9yLCAjNEE5MEQ5KTsgfVxuICAgIC5maWx0ZXItY2hpcC5hY3RpdmUudGlwby1pbnRlbnNpdm8geyBiYWNrZ3JvdW5kOiB2YXIoLS10aXBvLXRhbGxlci1jb2xvciwgI0QwN0EyRSk7IH1cbiAgICAuZmlsdGVyLWNoaXAuYWN0aXZlLnRpcG8tY29uZ3Jlc28geyBiYWNrZ3JvdW5kOiB2YXIoLS10aXBvLWNvbmdyZXNvLWNvbG9yLCAjN0I1MkFCKTsgfVxuICAgIC5kYXktaGVhZGVyIHtcbiAgICAgIHBhZGRpbmc6IHZhcigtLWxndWktc3BhY2UtNSkgdmFyKC0tbGd1aS1wYWQtbWQpIHZhcigtLWxndWktc3BhY2UtMSk7XG4gICAgICBmb250LXNpemU6IDExcHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDFweDtcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICBjb2xvcjogdmFyKC0tbGd1aS10ZXh0LTMpO1xuICAgIH1cbiAgICAuZGF5LWdyb3VwIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IHZhcigtLWxndWktZ2FwLXNtKTtcbiAgICB9XG4gICAgLmNvbnRlbnQtYXJlYSB7XG4gICAgICBwYWRkaW5nLWJvdHRvbTogdmFyKC0tbGd1aS1zcGFjZS04KTtcbiAgICB9XG4gICAgLmxvYWRpbmctY29udGFpbmVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiB2YXIoLS1sZ3VpLXNwYWNlLTkpIDA7XG4gICAgfVxuICAgIC5lbXB0eS1zdGF0ZSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIHBhZGRpbmc6IHZhcigtLWxndWktc3BhY2UtMTApIHZhcigtLWxndWktc3BhY2UtNik7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuICAgIC5lbXB0eS1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogNTZweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IHZhcigtLWxndWktZ2FwLWxnKTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxO1xuICAgIH1cbiAgICAuZW1wdHktdGl0bGUge1xuICAgICAgZm9udC1zaXplOiAxN3B4O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1sZ3VpLXRleHQtNCk7XG4gICAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1sZ3VpLWdhcC1zbSk7XG4gICAgfVxuICAgIC5lbXB0eS1zdWJ0aXRsZSB7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBjb2xvcjogdmFyKC0tbGd1aS10ZXh0LTMpO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNjtcbiAgICB9XG4gICJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2FwcHMvbW9iaWxlLWFwcC9zcmMvYXBwL3BhZ2VzL2hvbWUvaG9tZS5wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7SUFDSTtNQUNFLGFBQWE7TUFDYixtQkFBbUI7TUFDbkIsUUFBUTtNQUNSLGlCQUFpQjtJQUNuQjtJQUNBLGNBQWMsZUFBZSxFQUFFLCtCQUErQixFQUFFO0lBQ2hFO01BQ0UsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQix5QkFBeUI7TUFDekIsc0JBQXNCO0lBQ3hCO0lBQ0E7TUFDRSxhQUFhO01BQ2IsdUJBQXVCO01BQ3ZCLCtDQUErQztNQUMvQyxnQkFBZ0I7TUFDaEIsa0JBQWtCO01BQ2xCLDZDQUE2QztNQUM3QyxpQ0FBaUM7TUFDakMsbUNBQW1DO01BQ25DLHFCQUFxQjtJQUN2QjtJQUNBLGlDQUFpQyxhQUFhLEVBQUU7SUFDaEQ7TUFDRSxvQkFBb0I7TUFDcEIsbUJBQW1CO01BQ25CLFlBQVk7TUFDWiw4QkFBOEI7TUFDOUIsc0NBQXNDO01BQ3RDLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIsZUFBZTtNQUNmLGNBQWM7TUFDZCx5Q0FBeUM7TUFDekMsaUNBQWlDO01BQ2pDLHlCQUF5QjtNQUN6QixZQUFZO01BQ1oseUJBQWlCO2NBQWpCLGlCQUFpQjtJQUNuQjtJQUNBO01BQ0Usb0NBQW9DO01BQ3BDLFdBQVc7SUFDYjtJQUNBLG9DQUFvQyw2Q0FBNkMsRUFBRTtJQUNuRixxQ0FBcUMsNkNBQTZDLEVBQUU7SUFDcEYsb0NBQW9DLCtDQUErQyxFQUFFO0lBQ3JGO01BQ0UsbUVBQW1FO01BQ25FLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIsbUJBQW1CO01BQ25CLHlCQUF5QjtNQUN6Qix5QkFBeUI7SUFDM0I7SUFDQTtNQUNFLGlDQUFpQztJQUNuQztJQUNBO01BQ0UsbUNBQW1DO0lBQ3JDO0lBQ0E7TUFDRSxhQUFhO01BQ2IsdUJBQXVCO01BQ3ZCLG1CQUFtQjtNQUNuQiw4QkFBOEI7SUFDaEM7SUFDQTtNQUNFLGFBQWE7TUFDYixzQkFBc0I7TUFDdEIsbUJBQW1CO01BQ25CLHVCQUF1QjtNQUN2QixpREFBaUQ7TUFDakQsa0JBQWtCO0lBQ3BCO0lBQ0E7TUFDRSxlQUFlO01BQ2YsaUNBQWlDO01BQ2pDLGNBQWM7SUFDaEI7SUFDQTtNQUNFLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIseUJBQXlCO01BQ3pCLGlDQUFpQztJQUNuQztJQUNBO01BQ0UsZUFBZTtNQUNmLHlCQUF5QjtNQUN6QixnQkFBZ0I7SUFDbEI7O0FBR0osb2tLQUFva0siLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAuYnJhbmQtc2xvdCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogNnB4O1xuICAgICAgcGFkZGluZy1sZWZ0OiA0cHg7XG4gICAgfVxuICAgIC5icmFuZC1pY29uIHsgZm9udC1zaXplOiAyMnB4OyBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpOyB9XG4gICAgLmJyYW5kLW5hbWUge1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1sZ3VpLXRleHQtNCk7XG4gICAgICBsZXR0ZXItc3BhY2luZzogLTAuM3B4O1xuICAgIH1cbiAgICAuZmlsdGVyLWJhciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZ2FwOiB2YXIoLS1sZ3VpLWdhcC1zbSk7XG4gICAgICBwYWRkaW5nOiB2YXIoLS1sZ3VpLXNwYWNlLTMpIHZhcigtLWxndWktcGFkLW1kKTtcbiAgICAgIG92ZXJmbG93LXg6IGF1dG87XG4gICAgICBvdmVyZmxvdy15OiBoaWRkZW47XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tbGd1aS1ib3JkZXItMik7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1sZ3VpLXN1cmZhY2UtMSk7XG4gICAgICAvKiBIaWRlIHNjcm9sbGJhciBidXQga2VlcCBzY3JvbGwgKi9cbiAgICAgIHNjcm9sbGJhci13aWR0aDogbm9uZTtcbiAgICB9XG4gICAgLmZpbHRlci1iYXI6Oi13ZWJraXQtc2Nyb2xsYmFyIHsgZGlzcGxheTogbm9uZTsgfVxuICAgIC5maWx0ZXItY2hpcCB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBoZWlnaHQ6IDMwcHg7XG4gICAgICBwYWRkaW5nOiAwIHZhcigtLWxndWktc3BhY2UtMyk7XG4gICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1sZ3VpLXJhZGl1cy1waWxsKTtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBmbGV4LXNocmluazogMDtcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4xNXMsIGNvbG9yIDAuMTVzO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tbGd1aS1zdXJmYWNlLTMpO1xuICAgICAgY29sb3I6IHZhcigtLWxndWktdGV4dC0zKTtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIH1cbiAgICAuZmlsdGVyLWNoaXAuYWN0aXZlIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgIH1cbiAgICAuZmlsdGVyLWNoaXAuYWN0aXZlLnRpcG8tc29jaWFsICAgeyBiYWNrZ3JvdW5kOiB2YXIoLS10aXBvLXNvY2lhbC1jb2xvciwgIzRBOTBEOSk7IH1cbiAgICAuZmlsdGVyLWNoaXAuYWN0aXZlLnRpcG8taW50ZW5zaXZvIHsgYmFja2dyb3VuZDogdmFyKC0tdGlwby10YWxsZXItY29sb3IsICNEMDdBMkUpOyB9XG4gICAgLmZpbHRlci1jaGlwLmFjdGl2ZS50aXBvLWNvbmdyZXNvIHsgYmFja2dyb3VuZDogdmFyKC0tdGlwby1jb25ncmVzby1jb2xvciwgIzdCNTJBQik7IH1cbiAgICAuZGF5LWhlYWRlciB7XG4gICAgICBwYWRkaW5nOiB2YXIoLS1sZ3VpLXNwYWNlLTUpIHZhcigtLWxndWktcGFkLW1kKSB2YXIoLS1sZ3VpLXNwYWNlLTEpO1xuICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgY29sb3I6IHZhcigtLWxndWktdGV4dC0zKTtcbiAgICB9XG4gICAgLmRheS1ncm91cCB7XG4gICAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1sZ3VpLWdhcC1zbSk7XG4gICAgfVxuICAgIC5jb250ZW50LWFyZWEge1xuICAgICAgcGFkZGluZy1ib3R0b206IHZhcigtLWxndWktc3BhY2UtOCk7XG4gICAgfVxuICAgIC5sb2FkaW5nLWNvbnRhaW5lciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgcGFkZGluZzogdmFyKC0tbGd1aS1zcGFjZS05KSAwO1xuICAgIH1cbiAgICAuZW1wdHktc3RhdGUge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiB2YXIoLS1sZ3VpLXNwYWNlLTEwKSB2YXIoLS1sZ3VpLXNwYWNlLTYpO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIH1cbiAgICAuZW1wdHktaWNvbiB7XG4gICAgICBmb250LXNpemU6IDU2cHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1sZ3VpLWdhcC1sZyk7XG4gICAgICBsaW5lLWhlaWdodDogMTtcbiAgICB9XG4gICAgLmVtcHR5LXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMTdweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogdmFyKC0tbGd1aS10ZXh0LTQpO1xuICAgICAgbWFyZ2luLWJvdHRvbTogdmFyKC0tbGd1aS1nYXAtc20pO1xuICAgIH1cbiAgICAuZW1wdHktc3VidGl0bGUge1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgY29sb3I6IHZhcigtLWxndWktdGV4dC0zKTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjY7XG4gICAgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=apps_mobile-app_src_app_pages_home_home_page_ts.js.map