import { Injectable, signal, computed } from '@angular/core';

export interface Action {
  id: number;
  title: string;
  date: string;
}

@Injectable({ providedIn: 'root' })
export class ActionsService {

 private actions = signal<Action[]>([]);


  selectedDate = signal<string | null>(null);

  filteredActions = computed(() => {
    const date = this.selectedDate();
    if (!date) return [];
    return this.actions().filter(a => a.date === date);
  });

  setDate(date: string) {
    this.selectedDate.set(date);
    
}
setActions(lista: Action[]) {
  this.actions.set(lista);
}

  }
  

