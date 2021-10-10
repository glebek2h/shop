import { HttpClient } from '@angular/common/http';
import {
    MissingTranslationHandler,
    MissingTranslationHandlerParams,
    TranslateLoader,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export class MissingTranslationService implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        return `WARN: '${params.key}' is missing in '${params.translateService.currentLang}' locale`;
    }
}

export function createTranslateLoader(http: HttpClient): TranslateLoader {
    return new TranslateHttpLoader(http, '../../../assets/locale/', '.json');
}
