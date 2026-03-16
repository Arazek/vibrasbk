(self["webpackChunkmobile_app"] = self["webpackChunkmobile_app"] || []).push([["main"],{

/***/ 6377:
/*!**************************************************!*\
  !*** ./apps/mobile-app/src/app/app.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular/standalone */ 1347);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);


class AppComponent {
  constructor() {
    this.title = 'mobile-app';
  }
  static {
    this.ɵfac = function AppComponent_Factory(t) {
      return new (t || AppComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
      decls: 2,
      vars: 0,
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-app");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ion-router-outlet");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_1__.IonApp, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_1__.IonRouterOutlet],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 9763:
/*!***********************************************!*\
  !*** ./apps/mobile-app/src/app/app.routes.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   routes: () => (/* binding */ routes)
/* harmony export */ });
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./guards/auth.guard */ 7914);
/* harmony import */ var _guards_admin_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./guards/admin.guard */ 7719);
/* harmony import */ var _guards_onboarding_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./guards/onboarding.guard */ 7673);
/* harmony import */ var _pages_tabs_tabs_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/tabs/tabs.page */ 9194);




const routes = [{
  path: '',
  redirectTo: '/tabs/home',
  pathMatch: 'full'
},
// Login — blocked if already authenticated
{
  path: 'login',
  canActivate: [_guards_onboarding_guard__WEBPACK_IMPORTED_MODULE_2__.onboardingGuard],
  loadComponent: () => __webpack_require__.e(/*! import() */ "apps_mobile-app_src_app_pages_login_login_page_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/login/login.page */ 6571)).then(m => m.LoginPage)
},
// Onboarding flow — blocked if already authenticated
{
  path: 'onboarding/ciudad',
  canActivate: [_guards_onboarding_guard__WEBPACK_IMPORTED_MODULE_2__.onboardingGuard],
  loadComponent: () => __webpack_require__.e(/*! import() */ "apps_mobile-app_src_app_pages_onboarding_ciudad_onboarding-ciudad_page_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/onboarding/ciudad/onboarding-ciudad.page */ 5337)).then(m => m.OnboardingCiudadPage)
}, {
  path: 'onboarding/rol',
  canActivate: [_guards_onboarding_guard__WEBPACK_IMPORTED_MODULE_2__.onboardingGuard],
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("apps_mobile-app_src_app_pages_onboarding_rol_onboarding-rol_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/onboarding/rol/onboarding-rol.page */ 1309)).then(m => m.OnboardingRolPage)
}, {
  path: 'onboarding/nivel',
  canActivate: [_guards_onboarding_guard__WEBPACK_IMPORTED_MODULE_2__.onboardingGuard],
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("apps_mobile-app_src_app_pages_onboarding_nivel_onboarding-nivel_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/onboarding/nivel/onboarding-nivel.page */ 6627)).then(m => m.OnboardingNivelPage)
}, {
  path: 'onboarding/estilos',
  canActivate: [_guards_onboarding_guard__WEBPACK_IMPORTED_MODULE_2__.onboardingGuard],
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("apps_mobile-app_src_app_pages_onboarding_estilos_onboarding-estilos_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/onboarding/estilos/onboarding-estilos.page */ 7957)).then(m => m.OnboardingEstilosPage)
},
// Authenticated tabs shell
{
  path: 'tabs',
  component: _pages_tabs_tabs_page__WEBPACK_IMPORTED_MODULE_3__.TabsPage,
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.authGuard],
  children: [{
    path: 'home',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-apps_mobile-app_src_app_components_event-card_event-card_component_ts-apps_mobile-app-bb7550"), __webpack_require__.e("apps_mobile-app_src_app_pages_home_home_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/home/home.page */ 1535)).then(m => m.HomePage)
  }, {
    path: 'profile',
    loadComponent: () => __webpack_require__.e(/*! import() */ "apps_mobile-app_src_app_pages_profile_profile_page_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/profile/profile.page */ 8267)).then(m => m.ProfilePage)
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }]
},
// Calendar — full-screen, no tab bar
{
  path: 'calendar',
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.authGuard],
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-apps_mobile-app_src_app_components_event-card_event-card_component_ts-apps_mobile-app-bb7550"), __webpack_require__.e("apps_mobile-app_src_app_pages_calendar_calendar_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/calendar/calendar.page */ 133)).then(m => m.CalendarPage)
},
// Event detail — full-screen, no tab bar
{
  path: 'event/:id',
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.authGuard],
  loadComponent: () => __webpack_require__.e(/*! import() */ "apps_mobile-app_src_app_pages_event-detail_event-detail_page_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/event-detail/event-detail.page */ 1905)).then(m => m.EventDetailPage)
},
// Admin section
{
  path: 'admin',
  canActivate: [_guards_admin_guard__WEBPACK_IMPORTED_MODULE_1__.adminGuard],
  children: [{
    path: '',
    loadComponent: () => __webpack_require__.e(/*! import() */ "apps_mobile-app_src_app_pages_admin_admin-home_page_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/admin/admin-home.page */ 7013)).then(m => m.AdminHomePage)
  }, {
    path: 'events',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("apps_mobile-app_src_app_pages_admin_admin-events_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/admin/admin-events.page */ 2971)).then(m => m.AdminEventsPage)
  }, {
    path: 'venues',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("apps_mobile-app_src_app_pages_admin_admin-venues_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/admin/admin-venues.page */ 2980)).then(m => m.AdminVenuesPage)
  }, {
    path: 'estilos',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("apps_mobile-app_src_app_pages_admin_admin-estilos_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/admin/admin-estilos.page */ 2741)).then(m => m.AdminEstilosPage)
  }, {
    path: 'academias',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("apps_mobile-app_src_app_pages_admin_admin-academias_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/admin/admin-academias.page */ 6086)).then(m => m.AdminAcademiasPage)
  }]
},
// Catch-all
{
  path: '**',
  redirectTo: '/tabs/home'
}];

/***/ }),

/***/ 7719:
/*!*******************************************************!*\
  !*** ./apps/mobile-app/src/app/guards/admin.guard.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   adminGuard: () => (/* binding */ adminGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/auth.service */ 2693);



const adminGuard = () => {
  const auth = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService);
  if (auth.isAdmin()) return true;
  return (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router).createUrlTree(['/tabs/home']);
};

/***/ }),

/***/ 7914:
/*!******************************************************!*\
  !*** ./apps/mobile-app/src/app/guards/auth.guard.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authGuard: () => (/* binding */ authGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/auth.service */ 2693);



const authGuard = () => {
  const auth = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService);
  if (auth.isAuthenticated()) return true;
  return (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router).createUrlTree(['/onboarding/ciudad']);
};

/***/ }),

/***/ 7673:
/*!************************************************************!*\
  !*** ./apps/mobile-app/src/app/guards/onboarding.guard.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onboardingGuard: () => (/* binding */ onboardingGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/auth.service */ 2693);



// Prevents authenticated users from re-entering the onboarding flow
const onboardingGuard = () => {
  const auth = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService);
  if (!auth.isAuthenticated()) return true;
  return (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router).createUrlTree(['/tabs/home']);
};

/***/ }),

/***/ 3982:
/*!******************************************************************!*\
  !*** ./apps/mobile-app/src/app/interceptors/auth.interceptor.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authInterceptor: () => (/* binding */ authInterceptor)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 1318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 7919);



const authInterceptor = (req, next) => {
  const token = localStorage.getItem('auth_token');
  const router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router);
  const authReq = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }) : req;
  return next(authReq).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => {
    if (error.status === 401) {
      localStorage.removeItem('auth_token');
      router.navigateByUrl('/onboarding/ciudad');
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.throwError)(() => error);
  }));
};

/***/ }),

/***/ 9194:
/*!*********************************************************!*\
  !*** ./apps/mobile-app/src/app/pages/tabs/tabs.page.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TabsPage: () => (/* binding */ TabsPage)
/* harmony export */ });
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular/standalone */ 1347);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);




class TabsPage {
  constructor() {
    (0,ionicons__WEBPACK_IMPORTED_MODULE_1__.a)({
      home: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.home,
      person: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.person
    });
  }
  static {
    this.ɵfac = function TabsPage_Factory(t) {
      return new (t || TabsPage)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: TabsPage,
      selectors: [["app-tabs"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
      decls: 10,
      vars: 0,
      consts: [["slot", "bottom"], ["tab", "home", "href", "/tabs/home"], ["name", "home"], ["tab", "profile", "href", "/tabs/profile"], ["name", "person"]],
      template: function TabsPage_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-tabs")(1, "ion-tab-bar", 0)(2, "ion-tab-button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "ion-icon", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "ion-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Agenda");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "ion-tab-button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "ion-icon", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "ion-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Perfil");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
        }
      },
      dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonTabs, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonTabBar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonTabButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonLabel],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 2693:
/*!**********************************************************!*\
  !*** ./apps/mobile-app/src/app/services/auth.service.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthService: () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 8764);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 3738);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 6443);




const TOKEN_KEY = 'auth_token';
class AuthService {
  constructor(http) {
    this.http = http;
    this.base = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/auth`;
  }
  register(payload) {
    return this.http.post(`${this.base}/register`, payload).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(res => localStorage.setItem(TOKEN_KEY, res.accessToken)));
  }
  login(alias) {
    return this.http.post(`${this.base}/login`, {
      alias
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(res => localStorage.setItem(TOKEN_KEY, res.accessToken)));
  }
  logout() {
    localStorage.clear();
  }
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
  isAuthenticated() {
    return !!this.getToken();
  }
  getRol() {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.rol ?? null;
    } catch {
      return null;
    }
  }
  isAdmin() {
    return this.getRol() === 'admin';
  }
  static {
    this.ɵfac = function AuthService_Factory(t) {
      return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
      token: AuthService,
      factory: AuthService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 3738:
/*!*********************************************************!*\
  !*** ./apps/mobile-app/src/environments/environment.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const environment = {
  production: false,
  apiUrl: 'http://localhost:3333/api',
  socketUrl: 'http://localhost:3333'
};

/***/ }),

/***/ 1467:
/*!*************************************!*\
  !*** ./apps/mobile-app/src/main.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular/standalone */ 1347);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ 3835);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngrx/store */ 1383);
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngrx/effects */ 347);
/* harmony import */ var _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngrx/store-devtools */ 1925);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./environments/environment */ 3738);
/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.component */ 6377);
/* harmony import */ var _app_app_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.routes */ 9763);
/* harmony import */ var _app_interceptors_auth_interceptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/interceptors/auth.interceptor */ 3982);












(0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.bootstrapApplication)(_app_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent, {
  providers: [(0,_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.provideIonicAngular)({}), (0,_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__.provideAnimations)(), (0,_angular_router__WEBPACK_IMPORTED_MODULE_7__.provideRouter)(_app_app_routes__WEBPACK_IMPORTED_MODULE_2__.routes), (0,_angular_common_http__WEBPACK_IMPORTED_MODULE_8__.provideHttpClient)((0,_angular_common_http__WEBPACK_IMPORTED_MODULE_8__.withInterceptors)([_app_interceptors_auth_interceptor__WEBPACK_IMPORTED_MODULE_3__.authInterceptor])), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_9__.provideStore)(), (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_10__.provideEffects)(), (0,_ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_11__.provideStoreDevtools)({
    maxAge: 25,
    logOnly: _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.production
  })]
}).catch(err => console.error(err));

/***/ }),

/***/ 4140:
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/@stencil/core/internal/client/ lazy ^\.\/.*\.entry\.js.*$ include: \.entry\.js$ exclude: \.system\.entry\.js$ strict namespace object ***!
  \************************************************************************************************************************************************************/
/***/ ((module) => {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(() => {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = () => ([]);
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 4140;
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ 2212:
/*!****************************************************************************!*\
  !*** ./node_modules/ionicons/dist/esm-es5/ lazy ^\.\/.*$ namespace object ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./": [
		2176,
		"node_modules_ionicons_dist_esm-es5_index_js"
	],
	"./index": [
		2176,
		"node_modules_ionicons_dist_esm-es5_index_js"
	],
	"./index-b72adede": [
		2579
	],
	"./index-b72adede.js": [
		2579
	],
	"./index.js": [
		2176,
		"node_modules_ionicons_dist_esm-es5_index_js"
	],
	"./ion-icon.entry": [
		6328,
		"node_modules_ionicons_dist_esm-es5_ion-icon_entry_js"
	],
	"./ion-icon.entry.js": [
		6328,
		"node_modules_ionicons_dist_esm-es5_ion-icon_entry_js"
	],
	"./ionicons": [
		1978,
		"node_modules_ionicons_dist_esm-es5_ionicons_js"
	],
	"./ionicons.js": [
		1978,
		"node_modules_ionicons_dist_esm-es5_ionicons_js"
	],
	"./loader": [
		517,
		"node_modules_ionicons_dist_esm-es5_loader_js"
	],
	"./loader.js": [
		517,
		"node_modules_ionicons_dist_esm-es5_loader_js"
	],
	"./utils-2c56d1c8": [
		5846
	],
	"./utils-2c56d1c8.js": [
		5846
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 2212;
module.exports = webpackAsyncContext;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(1467)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map