"use strict";
(self["webpackChunkmobile_app"] = self["webpackChunkmobile_app"] || []).push([["apps_mobile-app_src_app_pages_calendar_calendar_page_ts"],{

/***/ 133:
/*!*****************************************************************!*\
  !*** ./apps/mobile-app/src/app/pages/calendar/calendar.page.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalendarPage: () => (/* binding */ CalendarPage)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular/standalone */ 1347);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _components_event_card_event_card_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/event-card/event-card.component */ 2819);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_events_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/events.service */ 2917);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular/standalone */ 8205);









function CalendarPage_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "ion-spinner", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function CalendarPage_div_10_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const h_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](h_r3);
  }
}
function CalendarPage_div_10_div_11_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "div", 26);
  }
  if (rf & 2) {
    const color_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("background", color_r6);
  }
}
function CalendarPage_div_10_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CalendarPage_div_10_div_11_Template_div_click_0_listener() {
      const cell_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectDate(cell_r5.date));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, CalendarPage_div_10_div_11_div_4_Template, 1, 2, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const cell_r5 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("out-month", !cell_r5.inMonth)("today", cell_r5.isToday)("selected", ctx_r1.isSameDay(cell_r5.date, ctx_r1.selectedDate));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](cell_r5.date.getDate());
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", cell_r5.dots.slice(0, 3));
  }
}
function CalendarPage_div_10_app_event_card_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-event-card", 27);
  }
  if (rf & 2) {
    const ev_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("event", ev_r7);
  }
}
function CalendarPage_div_10_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Sin eventos este d\u00EDa \uD83C\uDFB5 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function CalendarPage_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "div", 7)(2, "ion-button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CalendarPage_div_10_Template_ion_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.prevMonth());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "ion-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CalendarPage_div_10_Template_ion_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.nextMonth());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "ion-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, CalendarPage_div_10_div_9_Template, 2, 1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, CalendarPage_div_10_div_11_Template, 5, 8, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](12, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](15, CalendarPage_div_10_app_event_card_15_Template, 1, 1, "app-event-card", 18)(16, CalendarPage_div_10_div_16_Template, 2, 0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](17, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r1.monthTitle);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.dayHeaders);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.cells);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r1.selectedDayLabel);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.selectedEvents);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.selectedEvents.length === 0);
  }
}
const DAY_HEADERS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DAY_NAMES_FULL = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
/** Returns the Monday of the ISO week containing `date`. */
function getMondayOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}
const TIPO_DOT_COLOR = {
  social: '#4A90D9',
  intensivo: '#D07A2E',
  congreso: '#7B52AB'
};
class CalendarPage {
  constructor(eventsService, navCtrl) {
    this.eventsService = eventsService;
    this.navCtrl = navCtrl;
    this.loading = true;
    this.events = [];
    this.dayHeaders = DAY_HEADERS;
    /** First day of the displayed month */
    this.displayMonth = new Date();
    this.selectedDate = new Date();
    this.cells = [];
    (0,ionicons__WEBPACK_IMPORTED_MODULE_4__.a)({
      chevronBack: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.chevronBack,
      chevronForward: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.chevronForward
    });
    // Normalise to first of month
    this.displayMonth.setDate(1);
    this.displayMonth.setHours(0, 0, 0, 0);
    this.selectedDate.setHours(0, 0, 0, 0);
  }
  ionViewWillEnter() {
    this.eventsService.getWeeklyEvents().subscribe({
      next: evs => {
        this.events = evs;
        this.loading = false;
        this.buildCells();
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  goBack() {
    this.navCtrl.navigateBack('/tabs/home');
  }
  get monthTitle() {
    return `${MONTH_NAMES[this.displayMonth.getMonth()]} ${this.displayMonth.getFullYear()}`;
  }
  prevMonth() {
    this.displayMonth = new Date(this.displayMonth.getFullYear(), this.displayMonth.getMonth() - 1, 1);
    this.buildCells();
  }
  nextMonth() {
    this.displayMonth = new Date(this.displayMonth.getFullYear(), this.displayMonth.getMonth() + 1, 1);
    this.buildCells();
  }
  selectDate(date) {
    this.selectedDate = new Date(date);
  }
  isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
  get selectedDayLabel() {
    const d = this.selectedDate;
    const dayIdx = d.getDay() === 0 ? 6 : d.getDay() - 1; // 0=Mon
    return `${DAY_NAMES_FULL[dayIdx]} ${d.getDate()} de ${MONTH_NAMES[d.getMonth()].toLowerCase()}`;
  }
  get selectedEvents() {
    return this.eventsForDate(this.selectedDate);
  }
  // ── Grid builder ──────────────────────────────────────────────
  buildCells() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const year = this.displayMonth.getFullYear();
    const month = this.displayMonth.getMonth();
    // First cell: Monday of the week that contains the 1st of the month
    const firstOfMonth = new Date(year, month, 1);
    const startCell = getMondayOfWeek(firstOfMonth);
    // Build 6 weeks × 7 days = 42 cells
    this.cells = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startCell);
      date.setDate(startCell.getDate() + i);
      const inMonth = date.getMonth() === month;
      const isToday = this.isSameDay(date, today);
      const dots = this.dotsForDate(date);
      this.cells.push({
        date,
        inMonth,
        isToday,
        dots
      });
    }
    // Trim trailing empty rows (if the last row is all out-of-month)
    while (this.cells.length > 35) {
      const lastRow = this.cells.slice(-7);
      if (lastRow.every(c => !c.inMonth)) {
        this.cells.splice(-7);
      } else {
        break;
      }
    }
  }
  /**
   * Returns dot colors for a given date.
   * Since events are weekly recurring, an event with diaSemana=X
   * occurs on every week's X-th day (0=Mon…6=Sun).
   * We normalise the date's day-of-week to 0=Mon…6=Sun and match.
   */
  dotsForDate(date) {
    const jsDay = date.getDay(); // 0=Sun…6=Sat
    const normalised = jsDay === 0 ? 6 : jsDay - 1; // 0=Mon…6=Sun
    const colors = [];
    const seen = new Set(); // one dot per tipo
    for (const ev of this.events) {
      if ((ev.diaSemana ?? -1) === normalised) {
        const color = TIPO_DOT_COLOR[ev.tipo] ?? '#BAC0CC';
        if (!seen.has(color)) {
          seen.add(color);
          colors.push(color);
        }
      }
    }
    return colors;
  }
  /** Events for a specific date (matched by day-of-week). */
  eventsForDate(date) {
    const jsDay = date.getDay();
    const normalised = jsDay === 0 ? 6 : jsDay - 1;
    return this.events.filter(ev => (ev.diaSemana ?? -1) === normalised);
  }
  static {
    this.ɵfac = function CalendarPage_Factory(t) {
      return new (t || CalendarPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_events_service__WEBPACK_IMPORTED_MODULE_2__.EventsService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.NavController));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: CalendarPage,
      selectors: [["app-calendar"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
      decls: 11,
      vars: 2,
      consts: [["slot", "start"], [3, "click"], ["slot", "start", "name", "chevron-back"], ["style", "display:flex;justify-content:center;padding:40px 0", 4, "ngIf"], [4, "ngIf"], [2, "display", "flex", "justify-content", "center", "padding", "40px 0"], ["color", "primary"], [1, "month-nav"], ["fill", "clear", "size", "small", 3, "click"], ["slot", "icon-only", "name", "chevron-back"], [1, "month-title"], ["slot", "icon-only", "name", "chevron-forward"], [1, "day-headers"], ["class", "day-header-cell", 4, "ngFor", "ngForOf"], [1, "cal-grid"], ["class", "cal-cell", 3, "out-month", "today", "selected", "click", 4, "ngFor", "ngForOf"], [1, "divider"], [1, "selected-label"], [3, "event", 4, "ngFor", "ngForOf"], ["class", "no-events", 4, "ngIf"], [1, "bottom-space"], [1, "day-header-cell"], [1, "cal-cell", 3, "click"], [1, "day-num"], [1, "dots-row"], ["class", "dot", 3, "background", 4, "ngFor", "ngForOf"], [1, "dot"], [3, "event"], [1, "no-events"]],
      template: function CalendarPage_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 0)(3, "ion-button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CalendarPage_Template_ion_button_click_3_listener() {
            return ctx.goBack();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "ion-icon", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, " Agenda ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Calendario");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "ion-content");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, CalendarPage_div_9_Template, 2, 0, "div", 3)(10, CalendarPage_div_10_Template, 18, 6, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.loading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonButtons, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonSpinner, _components_event_card_event_card_component__WEBPACK_IMPORTED_MODULE_1__.EventCardComponent],
      styles: ["\n\n    .month-nav[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: var(--lgui-pad-sm) var(--lgui-pad-md) var(--lgui-gap-sm);\n    }\n    .month-title[_ngcontent-%COMP%] {\n      font-size: 17px;\n      font-weight: 700;\n      color: var(--lgui-text-4);\n    }\n\n    \n\n    .day-headers[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(7, 1fr);\n      padding: 0 var(--lgui-pad-md);\n      margin-bottom: 2px;\n    }\n    .day-header-cell[_ngcontent-%COMP%] {\n      text-align: center;\n      font-size: 11px;\n      font-weight: 700;\n      letter-spacing: 0.5px;\n      color: var(--lgui-text-3);\n      padding: 4px 0;\n    }\n    .cal-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(7, 1fr);\n      padding: 0 var(--lgui-pad-md);\n      gap: 2px 0;\n    }\n    .cal-cell[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      padding: 3px 0 4px;\n      cursor: pointer;\n      -webkit-tap-highlight-color: transparent;\n    }\n    .cal-cell.out-month[_ngcontent-%COMP%]   .day-num[_ngcontent-%COMP%] { opacity: 0.28; }\n\n    \n\n    .day-num[_ngcontent-%COMP%] {\n      width: 32px;\n      height: 32px;\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 13px;\n      font-weight: 500;\n      color: var(--lgui-text-4);\n      transition: background 0.12s;\n    }\n    .cal-cell.today[_ngcontent-%COMP%]   .day-num[_ngcontent-%COMP%] {\n      background: var(--lgui-surface-3);\n      font-weight: 700;\n    }\n    .cal-cell.selected[_ngcontent-%COMP%]   .day-num[_ngcontent-%COMP%] {\n      background: var(--ion-color-primary);\n      color: #fff;\n      font-weight: 700;\n    }\n    .cal-cell.selected.today[_ngcontent-%COMP%]   .day-num[_ngcontent-%COMP%] {\n      background: var(--ion-color-primary);\n    }\n\n    \n\n    .dots-row[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 3px;\n      margin-top: 2px;\n      height: 5px;\n      align-items: center;\n    }\n    .dot[_ngcontent-%COMP%] {\n      width: 5px;\n      height: 5px;\n      border-radius: 50%;\n      flex-shrink: 0;\n    }\n\n    \n\n    .divider[_ngcontent-%COMP%] {\n      height: 1px;\n      background: var(--lgui-border-2);\n      margin: var(--lgui-gap-md) var(--lgui-pad-md) 0;\n    }\n    .selected-label[_ngcontent-%COMP%] {\n      padding: var(--lgui-gap-md) var(--lgui-pad-md) var(--lgui-gap-sm);\n      font-size: 12px;\n      font-weight: 700;\n      letter-spacing: 0.6px;\n      text-transform: uppercase;\n      color: var(--lgui-text-3);\n    }\n    .no-events[_ngcontent-%COMP%] {\n      text-align: center;\n      padding: var(--lgui-space-6) var(--lgui-pad-md);\n      font-size: 14px;\n      color: var(--lgui-text-3);\n    }\n    .bottom-space[_ngcontent-%COMP%] { height: var(--lgui-space-8); }\n  \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGVuZGFyLnBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtJQUNJLG9EQUFvRDtJQUNwRDtNQUNFLGFBQWE7TUFDYixtQkFBbUI7TUFDbkIsOEJBQThCO01BQzlCLGlFQUFpRTtJQUNuRTtJQUNBO01BQ0UsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQix5QkFBeUI7SUFDM0I7O0lBRUEsb0RBQW9EO0lBQ3BEO01BQ0UsYUFBYTtNQUNiLHFDQUFxQztNQUNyQyw2QkFBNkI7TUFDN0Isa0JBQWtCO0lBQ3BCO0lBQ0E7TUFDRSxrQkFBa0I7TUFDbEIsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQixxQkFBcUI7TUFDckIseUJBQXlCO01BQ3pCLGNBQWM7SUFDaEI7SUFDQTtNQUNFLGFBQWE7TUFDYixxQ0FBcUM7TUFDckMsNkJBQTZCO01BQzdCLFVBQVU7SUFDWjtJQUNBO01BQ0UsYUFBYTtNQUNiLHNCQUFzQjtNQUN0QixtQkFBbUI7TUFDbkIsa0JBQWtCO01BQ2xCLGVBQWU7TUFDZix3Q0FBd0M7SUFDMUM7SUFDQSwrQkFBK0IsYUFBYSxFQUFFOztJQUU5QyxzQkFBc0I7SUFDdEI7TUFDRSxXQUFXO01BQ1gsWUFBWTtNQUNaLGtCQUFrQjtNQUNsQixhQUFhO01BQ2IsbUJBQW1CO01BQ25CLHVCQUF1QjtNQUN2QixlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLHlCQUF5QjtNQUN6Qiw0QkFBNEI7SUFDOUI7SUFDQTtNQUNFLGlDQUFpQztNQUNqQyxnQkFBZ0I7SUFDbEI7SUFDQTtNQUNFLG9DQUFvQztNQUNwQyxXQUFXO01BQ1gsZ0JBQWdCO0lBQ2xCO0lBQ0E7TUFDRSxvQ0FBb0M7SUFDdEM7O0lBRUEsZUFBZTtJQUNmO01BQ0UsYUFBYTtNQUNiLFFBQVE7TUFDUixlQUFlO01BQ2YsV0FBVztNQUNYLG1CQUFtQjtJQUNyQjtJQUNBO01BQ0UsVUFBVTtNQUNWLFdBQVc7TUFDWCxrQkFBa0I7TUFDbEIsY0FBYztJQUNoQjs7SUFFQSxvREFBb0Q7SUFDcEQ7TUFDRSxXQUFXO01BQ1gsZ0NBQWdDO01BQ2hDLCtDQUErQztJQUNqRDtJQUNBO01BQ0UsaUVBQWlFO01BQ2pFLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIscUJBQXFCO01BQ3JCLHlCQUF5QjtNQUN6Qix5QkFBeUI7SUFDM0I7SUFDQTtNQUNFLGtCQUFrQjtNQUNsQiwrQ0FBK0M7TUFDL0MsZUFBZTtNQUNmLHlCQUF5QjtJQUMzQjtJQUNBLGdCQUFnQiwyQkFBMkIsRUFBRSIsImZpbGUiOiJjYWxlbmRhci5wYWdlLnRzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgLyog4pSA4pSAIE1vbnRoIGhlYWRlciDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAgKi9cbiAgICAubW9udGgtbmF2IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgcGFkZGluZzogdmFyKC0tbGd1aS1wYWQtc20pIHZhcigtLWxndWktcGFkLW1kKSB2YXIoLS1sZ3VpLWdhcC1zbSk7XG4gICAgfVxuICAgIC5tb250aC10aXRsZSB7XG4gICAgICBmb250LXNpemU6IDE3cHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgY29sb3I6IHZhcigtLWxndWktdGV4dC00KTtcbiAgICB9XG5cbiAgICAvKiDilIDilIAgR3JpZCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAgKi9cbiAgICAuZGF5LWhlYWRlcnMge1xuICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIDFmcik7XG4gICAgICBwYWRkaW5nOiAwIHZhcigtLWxndWktcGFkLW1kKTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDJweDtcbiAgICB9XG4gICAgLmRheS1oZWFkZXItY2VsbCB7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBmb250LXNpemU6IDExcHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICAgICAgY29sb3I6IHZhcigtLWxndWktdGV4dC0zKTtcbiAgICAgIHBhZGRpbmc6IDRweCAwO1xuICAgIH1cbiAgICAuY2FsLWdyaWQge1xuICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIDFmcik7XG4gICAgICBwYWRkaW5nOiAwIHZhcigtLWxndWktcGFkLW1kKTtcbiAgICAgIGdhcDogMnB4IDA7XG4gICAgfVxuICAgIC5jYWwtY2VsbCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiAzcHggMCA0cHg7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICAuY2FsLWNlbGwub3V0LW1vbnRoIC5kYXktbnVtIHsgb3BhY2l0eTogMC4yODsgfVxuXG4gICAgLyogRGF5IG51bWJlciBjaXJjbGUgKi9cbiAgICAuZGF5LW51bSB7XG4gICAgICB3aWR0aDogMzJweDtcbiAgICAgIGhlaWdodDogMzJweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgY29sb3I6IHZhcigtLWxndWktdGV4dC00KTtcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4xMnM7XG4gICAgfVxuICAgIC5jYWwtY2VsbC50b2RheSAuZGF5LW51bSB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1sZ3VpLXN1cmZhY2UtMyk7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgIH1cbiAgICAuY2FsLWNlbGwuc2VsZWN0ZWQgLmRheS1udW0ge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgY29sb3I6ICNmZmY7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgIH1cbiAgICAuY2FsLWNlbGwuc2VsZWN0ZWQudG9kYXkgLmRheS1udW0ge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIH1cblxuICAgIC8qIEV2ZW50IGRvdHMgKi9cbiAgICAuZG90cy1yb3cge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogM3B4O1xuICAgICAgbWFyZ2luLXRvcDogMnB4O1xuICAgICAgaGVpZ2h0OiA1cHg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cbiAgICAuZG90IHtcbiAgICAgIHdpZHRoOiA1cHg7XG4gICAgICBoZWlnaHQ6IDVweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIH1cblxuICAgIC8qIOKUgOKUgCBTZWxlY3RlZCBkYXkgZXZlbnRzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgCAqL1xuICAgIC5kaXZpZGVyIHtcbiAgICAgIGhlaWdodDogMXB4O1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tbGd1aS1ib3JkZXItMik7XG4gICAgICBtYXJnaW46IHZhcigtLWxndWktZ2FwLW1kKSB2YXIoLS1sZ3VpLXBhZC1tZCkgMDtcbiAgICB9XG4gICAgLnNlbGVjdGVkLWxhYmVsIHtcbiAgICAgIHBhZGRpbmc6IHZhcigtLWxndWktZ2FwLW1kKSB2YXIoLS1sZ3VpLXBhZC1tZCkgdmFyKC0tbGd1aS1nYXAtc20pO1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAwLjZweDtcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICBjb2xvcjogdmFyKC0tbGd1aS10ZXh0LTMpO1xuICAgIH1cbiAgICAubm8tZXZlbnRzIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIHBhZGRpbmc6IHZhcigtLWxndWktc3BhY2UtNikgdmFyKC0tbGd1aS1wYWQtbWQpO1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgY29sb3I6IHZhcigtLWxndWktdGV4dC0zKTtcbiAgICB9XG4gICAgLmJvdHRvbS1zcGFjZSB7IGhlaWdodDogdmFyKC0tbGd1aS1zcGFjZS04KTsgfVxuICAiXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2FwcHMvbW9iaWxlLWFwcC9zcmMvYXBwL3BhZ2VzL2NhbGVuZGFyL2NhbGVuZGFyLnBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtJQUNJLG9EQUFvRDtJQUNwRDtNQUNFLGFBQWE7TUFDYixtQkFBbUI7TUFDbkIsOEJBQThCO01BQzlCLGlFQUFpRTtJQUNuRTtJQUNBO01BQ0UsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQix5QkFBeUI7SUFDM0I7O0lBRUEsb0RBQW9EO0lBQ3BEO01BQ0UsYUFBYTtNQUNiLHFDQUFxQztNQUNyQyw2QkFBNkI7TUFDN0Isa0JBQWtCO0lBQ3BCO0lBQ0E7TUFDRSxrQkFBa0I7TUFDbEIsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQixxQkFBcUI7TUFDckIseUJBQXlCO01BQ3pCLGNBQWM7SUFDaEI7SUFDQTtNQUNFLGFBQWE7TUFDYixxQ0FBcUM7TUFDckMsNkJBQTZCO01BQzdCLFVBQVU7SUFDWjtJQUNBO01BQ0UsYUFBYTtNQUNiLHNCQUFzQjtNQUN0QixtQkFBbUI7TUFDbkIsa0JBQWtCO01BQ2xCLGVBQWU7TUFDZix3Q0FBd0M7SUFDMUM7SUFDQSwrQkFBK0IsYUFBYSxFQUFFOztJQUU5QyxzQkFBc0I7SUFDdEI7TUFDRSxXQUFXO01BQ1gsWUFBWTtNQUNaLGtCQUFrQjtNQUNsQixhQUFhO01BQ2IsbUJBQW1CO01BQ25CLHVCQUF1QjtNQUN2QixlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLHlCQUF5QjtNQUN6Qiw0QkFBNEI7SUFDOUI7SUFDQTtNQUNFLGlDQUFpQztNQUNqQyxnQkFBZ0I7SUFDbEI7SUFDQTtNQUNFLG9DQUFvQztNQUNwQyxXQUFXO01BQ1gsZ0JBQWdCO0lBQ2xCO0lBQ0E7TUFDRSxvQ0FBb0M7SUFDdEM7O0lBRUEsZUFBZTtJQUNmO01BQ0UsYUFBYTtNQUNiLFFBQVE7TUFDUixlQUFlO01BQ2YsV0FBVztNQUNYLG1CQUFtQjtJQUNyQjtJQUNBO01BQ0UsVUFBVTtNQUNWLFdBQVc7TUFDWCxrQkFBa0I7TUFDbEIsY0FBYztJQUNoQjs7SUFFQSxvREFBb0Q7SUFDcEQ7TUFDRSxXQUFXO01BQ1gsZ0NBQWdDO01BQ2hDLCtDQUErQztJQUNqRDtJQUNBO01BQ0UsaUVBQWlFO01BQ2pFLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIscUJBQXFCO01BQ3JCLHlCQUF5QjtNQUN6Qix5QkFBeUI7SUFDM0I7SUFDQTtNQUNFLGtCQUFrQjtNQUNsQiwrQ0FBK0M7TUFDL0MsZUFBZTtNQUNmLHlCQUF5QjtJQUMzQjtJQUNBLGdCQUFnQiwyQkFBMkIsRUFBRTs7QUFFakQsdzdLQUF3N0siLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAvKiDDosKUwoDDosKUwoAgTW9udGggaGVhZGVyIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgCAqL1xuICAgIC5tb250aC1uYXYge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBwYWRkaW5nOiB2YXIoLS1sZ3VpLXBhZC1zbSkgdmFyKC0tbGd1aS1wYWQtbWQpIHZhcigtLWxndWktZ2FwLXNtKTtcbiAgICB9XG4gICAgLm1vbnRoLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMTdweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBjb2xvcjogdmFyKC0tbGd1aS10ZXh0LTQpO1xuICAgIH1cblxuICAgIC8qIMOiwpTCgMOiwpTCgCBHcmlkIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgCAqL1xuICAgIC5kYXktaGVhZGVycyB7XG4gICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNywgMWZyKTtcbiAgICAgIHBhZGRpbmc6IDAgdmFyKC0tbGd1aS1wYWQtbWQpO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMnB4O1xuICAgIH1cbiAgICAuZGF5LWhlYWRlci1jZWxsIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBsZXR0ZXItc3BhY2luZzogMC41cHg7XG4gICAgICBjb2xvcjogdmFyKC0tbGd1aS10ZXh0LTMpO1xuICAgICAgcGFkZGluZzogNHB4IDA7XG4gICAgfVxuICAgIC5jYWwtZ3JpZCB7XG4gICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNywgMWZyKTtcbiAgICAgIHBhZGRpbmc6IDAgdmFyKC0tbGd1aS1wYWQtbWQpO1xuICAgICAgZ2FwOiAycHggMDtcbiAgICB9XG4gICAgLmNhbC1jZWxsIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIHBhZGRpbmc6IDNweCAwIDRweDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICAgIC5jYWwtY2VsbC5vdXQtbW9udGggLmRheS1udW0geyBvcGFjaXR5OiAwLjI4OyB9XG5cbiAgICAvKiBEYXkgbnVtYmVyIGNpcmNsZSAqL1xuICAgIC5kYXktbnVtIHtcbiAgICAgIHdpZHRoOiAzMnB4O1xuICAgICAgaGVpZ2h0OiAzMnB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBjb2xvcjogdmFyKC0tbGd1aS10ZXh0LTQpO1xuICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjEycztcbiAgICB9XG4gICAgLmNhbC1jZWxsLnRvZGF5IC5kYXktbnVtIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWxndWktc3VyZmFjZS0zKTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgfVxuICAgIC5jYWwtY2VsbC5zZWxlY3RlZCAuZGF5LW51bSB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICBjb2xvcjogI2ZmZjtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgfVxuICAgIC5jYWwtY2VsbC5zZWxlY3RlZC50b2RheSAuZGF5LW51bSB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgfVxuXG4gICAgLyogRXZlbnQgZG90cyAqL1xuICAgIC5kb3RzLXJvdyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZ2FwOiAzcHg7XG4gICAgICBtYXJnaW4tdG9wOiAycHg7XG4gICAgICBoZWlnaHQ6IDVweDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxuICAgIC5kb3Qge1xuICAgICAgd2lkdGg6IDVweDtcbiAgICAgIGhlaWdodDogNXB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgfVxuXG4gICAgLyogw6LClMKAw6LClMKAIFNlbGVjdGVkIGRheSBldmVudHMgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAICovXG4gICAgLmRpdmlkZXIge1xuICAgICAgaGVpZ2h0OiAxcHg7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1sZ3VpLWJvcmRlci0yKTtcbiAgICAgIG1hcmdpbjogdmFyKC0tbGd1aS1nYXAtbWQpIHZhcigtLWxndWktcGFkLW1kKSAwO1xuICAgIH1cbiAgICAuc2VsZWN0ZWQtbGFiZWwge1xuICAgICAgcGFkZGluZzogdmFyKC0tbGd1aS1nYXAtbWQpIHZhcigtLWxndWktcGFkLW1kKSB2YXIoLS1sZ3VpLWdhcC1zbSk7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNnB4O1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgIGNvbG9yOiB2YXIoLS1sZ3VpLXRleHQtMyk7XG4gICAgfVxuICAgIC5uby1ldmVudHMge1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgcGFkZGluZzogdmFyKC0tbGd1aS1zcGFjZS02KSB2YXIoLS1sZ3VpLXBhZC1tZCk7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBjb2xvcjogdmFyKC0tbGd1aS10ZXh0LTMpO1xuICAgIH1cbiAgICAuYm90dG9tLXNwYWNlIHsgaGVpZ2h0OiB2YXIoLS1sZ3VpLXNwYWNlLTgpOyB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=apps_mobile-app_src_app_pages_calendar_calendar_page_ts.js.map