import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should pass sanity test', () => {
    expect(true).toBeTruthy();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should generate random numbers on start', () => {
    component.step_one();
    setTimeout(() => {
      expect(component.number_0).not.toBe(0);
      expect(component.number_1).not.toBe(0);
    }, 500);
  });

  it('should reset user input and start a new chain on reroll', () => {
    component.user_input = '123';
    spyOn(component, 'start_chain');
    component.reroll();
    expect(component.user_input).toBe('');
    expect(component.start_chain).toHaveBeenCalled();
  });

  it('should update number positions on number_position_animator', (done) => {
    component.number_0 = 2;
    component.number_1 = 3;
    component.number_position_animator();
    setTimeout(() => {
      expect(component.number_position_0).not.toBe('0px');
      expect(component.number_position_1).not.toBe('0px');
      done();
    }, 200);
  });

  it('should handle incorrect user input', () => {
    component.number_0 = 2;
    component.number_1 = 3;
    component.user_input = '6';
    spyOn(component.objectSubject, 'next');
    component.run_test();
    expect(component.number_position_0).toBe('-1510px');
    expect(component.number_position_1).toBe('-1520px');
    expect(component.log_all.length).toBe(1);
    expect(component.objectSubject.next).toHaveBeenCalled();
  });

  it('should handle correct user input', () => {
    component.number_0 = 2;
    component.number_1 = 3;
    component.user_input = '5';
    spyOn(component.objectSubject, 'next');
    component.run_test();
    expect(component.number_position_0).toBe('-1410px');
    expect(component.number_position_1).toBe('-1400px');
    expect(component.log_all.length).toBe(1);
    expect(component.objectSubject.next).toHaveBeenCalled();
  });
});
