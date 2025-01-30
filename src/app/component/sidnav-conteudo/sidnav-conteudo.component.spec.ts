import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidnavConteudoComponent } from './sidnav-conteudo.component';

describe('SidnavConteudoComponent', () => {
  let component: SidnavConteudoComponent;
  let fixture: ComponentFixture<SidnavConteudoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidnavConteudoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidnavConteudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
