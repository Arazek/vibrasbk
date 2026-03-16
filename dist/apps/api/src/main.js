"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./polyfills");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Serve uploaded event photos as static assets at /uploads
    // process.cwd() = workspace root when running via `nx serve api`
    app.useStaticAssets((0, path_1.join)(process.cwd(), 'apps', 'api', 'uploads'), {
        prefix: '/uploads',
        setHeaders: (res) => { res.setHeader('Access-Control-Allow-Origin', '*'); },
    });
    // Enable CORS
    app.enableCors({
        origin: ['http://localhost:4200', 'http://localhost:3000'],
        credentials: true,
    });
    // Global validation pipe
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    // Swagger API Documentation
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Mobile App API')
        .setDescription('B2C Mobile App Backend API')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const PORT = process.env.PORT || 3333;
    await app.listen(PORT, '0.0.0.0');
    console.log(`Application is running on: http://localhost:${PORT}`);
    console.log(`API Documentation: http://localhost:${PORT}/api/docs`);
}
bootstrap().catch((err) => {
    console.error('Failed to start application:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map