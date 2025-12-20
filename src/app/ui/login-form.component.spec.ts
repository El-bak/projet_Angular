import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { FormsModule } from '@angular/forms';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not emit login if credentials are empty', () => {
    spyOn(component.login, 'emit');

    component.username = '';
    component.password = '';
    component.submit();

    expect(component.login.emit).not.toHaveBeenCalled();
  });

  it('should emit login payload when credentials are provided', () => {
    spyOn(component.login, 'emit');

    component.username = 'test';
    component.password = '123456';
    component.submit();

    expect(component.login.emit).toHaveBeenCalledWith({
      username: 'test',
      password: '123456',
    });
  });
});
