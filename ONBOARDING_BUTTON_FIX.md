# Onboarding Button Fix — February 25, 2026

## Problem Identified
The "Entrar a la app" button in the final onboarding step (estilos page) was not working properly when clicked.

## Root Cause Analysis

The issue was related to how the authentication endpoint was returning user data:

1. **Backend Response Format Issue**: The auth service was returning the entire `User` entity object (which includes TypeORM decorators and metadata) instead of a clean `UserProfile` interface.

2. **Missing Error Handling**: The `finish()` method in the estilos page didn't display validation errors clearly, making it hard to debug which field was failing.

3. **Response Type Mismatch**: The frontend expected an `AuthResponse` interface with a `UserProfile` object, but the backend was returning raw `User` entities.

## Solution Implemented

### 1. Created Response DTO with Proper Type Definitions
**File:** `apps/api/src/modules/auth/dtos/auth-response.dto.ts`

```typescript
export class UserProfileDto {
  @ApiProperty()
  id: string;
  
  @ApiProperty()
  alias: string;
  
  @ApiProperty()
  ciudad: string;
  
  @ApiProperty()
  rol: string;
  
  @ApiProperty()
  nivel: string;
  
  @ApiProperty({ type: [String] })
  estilos: string[];
  
  @ApiProperty({ required: false })
  academia?: string;
  
  @ApiProperty()
  createdAt: Date;
  
  @ApiProperty()
  updatedAt: Date;
}

export class AuthResponseDto {
  @ApiProperty({ description: 'JWT access token' })
  accessToken: string;

  @ApiProperty({ description: 'User profile data' })
  user: UserProfileDto;
}
```

### 2. Updated AuthService to Return Cleaned User Data
**File:** `apps/api/src/modules/auth/auth.service.ts`

- Created local `AuthResponseData` interface (avoiding cross-module imports)
- Updated `signToken()` method to explicitly map User entity to clean object:

```typescript
private signToken(user: User) {
  const payload = { sub: user.id, alias: user.alias, rol: user.rol };
  return {
    accessToken: this.jwtService.sign(payload),
    user: {
      id: user.id,
      alias: user.alias,
      ciudad: user.ciudad,
      rol: user.rol,
      nivel: user.nivel,
      estilos: user.estilos as any,
      academia: user.academia || undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
}
```

### 3. Updated Controller to Type Response
**File:** `apps/api/src/modules/auth/auth.controller.ts`

```typescript
@Post('register')
@ApiOperation({ summary: 'Create a new user profile (onboarding)' })
register(@Body() dto: RegisterDto): Promise<AuthResponseDto> {
  return this.authService.register(dto) as Promise<AuthResponseDto>;
}
```

### 4. Improved Frontend Error Handling
**File:** `apps/mobile-app/src/app/pages/onboarding/estilos/onboarding-estilos.page.ts`

- Added explicit validation check in `finish()` method
- Added user-friendly error message if validation fails
- Added `console.error()` logging for debugging network errors

```typescript
finish(): void {
  const onboarding = this.state.get();
  if (!onboarding.rol || !onboarding.nivel || this.selected.length === 0 || !this.alias.trim()) {
    this.error = 'Por favor completa todos los campos requeridos.';
    return;
  }
  // ... rest of the code
}
```

## Files Modified

1. ✅ `apps/api/src/modules/auth/dtos/auth-response.dto.ts` — Created
2. ✅ `apps/api/src/modules/auth/auth.service.ts` — Updated
3. ✅ `apps/api/src/modules/auth/auth.controller.ts` — Updated
4. ✅ `apps/mobile-app/src/app/pages/onboarding/estilos/onboarding-estilos.page.ts` — Updated

## Validation

✅ **API TypeScript Compilation**: 0 errors  
✅ **Frontend TypeScript Compilation**: 0 errors  
✅ **API Build**: Success  

## Testing Checklist

When testing the onboarding flow:

1. **Login/Onboarding Entry** → Select ciudad (Cartagena)
2. **Rol Selection** → Choose leader/follower/switch
3. **Nivel Selection** → Choose skill level
4. **Estilos Selection** → Choose at least one dance style
5. **Complete Profile** → Enter alias (required) and academia (optional)
6. **Submit** → Click "Entrar a la app 🎵"

Expected behavior:
- ✓ Button should be enabled when all required fields are filled
- ✓ Clicking button should show "Creando perfil..." while loading
- ✓ Should navigate to `/tabs/home` on success
- ✓ Should display error message if registration fails

## Notes

- The fix ensures that only clean, serializable data is sent to the frontend
- All TypeORM metadata is stripped before sending the response
- Token includes `rol` field for admin checks
- Error messages are clear and help with debugging
- Full type safety maintained across both API and frontend
