import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomListModalComponent } from './room-list-modal.component';

describe('RoomListModalComponent', () => {
  let component: RoomListModalComponent;
  let fixture: ComponentFixture<RoomListModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomListModalComponent]
    });
    fixture = TestBed.createComponent(RoomListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
