import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { provideRouter } from '@angular/router';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have mobileMenuOpen as false initially', () => {
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('toggleMenu() should open menu when closed', () => {
    component.mobileMenuOpen.set(false);
    component.toggleMenu();
    expect(component.mobileMenuOpen()).toBe(true);
  });

  it('toggleMenu() should close menu when open', () => {
    component.mobileMenuOpen.set(true);
    component.toggleMenu();
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('closeMenu() should always set menu to false', () => {
    component.mobileMenuOpen.set(true);
    component.closeMenu();
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('onResize() should close menu when width > 768', () => {
    component.mobileMenuOpen.set(true);

    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1024,
    });

    component.onResize();
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('onResize() should NOT close menu when width <= 768', () => {
    component.mobileMenuOpen.set(true);

    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 768,
    });

    component.onResize();
    expect(component.mobileMenuOpen()).toBe(true);
  });

});
