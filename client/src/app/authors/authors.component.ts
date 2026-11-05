import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthorDetails, AuthorsService } from './service/authors.service';

@Component({
  selector: 'app-authors',
  standalone: true,
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {
  private readonly authorsService = inject(AuthorsService);

  author: AuthorDetails | null = null;
  message: string | null = null;

  submit(value: string): void {
    const id = value.trim();
    this.author = null;
    this.message = null;

    if (!/^\d+$/.test(id)) {
      this.message = 'Please enter a valid author id (a positive whole number).';
      return;
    }

    this.authorsService.getAuthor(id).subscribe({
      next: (author) => { this.author = author; },
      error: (err: HttpErrorResponse) => {
        this.message = err.status === 404
          ? `No author found with id ${id}.`
          : 'Unable to reach the server. Please try again later.';
      }
    });
  }
}