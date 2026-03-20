# Test Coverage Reference

This document is the shared reference between developers and AI assistants for understanding what is tested, where, and why. It maps every test to its type, stack, use case, and location.

---

## How we use this document together

This file is a shared vocabulary. Instead of describing a test scenario in prose, you can point directly to it — and I can do the same. Some concrete examples of how this works in practice:

**You asking about coverage:**
> "Is the academyId flow tested?"

I look at the table, find `registers with an academyId and returns it in the response` in `auth.spec.ts` and `updates the academyId to a real academia` in `users.spec.ts`, and confirm: yes, both creation and update are covered, but deletion of an academy that users belong to is not tested.

**You asking me to add a test:**
> "Add a test for when a user tries to vote on a non-existent event."

I know from the Gaps section that this is missing, I know the pattern from `votes.spec.ts`, and I add the row to the table when done — so both of us stay in sync without you having to re-read the spec files.

**You asking about a bug:**
> "The login with empty body thing — is that tracked?"

I point you to the `todo` row in the Auth section, confirm it's documented as a known bug (500 instead of 401, root cause: missing DTO on login endpoint), and we can decide together whether to fix it now or keep it as a todo.

**You asking what's missing before a release:**
> "What's not tested yet?"

I go directly to the Gaps section at the bottom and give you a prioritized list without re-reading any code.

**Me telling you I added tests:**
When I write a new test, I update this file in the same commit — adding the row to the right section and removing the row from Gaps if it was listed there. You always know the table reflects reality.

**The key rule:** if a use case isn't in this table, it isn't tested. If it's in the Gaps section, we've acknowledged the risk. If it's neither, it's a blind spot.

---

## How to read the columns

| Column | Meaning |
|---|---|
| **Type** | `integration` = real DB + HTTP; `unit` = isolated logic; `e2e` = full user flow across stack |
| **Stack** | `backend` = NestJS API; `frontend` = Ionic/Angular app |
| **Use case** | What business rule or contract is being verified |
| **Test** | `test/<file>.spec.ts` → the `it(...)` description |

---

## Auth — `test/auth.spec.ts`

| Type | Stack | Use case | Test |
|---|---|---|---|
| integration | backend | Register returns JWT + full user shape | `happy path > returns a JWT token and full user object on success` |
| integration | backend | Email is never exposed in the register response | `happy path > returns a JWT token and full user object on success` (asserts `user.email` undefined) |
| integration | backend | Default city is set to Cartagena | `happy path > returns a JWT token and full user object on success` (asserts `user.city`) |
| integration | backend | Token from register grants access to protected endpoints | `happy path > returned token grants access to protected endpoints` |
| integration | backend | Multiple dance styles accepted at registration | `happy path > registers with multiple styles` |
| integration | backend | Dancing role: `leader` | `happy path > accepts dancing role: leader` |
| integration | backend | Dancing role: `follower` | `happy path > accepts dancing role: follower` |
| integration | backend | Dancing role: `switch` | `happy path > accepts dancing role: switch` |
| integration | backend | Level: `beginner` | `happy path > accepts level: beginner` |
| integration | backend | Level: `initiation` | `happy path > accepts level: initiation` |
| integration | backend | Level: `comfortable` | `happy path > accepts level: comfortable` |
| integration | backend | Level: `intermediate` | `happy path > accepts level: intermediate` |
| integration | backend | Level: `advanced` | `happy path > accepts level: advanced` |
| integration | backend | academyId is persisted and returned | `happy path > registers with an academyId and returns it in the response` |
| integration | backend | Password of exactly 6 characters is accepted (boundary) | `happy path > password with exactly 6 characters is accepted` |
| integration | backend | Missing all fields → 400 | `input validation > returns 400 when all fields are missing` |
| integration | backend | Missing alias → 400 | `input validation > returns 400 when alias is missing` |
| integration | backend | Missing email → 400 | `input validation > returns 400 when email is missing` |
| integration | backend | Invalid email format → 400 | `input validation > returns 400 for invalid email format` |
| integration | backend | Password shorter than 6 chars → 400 (boundary) | `input validation > returns 400 when password is shorter than 6 characters` |
| integration | backend | Missing dancingRole → 400 | `input validation > returns 400 when dancingRole is missing` |
| integration | backend | Invalid dancingRole → 400 | `input validation > returns 400 for invalid dancingRole` |
| integration | backend | Missing level → 400 | `input validation > returns 400 when level is missing` |
| integration | backend | Invalid level → 400 | `input validation > returns 400 for invalid level` |
| integration | backend | Missing styles → 400 | `input validation > returns 400 when styles is missing` |
| integration | backend | Empty styles array → 400 (min 1 on register) | `input validation > returns 400 when styles is an empty array` |
| integration | backend | Styles as a string (not array) → 400 | `input validation > returns 400 when styles is not an array` |
| integration | backend | Duplicate alias → 409 | `uniqueness constraints > returns 409 when alias is already taken` |
| integration | backend | Duplicate email → 409 | `uniqueness constraints > returns 409 when email is already registered` |
| integration | backend | Login returns JWT + user shape | `POST /api/auth/login > returns a token and user object with valid credentials` |
| integration | backend | Login token grants access to protected endpoints | `POST /api/auth/login > returned login token grants access to protected endpoints` |
| integration | backend | Wrong password → 401 | `POST /api/auth/login > returns 401 for wrong password` |
| integration | backend | Unknown email → 401 | `POST /api/auth/login > returns 401 for unknown email` |
| integration | backend | Empty login body returns 400 — LoginDto validates before reaching the service | `POST /api/auth/login > returns 400 when body is empty` |

---

## Users — `test/users.spec.ts`

| Type | Stack | Use case | Test |
|---|---|---|---|
| integration | backend | Auth guard on GET profile | `GET /api/users/profile > returns 401 without token` |
| integration | backend | Invalid token rejected | `GET /api/users/profile > returns 401 with an invalid token` |
| integration | backend | Profile returns all expected fields | `GET /api/users/profile > returns the authenticated user profile with all expected fields` |
| integration | backend | Auth guard on PATCH profile | `PATCH /api/users/profile > returns 401 without token` |
| integration | backend | Update level | `PATCH /api/users/profile > updates the user level` |
| integration | backend | Invalid level → 400 | `PATCH /api/users/profile > returns 400 for an invalid level value` |
| integration | backend | Update dance styles (replaces array) | `PATCH /api/users/profile > updates dance styles` |
| integration | backend | Empty styles array accepted on PATCH (no min) | `PATCH /api/users/profile > accepts an empty styles array (no minimum on PATCH)` |
| integration | backend | Update fcmToken | `PATCH /api/users/profile > updates the fcmToken` |
| integration | backend | Update academyId | `PATCH /api/users/profile > updates the academyId to a real academia` |
| integration | backend | Clear academyId with null | `PATCH /api/users/profile > clears the academyId when set to null` |
| integration | backend | Unknown fields rejected (whitelist) | `PATCH /api/users/profile > rejects unknown fields (whitelist validation)` |
| integration | backend | Two users see isolated profiles | `PATCH /api/users/profile > two different users each see their own profile` |

---

## Venues — `test/venues.spec.ts`

| Type | Stack | Use case | Test |
|---|---|---|---|
| integration | backend | Auth guard on GET venues list | `GET /api/venues > returns 401 without token` |
| integration | backend | Empty array when no venues exist | `GET /api/venues > returns an empty array when no venues exist` |
| integration | backend | List venues returns array with expected fields | `GET /api/venues > returns a list of venues` |
| integration | backend | Auth guard on GET single venue | `GET /api/venues/:id > returns 401 without token` |
| integration | backend | Get venue by id returns all fields | `GET /api/venues/:id > returns the venue by id with all fields` |
| integration | backend | Non-existent venue returns 200 empty body (API gap — not 404) | `GET /api/venues/:id > returns null body for a non-existent id` |
| integration | backend | SQL injection in path param — no 500 | `GET /api/venues/:id > SQL injection in path param never causes a 500` |
| integration | backend | Regular user cannot create venue (role guard) | `POST /api/venues > returns 403 for regular users` |
| integration | backend | Auth guard on POST venue | `POST /api/venues > returns 401 without token` |
| integration | backend | Admin creates a venue | `POST /api/venues > creates a venue as admin` |
| integration | backend | Missing name → 400 | `POST /api/venues > returns 400 for missing required fields` |
| integration | backend | Empty body → 400 | `POST /api/venues > returns 400 when body is empty` |
| integration | backend | Unknown fields rejected (whitelist) | `POST /api/venues > returns 400 for unknown fields (whitelist)` |
| integration | backend | SQL injection in name stored as literal — no drop | `POST /api/venues > SQL injection in name is stored as a literal string` |
| integration | backend | Admin updates a venue field | `PATCH /api/venues/:id > updates a venue as admin` |
| integration | backend | Regular user cannot update venue (role guard) | `PATCH /api/venues/:id > returns 403 for regular users` |
| integration | backend | Auth guard on PATCH venue | `PATCH /api/venues/:id > returns 401 without token` |
| integration | backend | Admin deletes a venue (removed from list) | `DELETE /api/venues/:id > deletes a venue as admin` |
| integration | backend | Regular user cannot delete venue (role guard) | `DELETE /api/venues/:id > returns 403 for regular users` |
| integration | backend | Auth guard on DELETE venue | `DELETE /api/venues/:id > returns 401 without token` |

---

## Events — `test/events.spec.ts`

| Type | Stack | Use case | Test |
|---|---|---|---|
| integration | backend | Auth guard on GET week | `GET /api/events/week > returns 401 without token` |
| integration | backend | Weekly list returns enrichment fields | `GET /api/events/week > returns an array of events for the current week` |
| integration | backend | Filter by type=social returns only social events | `GET /api/events/week > filters by type=social` |
| integration | backend | Filter by type=intensive returns only intensive events | `GET /api/events/week > filters by type=intensive` |
| integration | backend | Unknown type value returns empty array (not 400/500) | `GET /api/events/week > unknown type value returns an empty array` |
| integration | backend | SQL injection in type query param — no 500, returns empty array | `GET /api/events/week > SQL injection in type query param` |
| integration | backend | Auth guard on GET event detail | `GET /api/events/:id > returns 401 without token` |
| integration | backend | Non-existent event returns 200 empty body (API gap — not 404) | `GET /api/events/:id > returns null body for non-existent event` |
| integration | backend | Event detail includes vote aggregates | `GET /api/events/:id > returns event detail with vote data` |
| integration | backend | SQL injection in path param — no 500 | `GET /api/events/:id > SQL injection in path param never causes a 500` |
| integration | backend | Auth guard on POST event | `POST /api/events > returns 401 without token` |
| integration | backend | Regular user cannot create events (role guard) | `POST /api/events > returns 403 for regular users` |
| integration | backend | Admin creates a recurring social event | `POST /api/events > creates a recurring social event as admin` |
| integration | backend | Admin creates a one-time intensive event | `POST /api/events > creates a one-time intensive event as admin` |
| integration | backend | Admin creates a congress event | `POST /api/events > creates a congress event as admin` |
| integration | backend | Congress event appears in weekly list | `POST /api/events > congress event appears in the weekly list` |
| integration | backend | Missing venueId → 400 | `POST /api/events > returns 400 for missing required venueId` |
| integration | backend | Invalid type value → 400 | `POST /api/events > returns 400 for an invalid type value` |
| integration | backend | dayOfWeek below 0 → 400 (boundary) | `POST /api/events > returns 400 for dayOfWeek below minimum` |
| integration | backend | dayOfWeek above 6 → 400 (boundary) | `POST /api/events > returns 400 for dayOfWeek above maximum` |
| integration | backend | Unknown fields rejected (whitelist) | `POST /api/events > returns 400 for unknown fields (whitelist)` |
| integration | backend | SQL injection in name stored as literal | `POST /api/events > SQL injection in name is stored as a literal string` |
| integration | backend | Admin updates an event field | `PATCH /api/events/:id > updates an event as admin` |
| integration | backend | Regular user cannot update event (role guard) | `PATCH /api/events/:id > returns 403 for a regular user` |
| integration | backend | Auth guard on PATCH event | `PATCH /api/events/:id > returns 401 without token` |
| integration | backend | Update non-existent event → 404 | `PATCH /api/events/:id > returns 404 for a non-existent event id` |
| integration | backend | Soft-delete removes event from weekly list | `DELETE /api/events/:id > soft-deletes an event as admin` |
| integration | backend | Regular user cannot delete event (role guard) | `DELETE /api/events/:id > returns 403 for a regular user` |
| integration | backend | Auth guard on DELETE event | `DELETE /api/events/:id > returns 401 without token` |
| integration | backend | Delete non-existent event → 404 | `DELETE /api/events/:id > returns 404 for a non-existent event id` |
| integration | backend | Soft-delete twice → 404 on second attempt | `DELETE /api/events/:id > returns 404 when soft-deleting the same event twice` |
| integration | backend | Auth guard on photo upload | `POST /api/events/:id/photo > returns 401 without token` |
| integration | backend | Regular user cannot upload photo (role guard) | `POST /api/events/:id/photo > returns 403 for a regular user` |
| integration | backend | Admin uploads photo (requires uploads dir on disk) | `POST /api/events/:id/photo > admin uploads a photo` _(todo)_ |

---

## Votes — `test/votes.spec.ts`

| Type | Stack | Use case | Test |
|---|---|---|---|
| integration | backend | Auth guard on cast vote | `POST /api/votes > returns 401 without token` |
| integration | backend | Cast a `going` vote | `POST /api/votes > casts a going vote successfully` |
| integration | backend | Cast a `maybe` vote | `POST /api/votes > casts a maybe vote successfully` |
| integration | backend | Cast a `not_going` vote | `POST /api/votes > casts a not_going vote successfully` |
| integration | backend | Duplicate vote same week → 409 | `POST /api/votes > returns 409 when voting twice for the same event in the same week` |
| integration | backend | Vote reflected in event detail | `POST /api/votes > reflects the vote in the event detail` |
| integration | backend | Invalid status value → 400 | `POST /api/votes > returns 400 for an invalid status value` |
| integration | backend | Missing status → 400 | `POST /api/votes > returns 400 when status is missing` |
| integration | backend | Missing eventId → 400 | `POST /api/votes > returns 400 when eventId is missing` |
| integration | backend | Non-UUID eventId → 400 | `POST /api/votes > returns 400 when eventId is not a valid UUID` |
| integration | backend | SQL injection in eventId blocked by UUID validation → 400 | `POST /api/votes > SQL injection in eventId is rejected by UUID validation` |
| integration | backend | Unknown fields rejected (whitelist) | `POST /api/votes > returns 400 for unknown fields (whitelist)` |
| integration | backend | Change vote status | `PATCH /api/votes/:id > changes the vote status` |
| integration | backend | Auth guard on change vote | `PATCH /api/votes/:id > returns 401 without token` |
| integration | backend | Cannot modify another user's vote → 403 | `PATCH /api/votes/:id > returns 403 when modifying another user's vote` |
| integration | backend | Non-existent vote → 404 | `PATCH /api/votes/:id > returns 404 for a non-existent vote id` |
| integration | backend | Invalid status on update → 400 | `PATCH /api/votes/:id > returns 400 for an invalid status value` |
| integration | backend | Missing status on update → 400 | `PATCH /api/votes/:id > returns 400 when status is missing from body` |
| integration | backend | 2-hour cutoff blocks update before event | `PATCH /api/votes/:id > blocks update < 2 hours before event start` |
| integration | backend | Auth guard on verify attendance | `POST /api/votes/verify > returns 401 without token` |
| integration | backend | Submit attended=true verification | `POST /api/votes/verify > submits an attended=true verification` |
| integration | backend | Submit attended=false verification | `POST /api/votes/verify > submits an attended=false verification` |
| integration | backend | Verify is idempotent — second call updates the record | `POST /api/votes/verify > is idempotent — a second submission updates the existing record` |
| integration | backend | Verification creates/updates reliability metric (attended=true) | `POST /api/votes/verify > updates the reliability metric after verification` |
| integration | backend | Reliability decreases when attended=false | `POST /api/votes/verify > reliability decreases when attended=false` |
| integration | backend | Missing eventId on verify → 400 | `POST /api/votes/verify > returns 400 when eventId is missing` |
| integration | backend | Missing isoWeek on verify → 400 | `POST /api/votes/verify > returns 400 when isoWeek is missing` |
| integration | backend | Missing attended on verify → 400 | `POST /api/votes/verify > returns 400 when attended is missing` |
| integration | backend | Non-UUID eventId on verify → 400 | `POST /api/votes/verify > returns 400 when eventId is not a valid UUID` |
| integration | backend | Non-boolean attended → 400 | `POST /api/votes/verify > returns 400 when attended is not a boolean` |
| integration | backend | SQL injection in isoWeek stored as literal — no 500 | `POST /api/votes/verify > SQL injection in isoWeek is stored as a literal string` |
| integration | backend | Auth guard on analytics | `GET /api/events/:id/analytics > returns 401 without token` |
| integration | backend | No vote → analytics returns 401 | `GET /api/events/:id/analytics > returns 401 if user has not voted at all` |
| integration | backend | not_going vote → analytics returns 401 | `GET /api/events/:id/analytics > returns 401 if user voted not_going` |
| integration | backend | Analytics shape after going vote | `GET /api/events/:id/analytics > returns analytics after casting a going vote` |
| integration | backend | Analytics accessible after maybe vote | `GET /api/events/:id/analytics > returns analytics after casting a maybe vote` |
| integration | backend | Analytics roleBalance has expected shape | `GET /api/events/:id/analytics > analytics roleBalance has expected shape` |

---

## Academias — `test/academias.spec.ts`

| Type | Stack | Use case | Test |
|---|---|---|---|
| integration | backend | GET academias is public (no token needed) | `GET /api/academias > is public — returns 200 without a token` |
| integration | backend | Returns empty array when no academias exist | `GET /api/academias > returns an empty array when no academias exist` |
| integration | backend | Works with a valid user token too | `GET /api/academias > also returns 200 with a valid user token` |
| integration | backend | Each academia has id, name, city | `GET /api/academias > each academia has id, name, city fields` |
| integration | backend | Academias returned ordered by name ASC | `GET /api/academias > returns academias ordered by name ascending` |
| integration | backend | Auth guard on POST academia | `POST /api/academias > returns 401 without token` |
| integration | backend | Invalid token rejected | `POST /api/academias > returns 401 with an invalid token` |
| integration | backend | Regular user cannot create academia (role guard) | `POST /api/academias > returns 403 for a regular user` |
| integration | backend | Admin creates academia with name and city | `POST /api/academias > admin creates an academia with name and city` |
| integration | backend | City is optional | `POST /api/academias > city is optional — creates with name only` |
| integration | backend | Missing name → 400 | `POST /api/academias > returns 400 when name is missing` |
| integration | backend | Empty body → 400 | `POST /api/academias > returns 400 when body is empty` |
| integration | backend | Non-string name → 400 | `POST /api/academias > returns 400 when name is not a string` |
| integration | backend | Unknown fields rejected (whitelist) | `POST /api/academias > returns 400 for unknown fields (whitelist)` |
| integration | backend | SQL injection in name stored as literal — table not dropped | `POST /api/academias > SQL injection in name is stored as a literal string` |
| integration | backend | SQL injection in city stored as literal | `POST /api/academias > SQL injection in city is stored as a literal string` |
| integration | backend | XSS payload in name stored as literal | `POST /api/academias > XSS payload in name is stored as a literal string` |
| integration | backend | Auth guard on PATCH academia | `PATCH /api/academias/:id > returns 401 without token` |
| integration | backend | Regular user cannot update academia (role guard) | `PATCH /api/academias/:id > returns 403 for a regular user` |
| integration | backend | Admin updates name | `PATCH /api/academias/:id > admin updates the name` |
| integration | backend | Admin updates city | `PATCH /api/academias/:id > admin updates the city` |
| integration | backend | Update non-existent academia → 404 | `PATCH /api/academias/:id > returns 404 for a non-existent id` |
| integration | backend | SQL injection in path param — no 500 | `PATCH /api/academias/:id > SQL injection in path param never causes a 500` |
| integration | backend | Auth guard on DELETE academia | `DELETE /api/academias/:id > returns 401 without token` |
| integration | backend | Regular user cannot delete academia (role guard) | `DELETE /api/academias/:id > returns 403 for a regular user` |
| integration | backend | Admin deletes academia — disappears from list | `DELETE /api/academias/:id > admin deletes an academia and it disappears from the list` |
| integration | backend | Delete non-existent academia → 404 | `DELETE /api/academias/:id > returns 404 when deleting a non-existent id` |
| integration | backend | Delete same academia twice → 404 on second | `DELETE /api/academias/:id > returns 404 when deleting the same academia twice` |

---

## Dance Styles — `test/dance-styles.spec.ts`

| Type | Stack | Use case | Test |
|---|---|---|---|
| integration | backend | GET dance-styles is public (no token needed) | `GET /api/dance-styles > is public — returns 200 without a token` |
| integration | backend | Returns array (may be empty after clearDatabase) | `GET /api/dance-styles > returns an empty array after database clear` |
| integration | backend | Returns created active styles | `GET /api/dance-styles > returns created active styles` |
| integration | backend | Each style has id, slug, name, active | `GET /api/dance-styles > each style has id, slug, name, active fields` |
| integration | backend | Styles returned ordered by name ASC | `GET /api/dance-styles > returns styles ordered by name ascending` |
| integration | backend | Inactive styles excluded from list | `GET /api/dance-styles > inactive styles are excluded from the list` |
| integration | backend | Auth guard on POST dance-style | `POST /api/dance-styles > returns 401 without token` |
| integration | backend | Invalid token rejected | `POST /api/dance-styles > returns 401 with an invalid token` |
| integration | backend | Regular user cannot create style (role guard) | `POST /api/dance-styles > returns 403 for a regular user` |
| integration | backend | Admin creates a dance style | `POST /api/dance-styles > admin creates a dance style` |
| integration | backend | Active defaults to true | `POST /api/dance-styles > active defaults to true when not provided` |
| integration | backend | Admin creates an inactive style | `POST /api/dance-styles > admin can create an inactive style by passing active: false` |
| integration | backend | Missing slug → 400 | `POST /api/dance-styles > returns 400 when slug is missing` |
| integration | backend | Missing name → 400 | `POST /api/dance-styles > returns 400 when name is missing` |
| integration | backend | Empty body → 400 | `POST /api/dance-styles > returns 400 when body is empty` |
| integration | backend | Unknown fields rejected (whitelist) | `POST /api/dance-styles > returns 400 for unknown fields (whitelist)` |
| integration | backend | Non-boolean active → 400 | `POST /api/dance-styles > returns 400 when active is not a boolean` |
| integration | backend | SQL injection in name stored as literal | `POST /api/dance-styles > SQL injection in name is stored as a literal string` |
| integration | backend | SQL injection in slug stored as literal | `POST /api/dance-styles > SQL injection in slug is stored as a literal string` |
| integration | backend | Auth guard on PATCH dance-style | `PATCH /api/dance-styles/:id > returns 401 without token` |
| integration | backend | Regular user cannot update style (role guard) | `PATCH /api/dance-styles/:id > returns 403 for a regular user` |
| integration | backend | Admin updates name | `PATCH /api/dance-styles/:id > admin updates the name` |
| integration | backend | Admin deactivates a style | `PATCH /api/dance-styles/:id > admin deactivates a style with active: false` |
| integration | backend | Admin reactivates a style | `PATCH /api/dance-styles/:id > admin reactivates a deactivated style` |
| integration | backend | Update non-existent style → 404 | `PATCH /api/dance-styles/:id > returns 404 for a non-existent id` |
| integration | backend | SQL injection in path param — no 500 | `PATCH /api/dance-styles/:id > SQL injection in path param never causes a 500` |
| integration | backend | Auth guard on DELETE dance-style | `DELETE /api/dance-styles/:id > returns 401 without token` |
| integration | backend | Regular user cannot delete style (role guard) | `DELETE /api/dance-styles/:id > returns 403 for a regular user` |
| integration | backend | Admin hard-deletes style — disappears from list | `DELETE /api/dance-styles/:id > admin hard-deletes a style` |
| integration | backend | Delete non-existent style → 404 | `DELETE /api/dance-styles/:id > returns 404 when deleting a non-existent id` |
| integration | backend | Delete same style twice → 404 on second | `DELETE /api/dance-styles/:id > returns 404 when deleting the same style twice` |

---

## Summary

| File | Tests | Todos |
|---|---|---|
| `auth.spec.ts` | 35 | 0 |
| `users.spec.ts` | 13 | 0 |
| `venues.spec.ts` | 20 | 0 |
| `events.spec.ts` | 33 | 1 (photo upload happy path) |
| `votes.spec.ts` | 38 | 0 |
| `academias.spec.ts` | 28 | 0 |
| `dance-styles.spec.ts` | 31 | 0 |
| **Total** | **198** | **1** |

All tests are **integration** type targeting the **backend** (NestJS API). There are currently no unit tests or frontend tests.

---

## Gaps and missing coverage

| Area | What's missing | Priority |
|---|---|---|
| Auth | Login with empty password (< 6 chars) returns 400 but weak passwords are not rejected at login (only at register) | Low |
| Events | Non-existent event returns 200 + empty body instead of 404 | Medium |
| Events | Photo upload happy path requires uploads directory on disk | Low |
| Events | No test for `GET /events/week` filtering by user city | Low |
| Votes | 2-hour cutoff: no test for the inverse (update IS allowed when > 2h before event) | Low |
| Venues | Non-existent venue returns 200 + empty body instead of 404 | Medium |
| Role escalation | No test verifying a regular user cannot self-promote `applicationRole` | High |
| Calendar | Zero tests — all 5 routes untested | Medium |
| Chat | Zero tests — all 3 routes untested | Low |
| Frontend | Zero frontend tests — onboarding, login, event list all untested | High |
| Unit | Zero unit tests — PredictionService analytics logic untested in isolation | Medium |
