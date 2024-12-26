import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { provideRouter, RouterLink, RouterLinkActive } from '@angular/router';
import navlist from '../../lib/navlist';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterLink, RouterLinkActive],
      providers: [
        provideRouter([]), // Provide an empty router configuration
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    component.navlist = navlist;
    fixture.detectChanges();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should render the correct number of navigation links', () => {
    const navItems = fixture.debugElement.queryAll(By.css('nav ul li a'));
    expect(navItems.length).toBe(navlist.length);
  });
  it('should display the correct navigation link names and paths', () => {
    const navItems = fixture.debugElement.queryAll(By.css('nav ul li a'));
    navItems.forEach((navItem, index) => {
      const anchorElement: HTMLAnchorElement = navItem.nativeElement;

      // Check the displayed text matches the `nav_name`
      expect(anchorElement.textContent?.trim()).toBe(navlist[index].nav_name);

      // Check the `routerLink` attribute
      expect(anchorElement.getAttribute('ng-reflect-router-link')).toBe(navlist[index].path);
    });
  });
  it('should apply the active class when a link is active', () => {
    const navItems = fixture.debugElement.queryAll(By.css('nav ul li a'));

    navItems.forEach((navItem) => {
      const classes = navItem.nativeElement.className;

      // Check if the correct styles are applied
      expect(classes).toContain('text-white');
      expect(classes).toContain('font-semibold');
    });
  });
});
