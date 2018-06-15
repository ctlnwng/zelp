import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { SearchServiceClient } from "../services/search.service.client";

@Component({
  selector: "app-new-response",
  templateUrl: "./new-response.component.html",
  styleUrls: ["./new-response.component.css"]
})
export class NewResponseComponent implements OnInit {
  @Input() postId: String;

  constructor(private router: Router, private service: SearchServiceClient) {}

  ngOnInit() {
    console.log(this.postId);
  }
}
