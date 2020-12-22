import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChatService } from 'src/app/services/chat.service';

import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let service: ChatService;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
      imports:[HttpClientModule,RouterTestingModule]
    })
    .compileComponents();
    service = TestBed.inject(ChatService)
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get token',(done:DoneFn)=>{
    service.getTwilioToken('susi').subscribe(resp=>{
      expect(resp.status).toBe(200);
    })
    })
});
