import { Subject } from 'rxjs';

const validationSubject = new Subject();

export const validationService = {
    onModal,
    modal
};

function onModal() {
    return modalSubject.asObservable();
}

function modal(mid) {
    modalSubject.next(mid);
}
