import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTodo } from './add-new-todo';

describe('AddNewTodo', () => {
  let component: AddNewTodo;
  let fixture: ComponentFixture<AddNewTodo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewTodo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewTodo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
