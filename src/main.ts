import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as morgan from 'morgan'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(morgan('tiny'))
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,REDIRECT',
    credentials: true,
  })
  app.useGlobalPipes(new ValidationPipe())
  app.enableVersioning({
    type: VersioningType.URI,
  })
  const config = new DocumentBuilder()
    .setTitle('Employee API')
    .setVersion('1.0')
    .addServer(`http://localhost:3000`)
    .addServer('http://192.168.29.180:3000')
    .addBearerAuth(
      {
        description: `Please enter token`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header',
      },
      'access-token' // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build()
  const document = SwaggerModule.createDocument(
    app,
    config
    //   {
    //   extraModels: [swagger_api_response],
    // }
  )
  SwaggerModule.setup('api-doc', app, document)
  await app.listen(3000)
  console.log('3000')
}
bootstrap()
