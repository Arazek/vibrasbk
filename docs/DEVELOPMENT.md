# Development Guide

## 🏗️ Architecture Overview

### Monorepo Structure

```
mobile-app-template/
├── apps/
│   ├── mobile-app/       # Ionic Angular SPA
│   └── api/              # NestJS REST + WebSocket API
├── libs/
│   └── shared-types/     # Shared TypeScript interfaces
└── .github/
    └── workflows/        # CI/CD pipelines
```

### Frontend Architecture

```
Components (Standalone)
    ↓
Services (HTTP, WebSocket, Auth)
    ↓
NgRx Store (State Management)
    ↓
Ionic Pages & Layouts
```

### Backend Architecture

```
HTTP/WebSocket Request
    ↓
Guard (JwtAuthGuard)
    ↓
Pipe (ValidationPipe)
    ↓
Controller → Service → Repository
    ↓
TypeORM Entity
    ↓
PostgreSQL Database
```

### Real-time Flow

```
Client (Socket.io)
    ↓
ChatGateway (WebSocket Handler)
    ↓
ChatService (Business Logic)
    ↓
MessageEntity (Database)
    ↓
Broadcast to Conversation
```

---

## 📂 File Organization Guide

### Frontend Module Structure

```
apps/mobile-app/src/app/modules/[feature]/
├── pages/
│   ├── list.component.ts
│   └── detail.component.ts
├── components/
│   └── item-card.component.ts
├── services/
│   └── feature.service.ts
├── store/                 # NgRx (if needed)
│   ├── feature.actions.ts
│   ├── feature.reducer.ts
│   └── feature.effects.ts
└── models/
    └── feature.model.ts
```

### Backend Module Structure

```
apps/api/src/modules/[feature]/
├── entities/
│   └── feature.entity.ts
├── dtos/
│   ├── create-feature.dto.ts
│   └── update-feature.dto.ts
├── decorators/
│   └── custom.decorator.ts
├── guards/
│   └── custom.guard.ts
├── feature.service.ts
├── feature.controller.ts
└── feature.module.ts
```

---

## 🔄 Common Development Workflows

### 1. Adding a New API Endpoint

#### Step 1: Create DTO

```typescript
// apps/api/src/modules/feature/dtos/create-feature.dto.ts
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeatureDto {
  @ApiProperty()
  @IsString()
  name: string;
}
```

#### Step 2: Create Service Method

```typescript
// apps/api/src/modules/feature/feature.service.ts
@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(Feature)
    private repo: Repository<Feature>
  ) {}

  async create(dto: CreateFeatureDto): Promise<Feature> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }
}
```

#### Step 3: Create Controller Endpoint

```typescript
// apps/api/src/modules/feature/feature.controller.ts
@Post()
@ApiOperation({ summary: 'Create feature' })
async create(@Body() dto: CreateFeatureDto) {
  return this.service.create(dto);
}
```

#### Step 4: Register Module

```typescript
// apps/api/src/app.module.ts
import { FeatureModule } from './modules/feature/feature.module';

@Module({
  imports: [
    // ...existing imports
    FeatureModule,
  ],
})
export class AppModule {}
```

### 2. Creating a Frontend Service & Component

#### Step 1: Create Service

```typescript
// apps/mobile-app/src/app/services/feature.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FeatureService {
  private apiUrl = `${environment.apiUrl}/features`;

  constructor(private http: HttpClient) {}

  getFeatures() {
    return this.http.get<any[]>(this.apiUrl);
  }

  create(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
```

#### Step 2: Create Component

```typescript
// apps/mobile-app/src/app/pages/feature-list/feature-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../../services/feature.service';

@Component({
  selector: 'app-feature-list',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Features</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div *ngFor="let feature of features">{{ feature.name }}</div>
    </ion-content>
  `,
})
export class FeatureListComponent implements OnInit {
  features: any[] = [];

  constructor(private featureService: FeatureService) {}

  ngOnInit() {
    this.featureService.getFeatures().subscribe(
      (data) => (this.features = data),
      (error) => console.error('Error:', error)
    );
  }
}
```

#### Step 3: Add Route

```typescript
// apps/mobile-app/src/app/app.routes.ts
export const routes: Routes = [
  // ...existing routes
  {
    path: 'features',
    loadComponent: () =>
      import('./pages/feature-list/feature-list.component').then(
        (m) => m.FeatureListComponent
      ),
  },
];
```

### 3. Adding WebSocket Real-time Feature

#### Step 1: Create Gateway (Backend)

```typescript
// apps/api/src/modules/feature/feature.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: '/feature' })
export class FeatureGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('event-name')
  handleEvent(client: Socket, payload: any) {
    this.server.emit('event-response', payload);
  }
}
```

#### Step 2: Register Gateway in Module

```typescript
// apps/api/src/modules/feature/feature.module.ts
@Module({
  // ...
  providers: [FeatureService, FeatureGateway],
})
export class FeatureModule {}
```

#### Step 3: Connect from Frontend

```typescript
// apps/mobile-app/src/app/services/feature.service.ts
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FeatureService {
  private socket = io(`${environment.socketUrl}/feature`);

  listenToEvents() {
    return new Observable((observer) => {
      this.socket.on('event-response', (data) => {
        observer.next(data);
      });
    });
  }

  emitEvent(data: any) {
    this.socket.emit('event-name', data);
  }
}
```

---

## 🧪 Testing

### Unit Tests - Backend

```bash
npm run test:api
```

Example test:

```typescript
// apps/api/src/modules/feature/feature.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FeatureService } from './feature.service';
import { Feature } from './entities/feature.entity';

describe('FeatureService', () => {
  let service: FeatureService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeatureService,
        {
          provide: getRepositoryToken(Feature),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FeatureService>(FeatureService);
  });

  it('should create a feature', async () => {
    const dto = { name: 'Test' };
    mockRepository.create.mockReturnValue(dto);
    mockRepository.save.mockResolvedValue({ id: '1', ...dto });

    const result = await service.create(dto);
    expect(result.name).toBe('Test');
  });
});
```

### Unit Tests - Frontend

```bash
npm run test:app
```

Example test:

```typescript
// apps/mobile-app/src/app/services/feature.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FeatureService } from './feature.service';

describe('FeatureService', () => {
  let service: FeatureService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeatureService],
    });

    service = TestBed.inject(FeatureService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch features', () => {
    const mockData = [{ id: '1', name: 'Feature 1' }];

    service.getFeatures().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${service.apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
```

---

## 🔐 Authentication Flow

### Backend Auth Module

```
Request with JWT in header
    ↓
JwtAuthGuard extracts token
    ↓
JwtStrategy validates token
    ↓
User loaded from database
    ↓
Attach user to request object
    ↓
Controller has access to req.user
```

### Frontend Auth Service

```typescript
// apps/mobile-app/src/app/services/auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('token')
  );

  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  googleLogin(profile: any) {
    return this.http.post(`${environment.apiUrl}/auth/google`, { profile }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.accessToken);
        this.tokenSubject.next(response.accessToken);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  getToken() {
    return this.tokenSubject.value;
  }
}
```

---

## 📊 Database Schema

### Users Table

```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### Messages Table

```typescript
@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  conversationId: string; // Foreign key to Conversation

  @Column()
  senderId: string; // Foreign key to User

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

### Calendar Events Table

```typescript
@Entity('calendar_events')
export class CalendarEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  createdBy: string; // Foreign key to User

  @Column('uuid', { array: true })
  attendeeIds: string[]; // Array of User IDs
}
```

---

## 🚀 Deployment Checklist

### Before Production

- [ ] Environment variables configured
- [ ] JWT secret changed from default
- [ ] Database backups enabled
- [ ] CORS origins restricted
- [ ] Rate limiting enabled
- [ ] Logging configured
- [ ] Error handling tested
- [ ] Security headers set
- [ ] HTTPS enabled
- [ ] API documentation reviewed

### Database Migrations

```bash
# Create migration
npm run db:migration:create -- -n migration_name

# Run migrations
npm run db:migration:run

# Revert migration
npm run db:migration:revert
```

---

## 🛠️ Troubleshooting Common Issues

### Issue: TypeORM "Unknown column in field list"

**Solution**: Ensure entity property names match database column names. Check if you need to run migrations.

```bash
npm run db:setup
```

### Issue: NestJS Cannot find module '@shared/types'

**Solution**: Check `tsconfig.base.json` path mappings:

```json
{
  "compilerOptions": {
    "paths": {
      "@shared/*": ["libs/shared/*"]
    }
  }
}
```

### Issue: Angular Standalone Component Not Rendering

**Solution**: Ensure component is imported in parent component/module:

```typescript
@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule, IonicModule], // ← Required
  template: `...`,
})
export class FeatureComponent {}
```

### Issue: WebSocket Connection Refused

**Solution**: Ensure NestJS server is running and CORS is configured:

```typescript
// apps/api/src/main.ts
app.enableCors({
  origin: 'http://localhost:4200',
  credentials: true,
});
```

---

## 📚 Useful Commands

```bash
# Development
npm start                # Frontend
npm run start:api        # Backend
npm run start:api -- --inspect  # Backend with debugger

# Testing
npm run test:app         # Frontend tests
npm run test:api         # Backend tests
npm run e2e             # E2E tests

# Linting & Formatting
npm run lint            # Run ESLint
npm run format          # Format with Prettier

# Build
npm run build           # Build all
npm run build:app       # Build frontend
npm run build:api       # Build backend

# Docker
docker compose up -d postgres   # Start PostgreSQL
docker compose down             # Stop all containers
```

---

## 🤝 Code Review Checklist

Before submitting a PR:

- [ ] Code follows Prettier formatting
- [ ] ESLint passes with no warnings
- [ ] All tests pass
- [ ] Types are properly defined (no `any`)
- [ ] Error handling is implemented
- [ ] API documentation updated (Swagger decorators)
- [ ] Environment variables documented
- [ ] Shared types exported from `libs/shared-types/`
- [ ] No hardcoded values (use environment variables)
- [ ] Components are standalone (frontend)

---

## 📖 Additional Resources

- [Angular Docs](https://angular.io)
- [Ionic Framework](https://ionicframework.com)
- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Guide](https://typeorm.io)
- [Nx Monorepo](https://nx.dev)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

