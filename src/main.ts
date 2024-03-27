import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AppModule } from './Modules/app.module';

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));
