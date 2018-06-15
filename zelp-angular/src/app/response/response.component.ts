import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  responseName: String;
  responseDescription: String;
  responseURL: String;
  responseImageURL: String;
  userId: String;
  upVotes: Number;
  downVotes: Number;

  constructor() { }

  ngOnInit() {
  }

}
