import { Subject } from 'rxjs';

const validationSubject = new Subject();

export const validationService = {
    onModal,
    modal
};

function onModal() {
    return validationSubject.asObservable();
}

function modal(mid) {
    validationSubject.next(mid);
}
