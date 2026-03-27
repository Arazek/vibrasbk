# Test Plan for Two-Step Location Picker

## Overview
We've implemented a two-step location picker for the VibraSBK app to replace the single action sheet that was getting too long with many cities.

## Changes Made

### 1. New Components Created:
- `CountryPickerModal` - Modal for selecting a country (or "All cities")
- `CityPickerModal` - Modal for selecting a city within a country (with search functionality)

### 2. Modified Files:
- `home.page.ts` - Updated `openLocationPicker()` method to use two-step modals
- Added proper validation for location selections when loading events

### 3. Key Features:
- **Two-step flow**: Country → City (if country selected)
- **Search in city picker**: Users can search for cities when there are many
- **Back navigation**: Users can go back from city picker to country picker
- **Proper selection states**: Shows checkmarks for currently selected options
- **Validation**: Clears invalid selections (e.g., if a city no longer has events)

## Test Scenarios

### Scenario 1: Initial State
1. Open the app
2. Go to Home page
3. Click location pill (should show "Todas las ciudades" or user's city)
4. Verify location pill shows correct label

### Scenario 2: Select "All cities"
1. Click location pill
2. Country picker modal opens
3. Select "🌍 Todas las ciudades"
4. Modal closes
5. Location pill shows "Todas las ciudades"
6. All events should be visible (no filtering)

### Scenario 3: Select a country (no specific city)
1. Click location pill
2. Country picker opens
3. Select a country (e.g., "🗺 Colombia")
4. City picker opens for that country
5. Select "📍 Todas las ciudades de Colombia"
6. Modal closes
7. Location pill shows "Colombia"
8. Only events in Colombia should be visible

### Scenario 4: Select a specific city
1. Click location pill
2. Country picker opens
3. Select a country
4. City picker opens
5. Use search to find a city or scroll
6. Select a specific city
7. Modal closes
8. Location pill shows city name
9. Only events in that city should be visible

### Scenario 5: Back navigation
1. Click location pill
2. Country picker opens
3. Select a country
4. City picker opens
5. Click back button (←)
6. Should return to country picker
7. Can select different country or cancel

### Scenario 6: Search functionality
1. Click location pill
2. Select a country with many cities
3. In city picker, type in search bar
4. Verify cities filter correctly
5. Select a city from filtered list
6. Verify correct filtering applied

### Scenario 7: Persistence
1. Select a location (country or city)
2. Close and reopen app
3. Verify location selection is preserved
4. Verify events are filtered correctly

### Scenario 8: Invalid selection cleanup
1. Select a city that has events
2. Simulate that city no longer has events (or mock API)
3. Refresh the page
4. Verify location selection is cleared
5. Verify "Todas las ciudades" is shown

## Technical Implementation Notes

### Data Flow:
1. Events are loaded from API
2. Country → cities map is built from event venues
3. User selects location via two-step modal
4. Selection saved to localStorage (`vibrasbk_location_v2`)
5. Events filtered based on selection:
   - If city selected: filter by `venue.city === selectedCity`
   - If country selected (no city): filter by `venue.country === selectedCountry`
   - If neither: show all events

### Error Handling:
- Invalid selections are cleared when loading events
- If selected city/country doesn't exist in current events, selection is reset
- Modal cancellations handled gracefully

### UI/UX:
- Modals use app's design system tokens
- Selected items show checkmark
- Search bar in city picker for large lists
- Clear back navigation
- Responsive design for mobile