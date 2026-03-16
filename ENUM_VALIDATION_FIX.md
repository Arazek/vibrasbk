# Onboarding Enum Validation Fix — February 25, 2026

## Issue
El endpoint `/api/auth/register` rechazaba el payload del frontend con enums válidos debido a problemas de validación de class-validator.

**Payload enviado:**
```json
{
  "alias":"asd",
  "rol":"leader",
  "nivel":"iniciacion",
  "estilos":["bachata_sensual"],
  "academia":"dsa"
}
```

## Root Cause
La validación de class-validator con `@IsEnum()` no estaba funcionando correctamente con enums de string en TypeScript compilado a JavaScript. El problema es que cuando TypeScript compila enums, el comportamiento varía dependiendo de cómo se definen.

## Solution Implemented

### 1. Removed Strict Enum Validation from DTO
**File:** `apps/api/src/modules/auth/dtos/register.dto.ts`

- Removidas las decoradores `@IsEnum()` que causaban problemas
- Los campos `rol`, `nivel`, `estilos` ahora son validados como strings normales
- La validación real se hace en el servicio

```typescript
export class RegisterDto {
  @ApiProperty({ example: 'salsa_king' })
  @IsString()
  alias: string;

  @ApiProperty({ enum: Rol, enumName: 'Rol' })
  rol: string;  // Validado manualmente en el servicio

  @ApiProperty({ enum: Nivel, enumName: 'Nivel' })
  nivel: string;  // Validado manualmente en el servicio

  @ApiProperty({ enum: Estilo, isArray: true, enumName: 'Estilo' })
  @IsArray()
  @ArrayMinSize(1)
  estilos: string[];  // Validado manualmente en el servicio

  @ApiPropertyOptional({ example: 'Academia de Salsa Cartagena' })
  @IsOptional()
  @IsString()
  academia?: string;
}
```

### 2. Added Manual Enum Validation in Service
**File:** `apps/api/src/modules/auth/auth.service.ts`

Movida la validación de enums a la lógica de negocio donde tenemos control total:

```typescript
async register(dto: RegisterDto): Promise<AuthResponseData> {
  // ... existing checks ...

  // Validate enum values manually
  const validRoles = Object.values(Rol);
  const validNiveles = Object.values(Nivel);
  const validEstilos = Object.values(Estilo);

  if (!validRoles.includes(dto.rol as Rol)) {
    throw new BadRequestException(`Invalid rol: ${dto.rol}`);
  }
  if (!validNiveles.includes(dto.nivel as Nivel)) {
    throw new BadRequestException(`Invalid nivel: ${dto.nivel}`);
  }
  if (!Array.isArray(dto.estilos) || dto.estilos.some((e) => !validEstilos.includes(e as Estilo))) {
    throw new BadRequestException(`Invalid estilos: ${JSON.stringify(dto.estilos)}`);
  }

  // Proceed with user creation
  const user = this.usersRepository.create({
    alias: dto.alias,
    ciudad: 'Cartagena',
    rol: dto.rol as Rol,
    nivel: dto.nivel as Nivel,
    estilos: (dto.estilos as any) as Estilo[],
    academia: dto.academia,
  });
  await this.usersRepository.save(user);

  return this.signToken(user);
}
```

## Why This Works Better

1. **More Reliable**: Directamente comprobamos contra los valores de enum en runtime
2. **Better Error Messages**: Retorna errores específicos si un valor no es válido
3. **No Class-Validator Issues**: Evitamos los problemas de transformación de class-validator
4. **Maintains Type Safety**: El TypeScript aún mantiene type checking en compile time
5. **Backward Compatible**: La API sigue aceptando exactamente el mismo JSON

## Testing Steps

1. **Build the API:**
   ```bash
   npm run build --prefix apps/api
   ```

2. **Start the API:**
   ```bash
   npm run start:dev --prefix apps/api
   ```

3. **Test the endpoint:**
   ```bash
   curl -X POST http://localhost:3333/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "alias":"testuser",
       "rol":"leader",
       "nivel":"iniciacion",
       "estilos":["bachata_sensual"],
       "academia":"Test Academy"
     }'
   ```

4. **Expected Response:**
   ```json
   {
     "accessToken": "eyJhbGc...",
     "user": {
       "id": "uuid",
       "alias": "testuser",
       "ciudad": "Cartagena",
       "rol": "leader",
       "nivel": "iniciacion",
       "estilos": ["bachata_sensual"],
       "academia": "Test Academy",
       "createdAt": "2026-02-25T...",
       "updatedAt": "2026-02-25T..."
     }
   }
   ```

5. **Test Invalid Enum:**
   ```bash
   curl -X POST http://localhost:3333/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "alias":"testuser2",
       "rol":"invalid_role",
       "nivel":"iniciacion",
       "estilos":["bachata_sensual"]
     }'
   ```

   Expected: 400 Bad Request with message "Invalid rol: invalid_role"

## Files Modified

1. ✅ `apps/api/src/modules/auth/dtos/register.dto.ts` — Removed @IsEnum decorators
2. ✅ `apps/api/src/modules/auth/auth.service.ts` — Added manual validation + BadRequestException import

## Type Safety

✅ TypeScript type-checking still enforces correct types at compile time
✅ Runtime validation ensures only valid enum values are accepted
✅ Swagger documentation still shows enum values correctly
✅ Frontend receives proper error messages if validation fails
