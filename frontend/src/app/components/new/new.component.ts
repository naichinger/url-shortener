import { Component, OnInit } from '@angular/core';
import { LinkService } from '../../services/link.service';
import { Link } from '../../models/link';
import { FormsModule } from '@angular/forms';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [FormsModule, ClipboardModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent implements OnInit {
  url = "";
  submitLoading = false;
  invalidUrl = false;

  bannerMsg = ""

  urlHistory: Link[] = []

  constructor(private linkService: LinkService, private clipboard: Clipboard, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let status = params['s'];
      switch (status) {
        case "notfound":
          this.bannerMsg = "Url not found!"
          break;
      }
    });
    this.readHistoryFromLocalStorage();
  }

  submitButtonClicked() {
    if (this.submitLoading) {
      return;
    }
    if (!this.checkValidUrl(this.url)) {
      if (this.checkValidUrl("https://" + this.url)) {
        this.url = "https://" + this.url;
      } else {
        this.invalidUrl = true;
        return;
      }
    }

    this.submitLoading = true;
    this.linkService.createLink({ url: this.url }).subscribe({
      next: (d: Link) => {
        this.url = "";
        this.addToHistory(d)
        this.submitLoading = false;
        this.bannerMsg = ""
      },
      error: err => {
        this.invalidUrl = true;
        this.submitLoading = false;
        this.bannerMsg = ""
      }
    })
  }

  private addToHistory(link: Link) {
    this.urlHistory.splice(0, -1, link)
    localStorage.setItem("history", JSON.stringify(this.urlHistory))
  }

  private readHistoryFromLocalStorage() {
    let historyJson = localStorage.getItem("history")
    this.urlHistory = []
    if (historyJson != null) {
      this.urlHistory = JSON.parse(historyJson)
    }
  }

  private checkValidUrl(url: string) {
    try {
      new URL(this.url);
    } catch (error) {
      return false;
    }
    return true;
  }

  getFaviconUrl(link: Link) {
    return "https://www.google.com/s2/favicons?domain=" + new URL(link.url).origin;
  }

  copyLink(link: Link) {
    let url = new URL(link.shortHand, environment.BACKEND_BASE_HREF).href;
    this.clipboard.copy(url);
  }

  getFullUrlString(link: Link) {
    return new URL(link.shortHand, environment.BACKEND_BASE_HREF).href
  }
}
